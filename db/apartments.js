const connection = require('./config');
const Builder = require('./builders/apartmentsBuilder');
const convertData = require('./setData')
const setInsertQuery = require('./builders/setInserQuery')
const setUpDateQuery = require('./builders/setUpdateQuery')

function getAllapartments({ property_type, sale_status, city, country, minPrice, maxPrice, minRooms, maxRooms, minBath, maxBath, page = 1, size = 100 }) {
    return new Promise((resolve, reject) => {
        try {
            const { query, params } = Builder.allApartments(page, size)
                .country(country)
                .city(city)
                .minPrice(minPrice)
                .maxPrice(maxPrice)
                .minRooms(minRooms)
                .maxRooms(maxRooms)
                .minBath(minBath)
                .maxBath(maxBath)
                .property_type(property_type)
                .sale_status(sale_status)
                .availability('available')
                .status('approved')
                .build();
            connection.query(query, params, (error, results, fields) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        } catch (error) {
            console.log(error);
        }
    });
}

function getAllAdminApartments({ property_type, city, country, minPrice, maxPrice, minRooms, maxRooms, minBath, maxBath, status, page = 1, size = 100 }) {
    return new Promise((resolve, reject) => {
        try {
            const { query, params } = Builder.allApartments(page, size)
                .country(country)
                .city(city)
                .minPrice(minPrice)
                .maxPrice(maxPrice)
                .minRooms(minRooms)
                .maxRooms(maxRooms)
                .minBath(minBath)
                .maxBath(maxBath)
                .property_type(property_type)
                .status(status)
                .build();
            connection.query(query, params, (error, results, fields) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        } catch (error) {
            console.log(error);
        }
    });
}


function getbyId(apartmentId) {
    return new Promise((resolve, reject) => {
        connection.query(`Call getApartmentsByID(?)`, [apartmentId], (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results[0]);
        });
    });
}

function getLastFourApartment() {
    return new Promise((resolve, reject) => {
        connection.query(`call getApartmentsByCreateTime()`, (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results[0]);
        });
    });
}

function getCountriesApartment() {
    return new Promise((resolve, reject) => {
        connection.query(`CALL getCountriesApratments()`, (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(convertData(results[0]));
        });
    });
}

function getCitiesApartment(country) {
    return new Promise((resolve, reject) => {
        connection.query(`CALL getAvailableCityByCountry("${country}")`, (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(convertData(results[0]));
        });
    });
}


function postApartment(formData) {
    const query = setInsertQuery("apartments", formData);
    return new Promise((resolve, reject) => {
        connection.query(query, (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results.insertId)
        });
    });
}

function editApartment(formData) {
    const query = setUpDateQuery("apartments", formData);
    return new Promise((resolve, reject) => {
        connection.query(query, (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results.insertId)
        });
    });
}

function getAratmentbyUserId(apartmentId) {
    return new Promise((resolve, reject) => {
        connection.query(`CALL getApartmentsByUserID(?)`, [apartmentId], (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results[0]);
        });
    });
}

function deleteApartmentById(apartmentId) {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE \`realtor\`.\`apartments\` SET \`availability\` = 'removed' WHERE (\`id\` = '${apartmentId}')`, (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}

function editStatus(status, apartmentId) {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE \`realtor\`.\`apartments\` SET \`status\` = '${status}' WHERE (\`id\` = '${apartmentId}')`, (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}

module.exports = {
    getAllapartments,
    getbyId,
    getLastFourApartment,
    getCountriesApartment,
    getCitiesApartment,
    getAratmentbyUserId,
    postApartment,
    deleteApartmentById,
    editApartment,
    getAllAdminApartments,
    editStatus
};