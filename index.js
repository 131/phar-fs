"use strict";

const fs     = require('fs');
const crypto = require('crypto');
const path   = require('path');

const PharStream  = require('phar-stream').extract;

const filesize   = require('nyks/fs/filesizeSync');
const mkdirpSync = require('nyks/fs/mkdirpSync');
const debug      = require('debug')('phar');
const defer      = require('nyks/promise/defer');

class extractor {


  static extract(file_path, target_dir) /**
  * @param string [target_dir=./out]
  */ {
    var args  = [].slice.apply(arguments);

    file_path  = args.shift();
    target_dir = args.pop() || './out';

    debug("Extract phar %s in %s", file_path, target_dir);


    var extract = new PharStream();
    var index = {};

    var defered = defer();
    extract.on('entry', (header, stream, next) => {
      var hash    = crypto.createHash('md5');
      hash.setEncoding('hex');
      var entry_path = path.join(target_dir, header.entry_name);

      debug("Extracted %s", header.entry_name);

      var dirname = path.dirname(entry_path);
      mkdirpSync(dirname);

      var target = fs.createWriteStream(entry_path);
      stream.pipe(hash);
      stream.pipe(target);

      target.on('finish', () => {

        hash.end();
        index[header.entry_name] = {
          'content-length' : filesize(entry_path),
          'content-md5'    : hash.read()
        };

        next();
      });

    });

    //finish do NOT wait for the final hash
    extract.on('extracted', defered.resolve.bind(defered, index));
    extract.on('error', defered.reject);

    var archive = fs.createReadStream(String(file_path));
    archive.pipe(extract);
    return defered;
  }


}


module.exports = extractor;
