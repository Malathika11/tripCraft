const express = require('express');

const router = express.Router();

console.log('✅ hotel routes loaded');

const hotelController =
    require('../controllers/hotel.controller');


router.post(
    '/search',
    hotelController.getHotels
);


module.exports = router;