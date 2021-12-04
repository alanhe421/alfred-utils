/**
 * usage
 * /usr/local/bin/node ./__filename__.js
 */
const {utils, http} = require('@stacker/alfred-utils');
const [, ,] = process.argv;
const instance = http.createHttpClient();
