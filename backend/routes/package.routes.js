const express = require('express');

const router = express.Router();

const { getPackages } = require('../controllers/package.controller');

router.post('/search', getPackages);

module.exports = router;