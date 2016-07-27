var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
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

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve('templates', 'index.html'),
      inject: 'body',
    }),

    new webpack.HotModuleReplacementPlugin(),
  ],

  devtool: 'source-map',

  output: {
    filename: '[name]-[hash].js',
    path: resolve('build', 'public', 'assets'),
  },

  devServer: {
    hot: true,
  },
};
