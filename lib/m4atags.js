var provide = provide || function () {};
(function () {
  var Futures = require('futures'),
    exec  = require('child_process').exec;

 function m4atags(path, options, callback) {
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

    child = exec("m4atags " + path + " --literal", function (error, stdout, stderr) {
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
    extract: m4atags,
    extensions: ['m4a', 'm4b', 'm4p', '3gp', '3g2'],
    types: ['audio/mp4a-latm', 'audio/mp4', 'audio/3gpp']
  };

  provide('mediatags/m4atags', module.exports);
}());
