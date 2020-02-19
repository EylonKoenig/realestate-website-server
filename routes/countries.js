var express = require('express');
var router = express.Router();
var { getAllCountries } = require('../db/countries')

router.get('/', function(req, res, next) {
    getAllCountries()
        .then(countries => res.status(200).json({ countries }))
        .catch(error => res.status(500).json({ error: error.message }));
});


module.exports = router;