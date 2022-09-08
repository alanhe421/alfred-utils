/// <reference path="./node_modules/@stacker/alfred-utils/dist/environment.d.ts" />

/**
 * usage
 * /usr/local/bin/node ./__filename__.js {query}
 */
const {http, Workflow} = require('@stacker/alfred-utils');
const [, ,] = process.argv;
const instance = http.createHttpClient();
const wf = new Workflow();
(function () {
  wf.addWorkflowItem({
    item: {
      title: 'hello', subtitle: 'easy to use alfred-utils'
    }
  });

  wf.run();
})();
