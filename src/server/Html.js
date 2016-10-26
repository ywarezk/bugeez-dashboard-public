/**
 * Component to create the index file
 *
 * Created October 9th, 2016
 * @author: ywarezk
 * @version: 1.0
 * @copyright: Nerdeez Ltd
 */

import React from 'react';
import Helmet from 'react-helmet';
import serialize from 'serialize-javascript';

export default class Html extends React.Component {
    static propTypes = {
        component: React.PropTypes.string,
        store: React.PropTypes.object,
    }

    render() {
        const { component, store } = this.props;
        const head = Helmet.rewind();
        const globals = `
            window.__DEVELOPMENT__=${global.__DEVELOPMENT__};
            window.__CLIENT__= true;
        `;
        return (
            <html lang="en">
                <head>
                    {head.title.toComponent()}
                    {head.meta.toComponent()}
                    <link rel="stylesheet" href="/assets/styles.css" />
                </head>
                <body>
                    <script dangerouslySetInnerHTML={{ __html: `window.__initialState=${serialize(store.getState())};${globals}` }} charSet="UTF-8" />
                    <div id="nz-content" dangerouslySetInnerHTML={{ __html: component }} />
                </body>
            </html>
        );
    }
}
