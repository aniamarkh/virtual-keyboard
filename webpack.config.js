/* eslint-disable import/no-unresolved */
const path = require('path');

let mode = 'development';
if (process.env.NODE_ENV === 'production') {
  mode = 'production';
}

module.exports = {
  mode,
  entry: ['./src/keyboard_layout.js', './src/keyboard.js'],
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[hash][ext][query]',
    clean: true,
  },

  devServer: {
    hot: true,
  },

  module: {
    rules: [
      { test: /\.(html)$/, use: ['html-loader'] },
      { test: /\.scss$/, use: ['sass-loader', 'style-loader', 'css-loader'] },
    ],
  },
};
