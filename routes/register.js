var express = require('express');
var router = express.Router();
var { getUser, addUser } = require('../db/register')

router.get('/', function(req, res, next) {
    getUser()
        .then(user => res.status(200).json(user))
        .catch(error => res.status(500).json({ error: error.message }));
});

router.post('/', async function(req, res, next) {
    const data = req.body;
    const userDetails = await addUser(data)
    if (userDetails) {
        const UserDetails = { id: userDetails[0], user: data.email, password: userDetails[1], first_name: data.first_name, role_id: data.role_id }
        res.cookie("auth", JSON.stringify(UserDetails), { maxAge: 1000 * 60 * 60 * 24, domain: ".herokuapp.com" })
        res.status(200).send({ userDetails })
    } else { res.status(401).json({ error: "errror" }) }

});

module.exports = router;