"use strict";

const fs       = require('fs');
const path     = require('path');

const expect   = require('expect.js');
const phar     = require('../');

const detach       = require('nyks/function/detach');
const rmrf         = require('nyks/fs/deleteFolderRecursive');
const md5FileSync  = require('nyks/fs/md5FileSync');
const filesizeSync = require('nyks/fs/filesizeSync');

const outDir = "test/out";

describe("Testing fixtures", function(){
  it("Should extract a dummy phar (data0.phar)", function(done){

      //test with little read buffer
    const archive = path.join(__dirname, "fixtures/data0.phar");
    const manifest = require( path.join(__dirname, "fixtures/data0.phar.json") );

    phar.extract(archive , "test/out")
    .then((files) => {
      var extractedFiles = {}
      for (var file in files) {
        var filePath = path.join(outDir, file);
        extractedFiles[file] = {
          "content-length" : filesizeSync(filePath),
          "content-md5"    : md5FileSync(filePath)
        }
      }
      expect(files).to.eql(manifest);
      expect(extractedFiles).to.eql(manifest);
      done();
    })
    .catch(detach(expect().fail.bind(expect() )))
    .then(rmrf.bind(null, outDir))
  });
})

