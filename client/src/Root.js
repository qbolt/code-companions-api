// React imports
import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'

// Links react store to redux components
import { Provider } from 'react-redux'

// Component imports
import App from './components/App'
import Login from './components/Login'

// Root render component. Renders all of our components within the specified routes.
// Provider provides the store to all of the components within the application.
// (The store is what gives us access to the state via dispatching actions and store.getState())
const Root = ({ store }) => (
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route component={App}/>
            </Switch>
        </Router>
    </Provider>
)

export default Root