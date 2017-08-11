import React from 'react';
import { render } from 'react-dom';

import registerServiceWorker from './registerServiceWorker';

import Root from './Root'

import store from './redux'

render(
    <Root store={store}/>,
    document.getElementById('root'),
);

registerServiceWorker();
