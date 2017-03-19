# Motivation
phar-fs is a simple fs wrapper for the phar-stream API. It allows PHP PHAR file extraction for nodejs.
It's mosly intended to be used via [cnyks]

# API
## extract (return Promise)
```
var phar = require('phar-fs');
phar.extract("somephar_path.phar").then(function() { console.log("All done") });
```



# Credits / see also
* [phar-stream]
* [131]
* [cnyks]