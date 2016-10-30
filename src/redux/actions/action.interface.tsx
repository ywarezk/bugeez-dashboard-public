/**
 * Interface for the action will be here
 *
 * Created October 29th, 2016
 * @author: ywarezk
 * @version: 1.0
 * @copyright: Nerdeez
 */

export interface Action {
    type : string,
    payload?: any,
    error? : boolean,
    meta?: any
}