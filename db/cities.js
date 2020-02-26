const connection = require('./config');
const convertData = require('./setData')


function getAllCities() {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM cities`, (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results[0]);
            connection.end();
        });
    });
}

function getCitiesByName(cities) {
    return new Promise((resolve, reject) => {
        connection.query(`CALL getCitiesByName(${cities})`, (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results[0]);
            connection.end();
        });
    });
}

function getAllCitiesByApartment(country) {
    return new Promise((resolve, reject) => {
        connection.query(`call getAllCityByCountry("${country}")`, (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results[0]);
            connection.end();
        });
    });
}

module.exports = {
    getAllCities,
    getCitiesByName,
    getAllCitiesByApartment
};