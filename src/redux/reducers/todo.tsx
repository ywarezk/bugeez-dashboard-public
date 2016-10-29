/**
 * reducer for the todo list
 *
 * Created October 13th, 2016
 * @author: ywarezk
 * @version: 1.0
 * @copyright: Nerdeez Ltd
 */

import { ADD_TODO, SET_TODO_LIST } from '../actions/todo.tsx';


const initialState = {
    todos: [],
};

export default function todoReducer(state = initialState, action) {
    const newArray = [...state.todos];
    switch (action.type) {
        case ADD_TODO:
            newArray.push(action.payload);
            return Object.assign({}, state, {
                todos: newArray,
            });
        case SET_TODO_LIST:
            return Object.assign({}, state, {
                todos: action.payload,
            });
        default:
            return state;
    }
}

