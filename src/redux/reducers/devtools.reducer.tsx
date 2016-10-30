/**
 * reducer for the show devtools
 *
 * Created October 25th, 2016
 * @author: ywarezk
 * @version: 1.0
 * @copyright: Nerdeez Ltd
 */

import { TOGGLE_DEVTOOLS } from '../actions/devtools.actions.tsx';
import { IAction } from '../actions/action.interface.tsx';

interface IDevToolsState {
    isShowDevTools : boolean;
}

const initialState : IDevToolsState = {
    isShowDevTools: false
};

export function devtools(state : IDevToolsState = initialState, action : IAction) : IDevToolsState {
    switch (action.type) {
        case TOGGLE_DEVTOOLS:
            return Object.assign({}, state, {
                isShowDevTools: action.payload
            });
        default:
            return state;
    }
}
