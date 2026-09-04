const { db } = require('../db');

exports.getVisitingPlaces = (req, res) => {

    const { city, startDate, endDate } = req.body;

    console.log('City:', city);
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);

    const trimmedCity = city?.trim();

    if (!trimmedCity) {
        return res.status(400).json({
            success: false,
            message: 'City is required'
        });
    }
    const query = `
        SELECT
            id,
            heading,
            icon,
            place_name,
            category,
            image,
            rating,
            reviews,
            duration,
            location,
            tags,
            price,
            old_price,
            discount
        FROM visiting_places
        WHERE LOWER(city) = LOWER(?)
        ORDER BY id ASC
    `;
    db.query(query, [trimmedCity], (err, results) => {
        if (err) {
            console.error( 'Visiting places DB error:', err );
            return res.status(500).json({
                success: false,
                message: 'Database error'
            });
        }
        if (!results || results.length === 0) {
            console.log( `No visiting places found for city: ${trimmedCity}` );
            return res.status(200).json([]);
        }
        const groupedData = {};
        results.forEach(place => {
            if (!groupedData[place.heading]) {
                groupedData[place.heading] = {
                    heading: place.heading,
                    icon: place.icon,
                    count: '0 places',
                    places: []
                };
            }
            let tags = place.tags;
            if (typeof tags === 'string') {
                try {
                    tags = JSON.parse(tags);
                } catch (error) {
                    console.error( `Invalid tags JSON for place ID: ${place.id}`, error );
                    tags = [];
                }
            }
            groupedData[place.heading].places.push({
                id: place.id,
                name: place.place_name,
                category: place.category,
                image: place.image,
                rating: place.rating !== null ? Number(place.rating) : null,
                reviews: place.reviews,
                duration: place.duration,
                location: place.location,
                tags: Array.isArray(tags) ? tags : [],
                price: place.price !== null ? Number(place.price) : 0,
                oldPrice: place.old_price !== null ? Number(place.old_price) : null,
                discount: place.discount || null
            });
            groupedData[place.heading].count = `${groupedData[place.heading].places.length} places`;
        });
        const response = { 
            success: true, 
            city: city, 
            startDate: startDate || null, 
            endDate: endDate || null, 
            data: Object.values(groupedData) 
        };
        return res.status(200).json(response);
    });
};