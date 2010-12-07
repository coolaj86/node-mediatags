(function () {
  var walk = require('walk'),
    util = require('util'),
    mediatags = require('../lib/mediatags'),
    count = 0;

  walk("/mnt/data").whenever(function (err, path, nodes, sorted) {
    //console.log(path);
    if (err) {
      util.debug(err);
    }
    if (!sorted) {
      return;
    }
    (sorted.files||[]).forEach(function (file) {
      //console.log(file);
      mediatags(path + '/' + file.name).when(function (err, data, stdout, stderr) {
        count += 1;
        if (err) {
          util.debug('error parsing output for ' + [path,file.name].join('/'));
          util.debug(err);
          util.debug(stdout);
          return;
        }
        console.log('['+count+'] ' + path + '/' + file.name);
        //console.log(data);
      });
    });
  });
}());
