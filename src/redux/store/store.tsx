/**
 * Redux store is created here
 *
 * Created October 13th, 2016
 * @author: ywarezk
 * @version: 1.0
 * @copyright: Nerdeez Ltd
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import * as thunk from 'redux-thunk';
import { persistState } from 'redux-devtools';
import reducer from '../reducers/reducers.tsx';
import { getAllTasks, searchTasks } from '../epics/todo.tsx';
import DevTools from '../../components/DevTools/DevTools.tsx';

declare var __DEVELOPMENT__ : any;
declare var __CLIENT__ : any;

export default function nzCreateStore(history = null) {
    const reduxRouterMiddleware = routerMiddleware(history);
    const middleware = [
        reduxRouterMiddleware,
        thunk,
        createEpicMiddleware(combineEpics(getAllTasks, searchTasks)),
    ];
    let finalCreateStore;
    if (__DEVELOPMENT__ && __CLIENT__) {
        finalCreateStore = compose(
            applyMiddleware(...middleware),
            (window as any).devToolsExtension ? (window as any).devToolsExtension() : DevTools.instrument(),
            persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
        )(createStore);
    } else if (__CLIENT__) {
        return finalCreateStore(
            reducer,
            (window as any).__initialState
        );
    } else {
        finalCreateStore = compose(
            applyMiddleware(...middleware)
        )(createStore);
    }
    return finalCreateStore(reducer);
}
