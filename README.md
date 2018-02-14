# Motivation
phar-fs is a simple fs wrapper for the [phar-stream](https://github.com/131/phar-stream) API. It allows **phar** archive ([PHP archive](https://en.wikipedia.org/wiki/PHAR_(file_format))) file extraction for nodejs.
It's mosly intended to be used via [cnyks](https://github.com/131/cnyks)


[![Build Status](https://travis-ci.org/131/phar-fs.svg?branch=master)](https://travis-ci.org/131/phar-fs)
[![Coverage Status](https://coveralls.io/repos/github/131/phar-fs/badge.svg?branch=master)](https://coveralls.io/github/131/phar-fs?branch=master)
[![Version](https://img.shields.io/npm/v/phar-fs.svg)](https://www.npmjs.com/package/phar-fs)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](http://opensource.org/licenses/MIT)




# API
## extract (return Promise)
```
var phar = require('phar-fs');
phar.extract("somephar_path.phar").then(function() { console.log("All done") });
```



# Credits / see also
* [phar-stream](https://github.com/131/phar-stream)
* [131](https://github.com/131)
* [cnyks](https://github.com/131/cnyks)


# License

MIT
