/**
 * Layout for the homepage
 *
 * Created October 10th, 2016
 * @author: ywarezk
 * @version: 1.0
 * @copyright: Nerdeez Ltd
 */

import * as React from 'react';
import * as Helmet from 'react-helmet';
import {TodoList} from '../../components/TodoList/TodoList.tsx';
import {TodoForm} from '../../components/TodoForm/TodoForm.tsx';
import {SearchList} from '../../components/SearchList/SearchList.tsx';

export class Home extends React.Component<null, null> {
    public render() {
        return (
            <div>
                <Helmet
                  title='Homepage'
                />
                <h1>Welcome to the homepage <i className='fa fa-plane' /></h1>
                <TodoForm />
                <SearchList />
                <TodoList />
            </div>
        );
    }
}
