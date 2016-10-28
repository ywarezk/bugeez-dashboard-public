/**
 * Server side
 * our server will render the application and also serve
 * it to the client
 *
 * Created October 9th, 2016
 * @author: ywarezk
 * @version: 1.0
 * @copyright: Nerdeez
 */

import React from 'react';
import { Provider } from 'react-redux';
import http from 'http';
import Express from 'express';
import { match, Router } from 'react-router';
import ReactDOM from 'react-dom/server';
import createHistory from 'react-router/lib/createMemoryHistory';
import { syncHistoryWithStore } from 'react-router-redux';
import nzCreateStore from '../redux/store/store';
import Html from './Html';
import getRoutes from '../routes';
declare var global : any;
declare var process : any;
declare var __dirname : any;

const app = new Express();
const server = new (http as any).Server(app);

// root dir
const path = require('path');
const fs = require('fs');


const rootDir = path.resolve(__dirname, '../../');

//set the globals
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';
global.__CLIENT__ = false;

let webpackAssets = null;

/**
 * serve the static files from the dist folder
 */
app.use('/assets', Express.static(path.join(rootDir, 'dist', 'client')));

/**
 * get webpack assets if
 */
app.use((req, res, next) => {
    if (webpackAssets !== null) next();
    fs.readFile(rootDir + '/webpack-assets.json', 'utf8', (err, data) => {
        if (err) throw err; // we'll not consider error handling for now
        webpackAssets = JSON.parse(data);
        next();
    });
});

/**
 * Main function that renders our app in the
 * server side
 */
app.use((req, res) => {
    const memoryHistory = createHistory(req.originalUrl);
    const store = nzCreateStore(memoryHistory);
    const history = syncHistoryWithStore(memoryHistory, store);

    match(
        {
            history,
            routes: getRoutes(),
            location: req.originalUrl,
        },
        (error, redirectLocation, renderProps) => {
            // if the route has a redirect
            if (redirectLocation) {
                res.redirect(redirectLocation.pathname + redirectLocation.search);
                return;
            }

            // if the route contains error
            if (error) {
                console.error('Router error: ' + console.error(error));
                res.status(500);
                res.send(`
                    <html>
                        <body>
                            <h1>Application Error</h1>
                            <h3>Check the URL you entered</h3>
                        </body>
                    </html>
                `);
                return;
            }

            // create our application
            if (renderProps) {
                const componentString = ReactDOM.renderToString(
                    <Provider store={store}>
                        <Router history={history} >
                            {getRoutes()}
                        </Router>
                    </Provider>
                );

                // return response
                res.status(200);
                res.send(
                    '<!DOCTYPE html>' + ReactDOM.renderToString(<Html
                      store={store}
                      component={componentString}
                      assets={webpackAssets}
                    />)
                );
                return;
            }

            // 404
            res.status(400);
            res.send(
                `
                <html>
                    <head>                     
                    </head>
                    <body>
                        <h1>404 Page not found</h1>
                    </body>
                </html>
                `
            );
            return;
        }
    );
});

/**
 * create the server at port 3000
 */
server.listen(3000, (err) => {
    if (err) {
        console.error(err);
    }
    console.info('Application is running on port 3000');
});
