node-mediatags
====

A simple wrapper for the `mediatags` library.

Note: [`mediatags`](https://github.com/smaniam/mtags) must be installed.

    npm install mediatags

Usage
----

    var walk = require('walk'),
      mediatags = require('mediatags'),
      options = {
        normalize_tags: false,
      };

    walk("/mnt/data", options).whenever(function (err, path, nodes, sorted) {
      sorted.files.forEach(function (file) {
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

output
----

    {
        "©nam": "Keep It Up",
        "©ART": "Soul Asylum",
        "©wrt": "David Pirner",
        "©alb": "Grave Dancers Union",
        "©gen": "Alternative & Punk",
        "trkn": "4 of 12",
        "disk": "1 of 1",
        "©day": "1992",
        "cpil": "false",
        "pgap": "0",
        "tmpo": "0",
        "©too": "iTunes 8.2, QuickTime 7.6.2",
        "----[iTunSMPB]": "00000000 00000840 0000004C 0000000000997374 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000",
        "----[EncodingParams]": "hex 0x76657273 00000001 61636266 00000002 62726174 0003E800 73726371 0000007F\n \t\t\t63646376 00010606 ",
        "----[iTunNORM]": "00001447 00001374 00007114 00006D11 0001B448 0002CD67 00007E73 00007C41 000231F9 0001C24C",
        "----[iTunes_CDDB_IDs]": "12+9BADEE1DA6A9C6FD5ED39AF682A7ABAC+807169",
        "----[UFIDhttp://www.cddb.com/id3/taginfo1.html]": "3CD3N91R12764471V6898187C27D9AF234B333E5CC820F4167BP1"
    }

options
---

  * normalize
  * verbose
