var fs = require('fs');
var id3 = require('id3js');
var path = require('path');
var s = require('underscore.string');
var connection = require('bdd');


function createFolder(folder)
{
  try {
      fs.accessSync(folder);
  } catch (e) {
      fs.mkdirSync(folder, 777);
  }
}

function generateUploadsFolder()
{
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

function importSongs(file)
{
  console.log("Fichier ajouté : " + file);
  id3({ file: file, type: id3.OPEN_LOCAL }, function(err, tags) {

      var parseFile = path.parse(file),
          date = new Date(),
          ext = parseFile.ext,
          garbageFolder = 'public/uploads/garbage/',
          unknownFolder = "public/uploads/inconnu/";

      if (ext !== ".mp3") {
          fs.renameSync(file, garbageFolder + parseFile.base);
          console.log('Le ficher' + parseFile.base + ' a été déplacé dans ' + garbageFolder);
          return;
      } else if (tags.album === null || tags === undefined) {
          services.createFolder(unknownFolder);

          fs.renameSync(file, unknownFolder + parseFile.base);

          connection.insertMusic(1, date.now(), parseFile.name, parseFile.artist, parseFile.album, parseFile.genre, date.getFullYear(), unknownFolder + parseFile.base, "", callback);
          //connection.query("INSERT INTO songs(title, year, path) VALUES ('" + parseFile.name + "','" + date.getFullYear() + "','" + unknownFolder + parseFile.base + "')");

          console.log('Le ficher' + parseFile.base + ' a été déplacé dans ' + unknownFolder);
          return;
      } else if(ext === '.mp3' && tags.album != null) {
          var albumFolder = "public/uploads/albums/" + s.slugify(tags.album) + '/';
          services.createFolder(albumFolder);
          fs.renameSync(file, albumFolder + parseFile.base);

          //console.log('******-------' + tags.album + ' ----------********');
          connection.insertMusic(1, date.now(), parseFile.name, parseFile.artist, parseFile.album, parseFile.genre, date.getFullYear(), unknownFolder + parseFile.base, "", callback);

          //connection.query("INSERT INTO songs(title, artist, album, year, path) VALUES ('" + tags.title + "','" + tags.artist + "','" + tags.album + "','" + date.getFullYear() + "','" + albumFolder + parseFile.base + "')");

          console.log('Le ficher' + parseFile.base + ' a été déplacé dans ' + albumFolder);
          return;
      }

  });
}

function updateSong(file, reqBody)
{
  var infoFile = path.parse(file.path),
      newAlbum = 'public/uploads/albums/' + reqBody.album + '/',
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


var services = {
    createFolder : createFolder,
    generateUploadsFolder : generateUploadsFolder,
    importSongs : importSongs,
    updateSong: updateSong,
    deleteSongs : deleteSongs
};

module.exports = services;
