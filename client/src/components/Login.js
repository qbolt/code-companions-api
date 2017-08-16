import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../redux/actions/auth';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            route: 'Login',
            username: '',
            password: ''
        };
    }

    userLogin(e) {
        console.log('calling action')
        this.props.login(this.state.username, this.state.password);
        e.preventDefault();
    }

    toggleRoute(e) {
        const alt = (this.state.route === 'Login') ? 'SignUp' : 'Login';
        this.setState({ route: alt });
        e.preventDefault();
    }

    render() {
        const alt = (this.state.route === 'Login') ? 'SignUp' : 'Login';
        return (
            <section>
                <span>{this.state.route}</span>
                <input
                    type="email"
                    placeholder='Username'
                    value={this.state.username}
                    onChange={e => this.setState({ username: e.target.value })}/>
                <input
                    type="password"
                    placeholder='Password'
                    value={this.state.password}
                    onChange={e => this.setState({ password: e.target.value })}/>
                <button onClick={e => this.userLogin(e)}>{this.state.route}</button>
                <span style={{ fontSize: 16, color: 'blue' }} onClick={(e) => this.toggleRoute(e)}>{alt}</span>
            </section>
        );
    }
}


const mapStateToProps = (state) => ({ isLoggedIn: state.auth.isLoggedIn })

const mapDispatchToProps = (dispatch) => ({
    login,
    // onSignUp: (username, password) => { dispatch(signup(username, password)); }
})

export default connect(mapStateToProps, { login })(Login);
