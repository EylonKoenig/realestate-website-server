const setQueryData = function(table, fromData) {
    let query = `INSERT INTO \`realtor\`.\`${table}\` (`;
    for (let data in fromData) {
        query += `\`${data}\`,`
    }
    query = query.slice(0, query.length - 2);
    query += "`) VALUES ("
    for (let data in fromData) {
        query += `'${fromData[data]}',`
    }
    query = query.slice(0, query.length - 2);
    query += "');"
    return query
}

module.exports = setQueryData;