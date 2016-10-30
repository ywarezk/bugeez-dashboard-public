/**
 * epic for the todo actions
 *
 * Created October 18th, 2016
 * @author: ywarezk
 * @version: 1.0
 * @copyright: Nerdeez Ltd
 */

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import { ajax } from 'rxjs/observable/dom/ajax';
import { GET_TODO_LIST, setTodos, SEARCH_TODO } from '../actions/todo.tsx';
import { ActionsObservable } from 'redux-observable';
import { Action } from '../actions/action.interface';
import { Observable } from 'rxjs/Observable';

/**
 * epic to get all the tasks
 * @param {Observable<Action>} actions
 * @returns {Observable<Action>}
 */
export function getAllTasks(actions : ActionsObservable<Action>) : Observable<Action> {
    return actions
        .ofType(GET_TODO_LIST)
        .mergeMap(() => {
            return ajax.get('https://nztodo.herokuapp.com/api/task/?format=json')
                .map((res) => {
                    return setTodos(res.response);
                });
        });
}

/**
 * epic to search for a task
 * @param actions
 * @returns {Observable<Action>}
 */
export function searchTasks(actions : ActionsObservable<Action>) : Observable<Action>{
    return actions
            .ofType(SEARCH_TODO)
            .debounceTime(2000)
            .distinctUntilChanged(action => action.payload)
            .mergeMap((action) => {
                return ajax
                    .get(`https://nztodo.herokuapp.com/api/task/?search=${action.payload}`)
                    .map((res) => {
                        return setTodos(res.response);
                    });
            });
}
