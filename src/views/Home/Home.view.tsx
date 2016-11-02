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
import {TodoList} from '../../components/TodoList/TodoList.component.tsx';
import {TodoForm} from '../../components/TodoForm/TodoForm.component.tsx';
import {SearchList} from '../../components/SearchList/SearchList.component.tsx';

export class Home extends React.Component<null, null> {
    public render() {
        return (
            <div>
                <Helmet
                  title='Homepage'
                />
                <h1>Welcome to the homepage <i className='fa fa-plane' /></h1>
                <h3>Checking bootstrap</h3>
                <div className='container'>
                    <div className='row'>
                        <div className='col-xs-12'>
                            <div className='alert-danger alert'>
                                Danger will robinson!
                            </div>
                        </div>
                    </div>
                </div>
                <TodoForm />
                <SearchList />
                <TodoList />
            </div>
        );
    }
}
