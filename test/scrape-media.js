(function () {
  "use strict";

  var walk = require('walk'),
    fs = require('fs'),
    util = require('util'),
    path = require('path'),
    mediatags = require('../lib/mediatags'),
    count = 0;

  function extractPath(pathname) {
    var allTags = [];
    console.log(pathname);

    walker = walk(pathname);

    walker.on('file', function (pathname, fileStat, next) {
      var fullpath = path.join(pathname, fileStat.name);

      if (!mediatags.test(fullpath)) {
        return next();
      }

      mediatags.extract(fullpath, function (err, data, stdout, stderr) {
        if (err) {
          util.debug('Error: ' + fullpath);
          util.debug(err);
        }
        if (data) {
          data.fullpath = fullpath;
          allTags.push(data);
        }
        next();
      });
      count += 1;
    });

    walker.on('end', function () {
      // console.log(allTags);
      fs.writeFile('./all-media.json', JSON.stringify(allTags), function (err) {
        console.log(err);
        console.log("written");
      });
    });
  }

  extractPath(process.argv[2]);
}());
