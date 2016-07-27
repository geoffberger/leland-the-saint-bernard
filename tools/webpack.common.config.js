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
      },

      {
        test: /\.scss$/,
        loaders: [
          'style',
          `css?${JSON.stringify({
            modules: true,
            importLoaders: true,
          })}`,
          'sass-loader',
        ],
      },
    ],

    noParse: [
      /aws\-sdk/,
    ]
  },

  devtool: 'source-map',

  output: {
    filename: '[name].js',
    path: resolve('build', 'public', 'assets'),
  },
};
