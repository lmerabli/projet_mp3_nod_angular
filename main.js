var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var connection = require('./conf/bdd');

var app = express();

app.use(express.static(__dirname + '/public' ));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("medias",media);



//connection bdd
connection.connect();

//Création table music
console.log("Connecté à la base !");
var str = "CREATE TABLE IF NOT EXISTS `music` (";
str += "`id_music` int(11) NOT NULL AUTO_INCREMENT,";
str += "`sta_music` int(1) NOT NULL,";
str += "`dat_add_music` datetime NOT NULL,";
str += "`title_music` varchar(256),";
str += "`artist_music` varchar(256),";
str += "`album_music` varchar(256),";
str += "`genre_music` varchar(256),";
str += "`title_music` varchar(256),";
str += "`year` int(4),";
str += "`url` varchar(256) NOT NULL,";
str += "`comment` varchar(500) NOT NULL,";
str += "PRIMARY KEY (`id_music`),";
str += ") ENGINE=InnoDB DEFAULT CHARSET=UTF8;";
connection.query(str);


//Création table playlist
console.log("Connecté à la base !");
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
console.log("Connecté à la base !");
var str = "CREATE TABLE IF NOT EXISTS `liaison` (";
str += "`id_play` int(11) NOT NULL ,";
str += "`id_music` int(11) NOT NULL ,";
str += "PRIMARY KEY (`id_play`,`id_music`),";
str += ") ENGINE=InnoDB DEFAULT CHARSET=UTF8;";
connection.query(str);














app.listen(8000);
