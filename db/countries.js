const connection = require('./config');
const convertData = require('./setData')


function getAllCountries() {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT name FROM countries`, (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(convertData(results));
        });
    });
}

module.exports = {
    getAllCountries,
};