var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

var config = {
    entry: {
      bundle:'./src/index.js',
      background:'./src/background.js'},
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].min.js'
    },
    resolve: {
        alias: {
          Main: path.join(__dirname, './src/components/Main.js'),
          NewsList: path.join(__dirname, './src/components/NewsList.js')
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
    plugins: [new HtmlWebpackPlugin({template: 'src/index.html'})]
};

module.exports = config;
