const crypto = require('crypto');

function convertPassword(password) {
    const token = crypto.pbkdf2Sync(password, 'realtor', 10000, 64, 'sha512');
    const convertedPassword = token.toString('base64');
    return convertedPassword
}

module.exports = convertPassword;