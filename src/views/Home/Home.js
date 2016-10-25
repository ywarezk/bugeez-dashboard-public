/**
 * Layout for the homepage
 *
 * Created October 10th, 2016
 * @author: ywarezk
 * @version: 1.0
 * @copyright: Nerdeez Ltd
 */

import React from 'react';
import Helmet from 'react-helmet';
import TodoList from '../../components/TodoList/TodoList';
import TodoForm from '../../components/TodoForm/TodoForm';
import SearchList from '../../components/SearchList/SearchList';

export default class Home extends React.Component {
    render() {
        return (
            <div>
                <Helmet
                  title="Homepage"
                />
                <h1>Welcome to the homepage <i className="fa fa-plane" /></h1>
                <TodoForm />
                <SearchList />
                <TodoList />
            </div>
        );
    }
}
