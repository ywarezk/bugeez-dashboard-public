/**
 * Contains the model for a task object
 *
 * Created October 30th, 2016
 * @author: ywarezk
 * @version: 1.0
 * @copyright: Nerdeez Ltd
 */

export interface Task {
    id? : number,
    title : string,
    description : string,
    group : string,
    date : string
}
