/**
 * Configuration file for webpack
 *
 * Created October 7th, 2016
 * @author: ywarezk
 * @version: 1.0
 * @copyright: Nerdeez
 */

var path = require('path');
var fs = require('fs');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');
var S3Plugin = require('webpack-s3-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
var AssetsPlugin = require('assets-webpack-plugin')

var isProd = process.env.NODE_ENV === 'production';

var commonConfig = {
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel-loader', 'eslint-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.ts?x$/,
                loader: 'babel-loader!ts-loader'
            },
            { test: /\.scss$/, loader: ExtractTextPlugin.extract({
                fallbackLoader: "style-loader",
                loader: "css-loader!sass-loader"
            }) },
            { test: /\.json$/, loader: 'raw-loader' },
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
            { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
        ]
    },
    plugins: [
        new ExtractTextPlugin("styles.[contenthash].css"),
        new AssetsPlugin()
    ],
    resolve: {
      extensions: ['', '.js', '.jsx', 'ts', 'tsx']
    },
}

var clientConfig = {
  target: 'web',
  entry: {
    'app': './src/client.tsx'
  },
  output: {
    path: path.resolve(__dirname, 'dist', 'client'),
    publicPath: isProd ? 'https://cdn.bugeez.io/' : 'http://localhost:3000/assets/',
    filename: '[name].[chunkhash].js'
  },
  node: {
    global: true,
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: false
  },
  plugins: [
    new WebpackMd5Hash()
  ]
};

//plugins used in production
if(isProd){
    clientConfig.plugins.push(
        new S3Plugin({
          s3Options: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: 'eu-west-1'
          },
          s3UploadOptions: {
            Bucket: process.env.AWS_STORAGE_BUCKET_NAME
          },
          cdnizerOptions: {
            defaultCDNBase: 'http://asdf.ca'
          }
        })
    );
}

var serverConfig = {
    target: 'node',
    entry: './src/server/server.tsx', // use the entry file of the node server if everything is ts rather than es5
    output: {
        path: path.resolve(__dirname, 'dist', 'server'),
        libraryTarget: 'commonjs2',
        filename: 'server.js'
    },
    node: {
        global: true,
        __dirname: true,
        __filename: true,
        process: true,
        Buffer: true
    },
    externals: includeClientPackages([
        'commonjs express',
        'commonjs rxjs'
    ])
    // plugins: [
    //     new webpack.IgnorePlugin(/\.(css|less|scss)$/)
    // ]
};

// Default config
var defaultConfig = {
  context: __dirname,
  output: {
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: 'assets/'
  }
};

// export webpack configurations
var webpackMerge = require('webpack-merge');
module.exports = [
  // Client
  webpackMerge({}, defaultConfig, commonConfig, clientConfig),

  // Server
  webpackMerge({}, defaultConfig, commonConfig, serverConfig)
];

function includeClientPackages(packages) {
  return function(context, request, cb) {
    if (packages && packages.indexOf(request) !== -1) {
      return cb();
    }
    return checkNodeImport(context, request, cb);
  };
}
// Helpers
function checkNodeImport(context, request, cb) {
  if (!path.isAbsolute(request) && request.charAt(0) !== '.') {
    cb(null, 'commonjs ' + request); return;
  }
  cb();
}