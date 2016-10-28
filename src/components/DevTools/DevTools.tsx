/**
 * creating the redux dev tools component
 *
 * Created October 24th, 2016
 * @author: ywarezk
 * @version: 1.0
 * @copyright: Nerdeez Ltd
 */

import * as React from 'react';
import { createDevTools } from 'redux-devtools';
import * as LogMonitor from 'redux-devtools-log-monitor';
import * as DockMonitor from 'redux-devtools-dock-monitor';

export default createDevTools(
    <DockMonitor
      toggleVisibilityKey="ctrl-H"
      changePositionKey="ctrl-Q"
    >
        <LogMonitor />
    </DockMonitor>
);
