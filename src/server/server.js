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
import Express from 'express';
import http from 'http';
import nzCreateStore from '../redux/store/store';
import { match } from 'react-router';
import PrettyError from 'pretty-error';
import { Router } from 'react-router';
import getRoutes from '../routes';
import ReactDOM from 'react-dom/server';
import Html from './Html';
import App from '../views/App/App';
import createHistory from 'react-router/lib/createMemoryHistory';
import { syncHistoryWithStore } from 'react-router-redux';


const app = new Express();
const server = new http.Server(app);
const pretty = new PrettyError();

// root dir
var path = require('path');
const rootDir = path.resolve(__dirname, '../../');

/**
 * serve the static files from the dist folder
 */
app.use('/assets', Express.static(path.join(rootDir, 'dist')));

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
            history: history,
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
                console.error('Router error: ' + pretty.render(error));
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
            if(renderProps){
                const componentString = ReactDOM.renderToString(
                    <Provider store={store}>
                        <App {...renderProps} />
                    </Provider>
                );

                // return response
                res.status(200);
                res.send(
                    `<!DOCTYPE html>
                    `
                    +
                    ReactDOM.renderToString(<Html
                        store={store}
                        component={componentString}
                        assets={webpackIsomorphicTools.assets()}
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

