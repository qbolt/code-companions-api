import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '../redux/actions/auth'

class Secured extends Component {
    logout(e) {
        this.props.onLogout()
        e.preventDefault()
    }

    render() {
        return (
            <section>
                <span>{`Welcome ${this.props.username}`}</span>
                <button onClick={e => this.logout(e)}>Logout</button>
            </section>
        )
    }
}

const mapStateToProps = (state) => ({ username: state.auth.username })
const mapDispatchToProps = (dispatch) => ({ onLogout: () => { dispatch(logout()) }})

export default connect(mapStateToProps, mapDispatchToProps)(Secured)
