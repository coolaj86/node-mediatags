(function () {
  var Futures = require('futures'),
    exec  = require('child_process').exec,
    child;

  module.exports = function (path, options, callback) {
    options = options || {};
    var p = Futures.promise();
    if (callback) { p.when(callback); }
    child = exec("id3tags " + path + " --literal", function (error, stdout, stderr) {
      var json;
      try {
        json = JSON.parse(stdout);
      } catch(e) {
        error = error || e;
        //console.log(stdout);
      }
      error = error || stderr; 
      p.fulfill(error, json, stdout, stderr);
    });
    return p.passable();
  };
  if ('undefined' === typeof provide) { provide = function () {}; }
  provide('mediatags/id3tags');
}());
