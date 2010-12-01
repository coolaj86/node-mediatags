(function () {
  var walk = require('walk'),
    mediatags = require('../lib/mediatags');

  walk("/mnt/data").whenever(function (err, path, nodes, sorted) {
    //console.log(path);
    sorted.files.forEach(function (file) {
      //console.log(file);
      mediatags(path + '/' + file.name).when(function (err, data) {
        if (err) {
          console.log('error parsing output for ' + [path,file.name].join('/'));
          //console.log(err);
          return;
        }
        console.log(data);
      });
    });
  });
}());
