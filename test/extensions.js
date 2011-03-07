(function () {
  "use strict";

  var mediatags = require('../lib/mediatags'),
    tests = [
      ["song.mp3", true],
      ["song.m4a", true],
      // ["song.ogg", true],
      // ["image.jpeg", true],
      // ["image.jpg", true],
    ];

  tests.forEach(function (args) {
    var fullpath = args[0],
      maybe = args[1];

    if (!(maybe === mediatags.test(fullpath))) {
      throw new Error('Supported format not supported');
    }
  });
  console.log('Pass');
}());
