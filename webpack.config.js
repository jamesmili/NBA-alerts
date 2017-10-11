var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var ChromeDevPlugin = require("chrome-dev-webpack-plugin");

var config = {
    entry: {
      bundle:'./src/index.js',
      background:'./src/background.js'
    },
    output: {
        path: path.resolve(__dirname, 'public'),
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
                test: /\.(js)$/,
                use: 'babel-loader'
            }, {
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
            }
        ],
        loaders: [
            {
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react', 'stage-0']
                },
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/
            }
        ]
    },

    devServer: {
        historyApiFallback: true
    },
    plugins: [
      new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      }
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new ChromeDevPlugin({
      entry: "src/manifest.json",
      output:"manifest.json",
      log:console.log,
      warm:console.warn,
      error:console.error,
      version: "1.0"
    })
  ]
};

module.exports = config;
