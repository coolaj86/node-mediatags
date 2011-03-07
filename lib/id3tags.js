var provide = provide || function () {};
(function () {
  var Futures = require('futures'),
    exec  = require('child_process').exec;

 function id3tags(path, options, callback) {
    var p = Futures.future(),
      child;

    if (!callback) {
      if ('function' === typeof options) {
        callback = options;
        options = undefined;
      }
    }

    options = options || {};

    if (callback) { p.when(callback); }

    child = exec("id3tags " + path + " --literal", function (error, stdout, stderr) {
      var json;

      try {
        json = JSON.parse(stdout);
      } catch(e) {
        error = error || e;
        //console.log(stdout);
      }

      error = stderr || error; 
      p.fulfill(error, json, stdout, stderr);
    });
    return p.passable();
  }

  module.exports = {
    extract: id3tags,
    extensions: ['mp3'],
    types: ['audio/mpeg']
  };

  provide('mediatags/id3tags', module.exports);
}());
