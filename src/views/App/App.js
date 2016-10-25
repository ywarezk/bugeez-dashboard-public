/**
 * Global layout of our app
 * Containing common components in all the routes
 *
 * Created October 10th, 2016
 * @author: ywarezk
 * @version: 1.0
 * @copyright: Nerdeez
 */

/******************
 * begin imports
 *******************/


import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DevTools from '../../components/DevTools/DevTools';
import * as devToolsActions from '../../redux/actions/devtools';

require('font-awesome/scss/font-awesome.scss');

/******************
 * end imports
 *******************/

@connect(
    state => ({
        isShowDevTools: state.devtoolsReducer.isShowDevTools,
    }),
    dispatch => bindActionCreators(devToolsActions, dispatch)
)
export default class App extends React.Component {
    static propTypes = {
        children: PropTypes.object.isRequired,
        isShowDevTools: PropTypes.bool.isRequired,
        toggleDevtools: PropTypes.func.isRequired,
    }

    /**
     * should render dev tools on the client only
     */
    componentDidMount() {
        if (__DEVELOPMENT__ && !this.props.isShowDevTools) {
            this.props.toggleDevtools(true);
        }
    }

    render() {
        return (
            <div>

                {/* Show dev tools if needed */}
                {
                    (() => {
                        if (this.props.isShowDevTools) {
                            return (<DevTools />);
                        }
                        return null;
                    })()
                }

                {/* begin head configuration */}
                <Helmet
                  titleTemplate="Nerdeez Starter Kit | %s"
                  meta={
                      [
                          {
                              name: 'description',
                              content:
                                `Do it yourself unopinionated starter kit for react redux.
                                The starter kit contains the following:
                                * Server Side Rendering - Universal app
                                * Karma
                                * Mocha
                                * Enzyme
                                * Chai
                                * React-Helmet
                                * React-Router`,
                          },
                      ]
                  }
                />
                {/* end head configuration */}

                {/* begin header */}
                <header>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/" >Home</Link>
                                <Link to="/about" >About</Link>
                            </li>
                        </ul>
                    </nav>
                </header>
                {/* end header */}

                {/* begin content */}
                <div>
                    {this.props.children}
                </div>
                {/* end content */}

                {/* begin footer */}
                <footer>
                    <h3>Footer will be here</h3>
                </footer>
                {/* end footer */}

            </div>
        );
    }
}
