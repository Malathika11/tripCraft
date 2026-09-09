const { promiseDb } = require('../db');

const {
    flightFilterDefaults
} = require('../data/flight');


const getFlights = async (fromCityId, toCityId, amount) => {

    let query = `
        SELECT
            f.id,
            f.flight_number,
            f.aircraft,
            f.from_city_id,
            f.from_city,
            f.to_city_id,
            f.to_city,
            TIME_FORMAT(
                f.departure_time,
                '%H:%i'
            ) AS departure_time,
            TIME_FORMAT(
                f.arrival_time,
                '%H:%i'
            ) AS arrival_time,
            f.duration,
            f.stop_type,
            f.stop_name,
            f.price,
            a.code AS airline_code,
            a.name AS airline_name,
            a.logo AS airline_logo
        FROM flights f
        INNER JOIN airlines a
            ON a.id = f.airline_id
        WHERE f.from_city_id = ?
        AND f.to_city_id = ?
    `;

    const params = [
        fromCityId,
        toCityId
    ];

    if (amount > 0) {
        query += ` AND f.price <= ?`;
        params.push(amount);
    }

    query += ` ORDER BY f.price ASC`;

    const [rows] = await promiseDb.query( query, params );

    return rows;
};

const buildFilterData = (flights) => {

    if (!flights.length) {

        return {
            minValue: 0,
            maxLimit: 0,
            filters: [
                {
                    head: 'Stops',
                    type: 'radio',
                    formControl: 'stops',
                    options: [
                        {
                            id: 'all',
                            value: 'All'
                        }
                    ]
                },
                {
                    head: 'Departure Time',
                    type: 'boxData',
                    formControl: 'departureTime',
                    options: flightFilterDefaults.departureTime
                },
                {
                    head: 'Airlines',
                    type: 'checkbox',
                    formControl: 'airlines',
                    options: []
                },
                {
                    head: 'Price Range',
                    type: 'pricerange',
                    formControl: 'priceRange'
                }
            ]
        };
    }
    const airlineMap = new Map();
    flights.forEach(flight => {
        if (!airlineMap.has(flight.airline_code)) {
            airlineMap.set(
                flight.airline_code,
                {
                    id: flight.airline_code.toLowerCase(),
                    value: flight.airline_name
                }
            );
        }
    });
    const airlineOptions = [ ...airlineMap.values() ];

    const stopOrder = [
        'Direct',
        '1 Stop',
        '2+ Stops'
    ];

    const availableStops = [
        ...new Set(
            flights.map(
                flight => flight.stop_type
            )
        )
    ];

    const stopOptions = [
        {
            id: 'all',
            value: 'All'
        }
    ];

    stopOrder.forEach(stop => {
        if ( availableStops.includes(stop) ) {
            stopOptions.push({
                id: stop.toLowerCase().replace(/\s/g, '-'),
                value: stop
            });
        }
    });

    const prices = flights.map( flight => Number(flight.price) );
    const minValue = Math.min( ...prices );
    const maxLimit = Math.max( ...prices );
    
    return {
        minValue,
        maxLimit,
        filters: [
            {
                head: 'Stops',
                type: 'radio',
                formControl: 'stops',
                options: stopOptions
            },
            {
                head: 'Departure Time',
                type: 'boxData',
                formControl: 'departureTime',
                options: flightFilterDefaults.departureTime
            },
            {
                head: 'Airlines',
                type: 'checkbox',
                formControl: 'airlines',
                options: airlineOptions
            },
            {
                head: 'Price Range',
                type: 'pricerange',
                formControl: 'priceRange'
            }
        ]
    };
};

const formatFlight = (flight) => {
    return {
        id: flight.id,
        icon: flight.airline_logo,
        name: flight.airline_code.toLowerCase(),
        subName: `${flight.flight_number} · ${flight.aircraft}`,
        amountType: '₹',
        amount: Number(flight.price),
        arrivelTime: flight.arrival_time,
        arrivelSector: flight.to_city_id,
        arrivelPlace: `${flight.to_city} Airport`,
        stopCount: flight.duration,
        stopType: flight.stop_type,
        color: flight.stop_type === 'Direct' ? 'green' : 'red',
        departureTime: flight.departure_time,
        departureSector: flight.from_city_id,
        departurePlace: `${flight.from_city} Airport`,
        stopName: flight.stop_name || '',
        selected: false
    };
};

