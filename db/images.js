const connection = require('./config');

async function addImages(apartmentId, images) {
    for (let imageUrl in images) {
        try {
            await connection.query(`INSERT INTO \`realtor\`.\`images\` (\`apartment_id\`, \`url\`) VALUES ('${apartmentId}', '${images[imageUrl]}')`)
        } catch (err) {
            console.log(err)
        }
    }
}

async function getImagesById(apartmentId) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT id, url FROM images WHERE apartment_id = '${apartmentId}'`, (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}
async function deleteImage(imageId) {
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM \`realtor\`.\`images\` WHERE (\`id\` = '${imageId}');`, (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}

module.exports = {
    addImages,
    getImagesById,
    deleteImage
};