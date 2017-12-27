/**
 * Require Browsersync along with webpack and middleware for it
 */
const fs = require('fs-extra');
const { promisify } = require('util');
const path = require('path');
const browserSync = require('browser-sync');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

/**
 * Require ./webpack.config.js and make a bundler from it
 */
const webpackConfig = require('./webpack.config/webpack.config.hot.js')();
const bundler = webpack(webpackConfig);

/**
 * Run Browsersync and use middleware for Hot Module Replacement
 */
browserSync({
  open: false,

  proxy: {
    target: 'localhost:8888',

    middleware: [
      webpackDevMiddleware(bundler, {
        // IMPORTANT: dev middleware can't access config, so we should
        // provide publicPath by ourselves
        publicPath: webpackConfig.output.publicPath,

        // pretty colored output
        stats: { colors: true }

        // for other settings see
        // http://webpack.github.io/docs/webpack-dev-middleware.html
      }),

      // bundler should be the same as above
      webpackHotMiddleware(bundler),

      async function (req, res, next) {
        const src = '../static/templates/_webpack.templates';
        const dest = './public/static/templates/_webpack.templates';

        copyFolderFromBundlerFileSystem(bundler, src, dest).then(next).catch(next);
      }
    ]
  }
});

function getBundlerFs (bundler) {
  return ['readdir', 'stat', 'readFile'].reduce((result, method) => {
    result[method] = promisify(bundler.outputFileSystem[method].bind(bundler.outputFileSystem));
    return result;
  }, {});
};

async function copyFolderFromBundlerFileSystem(bundler, src, dest) {
  const bundlerFs = getBundlerFs(bundler);
  const srcDir = path.resolve(bundler.outputPath, src);
  const fileNames = await bundlerFs.readdir(srcDir);

  for (const fileName of fileNames) {
    const filePath = path.resolve(srcDir, fileName);
    const fileStat = await bundlerFs.stat(filePath);

    if (fileStat && fileStat.isDirectory()) {
      const srcSubDir = path.join(src, fileName);
      const destSubDir = path.join(dest, fileName);
      copyFolderFromBundlerFileSystem(srcSubDir, destSubDir);
      continue;
    }

    const file = await bundlerFs.readFile(filePath);
    const destDir = path.resolve(__dirname, dest);
    const destFilePath = path.resolve(destDir, fileName);

    await fs.outputFile(destFilePath, file);
  }
}

