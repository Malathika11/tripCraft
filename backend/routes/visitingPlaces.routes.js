const express = require('express');
const router = express.Router();

const visitingPlacesController = require('../controllers/visitingPlaces.controller');

router.post(
    '/search',
    visitingPlacesController.getVisitingPlaces
);

module.exports = router;