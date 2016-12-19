module.exports = {
  entry: './app.js',
  output: {
    path: './dist', // 出力先のパス
    filename: 'bundle.js' // 出力先のファイル名
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  }
};
