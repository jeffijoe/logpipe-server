import convert from 'koa-convert';

/**
 * Configures the Webpack Dev Server.
 */
export default function configureWebpackDevServer(app) {
  const webpack = require('webpack');
  const webpackDev = require('koa-webpack-dev-middleware');
  const webpackHot = require('koa-webpack-hot-middleware');
  const webpackConfig = require('../../frontend/webpack.config');
  const compiler = webpack(webpackConfig);

  // Dev Middleware - hosts the Webpack compiler and serves the files.
  app.use(convert(webpackDev(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  })));

  // Hot Middleware - hot-reloading!
  app.use(convert(webpackHot(compiler)));
}