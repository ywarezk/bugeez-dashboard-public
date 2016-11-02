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
import {Store} from 'redux';
declare var global : {__DEVELOPMENT__};

interface IHtmlPropTypes {
    component : string;
    store : Store<null>;
    assets : {app: {js : string, css : string}};
}

export class Html extends React.Component<IHtmlPropTypes, null> {

    public render() {
        const { component, store, assets } = this.props;
        const head = Helmet.rewind();
        const globals = `
            window.__DEVELOPMENT__=${global.__DEVELOPMENT__};
            window.__CLIENT__= true;
        `;
        return (
            <html lang='en'>
                <head>
                    {head.title.toComponent()}
                    {head.meta.toComponent()}
                    <link type='text/css' rel='stylesheet' href={assets.app.css} />
                    <link
                        href='https://fonts.googleapis.com/css?family=Open+Sans:400italic,600italic,700italic,700,600,400'
                        rel='stylesheet' type='text/css' />
                </head>
                <body>
                    <script
                        dangerouslySetInnerHTML={{ __html: `window.__initialState=${JSON.stringify(store.getState())};${globals}` }}
                        charSet='UTF-8' />
                    <div id='nz-content' dangerouslySetInnerHTML={{ __html: component }} />
                    <script src={assets.app.js} />
                </body>
            </html>
        );
    }
}
