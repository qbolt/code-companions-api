// React imports
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

// Links react store to redux components
import { Provider } from 'react-redux'

// Component imports
import Layout from './components/Layout'
import App from './components/App'
import Home from './components/Home'

// Root render component. Renders all of our components within the specified routes.
// Provider provides the store to all of the components within the application.
// (The store is what gives us access to the state via dispatching actions and store.getState())
const Root = ({ store }) => (
    <Provider store={store}>
        <Router>
            <Layout>
                <Route exact path="/" component={Home}></Route>
                <Route path="/login" component={App}></Route>
            </Layout>
        </Router>
    </Provider>
)

export default Root