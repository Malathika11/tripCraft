const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {

    try {

        // Header cards
        const [headerCards] = await db.promise().query(`
            SELECT
                id,
                image_path,
                title,
                description,
                button_text,
                display_order
            FROM home_header_cards
            WHERE is_active = TRUE
            ORDER BY display_order
        `);

        // Why Choose cards
        const [whyChooseCards] = await db.promise().query(`
            SELECT
                id,
                icon_class,
                heading,
                description,
                display_order
            FROM home_why_choose
            WHERE is_active = TRUE
            ORDER BY display_order
        `);

        // Testimonials
        const [testimonials] = await db.promise().query(`
            SELECT
                id,
                message,
                person_image,
                person_name,
                person_place,
                star,
                display_order
            FROM home_testimonials
            WHERE is_active = TRUE
            ORDER BY display_order
        `);

        // One combined response
        res.json({
            header: {
                headCard: headerCards
            },

            whyChoose: {
                cardData: whyChooseCards
            },

            testimonials: testimonials
        });

    } catch (error) {

        console.error('Home API error:', error);

        res.status(500).json({
            message: 'Failed to load home data',
            error: error.message
        });
    }

});

module.exports = router;