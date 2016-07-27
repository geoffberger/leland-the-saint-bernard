module.exports = {
  entry: {
    main: './src/main.jsx',
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

  output: {
    filename: '[name].js',
    path: 'build/public/assets',
  }
};
