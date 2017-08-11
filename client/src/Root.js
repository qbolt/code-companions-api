// React imports
import React from 'react';
import { HashRouter, Route } from 'react-router-dom'

// Links react store to redux components
import { Provider } from 'react-redux'

// Component imports
import App from './components/App'

// Root render component. Renders all of our components within the specified routes.
// Provider provides the store to all of the components within the application.
// (The store is what gives us access to the state via dispatching actions and store.getState())
const Root = ({ store }) => (
    <Provider store={store}>
        <HashRouter>
            <Route path="/" component={App}>

            </Route>
        </HashRouter>
    </Provider>
)

export default Root