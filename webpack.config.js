/**
 * Configuration file for webpack
 *
 * Created October 7th, 2016
 * @author: ywarezk
 * @version: 1.0
 * @copyright: Nerdeez
 */

var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

//isomorphic tools
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools.config.js'));
if (process.env.NODE_ENV !== 'production'){
    webpackIsomorphicToolsPlugin = webpackIsomorphicToolsPlugin.development();
}

module.exports = {
    entry: {
        main: './src/client.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]-[chunkhash].js',
        chunkFilename: '[name]-[chunkhash].js',
        publicPath: 'assets/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel-loader', 'eslint-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                loader: 'css-to-string-loader!css-loader!sass-loader'
            },
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
            { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
        ]
    },
    plugins: [
        webpackIsomorphicToolsPlugin
    ]
}
