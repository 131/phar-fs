"use strict";

const fs       = require('fs');
const path     = require('path');

const expect   = require('expect.js');
const phar     = require('../');
const detach   = require('nyks/function/detach');


describe("Testing fixtures", function(){
  it("Should extract a dummy phar (data0.phar)", function(done){

      //test with little read buffer
    const archive = path.join(__dirname, "fixtures/data0.phar");
    const manifest = require( path.join(__dirname, "fixtures/data0.phar.json") );

    phar.extract(archive).then(function(files) {

      expect(files).to.eql(manifest);
      done();
    }).catch(detach(expect().fail.bind(expect() )) );


  });




})

