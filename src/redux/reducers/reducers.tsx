/**
 * mash all the reducers together
 *
 * Created October 16th, 2016
 * @version: 1.0
 * @copyright: Nerdeez Ltd
 * @author: ywarezk
 */

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import todoReducer from './todo.tsx';
import devtoolsReducer from './devtools.tsx';

export default combineReducers({
    devtoolsReducer,
    todoReducer,
    routing: routerReducer,
});
