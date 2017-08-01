var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

var config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: './bundle.js'
    },
    resolve: {
        alias: {
          Main: path.join(__dirname, './src/components/Main.js'),
          DataList: path.join(__dirname, './src/components/DataList.js')
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
            },
            {
              test: /\.(jpe?g|png|gif|svg)$/i,
              loaders: [
                'file?hash=sha512&digest=hex&name=[hash].[ext]',
                'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
              ]
            } 
        ]
    },

    devServer: {
        historyApiFallback: true
    },
    plugins: [new HtmlWebpackPlugin({template: 'src/index.html'})]
};

module.exports = config;
