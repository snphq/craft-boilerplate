const path = require('path');
const fs = require('fs');

const ALIASES_DIR = path.resolve(__dirname, '../src/javascripts');

const isDirectory = source => fs.lstatSync(source).isDirectory();

const getDirectories = source =>
  fs.readdirSync(source)
    .map(name => [name, path.join(source, name)])
    .filter(([, itemPath]) => isDirectory(itemPath));

const converToObj = arr => arr.reduce((result, [key, value]) => {
  result[key] = value; // eslint-disable-line no-param-reassign
  return result;
}, {});

const aliasesArr = getDirectories(ALIASES_DIR);
const aliasesObj = converToObj(aliasesArr);

module.exports = { aliasesArr, aliasesObj };
