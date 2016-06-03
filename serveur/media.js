var express = require('express');
var bdd = requite("./bdd")
var router = express.Router();

router.get("/",function (req,res){
       db.getAllMusic(function(data){
                console.log(json( data ));
		res.json( data );

    });
});

module.export = {};