module.exports = {
  getIndexJsFileText: name =>
    `export { default } from './${name}';\n`,

  getMainJsFileText: name =>
    `import './${name}.scss';\n`,

  getMainStyleFileText: name =>
    `.${name} {\n\n}`,

  getTemplateFileText: (name, type) => {
    if (type === 'page') {
      return ('{% extends "_layout" %}\n\n{% block main %}\n\n{% endblock %}');
    }

    return '';
  },
};
