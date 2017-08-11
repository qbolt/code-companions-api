import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import './index.sass';
import registerServiceWorker from './registerServiceWorker';

const app = document.getElementById('root');

ReactDOM.render(
    <Router>
        <Route path="/">
            <h1>Test</h1>
        </Route>
    </Router>,
app);

registerServiceWorker();
