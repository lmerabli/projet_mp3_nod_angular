var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
require('./serveur/bdd');

var app = express();

app.use(express.static(__dirname + '/public' ));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("medias",media);



//connection bdd
connection.connect();














app.listen(8000);
