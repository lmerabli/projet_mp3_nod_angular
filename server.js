var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();
var db = require("./serveur/bdd");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname + '/public' )));
/////////// dispatch 
//app.use("/medias", public);
//var watcher = chokidar.watch('public/uploads/incoming_songs', {ignored: /[\/\\]\./});
//watcher.on('add', services.importSongs);

//db.initBdd();

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
    db.updateMusic(req.params.id, req.body.album, req.body.artist, function(data){

		res.json(data);

    } );
});

// supprime l'élement correspondant à l'id
app.delete("/songs/:id", function(req, res){
   	db.removeMusic(req.params.id, function(data){
   		res.json(data);
   	}) ;
});



app.listen(8000);
