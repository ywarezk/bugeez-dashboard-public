/**
 * creating the redux dev tools component
 *
 * Created October 24th, 2016
 * @author: ywarezk
 * @version: 1.0
 * @copyright: Nerdeez Ltd
 */

/*=========================
 * begin imports
 *=========================*/

/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

/*=========================
 * end imports
 *=========================*/

export const DevTools =  createDevTools(
    <DockMonitor
      toggleVisibilityKey='ctrl-H'
      changePositionKey='ctrl-Q'
    >
        <LogMonitor />
    </DockMonitor>
);
