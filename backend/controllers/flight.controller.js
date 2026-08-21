const { promiseDb } = require('../db');

const {
    flightFilterDefaults
} = require('../data/flight');


const getFlights = async (fromCityId, toCityId, amount) => {

    const [rows] = await promiseDb.query(`
        SELECT
            f.id,
            f.flight_number,
            f.aircraft,
            f.from_city_id,
            f.from_city,
            f.to_city_id,
            f.to_city,
            TIME_FORMAT(f.departure_time, '%H:%i') AS departure_time,
            TIME_FORMAT(f.arrival_time, '%H:%i') AS arrival_time,
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
        AND f.price <= ?
        ORDER BY f.price ASC
    `, [
        fromCityId,
        toCityId,
        amount
    ]);

    return rows;
};

const buildFilterData = (flights) => {

    if (!flights.length) {

        return {
            oneWay: {
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
            },
            roundTrip: {
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
            }
        };
    }
    const airlineMap = new Map();
    flights.forEach(flight => {
        if (!airlineMap.has(flight.airline_code)) {
            airlineMap.set( flight.airline_code,
                {
                    id: flight.airline_code.toLowerCase(),
                    value: flight.airline_name
                }
            );
        }
    });
    const airlineOptions = [...airlineMap.values()];

    const stopOrder = [
        'Direct',
        '1 Stop',
        '2+ Stops'
    ];

    const availableStops = [
        ...new Set( flights.map( flight => flight.stop_type ) )
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
    const prices = flights.map(
        flight => Number(flight.price)
    );
    const minValue = Math.min(...prices);
    const maxLimit = Math.max(...prices);
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
            totalBudget
        } = req.body;

        if (!fromCityId || !toCityId) {
            return res.status(400).json({
                success: false,
                message: 'fromCityId and toCityId are required'
            });
        }

        if (!amount || Number(amount) <= 0) {
            return res.status(400).json({
                success: false,
                message: 'amount is required and must be greater than 0'
            });
        }

        const flightAmount = Number(amount);
        const tripTotalBudget = Number(totalBudget);

        const outboundRows = await getFlights(
            fromCityId,
            toCityId,
            flightAmount
        );

        const returnRows = await getFlights(
            toCityId,
            fromCityId,
            flightAmount
        );

        if (!outboundRows.length && !returnRows.length) {
            return res.status(404).json({
                success: false,
                status: 'NO_FLIGHT_FOUND',
                message: `No flights found within ₹${flightAmount}`,
                amount: flightAmount,
                totalBudget: tripTotalBudget
            });
        }

        const outBound = outboundRows.map(formatFlight);
        const returnFlights = returnRows.map(formatFlight);

        const outboundFilter = buildFilterData(outboundRows);
        const returnFilter = buildFilterData(returnRows);

        return res.json({
            success: true,

            tripType: 'roundTrip',

            sector: {
                from: {
                    city: outboundRows[0]?.from_city || '',
                    code: fromCityId
                },
                to: {
                    city: outboundRows[0]?.to_city || '',
                    code: toCityId
                }
            },

            filterData: {
                oneWay: outboundFilter,
                roundTrip: returnFilter
            },

            budgetStatus: {
                totalBudget: tripTotalBudget, // 👈 request totalBudget
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
                oneWay: outBound,
                roundTrip: returnFlights
            }
        });

    } catch (error) {

        console.error('Flight search error:', error);

        return res.status(500).json({
            success: false,
            message: 'Failed to fetch flight details',
            error: error.message
        });
    }
};

module.exports = {
    searchFlights
};