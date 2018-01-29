const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const RobotstxtPlugin = require('robotstxt-webpack-plugin').default;
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

// Set the webpack production configurations
const webpackStagingConfig = {
  // Newly compiled file configuration
  output: {
    filename: 'javascripts/[name].[chunkhash].bundle.min.js',
  },

  // Plugins => Configure webpack plugins
  plugins: [
    new ExtractTextPlugin({
      filename: 'stylesheets/[name].[contenthash].bundle.min.css',
      allChunks: true,
    }),

    new FaviconsWebpackPlugin({
      logo: './src/favicon.png',
      persistentCache: true,
      icons: {
        appleStartup: false,
        firefox: false,
      },
    }),

    // Generator robots.txt
    new RobotstxtPlugin({
      dest: '../',
      policy: [
        {
          userAgent: '*',
          disallow: '/',
        },
      ],
    }),
  ],
};

/*
  ******************************
  * Build Webpack Configuration
  * Note: Done with webpackMerge
  ******************************
*/
const webpackBaseConfig = require('./webpack.config.base.js');

function webpackMergeConfig(env) {
  return webpackMerge(webpackBaseConfig(env), webpackStagingConfig);
}

module.exports = webpackMergeConfig;
