const crypto = require('crypto');
const connection = require('./config');
const convertData = require('./setData');
const setQuery = require('./builders/setInserQuery')

function getUser() {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT users.email FROM users `, (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(convertData(results));
        });
    });
}

async function addUser(data) {
    const token = crypto.pbkdf2Sync(data.password, 'realtor', 10000, 64, 'sha512');
    const userPasswordHashed = token.toString('base64');
    const obj = data;
    obj.password = userPasswordHashed;
    const query = setQuery("users", obj);
    return new Promise((resolve, reject) => {
        connection.query(query, (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve([results.insertId, userPasswordHashed])
        });
    });
}






module.exports = {
    getUser,
    addUser
};