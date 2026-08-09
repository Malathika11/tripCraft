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
        logoImg: '../../../assets/images/logo.png',
        logoText1: 'Trip',
        logoText2: 'Craft',
        bodyTextOne: 'Explore. Plan. Experience',
        bodyTextTwo: 'Craft your journey, create memories',
        bodyTextThree: 'Your dream trip is just a few clicks away.',
        headCard: headerCards
      },

      whyChoose: {
        chooseHeader: 'why choose tripcraft?',
        choosePara: 'your journey, our priority',
        cardData: whyChooseCards
      },

      testimonials: testimonials,
      footer: {
        footerFirst: {
          img: '../../../assets/images/logo.png',
          txt: 'TripCraft',
          para: 'Crafting unforgettable journeys with seamless planning and trusted support.',
          icons: ['cls-9-facebook', 'cls-8-instagram', 'cls-10-twitter', 'cls-7-youtube']
        },
        footerSec: [
          {
            name: 'Company',
            ulValue: ['About Us', 'How It Works', 'Careers', 'Blog', 'Contact Us']
          },
          {
            name: 'Support',
            ulValue: ['Help Center', 'FAQs', 'Terms & Conditions', 'Privacy Policy', 'Refund Policy']
          }
        ],
        footerThree: {
          name: 'Contact Us',
          contactItem: [
            {
              class: 'cls-13-call',
              text: '+91 98765 43210'
            },
            {
              class: 'cls-12-mail',
              text: 'support@tripcraft.com'
            },
            {
              class: 'cls-11-hugeicons_location',
              text: '123, Travel Street, New Delhi, India'
            }
          ]
        }
      }
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