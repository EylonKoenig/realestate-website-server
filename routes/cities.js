var express = require('express');
var router = express.Router();
var { getAllCities, getCitiesByName, getAllCitiesByApartment } = require('../db/cities')

router.get('/', function(req, res, next) {
    getAllCities()
        .then(apartments => res.status(200).json({ apartments }))
        .catch(error => res.status(500).json({ error: error.message }));
});

router.get('/:cities', function(req, res, next) {
    getCitiesByName(req.params.cities)
        .then(customer => res.status(200).json(customer))
        .catch(error => res.status(500).json({ error: error.message }));
});

router.get('/:country/all', function(req, res, next) {
    getAllCitiesByApartment(req.params.country)
        .then(country => res.status(200).json(country))
        .catch(error => res.status(500).json({ error: error.message }));
});





module.exports = router;