var provide = provide || function () {};
(function () {
  "use strict";

  require('remedial');

  var path = require('path'),
    Futures = require('futures'),
    noop = function (pathname, options, callback) {
      var p = Futures.future();

      if (!callback) {
        if ('function' === typeof options) {
          callback = options;
          options = undefined;
        }
      }

      if (callback) { p.when(callback); }
      p.fulfill(new Error('unsupported type'));
      return p;
    },
    extractors = [
      require("./m4atags"),
      require("./id3tags")
    ],
    extmap = [],
    typemap = [];

  // TODO allow multiple extractors
  extractors.forEach(function (extractor) {
    // by extension
    extractor.extensions.forEach(function (extension) {
      extmap[extension] = extractor.extract;
    });
    // by ContentType
    extractor.types.forEach(function (type) {
      extmap[type] = extractor.extract;
    });
  });

  function mediatags(pathname, options, callback) {
    // TODO do types as well
    var extract = (extmap[path.extname(pathname).substr(1).toLowerCase()]||noop);
    return extract(pathname.quote(), options, callback);
  }

  module.exports = {
    extract: mediatags,
    extensions: Object.keys(extmap),
    types: Object.keys(typemap),
    test: function (pathname) {
      if (extmap[path.extname(pathname).substr(1).toLowerCase()]) {
        return true;
      }
      return false;
    }
  };

  provide("mediatags", module.exports)
}());
