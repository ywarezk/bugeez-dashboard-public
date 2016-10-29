/**
 * Component to create the index file
 *
 * Created October 9th, 2016
 * @author: ywarezk
 * @version: 1.0
 * @copyright: Nerdeez Ltd
 */

import * as React from 'react';
import * as Helmet from 'react-helmet';
declare var global : any;

interface HtmlPropTypes {
    component : string,
    store : any,
    assets : any
}

export default class Html extends React.Component<HtmlPropTypes, any> {


    render() {
        const { component, store, assets } = this.props;
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
                    <link type="text/css" rel="stylesheet" href={assets.app.css} />
                </head>
                <body>
                    <script dangerouslySetInnerHTML={{ __html: `window.__initialState=${JSON.stringify(store.getState())};${globals}` }} charSet="UTF-8" />
                    <div id="nz-content" dangerouslySetInnerHTML={{ __html: component }} />
                    <script src={assets.app.js} />
                </body>
            </html>
        );
    }
}
