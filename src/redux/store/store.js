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
import thunk from 'redux-thunk';
import ReduxDevTools from 'redux-devtools';
import reducer from '../reducers/reducers';
import { getAllTasks, searchTasks } from '../epics/todo';
import DevTools from '../../components/DevTools/DevTools';


export default function nzCreateStore(history) {
    const reduxRouterMiddleware = routerMiddleware(history);
    const middleware = [
        reduxRouterMiddleware,
        thunk,
        createEpicMiddleware(combineEpics(getAllTasks, searchTasks)),
    ];
    let finalCreateStore;
    if (__DEVELOPMENT__ && __CLIENT__) {
        const { persistState } = ReduxDevTools;
        finalCreateStore = compose(
            applyMiddleware(...middleware),
            window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
            persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
        )(createStore);
    } else {
        finalCreateStore = compose(
            applyMiddleware(...middleware)
        )(createStore);
    }
    if (__CLIENT__) {
        return finalCreateStore(
            reducer,
            window.__initialState
        );
    }
    return finalCreateStore(reducer);
}
