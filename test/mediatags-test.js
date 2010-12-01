(function () {
  var mediatags = require("../lib/mediatags");
  mediatags("./test.m4a").when(function (err, meta) {
    console.log(meta);
  });
}());
