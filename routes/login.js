var express = require('express');
var router = express.Router();
var { getUser } = require('../db/login')



router.post('/', function(req, res, next) {
    getUser(req.body)
        .then(user => {
            if (user) {
                const UserDetails = { id: user.id, user: user.email, password: user.password, first_name: user.first_name, role_id: user.role_id }
                console.log(document.cookie)
                res.cookie("auth", JSON.stringify(UserDetails), { maxAge: 1000 * 60 * 60 * 24, domain: ".herokuapp.com", sameSite: "none", secure })
                res.status(200).send({ user })
            } else { res.status(401).json({ error: "worng user or password" }) }
        })
        .catch(error => res.status(401).json({ error: error.message }));
});

module.exports = router;