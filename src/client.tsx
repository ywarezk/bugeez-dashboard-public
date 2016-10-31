/**
 * entry point file for webpack
 *
 * Created October 7th, 2016
 * @author: ywarezk
 * @version: 1.0
 * @copyright: Nerdeez
 */

/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import * as ReactDom from 'react-dom';

import { Provider } from 'react-redux';

import { browserHistory, Router } from 'react-router';

import { nzCreateStore } from './redux/store/store.tsx';

import { getRoutes } from './routes.tsx';

const store = nzCreateStore();
ReactDom.render(
    <Provider store={store}>
        <Router history={browserHistory}>{getRoutes()}</Router>
    </Provider>,
    document.getElementById('nz-content')
);
