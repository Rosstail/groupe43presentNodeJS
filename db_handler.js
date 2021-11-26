const mysql = require('mysql');
const config = require("./config")

const connexion = mysql.createConnection({
    host: config.db_host,
    user: config.db_user,
    password: config.db_password,
    database: config.db_database
});

connexion.connect(function(err) {
    if (err) {
        throw err
    }
    console.log("Connexion successful to database at " + config.db_host)
});
/*
async function request(sqlreq) {
    connexion.query(sqlreq, function (err, result) {
        if (err) {
            throw err;
        }
        Object.keys(result).forEach(function(key) {
            console.log("KEY = " + Object.keys(result))
            var row = result[key];
            console.log("iteration " + row.name)
          });
        return result;
    })
}
*/

module.exports.connexion = connexion;
//module.exports.request = request;