# envr

Checks in which environment an application is running. 


[![npm](https://img.shields.io/npm/dm/envr.svg?style=flat-square)](https://www.npmjs.com/package/envr)
[![Travis](https://img.shields.io/travis/eventEmitter/envr.svg?style=flat-square)](https://travis-ci.org/eventEmitter/envr)
[![node](https://img.shields.io/node/v/envr.svg?style=flat-square)](https://nodejs.org/)


## API

Start your nod process with one of the following flags:

    --live
    --testing
    --staging
    --dev


Envr will parse the arguments and will expose it on the env property

    var envr = require('envr');

    log(envr.env); // live, testing, staging or dev
