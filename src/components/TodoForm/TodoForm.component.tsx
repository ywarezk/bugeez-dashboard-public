/**
 * Component with the form to create
 * a todo item
 *
 * Created October 13th, 2016
 * @author: ywarezk
 * @version: 1.0
 * @copyright: Nerdeez Ltd
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../../redux/actions/todo.actions.tsx';
import { IAction } from '../../redux/actions/action.interface';

interface ITodoFormPropTypes {
    addTodo(text : string) : IAction;
}

class TodoFormImpl extends React.Component<ITodoFormPropTypes, null> {
    private _todoInput : HTMLInputElement;

    constructor() {
        super();
        this._addTodo = this._addTodo.bind(this);
    }

    private _addTodo(event : React.FormEvent<HTMLFormElement>) {
        const text = this._todoInput.value;
        this.props.addTodo(text);
        event.preventDefault();
    }

    public render() {
        return (
            <form onSubmit={this._addTodo}>
                <div>
                    <label htmlFor='todo'>
                        Todo Item:
                    </label>
                    <input id='todo' ref={(inputDom : HTMLInputElement) => { this._todoInput = inputDom; }} />
                </div>
                <div>
                    <button type='submit'>Submit</button>
                </div>
            </form>
        );
    }
}

export const TodoForm = connect(
    null,
    dispatch => ({
        addTodo: todo => dispatch(addTodo(todo))
    })
)(TodoFormImpl);
