var mysql = require("mysql");

function mysqlConnection() {
    return mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "projet_mp3_nod_angular"
    });
    connection.connect();
    function getAll(callback)
{
    connection.query("SELECT * FROM medias", function(error, rows){
        if (error)
        {
            console.log(error);
            return;
        }
        
        callback(rows);
        
    });
}

process.on("SIGINT", function(){
    console.log("Bye Bye");
    connection.end();
    process.exit();
});


module.exports = {  
                    getAll : getAll, 
                    insert : insert
                 };

    connection.end();
}
