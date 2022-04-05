/// <reference path="./node_modules/@stacker/alfred-utils/dist/environment.d.ts" />

/**
 * usage
 * /usr/local/bin/node ./__filename__.js {query}
 */
const {utils, http} = require('@stacker/alfred-utils');
const [, ,] = process.argv;
const instance = http.createHttpClient();

(function () {
  utils.printScriptFilter({
    items: [
      utils.buildItem({
        title: 'hello',
        subtitle: 'easy to use alfred-utils'
      })
    ]
  })
})();
