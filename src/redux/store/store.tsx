/**
 * Redux store is created here
 *
 * Created October 13th, 2016
 * @author: ywarezk
 * @version: 1.0
 * @copyright: Nerdeez Ltd
 */

/*=======================
 * begin imports
 *=======================*/

import * as H from 'history';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { persistState } from 'redux-devtools';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import reduxThunk from 'redux-thunk';
import {combined} from '../reducers/combined.reducer.tsx';
import { getAllTasks, searchTasks } from '../epics/todo.epics.tsx';
import { DevTools } from '../../components/DevTools/DevTools.component.tsx';

/*=======================
 * end imports
 *=======================*/

/*=======================
 * begin declarations
 *=======================*/

declare var __DEVELOPMENT__: boolean;
declare var __CLIENT__: boolean;
interface IWindow {
    __initialState: Object;
    location: {href : {match(a : RegExp) : string}};
    devToolsExtension?() :  {(a: {}): {}};
}
declare var window : IWindow;

/*=======================
 * end declarations
 *=======================*/

export function nzCreateStore(history : H.History = null) {
    const reduxRouterMiddleware = routerMiddleware(history);
    const middleware = [
        reduxRouterMiddleware,
        reduxThunk,
        createEpicMiddleware(combineEpics(getAllTasks, searchTasks))
    ];
    let finalCreateStore;
    if (__DEVELOPMENT__ && __CLIENT__) {
        finalCreateStore = compose(
            applyMiddleware(...middleware),
            window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
            persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
        )(createStore);
    } else if (__CLIENT__) {
        return finalCreateStore(
            combined,
            window.__initialState
        );
    } else {
        finalCreateStore = compose(
            applyMiddleware(...middleware)
        )(createStore);
    }
    return finalCreateStore(combined);
}
