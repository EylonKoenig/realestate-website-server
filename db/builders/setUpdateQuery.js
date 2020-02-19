const convertPassword = require("./crypto")

const setQueryData = function(table, fromData) {
    if (fromData.password) {
        fromData.password = convertPassword(fromData.password)
    }
    let query = `UPDATE \`realtor\`.\`${table}\` SET`;
    for (let data in fromData) {
        if (data === 'id' || data === 'images') continue;
        query += `\`${data}\` = '${fromData[data]}',`
    }

    query = query.slice(0, query.length - 1);
    query += ` WHERE (\`id\` = '${fromData.id}');`
    return query
}

module.exports = setQueryData;