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
import { getTodoList } from '../../redux/actions/todo';

interface TodoListPropTypes {
    todos : Array<any>,
    getTodoList() : any
}

@connect(
    state => ({
        todos: state.todoReducer.todos,
    }),
    dispatch => ({
        getTodoList: () => dispatch(getTodoList()),
    })
)
export default class TodoList extends React.Component<TodoListPropTypes, any> {

    /**
     * after component mounts get from the
     * server the list of todos
     */
    componentDidMount() {
        this.props.getTodoList();
    }

    render() {
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
