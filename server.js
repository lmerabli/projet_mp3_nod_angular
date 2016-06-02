var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();
var db = require("./serveur/bdd");
var services = require('./server/services');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname + '/public' )));
/////////// dispatch
//app.use("/medias", public);
//var watcher = chokidar.watch('public/uploads/incoming_songs', {ignored: /[\/\\]\./});
//watcher.on('add', services.importSongs);

db.initBdd();
services.generateUploadsFolder();

app.get('/', function (req, res) {
    res.sendfile('public/index.html');
});


// retourne l'élement de la table avec l'id fourni
app.get("/:id", function(req, res){

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
app.put("/:id", function(req, res){
    db.updateMusic(req.params.id, req.body.album, req.body.artist, function(data){

		res.json(data);

    } );
});

// supprime l'élement correspondant à l'id
app.delete("/:id", function(req, res){
   	db.removeMusic(req.params.id, function(data){
   		res.json(data);
   	}) ;
});



app.listen(8000);
