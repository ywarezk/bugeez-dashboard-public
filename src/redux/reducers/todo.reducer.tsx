/**
 * reducer for the todo list
 *
 * Created October 13th, 2016
 * @author: ywarezk
 * @version: 1.0
 * @copyright: Nerdeez Ltd
 */

import { ADD_TODO, SET_TODO_LIST } from '../actions/todo.actions.tsx';
import { Task } from '../../models/task.model.tsx';
import { IAction } from '../actions/action.interface.tsx';

interface ITodoState {
    todos : Task[];
}

const initialState : ITodoState = {
    todos: []
};

export function todo(state : ITodoState = initialState, action : IAction) : ITodoState {
    const newArray = [...state.todos];
    switch (action.type) {
        case ADD_TODO:
            newArray.push(action.payload);
            return Object.assign({}, state, {
                todos: newArray
            });
        case SET_TODO_LIST:
            return Object.assign({}, state, {
                todos: action.payload
            });
        default:
            return state;
    }
}
