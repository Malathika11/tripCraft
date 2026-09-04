const { db } = require('../db');

exports.getHotels = (req, res) => {

    console.log('🔥 getHotels called', req.body);

    const { city, tripDays } = req.body;

    // ==========================================
    // VALIDATE CITY
    // ==========================================

    if (!city || typeof city !== 'string' || !city.trim()) {

        return res.status(400).json({
            message: 'City is required',
            fatal: true,
            success: false
        });

    }


    // ==========================================
    // VALIDATE TRIP DAYS
    // ==========================================

    const days = tripDays ? Number(tripDays) : 1;

    if (isNaN(days) || days <= 0) {

        return res.status(400).json({
            message: 'Trip days must be a valid positive number',
            fatal: true,
            success: false
        });

    }


    const cityName = city.trim().toLowerCase();

    console.log('🔍 Searching for city:', cityName);


    // ==========================================
    // GET HOTELS
    // ==========================================

    const hotelSql = `
        SELECT *
        FROM hotels
        WHERE LOWER(TRIM(city)) = ?
    `;


    db.query(hotelSql, [cityName], (err, hotels) => {

        if (err) {

            console.error('Hotel search error:', err);

            return res.status(500).json({
                message: 'Database query failed',
                fatal: true,
                success: false
            });

        }


        console.log('📦 Hotels found:', hotels.length);


        // ==========================================
        // NO HOTELS
        // ==========================================

        if (!hotels.length) {

            return res.status(404).json({

                message: `No hotels available in "${city}"`,

                fatal: false,

                success: true,

                data: {
                    filterData: {},
                    hotelValues: []
                }

            });

        }


        // ==========================================
        // HOTEL IDS
        // ==========================================

        const hotelIds = hotels.map(hotel => hotel.id);


        // ==========================================
        // GET AMENITIES
        // ==========================================

        const amenitySql = `
            SELECT *
            FROM hotel_amenities
            WHERE hotel_id IN (?)
        `;


        db.query(amenitySql, [hotelIds], (amenityErr, amenities) => {

            if (amenityErr) {

                console.error('Amenity fetch error:', amenityErr);

                return res.status(500).json({
                    message: 'Database query failed',
                    fatal: true,
                    success: false
                });

            }


            // ==========================================
            // GET HOTEL IMAGES
            // ==========================================

            const imageSql = `
                SELECT
                    id,
                    hotel_id,
                    image_url,
                    display_order,
                    is_primary
                FROM hotel_images
                WHERE hotel_id IN (?)
                ORDER BY
                    hotel_id ASC,
                    is_primary DESC,
                    display_order ASC,
                    id ASC
            `;


            db.query(imageSql, [hotelIds], (imageErr, hotelImages) => {

                if (imageErr) {

                    console.error('Hotel images fetch error:', imageErr);

                    return res.status(500).json({
                        message: 'Hotel images query failed',
                        fatal: true,
                        success: false
                    });

                }


                console.log(
                    '🖼️ Hotel images found:',
                    hotelImages.length
                );


                // ==========================================
                // CREATE IMAGE MAP
                // ==========================================

                const imageMap = new Map();


                hotelImages.forEach(image => {

                    if (!imageMap.has(image.hotel_id)) {

                        imageMap.set(
                            image.hotel_id,
                            []
                        );

                    }


                    imageMap
                        .get(image.hotel_id)
                        .push(image.image_url);

                });


                // ==========================================
                // CREATE AMENITY MAP
                // ==========================================

                const amenityMapByHotel = new Map();


                amenities.forEach(amenity => {

                    if (!amenityMapByHotel.has(amenity.hotel_id)) {

                        amenityMapByHotel.set(
                            amenity.hotel_id,
                            []
                        );

                    }


                    amenityMapByHotel
                        .get(amenity.hotel_id)
                        .push({

                            id: amenity.amenity_id,

                            name: amenity.amenity_name,

                            icon: amenity.icon

                        });

                });


                // ==========================================
                // CREATE HOTEL RESPONSE
                // ==========================================

                const hotelValues = hotels.map(hotel => {


                    // --------------------------------------
                    // AMENITIES
                    // --------------------------------------

                    const hotelAmenities =
                        amenityMapByHotel.get(hotel.id) || [];


                    // --------------------------------------
                    // IMAGES
                    // --------------------------------------

                    let images =
                        imageMap.get(hotel.id) || [];


                    // --------------------------------------
                    // FALLBACK TO OLD IMAGE COLUMN
                    // --------------------------------------

                    /*
                     * If hotel_images table doesn't have
                     * an image for this hotel, use the
                     * existing hotel.image column.
                     */

                    if (
                        images.length === 0 &&
                        hotel.image
                    ) {

                        images = [
                            hotel.image
                        ];

                    }


                    // --------------------------------------
                    // HOTEL OBJECT
                    // --------------------------------------

                    return {

                        hotelId: hotel.id,

                        hotelName: hotel.hotel_name,

                        roomName: hotel.room_name,

                        location: hotel.location,

                        city: hotel.city,

                        country: hotel.country,


                        // ⭐ MULTIPLE IMAGES
                        images: images,


                        star: hotel.star,

                        discount: hotel.discount,


                        distanceFromCenter: {

                            value: hotel.distance_value,

                            unit: hotel.distance_unit

                        },


                        rating: {

                            score: hotel.rating_score,

                            reviewCount: hotel.review_count

                        },


                        description: hotel.description,


                        amenities: hotelAmenities,


                        pricing: {

                            currency: hotel.currency,

                            currencySymbol:
                                hotel.currency_symbol,

                            pricePerNight:
                                hotel.price_per_night,

                            nights: days,

                            totalPrice:
                                Number(hotel.price_per_night) *
                                days

                        }

                    };

                });


                // ==========================================
                // PRICE DATA
                // ==========================================

                const prices = hotels.map(
                    hotel =>
                        Number(hotel.price_per_night) * days
                );


                const minValue =
                    Math.min(...prices);


                const maxLimit =
                    Math.max(...prices);


                // ==========================================
                // AMENITY FILTER MAP
                // ==========================================

                const amenityMap = new Map();


                amenities.forEach(a => {

                    if (!amenityMap.has(a.amenity_id)) {

                        amenityMap.set(
                            a.amenity_id,
                            {

                                id: a.amenity_id,

                                value: a.amenity_name,

                                select: false

                            }
                        );

                    }

                });


                // ==========================================
                // FILTER DATA
                // ==========================================

                const filterData = {

                    minValue,

                    maxLimit,

                    filters: [

                        // -------------------------------
                        // STAR RATINGS
                        // -------------------------------

                        {

                            head: 'Star Ratings',

                            type: 'radio',

                            formControl: 'starRating',

                            options: [

                                {
                                    id: 'all',
                                    value: 'All',
                                    select: true
                                },

                                {
                                    id: 5,
                                    value: '5 stars'
                                },

                                {
                                    id: 4,
                                    value: '4 stars'
                                },

                                {
                                    id: 3,
                                    value: '3 stars'
                                },

                                {
                                    id: 2,
                                    value: '2 stars'
                                }

                            ]

                        },


                        // -------------------------------
                        // GUEST RATINGS
                        // -------------------------------

                        {

                            head: 'Guest Ratings',

                            type: 'radio',

                            formControl: 'guestRating',

                            options: [

                                {
                                    id: 'all',
                                    value: 'All',
                                    select: true
                                },

                                {
                                    id: '4.5',
                                    value: 'Excellent 4.5+'
                                },

                                {
                                    id: '4.0',
                                    value: 'Very Good 4.0+'
                                },

                                {
                                    id: '3.5',
                                    value: 'Good 3.5+'
                                }

                            ]

                        },


                        // -------------------------------
                        // DISTANCE
                        // -------------------------------

                        {

                            head: 'Distance from center',

                            type: 'radio',

                            formControl: 'distance',

                            options: [

                                {
                                    id: 'any',
                                    value: 'Any',
                                    select: true
                                },

                                {
                                    id: '1',
                                    value: 'Within 1 km'
                                },

                                {
                                    id: '3',
                                    value: 'Within 3 km'
                                },

                                {
                                    id: '5',
                                    value: 'Within 5 km'
                                },

                                {
                                    id: '7',
                                    value: 'Within 7 km'
                                }

                            ]

                        },


                        // -------------------------------
                        // AMENITIES
                        // -------------------------------

                        {

                            head: 'Amenities',

                            type: 'checkbox',

                            formControl: 'amenities',

                            options:
                                Array.from(
                                    amenityMap.values()
                                )

                        },


                        // -------------------------------
                        // PRICE RANGE
                        // -------------------------------

                        {

                            head: 'Price Range',

                            type: 'pricerange',

                            formControl: 'priceRange',

                            options: []

                        }

                    ]

                };


                // ==========================================
                // FINAL RESPONSE
                // ==========================================

                return res.status(200).json({

                    message:
                        'Hotels fetched successfully',

                    fatal: false,

                    success: true,

                    data: {

                        filterData,

                        hotelValues

                    }

                });

            });

        });

    });

};