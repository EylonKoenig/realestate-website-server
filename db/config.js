var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'us-cdbr-iron-east-04.cleardb.net',
    user: 'bb4cb04fb4c86c',
    password: '067fdf8f',
    database: 'heroku_bdf622a7bc16265',
    port: '3306'
});
connection.connect();


module.exports = connection;