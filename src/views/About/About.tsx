/**
 * Layout for the about page
 *
 * Created October 10th, 2016
 * @author: ywarezk
 * @version: 1.0
 * @copyright: Nerdeez Ltd
 */

import * as React from 'react';
import * as Helmet from 'react-helmet';

export class About extends React.Component<any, any> {
    render() {
        return (
            <div>
                <Helmet
                  title="About Us"
                />
                <h1>
                    Welcome to the about page
                </h1>
            </div>
        );
    }
}
