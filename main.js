var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');


var app = express();

app.use(express.static(__dirname + '/public' ));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("medias",media);
app.listen(8000);

