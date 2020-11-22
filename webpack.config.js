var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
const baseManifest = require("./src/manifest.json");
const WebpackExtensionManifestPlugin = require("webpack-extension-manifest-plugin");
const CopyPlugin = require('copy-webpack-plugin');

var config = {
    entry: {
      bundle:'./src/index.js',
      background:'./src/background.js',
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].min.js'
    },
    resolve: {
        alias: {
          Main: path.join(__dirname, './src/components/Main.js'),
          NewsList: path.join(__dirname, './src/components/NewsList.js'),
          News: path.join(__dirname, './src/components/News.js'),
          Api: path.join(__dirname, './src/utils/api.js'),
        },
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
          {
              test: /\.css$/,
              use: ['style-loader', 'css-loader']
          },
          {
            test: /\.(png|jpg|gif)$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: 'nba.png',
                  outputPath: './img/'
                }
              }
            ]
          },
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
              }
            }
          }
        ],
    },

    devServer: {
        historyApiFallback: true
    },
    plugins: [
      new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      },
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new WebpackExtensionManifestPlugin({
      config: {
        base: baseManifest
      }
    }),
    new CopyPlugin({
      patterns: [
          {
              from: path.resolve(__dirname, './src/img/'),
              to: path.resolve(__dirname, 'build')
          }
      ]
    }),
  ]
};

module.exports = config;
