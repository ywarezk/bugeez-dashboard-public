/**
 * users reducer
 *
 * Created November 2nd, 2016
 * @author: ywarezk
 * @version: 1.0
 * @copyright: Nerdeez Ltd
 */

import {User} from '../../models/User.model';
import {SET_USER} from '../actions/user.actions.tsx';
import {IAction} from '../actions/action.interface';

interface IUserState {
    user : User;
}

const initialState : IUserState = {
    user: null
};

export function userReducer(state : IUserState = initialState, action : IAction) {
    switch (action.payload) {
        case SET_USER:
            return Object.assign({}, state, {
                user : action.payload
            });
        default:
            return state;
    }
}
