const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const isProduction = process.env.NODE_ENV === 'production';

const config = {
  mode: 'development',
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          !isProduction ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: 'compressed',
              },
            },
          },
        ],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].min.css',
    }),
    new HtmlWebpackPlugin({
      title: this.mode,
      template: './src/index.html',
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
};

module.exports = () => {
  config.mode = isProduction ? 'production' : 'development';
  return config;
};
