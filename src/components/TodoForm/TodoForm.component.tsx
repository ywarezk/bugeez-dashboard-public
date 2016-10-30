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

interface TodoFormPropTypes {
    addTodo(text : string) : any;
}

class TodoFormImpl extends React.Component<TodoFormPropTypes, null> {
    private _todoInput : any;

    constructor() {
        super();
        this._addTodo = this._addTodo.bind(this);
    }

    _addTodo(event) {
        const text = this._todoInput.value;
        this.props.addTodo(text);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this._addTodo}>
                <div>
                    <label htmlFor='todo'>
                        Todo Item:
                    </label>
                    <input id='todo' ref={(inputDom) => { this._todoInput = inputDom; }} />
                </div>
                <div>
                    <button type='submit'>Submit</button>
                </div>
            </form>
        );
    }
}

export const TodoForm : React.ComponentClass = connect(
    null,
    dispatch => ({
        addTodo: todo => dispatch(addTodo(todo))
    })
)(TodoFormImpl);
