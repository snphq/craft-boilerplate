const { aliasesArr } = require('./utils/aliases');

module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb-base',
  plugins: ['babel'],

  env: {
    browser: true,
    node: true,
  },

  settings: {
    'import/resolver': {
      'alias': aliasesArr
    },
  },

  rules: {
    'babel/semi': 2
  },
};
