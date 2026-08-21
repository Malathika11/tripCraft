const { db } = require('../db');

exports.getGuides = (req, res) => {

    const {
        toCityId,
        totalDays
    } = req.body;

    console.log('Guide Request:', {
        toCityId,
        totalDays
    });

    if (!toCityId || !totalDays) {

        return res.status(400).json({
            success: false,
            message: 'toCityId and totalDays are required'
        });

    }

    const sql = `
        SELECT
            g.id,
            g.name,
            g.rating,
            g.reviews,
            g.experience,
            p.per_day_price AS perDayPrice,
            g.description,
            g.languages,
            g.specialities,
            g.image

        FROM guide_details g

        INNER JOIN guide_day_pricing p
            ON g.id = p.guide_id

        WHERE g.city_id = ?
        AND p.total_days = ?

        ORDER BY g.rating DESC
    `;

    db.query(
        sql,
        [toCityId, Number(totalDays)],
        (err, result) => {

            if (err) {

                console.error(
                    '❌ Guide query error:',
                    err
                );

                return res.status(500).json({
                    success: false,
                    message: 'Database query failed',
                    error: err.message
                });
            }

            console.log(
                '✅ Guides found:',
                result.length
            );

            const guides = result.map(guide => ({

                id: guide.id,

                name: guide.name,

                rating: Number(guide.rating),

                reviews: guide.reviews,

                experience: guide.experience,

                perDayPrice: Number(
                    guide.perDayPrice
                ),

                description: guide.description,

                languages: guide.languages
                    ? guide.languages
                        .split(',')
                        .map(item => item.trim())
                    : [],

                specialities: guide.specialities
                    ? guide.specialities
                        .split(',')
                        .map(item => item.trim())
                    : [],

                image: guide.image

            }));

            return res.status(200).json({
                success: true,
                count: guides.length,
                data: guides
            });

        }
    );
};