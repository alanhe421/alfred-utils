const {utils} = require('@stacker/alfred-utils');
const [, ,] = process.argv;
const instance = require('./axios').createHttpClient();
