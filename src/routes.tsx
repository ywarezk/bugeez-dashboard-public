/**
 * Application routes will be defined here
 *
 * Created October 10th, 2016
 * @author: ywarezk
 * @version: 1.0
 * @copyright: Nerdeez Ltd
 */

/*====================
 * begin imports
 *====================*/

/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { Route, IndexRoute } from 'react-router';
import * as Layouts from './views/index.tsx';

/*====================
 * end imports
 *====================*/

/*====================
 * begin routes
 *====================*/

export function getRoutes() {
    return (
        <Route path='/' component={Layouts.App}>
            <IndexRoute component={Layouts.Home} />
            <Route path='about' component={Layouts.About} />
        </Route>
    );
}

/*====================
 * end routes
 *====================*/
