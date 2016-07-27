var webpack = require('webpack');
var merge = require('webpack-merge');
var config = require('./webpack.common.config');

module.exports = merge(config, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: true
      }
    }),
  ]
});
