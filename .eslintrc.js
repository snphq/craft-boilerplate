module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb-base',
  plugins: ['babel'],

  env: {
    browser: true,
    node: true,
  },

  rules: {
    'babel/semi': 2
  },
};
