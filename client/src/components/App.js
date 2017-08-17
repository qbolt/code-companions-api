import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Home from './Home'

class Application extends Component {

    componentWillMount() {
        if (!this.props.authenticated) {
            this.props.history.push('/login')
        }
    }

    render() {
        return <Home/>
    }
}

const mapStateToProps = (state) => ({
    authenticated: state.auth.authenticated
})

export default connect(mapStateToProps)(withRouter(Application))
