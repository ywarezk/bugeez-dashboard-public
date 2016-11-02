/**
 * model for a bugeez user
 *
 * Created November 2nd, 2016
 * @author: ywarezk
 * @version: 1.0
 * @copyright: Nerdeez Ltd
 */

interface IUser {
    id? : number,
    color : string
}

export class User {

    // public properties
    public color : string;
    public id : number;

    constructor(userJson : IUser){
        this.color = userJson.color;
        this.id = userJson.id;
    }
}