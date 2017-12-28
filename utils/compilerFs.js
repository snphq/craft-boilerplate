/* eslint import/no-extraneous-dependencies: ["error", { devDependencies: true }] */

const fs = require('fs-extra');
const path = require('path');
const { promisify } = require('util');

const getCompilerFs = (compiler, methods) =>
  methods.reduce((result, method) => {
    result[method] = promisify(compiler.outputFileSystem[method].bind(compiler.outputFileSystem));
    return result;
  }, {});

const copyFolderFromCompilerFileSystem = async (compiler, dir) => {
  const compilerFs = getCompilerFs(compiler, ['readdir', 'stat', 'readFile']);
  const fileNames = await compilerFs.readdir(dir);

  return Promise.all(fileNames.map(async (fileName) => {
    const filePath = path.join(dir, fileName);
    const fileStat = await compilerFs.stat(filePath);

    if (fileStat && fileStat.isDirectory()) {
      const subDir = path.join(dir, fileName);
      return copyFolderFromCompilerFileSystem(compiler, subDir);
    }

    const file = await compilerFs.readFile(filePath);
    const destFilePath = path.join(dir, fileName);

    return fs.outputFile(destFilePath, file);
  }));
};

module.exports = { getCompilerFs, copyFolderFromCompilerFileSystem };
