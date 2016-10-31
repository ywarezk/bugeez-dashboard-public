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

/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { Provider } from 'react-redux';
import * as Express from 'express';
import { match, Router } from 'react-router';
import * as ReactDOM from 'react-dom/server';
import * as nzcreateMemoryHistory from 'react-router/lib/createMemoryHistory';
import { syncHistoryWithStore } from 'react-router-redux';
import { nzCreateStore } from '../redux/store/store.tsx';
import { Html } from './Html.component.tsx';
import { getRoutes } from '../routes.tsx';
import { readFile } from 'fs';
import { resolve, join } from 'path';
import * as H from 'history';

declare var global : {__DEVELOPMENT__ : boolean, __CLIENT__ : boolean};
declare var process : {env: {NODE_ENV : string}};
declare var __dirname : string;

const app = Express();

const rootDir = resolve(__dirname, '../../');

//set the globals
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';
global.__CLIENT__ = false;

let webpackAssets = null;

/**
 * serve the static files from the dist folder
 */
app.use('/assets', Express.static(join(rootDir, 'dist', 'client')));

/**
 * get webpack assets if
 */
app.use((req, res, next) => {
    if (webpackAssets !== null) {
        next();
    }
    readFile(rootDir + '/webpack-assets.json', 'utf8', (err, data) => {
        if (err) {
            throw err;
        } // we'll not consider error handling for now
        webpackAssets = JSON.parse(data);
        next();
    });
});

/**
 * Main function that renders our app in the
 * server side
 */
app.use((req, res) => {
    /* tslint:disable:no-any */
    const memoryHistory : H.History = (nzcreateMemoryHistory as any)();
    /* tslint:disable:no-any */
    const store = nzCreateStore(memoryHistory);
    const history = syncHistoryWithStore(memoryHistory, store);

    match(
        {
            history,
            routes: getRoutes(),
            location: req.originalUrl
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
app.listen(3000, (err) => {
    if (err) {
        console.error(err);
    }
    console.log('Application is running on port 3000');
});
