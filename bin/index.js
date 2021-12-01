#!/usr/bin/env node
const program = require('commander');
const fs = require('fs');
const {log} = require("util");
const {execSync} = require("child_process");
const pjson = require('../package.json');

program
  .command(`init`)
  .description('alfred workflow init')
  .action((options) => {
    init(options);
  });
program
  .command(`new`)
  .description('alfred workflow new file')
  .argument('<filename>', 'filename')
  .action((options) => {
    newFile(options);
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
  execSync('npm install', {stdio:[0,1,2]});
}

/**
 * new file with name
 * @param options
 */
function newFile(options) {
  console.log(options);
  fs.copyFileSync(`${__dirname}/template.js`, `./${options.filename}.js`);
}
