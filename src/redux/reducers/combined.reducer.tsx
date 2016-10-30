/**
 * mash all the reducers together
 *
 * Created October 16th, 2016
 * @version: 1.0
 * @copyright: Nerdeez Ltd
 * @author: ywarezk
 */

/*=======================
 * begin imports
 *=======================*/

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { todo } from './todo.reducer.tsx';
import { devtools } from './devtools.reducer.tsx';

/*=======================
 * end imports
 *=======================*/

/*=======================
 * begin reducer
 *=======================*/

export const combined = combineReducers({
    devtools,
    todo,
    routing: routerReducer
});

/*=======================
 * end reducer
 *=======================*/
