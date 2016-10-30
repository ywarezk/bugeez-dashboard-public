/**
 * Will display the list of todo items
 *
 * Created October 13th, 2016
 * @author: ywarezk
 * @version: 1.0
 * @copyright: Nerdeez Ltd
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { getTodoList } from '../../redux/actions/todo.actions.tsx';
import { IAction } from '../../redux/actions/action.interface';
import { Task } from '../../models/Task.model.tsx';

interface ITodoListPropTypes {
    todos : Task[];
    getTodoList() : IAction;
}

class TodoListImpl extends React.Component<ITodoListPropTypes, null> {

    /**
     * after component mounts get from the
     * server the list of todos
     */
    public componentDidMount() {
        this.props.getTodoList();
    }

    public render() {
        const { todos } = this.props;
        let counter = 0;
        return (
            <div>
                <ul>
                    {
                        todos.map((item) => {
                            counter += 1;
                            return (<li key={counter}>{item.title}</li>);
                        })
                    }
                </ul>
            </div>
        );
    }
}

export const TodoList = connect(
    state => ({
        todos: state.todoReducer.todos
    }),
    dispatch => ({
        getTodoList: () => dispatch(getTodoList())
    })
)(TodoListImpl);
