const { db } = require('../db');


// =====================================================
// GET HOTELS
// =====================================================

exports.getHotels = (req, res) => {

    const {
        cityId,
        totalDays
    } = req.body;


    console.log('Hotel Request:', {
        cityId,
        totalDays
    });


    // =================================================
    // VALIDATION
    // =================================================

    if (!cityId) {

        return res.status(400).json({
            success: false,
            message: 'cityId is required'
        });

    }


    // =================================================
    // SQL
    // =================================================

    const sql = `

        SELECT

            h.id,
            h.discount,
            h.name,
            h.description,
            h.image,

            h.rating_stars,
            h.rating_score,
            h.rating_reviews,

            l.address,
            l.full_address,
            l.distance,
            l.drive_time,

            l.latitude,
            l.longitude,
            l.map_label,

            r.name AS room_name,
            r.old_price,
            r.price,
            r.period

        FROM hotels h

        INNER JOIN hotel_locations l
            ON h.id = l.hotel_id

        LEFT JOIN hotel_rooms r
            ON h.id = r.hotel_id

        WHERE l.city_id = ?

        ORDER BY h.rating_score DESC

    `;


    // =================================================
    // DB QUERY
    // =================================================

    db.query(
        sql,
        [cityId],
        (err, result) => {

            if (err) {

                console.error(
                    '❌ Hotel query error:',
                    err
                );

                return res.status(500).json({

                    success: false,

                    message:
                        'Database query failed',

                    error: err.message

                });

            }


            console.log(
                '✅ Hotels found:',
                result.length
            );


            // =========================================
            // NO DATA
            // =========================================

            if (result.length === 0) {

                return res.status(200).json({

                    success: true,

                    count: 0,

                    data: []

                });

            }


            // =========================================
            // GET AMENITIES FOR EACH HOTEL
            // =========================================

            let completed = 0;

            const hotels = [];


            result.forEach((hotel) => {

                const amenitySql = `

                    SELECT
                        icon,
                        label

                    FROM hotel_amenities

                    WHERE hotel_id = ?

                    ORDER BY id ASC

                `;


                db.query(
                    amenitySql,
                    [hotel.id],
                    (amenityErr, amenities) => {

                        if (amenityErr) {

                            console.error(
                                '❌ Amenity query error:',
                                amenityErr
                            );

                            return res.status(500).json({

                                success: false,

                                message:
                                    'Amenity query failed',

                                error:
                                    amenityErr.message

                            });

                        }


                        // =================================
                        // FINAL HOTEL OBJECT
                        // =================================

                        hotels.push({

                            id: hotel.id,

                            discount:
                                hotel.discount,

                            name:
                                hotel.name,


                            // -----------------------------
                            // LOCATION
                            // -----------------------------

                            location: {

                                address:
                                    hotel.address,

                                fullAddress:
                                    hotel.full_address,

                                distance:
                                    hotel.distance,

                                driveTime:
                                    hotel.drive_time

                            },


                            // -----------------------------
                            // RATING
                            // -----------------------------

                            rating: {

                                stars:
                                    Number(
                                        hotel.rating_stars
                                    ),

                                score:
                                    Number(
                                        hotel.rating_score
                                    ),

                                reviews:
                                    Number(
                                        hotel.rating_reviews
                                    )

                            },


                            // -----------------------------
                            // DESCRIPTION
                            // -----------------------------

                            description:
                                hotel.description,


                            // -----------------------------
                            // AMENITIES
                            // -----------------------------

                            amenities:
                                amenities.map(
                                    item => ({

                                        icon:
                                            item.icon,

                                        label:
                                            item.label

                                    })
                                ),


                            // -----------------------------
                            // ADDITIONAL AMENITIES
                            // -----------------------------

                            additionalAmenities: 0,


                            // -----------------------------
                            // ROOM
                            // -----------------------------

                            room: {

                                name:
                                    hotel.room_name,

                                oldPrice:
                                    hotel.old_price,

                                price:
                                    hotel.price,

                                period:
                                    hotel.period

                            },


                            // -----------------------------
                            // IMAGE
                            // -----------------------------

                            image:
                                hotel.image,


                            // -----------------------------
                            // MAP
                            // -----------------------------

                            map: {

                                latitude:
                                    Number(
                                        hotel.latitude
                                    ),

                                longitude:
                                    Number(
                                        hotel.longitude
                                    ),

                                label:
                                    hotel.map_label

                            }

                        });


                        completed++;


                        // =================================
                        // SEND RESPONSE
                        // =================================

                        if (
                            completed ===
                            result.length
                        ) {

                            return res.status(200).json({

                                success: true,

                                count:
                                    hotels.length,

                                data:
                                    hotels

                            });

                        }

                    }
                );

            });

        }
    );

};