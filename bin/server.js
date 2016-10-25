/**
 * node js script that will start our server
 *
 * Created October 16th, 2016
 * @author: ywarezk
 * @version: 1.0
 * @copyright: Nerdeez Ltd
 */

//root path
require('../server.babel');
var path = require('path');
var rootDir = path.resolve(__dirname, '..');

//init global variables
global.__CLIENT__ = false;
global.__DEVELOPMENT__ = process.env.NODE_ENV !== "production";

// start the server
var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack-isomorphic-tools.config.js'));
if (__DEVELOPMENT__){
    global.webpackIsomorphicTools = global.webpackIsomorphicTools.development()
} 
global.webpackIsomorphicTools.server(rootDir, function(){
    require('../src/server/server.js');
});
