/**
 * toggle actions for dev tools
 *
 * Created October 25th, 2016
 * @author: ywarezk
 * @version: 1.0
 * @copyright: Nerdeez Ltd
 */

import {Action} from './action.interface';

export const TOGGLE_DEVTOOLS : string = 'TOGGLE_DEVTOOLS';

/**
 * will toggle the dev tools
 * @param {boolean} isShow
 * @returns {{type: string, payload: boolean}}
 */
export function toggleDevtools(isShow : boolean) : Action {
    return {
        type: TOGGLE_DEVTOOLS,
        payload: isShow,
    };
}
