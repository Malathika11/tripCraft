const express = require('express');
const router = express.Router();

const homeData = require('../data/home');

router.get('/', (req, res) => {
  res.json(homeData);
});

module.exports = router;