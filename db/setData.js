const convertData = function(data) {
    let result = [];
    for (let prop in data) {
        result.push(Object.values(data[prop])[0])
    }
    return result;
}

module.exports = convertData;