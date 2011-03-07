(function () {
  var mediatags = require("../lib/mediatags");
  mediatags.extract("./test.m4a").when(function (err, meta) {
    console.log(err);
    console.log(meta);
  });
}());
