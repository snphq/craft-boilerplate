/* eslint import/no-extraneous-dependencies: ["error", { devDependencies: true }] */

/**
 * Require Browsersync along with webpack and middleware for it
 */
const browserSync = require('browser-sync');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const settings = require('./settings');
const webpackConfig = require('./webpack.config/webpack.config.hot.js')();
const { copyFolderFromCompilerFileSystem } = require('./utils/compilerFs');

const copyTemplatesFromCompilerFileSystemMiddleware = compiler =>
  (req, res, next) =>
    copyFolderFromCompilerFileSystem(compiler, settings.webpackTemplateDir)
      .then(() => next()).catch(next);

/**
 * Make a Compiler
 */
const compiler = webpack(webpackConfig);

/**
 * Run Browsersync and use middleware for Hot Module Replacement
 */
browserSync({
  open: false,

  proxy: {
    target: settings.proxyTarget,

    middleware: [
      webpackDevMiddleware(compiler, {
        // IMPORTANT: dev middleware can't access config, so we should
        // provide publicPath by ourselves
        publicPath: webpackConfig.output.publicPath,

        // pretty colored output
        stats: { colors: true },

        // for other settings see
        // http://webpack.github.io/docs/webpack-dev-middleware.html
      }),

      // Compiler should be the same as above
      webpackHotMiddleware(compiler),

      // we need copy templates to public directory from memory
      // for proxy target server
      copyTemplatesFromCompilerFileSystemMiddleware(compiler),
    ],
  },
});
