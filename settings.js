const path = require('path');

module.exports = {
  proxyTarget: 'localhost:8888',
  webpackTemplateDir: path.resolve(__dirname, './public/static/templates/_webpack.templates'),
};
