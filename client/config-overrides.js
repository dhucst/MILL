const { injectBabelPlugin } = require('react-app-rewired');

module.exports = function override(config, env) {
  config = injectBabelPlugin(
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }],
    config,
  );

  config = injectBabelPlugin('@babel/plugin-syntax-dynamic-import', config);
  config = injectBabelPlugin(
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    config,
  );
  return config;
};
