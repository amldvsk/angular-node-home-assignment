const _ = require('lodash');
const path = require('path');
const fs = require('fs');


var User = function() {

}




User.prototype.genrateToken = function(cb) {
  var pathToDbs = path.join(__dirname, '../db/');
  var files = readDir(pathToDbs)
    .then(data => {
      var token;
      do {
        token = Math.random().toString(36).substring(7);
      } while(_.find(data, `${token}.json`));

      var data = { idCounter : 1, tasks:[] }
      writeFile(`${pathToDbs}${token}.json`, data)
      .then(result => {
          cb(null, token);
      })
      .catch(err => {
          cb(err, null);
      })
    })
    .catch(err => {
      cb(err, null);
    })
}


function readDir(path) {
  return new Promise(function(resolve, reject) {
    fs.readdir(path, (err, data) => {
      if( err ) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}


function writeFile(path, data) {
  return new Promise(function(resolve, reject) {
    fs.writeFile(path, JSON.stringify(data), (err) => {
      if( err ) {
        reject(err);
      } else {
        resolve(null);
      }
    });
  });
}

module.exports = User;
