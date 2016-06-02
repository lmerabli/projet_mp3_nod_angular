var mysql = require("mysql");

function mysqlConnection() {
    return mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "projet_mp3_nod_angular"
    });
    connection.connect();
    connection.query("SELECT *  ")
    connection.end();
}
