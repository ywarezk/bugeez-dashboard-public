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
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import getRoutes from './routes';
import nzCreateStore from './redux/store/store';

const store = nzCreateStore();
ReactDom.render(
    <Provider store={store}>
        <Router history={browserHistory}>{getRoutes()}</Router>
    </Provider>,
    document.getElementById('nz-content')
);
