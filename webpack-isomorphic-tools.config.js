/**
 * Configuration file for webpack-isomorphic-tools
 *
 * Created October 9th, 2016
 * @author: ywarezk
 * @version: 1.0
 * @copyright: Nerdeez Ltd
 */

var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
module.exports = {
    assets: {
        images: {
          extensions: [
            'jpeg',
            'jpg',
            'png',
            'gif'
          ],
          parser: WebpackIsomorphicToolsPlugin.url_loader_parser
        },
        fonts: {
          extensions: [
            'woff',
            'woff2',
            'ttf',
            'eot'
          ],
          parser: WebpackIsomorphicToolsPlugin.url_loader_parser
        },
        svg: {
          extension: 'svg',
          parser: WebpackIsomorphicToolsPlugin.url_loader_parser
        },
        style_modules: {
            include: ['./node_modules/'],
            extensions: [
                'less',
                'scss'
            ],
            parser: WebpackIsomorphicToolsPlugin.css_modules_loader_parser,
            path: WebpackIsomorphicToolsPlugin.style_loader_path_extractor
        }
    }
}
