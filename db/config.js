var mysql = require('mysql');

var connection = mysql.createPool({
    host: 'us-cdbr-iron-east-04.cleardb.net',
    user: 'bb4cb04fb4c86c',
    password: '067fdf8f',
    database: 'heroku_bdf622a7bc16265',
    port: '3306'
});



module.exports = connection;