const searchFlights = async (req, res) => {
    try {

        const {
            fromCityId,
            toCityId,
            amount,
            totalBudget,
            adults,
            children,
            infants
        } = req.body;

        if (!fromCityId || !toCityId) {
            return res.status(400).json({
                success: false,
                message: 'fromCityId and toCityId are required'
            });
        }

        const adultCount = Number(adults) || 0;
        const childCount = Number(children) || 0;
        const infantCount = Number(infants) || 0;

        const flightAmount = Number(amount) || 0;
        const tripTotalBudget = Number(totalBudget) || 0;

        // ✅ ADD pannunga — passengerSummary calculate pannра function call
        const passengerSummary = buildPassengerSummary(adultCount, childCount, infantCount);

        const oneWayRows = await getFlights( fromCityId, toCityId, flightAmount );
        const roundTripRows = await getFlights( toCityId, fromCityId, flightAmount );

        if ( !oneWayRows.length && !roundTripRows.length ) {
            return res.status(404).json({
                success: false,
                status: 'NO_FLIGHT_FOUND',
                message: flightAmount > 0
                    ? `No flights found for ${passengerSummary} within your flight budget of ₹${tripTotalBudget > 0 ? Math.round(tripTotalBudget / 2).toLocaleString('en-IN') : 0} — that's ₹${flightAmount.toLocaleString('en-IN')} per person.`
                    : 'No flights found for this sector',
                amount: flightAmount,
                totalBudget: tripTotalBudget
            });
        }

        const oneWayFlights = oneWayRows.map( formatFlight );
        const roundTripFlights = roundTripRows.map( formatFlight );
        const oneWayFilter = buildFilterData( oneWayRows );
        const roundTripFilter = buildFilterData( roundTripRows );

        return res.json({
            success: true,
            tripType: 'roundTrip',
            sector: {
                from: {
                    city: oneWayRows[0]?.from_city || '',
                    code: fromCityId
                },
                to: {
                    city: oneWayRows[0]?.to_city || '',
                    code: toCityId
                }
            },
            filterData: {
                oneWay: oneWayFilter,
                roundTrip: roundTripFilter
            },
            budgetStatus: {
                totalBudget: tripTotalBudget,
                limit: 0,
                barLabel: 'Flight Budget',
                pageName: 'Flights',
                budgetButton: 'Continue to guide selection',
                icon: 'cls-61-flight',
                amountLabel: '₹',
                usedAmount: 0,
                remainingAmount: tripTotalBudget,
                selectOption: [
                    {
                        label: 'Outbound',
                        errorValue: 'Select a outbound flight',
                        icon: 'cls-25-departure',
                        index: 'oneWay'
                    },
                    {
                        label: 'Return',
                        errorValue: 'Select a return flight',
                        icon: 'cls-24-arrival',
                        index: 'roundTrip'
                    }
                ]
            },
            flightDetails: {
                oneWay: oneWayFlights,
                roundTrip: roundTripFlights
            }
        });

    } catch (error) {
        console.error( 'Flight search error:', error );
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch flight details',
            error: error.message
        });
    }
};

// ✅ ADD pannunga — file-la, module.exports ku munnadi
const buildPassengerSummary = (adults, children, infants) => {
    const parts = [];

    if (adults > 0) {
        parts.push(`${adults} Adult${adults > 1 ? 's' : ''}`);
    }
    if (children > 0) {
        parts.push(`${children} Child${children > 1 ? 'ren' : ''}`);
    }
    if (infants > 0) {
        parts.push(`${infants} Infant${infants > 1 ? 's' : ''}`);
    }

    return parts.join(', ');
};


module.exports = {
    searchFlights
};