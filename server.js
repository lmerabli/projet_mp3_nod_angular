var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();
var chokidar = require('chokidar');
var db = require("./serveur/bdd");
var services = require('./serveur/services');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname + '/public' )));
/////////// dispatch
//app.use("/medias", public);
//var watcher = chokidar.watch('public/uploads/incoming_songs', {ignored: /[\/\\]\./});
//watcher.on('add', services.importSongs);


db.initBdd();

services.generateUploadsFolder();

var watcher = chokidar.watch('public/uploads/incoming_songs', {ignored: /[\/\\]\./});
watcher.on('add', services.importSongs);



app.get('/', function (req, res) {
    res.sendfile('public/index.html');
});

app.get("/songs", function(req, res){
     console.log("valeur de retour");
    db.getAllMusic(function(data,erreur){

        console.log( data );
        res.json( data );

    });
});

// retourne l'élement de la table avec l'id fourni

app.get("/songs/:id", function(req, res){
    	console.log("je passe un element");

		var id = req.params.id;

    	db.getIdMusic(id, function(data){

		res.json( data );

    });

});

// ajout un nouvel élément
app.post("/", function(req, res){

    db.insertMusic(req.body.album, req.body.artist, function(data){

		res.json(data);

    } );


});

// modifie l'élement correspondant à l'id
app.put("/songs/:id", function(req, res){
    console.log("je rentre nodejs");

    var id = req.params.id;

    db.getIdMusic(id, function(data){
        console.log("node");
        console.log(data["url"]);
        var error = 0;
        if(!error) {
            var file = data["url"];
            var newPath = services.updateSong(file, data["album_music"]);

              db.updateMusic(req.params.id,data["sta_music"], data["title_music"], data["artist_music"],data["album_music"], data["genre_music"],data["annee"], data["url"], data["duration"],data["comment"], function(){
                if (!error) {
                    res.json({success: true});
                }
            });
        }
    });

});
    


// supprime l'élement correspondant à l'id
app.delete("/songs/:id", function(req, res){
   	db.removeMusic(req.params.id, function(data){
   		res.json(data);
   	}) ;
});



app.listen(8000);
