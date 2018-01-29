/* eslint no-console: 0 */

const path = require('path');
const { getAvalibleTypes, createComponent } = require('./utils');

const {
  getIndexJsFileText,
  getMainJsFileText,
  getMainStyleFileText,
  getTemplateFileText,
} = require('./templates');

const SRC_PATH = path.resolve('./src');
const TEMPLATE_PATH = path.resolve('./public/static/templates');

const FOLDERS = {
  page: 'pages',
  container: 'containers',
  component: 'components',
};

const ALIASES = {
  page: 'page',
  p: 'page',
  container: 'container',
  con: 'container',
  component: 'component',
  com: 'component',
};

const [,, inputType, inputName] = process.argv;
const type = ALIASES[inputType];

if (!type) {
  console.error(`Type is invlid. You can use only: ${getAvalibleTypes(ALIASES)} types.`);
  process.exit(1);
}

const folder = FOLDERS[type];
const jsFolderPath = path.join(SRC_PATH, folder, inputName);
const templateFolderPath = path.join(TEMPLATE_PATH, `_${folder}`, inputName);

createComponent(jsFolderPath, inputName, type, [
  [`${inputName}.js`, getMainJsFileText],
  [`${inputName}.scss`, getMainStyleFileText],
  ['index.js', getIndexJsFileText],
]);

createComponent(templateFolderPath, inputName, type, [
  ['index.twig', getTemplateFileText],
]);

