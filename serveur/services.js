var fs = require('fs');
var id3 = require('id3js');
var path = require('path');
var s = require('underscore.string');
var connection = require('./bdd');


function createFolder(folder, c)
{
  console.log('createFolder('+folder+')');
  try {
      fs.accessSync(folder);
  } catch (e) {
      //fs.mkdirSy(folder, 777);
      fs.mkdir(folder, 0777, c);
  }
}

function generateUploadsFolder()
{
  console.log('generateUploadsFolder()');
  var folders = [
      "public/uploads",
      "public/uploads/incoming_songs",
      "public/uploads/inconnu",
      "public/uploads/garbage",
      "public/uploads/albums"
  ];

  for(var i = 0; i< folders.length; i++) {
      var folder = folders[i];
      this.createFolder(folder);
  }
}

var files = [];
var importing = false;
function importSongs(file)
{
  files.push(file);
  setTimeout(_import, 1000);
}

function _import()
{
  if (importing || files.length == 0) return;

  importing = true;

  var file = files.pop();

  console.log("Fichier ajouté : " + file);
  id3({ file: file, type: id3.OPEN_LOCAL }, function(err, tags) {

    if (!tags)
    {
      files.push(file);
    }
    else
    {

        var parseFile = path.parse(file),
            date = new Date(),
            ext = parseFile.ext,
            garbageFolder = 'public/uploads/garbage/',
            unknownFolder = "public/uploads/inconnu/";

            console.log('parseFile ->',parseFile);



        if (ext !== ".mp3") {
            fs.renameSync(file, garbageFolder + parseFile.base);
            console.log('Le ficher' + parseFile.base + ' a été déplacé dans ' + garbageFolder);

        } else if (tags.album === null || tags === undefined) {
            //services.createFolder(unknownFolder);

            fs.renameSync(file, unknownFolder + parseFile.base);

            connection.insertMusic(1, getDateTime(), parseFile.name, parseFile.artist, parseFile.album, parseFile.genre, date.getFullYear(), unknownFolder + parseFile.base, parseFile.duration, "");
            //connection.query("INSERT INTO songs(title, year, path) VALUES ('" + parseFile.name + "','" + date.getFullYear() + "','" + unknownFolder + parseFile.base + "')");

            console.log('Le ficher' + parseFile.base + ' a été déplacé dans ' + unknownFolder);

        } else if(ext === '.mp3' && tags.album != null) {
            var albumFolder = "public/uploads/albums/" + s.slugify(tags.album) + '/';
            services.createFolder(albumFolder, function(){

              fs.renameSync(file, albumFolder + parseFile.base);
  
            });

            //console.log('******-------' + tags.album + ' ----------********');
            connection.insertMusic(1, getDateTime(), parseFile.name, parseFile.artist, parseFile.album, parseFile.genre, date.getFullYear(), unknownFolder + parseFile.base, parseFile.duration ,"");

            //connection.query("INSERT INTO songs(title, artist, album, year, path) VALUES ('" + tags.title + "','" + tags.artist + "','" + tags.album + "','" + date.getFullYear() + "','" + albumFolder + parseFile.base + "')");

            console.log('Le ficher' + parseFile.base + ' a été déplacé dans ' + albumFolder);

        }

      }

      setTimeout(_import, 1000);
      importing = false;

  });
}

function updateSong(file, reqBodyAlbum)
{
  var infoFile = path.parse(file.path),
      newAlbum = 'public/uploads/albums/' + reqBodyAlbum + '/',
      newPath = newAlbum + infoFile.base;

  services.createFolder(newAlbum);
  fs.renameSync(file.path, newPath);

  if (fs.readdirSync(infoFile.dir).length === 0) {
      fs.rmdirSync(infoFile.dir);
  }

  return newPath;
}

function deleteSongs(file)
{
  var infoFile = path.parse(file);
  console.log(infoFile);
  fs.unlinkSync(file);

  if (fs.readdirSync(infoFile.dir).length === 0) {
      fs.rmdirSync(infoFile.dir);
  }

  console.log("Fichier supprimé : " + file);
}

function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

}

var services = {
    createFolder : createFolder,
    generateUploadsFolder : generateUploadsFolder,
    importSongs : importSongs,
    updateSong: updateSong,
    deleteSongs : deleteSongs
};

module.exports = services;
