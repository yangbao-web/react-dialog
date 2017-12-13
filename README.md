# 仿ios弹框

> 环境配置

* 安装依赖包 `npm install`

> 本地调试
* 修改node_modules/react-scripts/config/paths.js文件
```
// config before eject: we're in ./node_modules/react-scripts/config/
module.exports = {
  ***
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveApp('demo/index.js'),
  appPackageJson: resolveApp('package.json'),
  ***
};
改为
module.exports = {
  ***
  appHtml: resolveApp('public/index.html'),
  // appIndexJs: resolveApp('src/index.js'),
  appIndexJs: resolveApp('demo/index.js'),
  appPackageJson: resolveApp('package.json'),
  ***
};
```

* 修改node_modules/react-scripts/config/webpack.config.dev.js文件
```
  {
    test: /\.(js|jsx|mjs)$/,
    include: paths.appSrc,
    loader: require.resolve('babel-loader'),
    options: {
      // @remove-on-eject-begin
      babelrc: false,
      presets: [require.resolve('babel-preset-react-app')],
      // @remove-on-eject-end
      // This is a feature of `babel-loader` for webpack (not Babel itself).
      // It enables caching results in ./node_modules/.cache/babel-loader/
      // directory for faster rebuilds.
      cacheDirectory: true,
    },
  }
  改为
  {
    test: /\.(js|jsx|mjs)$/,
    include: [paths.appSrc, paths.demoSrc],
    loader: require.resolve('babel-loader'),
    options: {
      // @remove-on-eject-begin
      babelrc: false,
      presets: [require.resolve('babel-preset-react-app')],
      // @remove-on-eject-end
      // This is a feature of `babel-loader` for webpack (not Babel itself).
      // It enables caching results in ./node_modules/.cache/babel-loader/
      // directory for faster rebuilds.
      cacheDirectory: true,
    },
  }
```

* 开启本地环境 `npm start`
