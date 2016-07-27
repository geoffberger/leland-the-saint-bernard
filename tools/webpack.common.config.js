var path = require('path');
var resolve = path.resolve;

module.exports = {
  entry: {
    index: resolve('src', 'index.jsx'),
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel?cacheDirectory'],
        exclude: /node_modules/,
      }
    ],

    noParse: [
      /aws\-sdk/,
    ]
  },

  devtool: 'source-map',

  output: {
    filename: '[name].js',
    path: resolve('build', 'public', 'assets'),
  }
};
