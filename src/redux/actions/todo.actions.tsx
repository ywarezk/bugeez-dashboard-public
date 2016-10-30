/**
 * Action creators for the todo list
 *
 * Created October 12th, 2016
 * @author: ywarezk
 * @version: 1.0
 * @copyright: Nerdeez Ltd
 */

/*=========================
 * begin imports
 *=========================*/

import { IAction } from './action.interface';
import { Task } from '../../models/task.model';

/*=========================
 * end imports
 *=========================*/

/*=========================
 * begin constants
 *=========================*/

export const ADD_TODO : string = 'ADD_TODO';
export const SET_TODO_LIST : string = 'SET_TODO_LIST';
export const GET_TODO_LIST : string = 'GET_TODO_LIST';
export const SEARCH_TODO : string = 'SEARCH_TODO';

/*=========================
 * end constants
 *=========================*/

/*=========================
 * begin actions
 *=========================*/

/**
 * add todo to the state array of todos
 * @param {string} todo - the todo item to add
 * @returns {{type: string, payload: *}}
 */
export function addTodo(todo : Task) : IAction {
    return {
        type: ADD_TODO,
        payload: todo
    };
}

/**
 * action creator to change the todos with new array
 * @param {Array<Task>} todos - array of todos
 * @returns {{type, payload: *}}
 */
export function setTodos(todos : Task[]) : IAction {
    return {
        type: SET_TODO_LIST,
        payload: todos
    };
}

/**
 * gets the full todo list tasks
 * the call to the server will be in the epic
 */
export function getTodoList() : IAction {
    return { type: GET_TODO_LIST };
}

/**
 * will start the search in our task list
 * @param {String} search
 * @returns {{type: string, payload: *}}
 */
export function searchTodoList(search : string) : IAction {
    return {
        type: SEARCH_TODO,
        payload: search
    };
}

/*=========================
 * end actions
 *=========================*/
