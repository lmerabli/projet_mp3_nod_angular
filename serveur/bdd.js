var mysql = require("mysql");


var connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "projet_mp3_nod_angular"
});

connection.connect();


function initBdd()
{
  //Création table music
  console.log("Creation table Music !");
  var str = "CREATE TABLE IF NOT EXISTS `music` (";
  str += "`id_music` int(11) NOT NULL AUTO_INCREMENT,";
  str += "`sta_music` int(1) NOT NULL,";
  str += "`dat_add_music` datetime NOT NULL,";
  str += "`title_music` varchar(256),";
  str += "`artist_music` varchar(256),";
  str += "`album_music` varchar(256),";
  str += "`genre_music` varchar(256),";
  str += "`title_music` varchar(256),";
  str += "`annee` int(4),";
  str += "`url` varchar(256) NOT NULL,";
  str += "`comment` varchar(500) NOT NULL,";
  str += "PRIMARY KEY (`id_music`),";
  str += ") ENGINE=InnoDB DEFAULT CHARSET=UTF8;";
  connection.query(str);

  //Création table playlist
  console.log("Creation table Playlist !");
  var str = "CREATE TABLE IF NOT EXISTS `playlist` (";
  str += "`id_play` int(11) NOT NULL AUTO_INCREMENT,";
  str += "`sta_play` int(1) NOT NULL,";
  str += "`dat_add_play` datetime NOT NULL,";
  str += "`title_play` varchar(256),";
  str += "`genre_play` varchar(256),";
  str += "PRIMARY KEY (`id_play`),";
  str += ") ENGINE=InnoDB DEFAULT CHARSET=UTF8;";
  connection.query(str);

  //Création table liaison
  console.log("Creation table Liaison !");
  var str = "CREATE TABLE IF NOT EXISTS `liaison` (";
  str += "`id_play` int(11) NOT NULL ,";
  str += "`id_music` int(11) NOT NULL ,";
  str += "PRIMARY KEY (`id_play`,`id_music`),";
  str += ") ENGINE=InnoDB DEFAULT CHARSET=UTF8;";
  connection.query(str);

}



// retourne toute les lignes de music
function getAllMusic(callback)
{
    connection.query("SELECT * FROM `music`", function(error, rows){
        if (error)
        {
            console.log(error);
            callback({error:"Problème de connexion"});
            return;
        }

        callback(rows);
    });
}

// retourne toute les music en fonction du genre
function getGenreMusic(genre, callback)
{
    connection.query("SELECT * FROM `music` WHERE `genre_music` like '%"+ genre +"%'  ", function(error, rows){
        if (error)
        {
            console.log(error);
            return;
        }

        callback(rows);
    });
}

// retourne toute les music en fonction de l'artiste
function getArtistMusic(artist, callback)
{
    connection.query("SELECT * FROM `music` WHERE `artist_music` like '%"+ artist +"%'  ", function(error, rows){
        if (error)
        {
            console.log(error);
            return;
        }

        callback(rows);
    });
}

// retourne toute les music en fonction de l'album
function getAlbumMusic(album, callback)
{
    connection.query("SELECT * FROM `music` WHERE `album_music` like '%"+ album +"%'  ", function(error, rows){
        if (error)
        {
            console.log(error);
            return;
        }

        callback(rows);
    });
}

// retourne toute les music en fonction de l'année
function getYearMusic(year, callback)
{

    connection.query("SELECT * FROM `music` WHERE `year_music` = '"+ year +"'  ", function(error, rows){

        if (error)
        {
            console.log(error);
            return;
        }

        callback(rows);
    });
}

// retourne toute les music en fonction du titre
function searchMusic(titre, callback)

{
    connection.query("SELECT * FROM `music` WHERE `title_music` like '%"+ titre +"%'  ", function(error, rows){
        if (error)
        {
            console.log(error);
            return;
        }

        callback(rows);
    });
}

// retourne la music en fonction de son id
function getIdMusic(id, callback)
{
   connection.query("SELECT * FROM `music` where `id_music` = " + id, function(error, rows){
       if (!callback) return;

       if (error)
       {
           console.log(error);
           return;
       }

       callback( rows[0] );
   });
}

//function qui permet l'intersion d'un nouvel enregistrement de music
function insertMusic(sta, date, titre, artist, album, genre, year, url, comment, callback)
{

   connection.query("INSERT INTO `music` (`sta_music`, `dat_add_music`, `title_music`, `artist_music`, `album_music`, `genre_music`, `year_music`, `url`, `comment`) VALUES (" +sta+ ",'" +date+ "','" +titre+ "','" +artist+ "','" +album+ "','" +genre+ "'," +year+ ",'" +url+ "', '" +comment+ "')", function(error){


       if (!callback) return;

       if (error)
           callback(error);
       else
           callback();
   });
}

// fonction qui update un enregistrement music en fonction de son id
function updateMusic(id, sta, date, titre, artist, album, genre, year, url, comment, callback)
{

   connection.query("UPDATE medias SET `sta_music` = "+ sta +", `dat_add_music` = "+ date +", `title_music` = '"+ titre +"', `artist_music` = '"+ artist +"', `album_music` = '"+ album +"', `genre_music` = '"+genre+"', `year_music`= "+ year +", `url` = '"+ url +"', `comment` = '"+ comment +"' WHERE `id_music` = " + id , function(error){


       if (!callback) return;

       if (error)
           callback(error);
       else
           callback();
   });
}

// function qui supprime une music en fonction de son id
function removeMusic(id, callback)
{
   connection.query("DELETE FROM `music` WHERE `id_music` = " + id , function(error){
       if (!callback) return;

       if (error)
           callback(error);
       else
           callback();
   });
}

process.on("SIGINT", function(){
    console.log("Bye Bye");
    connection.end();
    process.exit();
});


module.exports = {
                    initBdd         : initBdd,
                    getAllMusic     : getAllMusic,
                    getGenreMusic   : getGenreMusic,
                    getArtistMusic  : getArtistMusic,
                    getAlbumMusic   : getAlbumMusic,
                    getYearMusic    : getYearMusic,
                    searchMusic     : searchMusic,
                    getIdMusic      : getIdMusic,
                    insertMusic     : insertMusic,
                    updateMusic     : updateMusic,
                    removeMusic     : removeMusic
                 };

//connection.end();
