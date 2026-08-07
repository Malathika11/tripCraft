const express = require('express');

const router = express.Router();

const packages = require('../data/packages');

router.post('/', (req, res) => {

    console.log(req.body);

    const {

        sector,
        travelers,
        duration,
        totalBudget

    } = req.body;

    let result = packages.filter(item => {

        return (

            item.from === sector.fromCity &&

            item.days <= duration &&

            item.price <= totalBudget

        );

    });

    res.json(result);

});

module.exports = router;