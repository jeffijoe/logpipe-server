// Note: Webpack uses vm.runInThisContext,
// so ES7 is not allowed.
const path = require('path');
const webpack = require('webpack');
const filter = require('lodash/fp/filter');
const identity = require('lodash/fp/identity');

const clean = filter(identity);

const packageInfo = require(path.join(__dirname, '../../package.json'));

const prod = process.argv.indexOf('--production') > -1;
const dev = !prod;

// TODO: Environmentize
module.exports = {
  devtool: 'cheap-module-eval-source-map',
  debug: true,
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client',
    './src/frontend/app/index'
  ],
  output: {
    // For production only
    path: path.join(__dirname, '/../../dist/app'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    dev && new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_ENV: JSON.stringify(prod ? 'production' : 'development'),
          APP_HOMEPAGE_URL: JSON.stringify(packageInfo.homepage),
          APP_VERSION: JSON.stringify(packageInfo.version)
        }
      }
    })
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/,
      include: __dirname
    }, {
      test: /\.styl$/,
      loaders: [
        'style',
        'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]',
        'stylus-loader'
      ]
    }]
  },
  stylus: {
    use: [require('nib')()],
    import: ['~nib/lib/nib/index.styl']
  },
  resolve: {
    modulesDirectories: ['./app', 'node_modules'],
    extensions: ['', '.js', '.jsx']
  }
};