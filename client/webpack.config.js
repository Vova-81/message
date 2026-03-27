const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

require('dotenv').config();

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js-bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      'handlebars' : 'handlebars/dist/handlebars.js'
    }
  },
  devServer: {
    static: {
      directory: 'dist',
    },
    compress: true,
    host: '0.0.0.0',
    historyApiFallback: true,
    port: process.env.CLIENT_PORT || 3000,
    client: {
      logging: isProd ? 'error' : 'verbose',
      overlay: isProd ? false : { errors: true, warnings: false },
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.json'),
            },
          },
        ],
        exclude: /(node_modules)/
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {}
          },
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /template$/,
        use: [
          {
            loader: 'handlebars-loader',
            options: {}
          }
        ]
      },
      {
        test: /\.svg/,
        type: 'asset/inline'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.SERVER_HOST': JSON.stringify(process.env.SERVER_HOST),
      'process.env.SOCKET_HOST': JSON.stringify(process.env.SOCKET_HOST),
      'process.env.CLIENT_HOST': JSON.stringify(process.env.CLIENT_HOST),
    }),
    new MiniCssExtractPlugin({
      filename: 'style-bundle.css',
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      base: process.env.CLIENT_HOST || 'http://localhost:3000/',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      },
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: '**/*',
          context: path.resolve(__dirname, 'src', 'static'),
          to: './static',
        },
      ],
    }),
    new ESLintPlugin({
      extensions: ['ts']
    }),
  ]
};
