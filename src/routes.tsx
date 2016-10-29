/**
 * Application routes will be defined here
 *
 * Created October 10th, 2016
 * @author: ywarezk
 * @version: 1.0
 * @copyright: Nerdeez Ltd
 */

import * as React from 'react';
import { Route, IndexRoute } from 'react-router';
import * as Layouts from './views/index.tsx';

export default () => (
    <Route path="/" component={Layouts.App as any}>
        <IndexRoute component={Layouts.Home as any} />
        <Route path="about" component={Layouts.About as any} />
    </Route>
);

