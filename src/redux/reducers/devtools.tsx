/**
 * reducer for the show devtools
 *
 * Created October 25th, 2016
 * @author: ywarezk
 * @version: 1.0
 * @copyright: Nerdeez Ltd
 */

import { TOGGLE_DEVTOOLS } from '../actions/devtools';

const initialState = {
    isShowDevTools: false,
};

export default function devtoolsReducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_DEVTOOLS:
            return {
                ...state,
                isShowDevTools: action.payload,
            };
        default:
            return state;
    }
}
