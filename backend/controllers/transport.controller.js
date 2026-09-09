const { db } = require('../db');

exports.getTransportPackages = (req, res) => {

    const { city, tripDays, amount } = req.body;

    console.log('Transport Request:', { city, tripDays, amount });

    if (!city || typeof city !== 'string' || !city.trim()) {
        return res.status(400).json({
            message: 'City is required',
            fatal: true,
            success: false
        });
    }

    if (tripDays === undefined || tripDays === null || tripDays === '') {
        return res.status(400).json({
            message: 'Trip days is required',
            fatal: true,
            success: false
        });
    }

    const days = Number(tripDays);

    if (isNaN(days) || days <= 0) {
        return res.status(400).json({
            message: 'Trip days must be a valid positive number',
            fatal: true,
            success: false
        });
    }

    if (amount === undefined || amount === null || amount === '') {
        return res.status(400).json({
            message: 'Amount is required',
            fatal: true,
            success: false
        });
    }

    const budget = Number(amount);

    if (isNaN(budget) || budget <= 0) {
        return res.status(400).json({
            message: 'Amount must be a valid positive number',
            fatal: true,
            success: false
        });
    }

    const cityName = city.trim().toLowerCase();
    const sql = `
        SELECT *
        FROM transport_packages
        WHERE LOWER(city) = ?
        AND trip_days = ?
        AND (per_day_price * trip_days) <= ?
        ORDER BY (per_day_price * trip_days) ASC
    `;

    db.query(
        sql, [cityName, days, budget], (err, packages) => {
            if (err) {
                console.error('Transport search error:', err);
                return res.status(500).json({
                    message: 'Database query failed',
                    fatal: true,
                    success: false
                });
            }

            if (!packages.length) {

                return res.status(404).json({
                    message: `No transport packages available in "${city}" for ${days} day(s) within amount ${budget}`,
                    fatal: false,
                    success: true,
                    data: {
                        filterData: {},
                        allPackages: []
                    }
                });
            }
            const packageIds = packages.map( pkg => pkg.id );

            const langSql = `
                SELECT *
                FROM transport_languages
                WHERE transport_id IN (?)
            `;

            db.query( langSql, [packageIds], (langErr, languages) => {
                if (langErr) {
                    console.error( 'Language fetch error:', langErr );
                    return res.status(500).json({
                        message: 'Database query failed',
                        fatal: true,
                        success: false
                    });
                }
                const allPackages = packages.map(pkg => {
                    const pkgLanguages = languages.filter( lang => lang.transport_id === pkg.id ).map( lang => lang.language );
                    const perDayPrice = Number(pkg.per_day_price);
                    const totalPrice = perDayPrice * days;
                    return {
                        id: pkg.id,
                        transportType: pkg.transport_type,
                        vehicleType: pkg.vehicle_type,
                        icon: pkg.icon,
                        capacityId: pkg.capacity_id,
                        durationId: pkg.duration_id,
                        languageIcon: pkg.language_icon,
                        languages: pkgLanguages,
                        name: pkg.name,
                        description: pkg.description,
                        km: pkg.km,
                        tripDays: pkg.trip_days,
                        price: totalPrice,
                        perDayPrice: perDayPrice,
                        maxPax: pkg.max_pax,
                        paxIcon: pkg.pax_icon,
                        rating: pkg.rating,
                        ratingIcon: pkg.rating_icon,
                        reviewCount: pkg.review_count,
                        recommended: !!pkg.recommended
                    };
                });
                const prices = allPackages.map( p => p.price );
                const minValue = Math.min(...prices);
                const maxLimit = Math.max(...prices);
                const existingTransportTypes = [
                    {
                        id: 'taxi-package',
                        value: 'Taxi Package',
                        select: false
                    },
                    {
                        id: 'self-drive',
                        value: 'Self Drive',
                        select: false
                    },
                    {
                        id: 'metro-pass',
                        value: 'Metro Pass',
                        select: false
                    },
                    {
                        id: 'private-cab',
                        value: 'Private Cab',
                        select: false
                    }
                ];
                const existingVehicleTypes = [
                    {
                        id: 'sedan',
                        value: 'Sedan',
                        select: false
                    },
                    {
                        id: 'suv',
                        value: 'SUV',
                        select: false
                    },
                    {
                        id: 'mini-van',
                        value: 'Mini Van',
                        select: false
                    }
                ];
                const existingCapacityTypes = [
                    {
                        id: 'all',
                        value: 'All',
                        select: true
                    },
                    {
                        id: '2-seater',
                        value: '2 Seater'
                    },
                    {
                        id: '4-seater',
                        value: '4 Seater'
                    },
                    {
                        id: '6-seater',
                        value: '6 Seater'
                    },
                    {
                        id: '6plus-seater',
                        value: '6+ Seater'
                    }
                ];
                const existingDurationTypes = [
                    {
                        id: 'all',
                        value: 'All',
                        select: true
                    },
                    {
                        id: 'full-trip',
                        value: 'Full Trip'
                    },
                    {
                        id: 'per-day',
                        value: 'Per Day'
                    }
                ];
                const existingLanguages = [
                    {
                        id: 'english',
                        value: 'English',
                        select: false
                    },
                    {
                        id: 'french',
                        value: 'French',
                        select: false
                    },
                    {
                        id: 'hindi',
                        value: 'Hindi',
                        select: false
                    }
                ];
                const formatValue = (value) => {
                    if (!value) {
                        return '';
                    }
                    return value.replace(/-/g, ' ').replace( /\b\w/g, char => char.toUpperCase() );
                };
                const addExtraOptions = ( existingOptions, packageValues ) => {
                    const existingIds = new Set( 
                        existingOptions.map( option => option.id )
                    );
                    const uniquePackageValues = [
                        ...new Set(
                            packageValues.filter(Boolean)
                        )
                    ];
                    const extraOptions = uniquePackageValues.filter( value => !existingIds.has(value) )
                        .map(value => ({
                            id: value,
                            value: formatValue(value),
                            select: false
                        }));
                    return [ ...existingOptions, ...extraOptions ];
                };
                const packageTransportTypes = allPackages.map( pkg => pkg.transportType );
                const packageVehicleTypes = allPackages.map( pkg => pkg.vehicleType );
                const packageCapacities = allPackages.map( pkg => pkg.capacityId );
                const packageDurations = allPackages.map( pkg => pkg.durationId );
                const packageLanguages = allPackages.flatMap( pkg => pkg.languages || [] );
                const transportTypeOptions = addExtraOptions( existingTransportTypes, packageTransportTypes );
                const vehicleTypeOptions = addExtraOptions( existingVehicleTypes, packageVehicleTypes );
                const capacityOptions = addExtraOptions( existingCapacityTypes, packageCapacities );
                const durationOptions = addExtraOptions( existingDurationTypes, packageDurations );
                const languageOptions = addExtraOptions( existingLanguages, packageLanguages );
                const filterData = {
                    minValue,
                    maxLimit,
                    filters: [
                        {
                            head: 'Transport Type',
                            type: 'checkbox',
                            formControl: 'transportType',
                            options: transportTypeOptions
                        },
                        {
                            head: 'Vehicle Type',
                            type: 'checkbox',
                            formControl: 'vehicleType',
                            options: vehicleTypeOptions
                        },
                        {
                            head: 'Vehicle Capacity',
                            type: 'radio',
                            formControl: 'vehicleCapacity',
                            options: capacityOptions
                        },
                        {
                            head: 'Package Duration',
                            type: 'radio',
                            formControl: 'packageDuration',
                            options: durationOptions
                        },
                        {
                            head: 'Driver Language',
                            type: 'checkbox',
                            formControl: 'driverLanguage',
                            options: languageOptions
                        },
                        {
                            head: 'Price Range',
                            type: 'pricerange',
                            formControl: 'priceRange',
                            options: []
                        }
                    ]
                };
                return res.status(200).json({
                    message: 'Transport packages fetched successfully',
                    fatal: false,
                    success: true,
                    data: {
                        filterData,
                        allPackages
                    }
                });
            });
        }
    );
};