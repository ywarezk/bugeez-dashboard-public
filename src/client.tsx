/**
 * entry point file for webpack
 *
 * Created October 7th, 2016
 * @author: ywarezk
 * @version: 1.0
 * @copyright: Nerdeez
 */

import * as React from 'react';
import * as ReactDom from 'react-dom';

import { Provider } from 'react-redux';

import { browserHistory, Router } from 'react-router';

import { store } from './redux/store/store.tsx';

import { routes } from './routes.tsx';

const store = store();
ReactDom.render(
    <Provider store={store}>
        <Router history={browserHistory}>{routes()}</Router>
    </Provider>,
    document.getElementById('nz-content')
);
