const express = require('express');

const router = express.Router();

console.log('guide routes');

const guideController = require('../controllers/guide.controller');

router.post(
    '/search',
    guideController.getGuides
);

module.exports = router;