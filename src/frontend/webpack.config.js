// Note: Webpack uses vm.runInThisContext,
// so ES7 is not allowed.
const webpack = require('webpack');

const path = require('path');

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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
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