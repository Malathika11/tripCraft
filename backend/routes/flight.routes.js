const express = require('express');
const router = express.Router();

const flight = require('../data/flight');

router.get('/', (req, res) => {
  res.json(flight);
});

module.exports = router;