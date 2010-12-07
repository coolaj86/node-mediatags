(function () {
  require('remedial');

  var noop = function () {
      return { when: noop };
    },
    m4atags = require("./m4atags"),
    id3tags = require("./id3tags"),
    classes = {
      //'.m4a': m4atags,
      //'.m4p': m4atags,
      '.mp3': id3tags
    };

  // node.path.extname
  function extname(path) {
    var i = path.lastIndexOf('.');
    return (i < 1) ? '' : path.substr(i);
  }

  function mediatags(path, options, callback) {
    return (classes[extname(path).toLowerCase()] || noop)(path.quote(), options, callback);
  }

  module.exports = mediatags;
  // provide("mediatags")
}());
