const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

// Set the webpack development configurations
const webpackHotConfig = {
  entry: {
    dev: ['webpack/hot/dev-server', 'webpack-hot-middleware/client?reload=true&quiet=true']
  },

  // Newly compiled file configuration
  output: {
    filename: 'javascripts/[name].bundle.js',
  },

  // Enable any 'source-map'-like devtool if possible
  devtool: 'source-map',

  // Plugins => Configure webpack plugins
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};

/*
  ******************************
  * Build Webpack Configuration.
  * Note: Done with webpackMerge
  ******************************
*/
const webpackBaseConfig = require('./webpack.config.base.js');

function webpackMergeConfig(env) {
  return webpackMerge(webpackBaseConfig(env), webpackHotConfig);
}

module.exports = webpackMergeConfig;
