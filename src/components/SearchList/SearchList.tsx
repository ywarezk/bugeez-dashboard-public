/**
 * Component to search the list of
 * tasks
 *
 * Created October 18th, 2016
 * @author: ywarezk
 * @version: 1.0
 * @copyright: Nerdeez
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { searchTodoList } from '../../redux/actions/todo';

interface SearchListPropTypes {
    searchTodoList() : any
}

@connect(
    null,
    dispatch => ({
        searchTodoList: search => dispatch(searchTodoList(search)),
    })
)
export default class SearchList extends React.Component<SearchListPropTypes, any> {
    private _searchInput : any

    constructor() {
        super();
        this.searchChanged = this.searchChanged.bind(this);
    }

    /**
     * when the user types search in the search box
     */
    searchChanged() {
        const search = this._searchInput.value;
        this.props.searchTodoList(search);
    }

    render() {
        return (
            <div>
                <form>
                    <label htmlFor="search">
                        Search:
                    </label>
                    <input onChange={this.searchChanged} id="search" ref={(nodeElement) => { this._searchInput = nodeElement; }} />
                </form>
            </div>
        );
    }
}
