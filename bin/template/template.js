/**
 * usage
 * /usr/local/bin/node ./__filename__.js
 */
const {utils} = require('@stacker/alfred-utils');
const [, ,] = process.argv;
const instance = require('./axios').createHttpClient();
