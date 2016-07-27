module.exports = {
  entry: {
    index: './src/index.jsx',
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
    path: 'build/public/assets',
  }
};
