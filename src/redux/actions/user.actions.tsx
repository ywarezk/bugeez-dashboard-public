/**
 * The actions related to the user
 *
 * Created November 2nd, 2016
 * @author: ywarezk
 * @version: 1.0
 * @copyright: Nerdeez Ltd
 */

/*=========================
 * begin imports
 *=========================*/

import {IAction} from './action.interface';
import {User} from '../../models/User.model';

/*=========================
 * end imports
 *=========================*/

/*=========================
 * begin constants
 *=========================*/

export const GET_USER = 'GET_USER';
export const SET_USER = 'SET_USER';

/*=========================
 * end constants
 *=========================*/

/*=========================
 * begin actions
 *=========================*/

/**
 * when the epic see this action it will ask
 * for the user from the server
 * @returns {{type: string}}
 */
export function getUser() : IAction {
    return {
        type: GET_USER
    };
}

/**
 * after the server returns the user we will
 * call this action
 * @param {User} user
 * @returns {{type: string, payload: User}}
 */
export function setUser(user : User) : IAction {
    return {
        type: SET_USER,
        payload: user
    };
}

/*=========================
 * end actions
 *=========================*/
