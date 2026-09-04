const express = require('express');

const router = express.Router();

console.log('transport router')

const transportController = require('../controllers/transport.controller')

router.post(
    '/search',
    transportController.getTransportPackages
);

module.exports = router;