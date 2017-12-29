const webpackConfig = require(`./webpack.config/webpack.config.${process.env.WEBPACK_CONFIG_TYPE}.js`); // eslint-disable-line import/no-dynamic-require

console.log(`WEBPACK_CONFIG_TYPE: ${process.env.WEBPACK_CONFIG_TYPE}`); // eslint-disable-line no-console

module.exports = webpackConfig;
