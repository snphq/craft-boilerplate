const webpackMerge = require('webpack-merge');
const RobotstxtPlugin = require('robotstxt-webpack-plugin').default;

// Set the webpack production configurations
const webpackProductionConfig = {
  plugins: [
    // Generator robots.txt
    new RobotstxtPlugin({
      dest: '../',
      policy: [{ userAgent: '*' }],
    }),
  ],
};

/*
  ******************************
  * Build Webpack Configuration
  * Note: Done with webpackMerge
  ******************************
*/
const webpackStagingConfig = require('./webpack.config.staging.js');

function webpackMergeConfig(env) {
  return webpackMerge(webpackStagingConfig(env), webpackProductionConfig);
}

module.exports = webpackMergeConfig;
