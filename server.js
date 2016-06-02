var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var media = require('./media');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//app.use( express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname + '/public' )));
/////////// dispatch 
app.use("/medias", media);




app.listen(8000);