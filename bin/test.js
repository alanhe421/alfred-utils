#!/usr/bin/env node
const program = require('commander');
const fs = require('fs');
const {execSync} = require("child_process");
const pjson = require('../package.json');

program
  .command(`t1`)
  .description('just for a test')
  .action((options) => {
    init(options);
  });
program.version(pjson.version);
program.parse(process.argv);

/**
 * copy template to current workflow
 * @param options
 */
function init(options) {
  fs.copyFileSync(`${__dirname}/template/package.json`, './package.json');
  fs.copyFileSync(`${__dirname}/template/template.js`, './index.js');
  execSync('npm install', {stdio: [0, 1, 2]});
}
