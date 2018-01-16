module.exports = {
  getPackageJsonFileText: inputName =>
    `{\n  "main": "./${inputName}.js"\n}`,

  getMainJsFileText: inputName =>
    `import './${inputName}.scss';\n`,

  getMainStyleFileText: inputName =>
    `.${inputName} {\n\n}`,

  getTemplateFileText: (inputName, type) => {
    if (type === 'page') {
      return ('{% extends "_layout" %}\n\n{% block main %}\n\n{% endblock %}');
    }

    return '';
  },
};
