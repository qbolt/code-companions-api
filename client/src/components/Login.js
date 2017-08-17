import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom'

import { login } from '../redux/actions/auth';

import logo from '../assets/images/code_companions_logo2.png'

import '../sass/index.sass'
import '../sass/login.sass'

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
        this.props.login(this.state.username, this.state.password, this.props.history);
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
            <main>
                <img id="logo" src={logo} alt="LOGO"/>
                <section id="login-form">
                    <span>{this.state.route}</span>
                    <span>{this.props.message}</span>
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
                <section id="site-info-container">
                    <div id="site-info">
                        <div className="description right">
                            <h3>IMAGE</h3>
                            <div>
                                <h2>How it Works</h2>
                                <p>Code Companions is a platform for collaborating with other developers to work together on awesome projects! We want to make the process of meeting, working with, and tracking progress as convenient and hassle-free as possible. To become a part of the Code_Companion community, click "Sign Up"!</p>
                            </div>

                        </div>
                        <div className="description left">
                            <h3>IMAGE</h3>
                            <div>
                                <h2>The Dashboard</h2>
                                <p>Code Companions is a platform for collaborating with other developers to work together on awesome projects! We want to make the process of meeting, working with, and tracking progress as convenient and hassle-free as possible. To become a part of the Code_Companion community, click "Sign Up"!</p>
                            </div>
                        </div>
                        <div className="description right">
                            <h3>IMAGE</h3>
                            <div>
                                <h2>Applying to Projects</h2>
                                <p>Code Companions is a platform for collaborating with other developers to work together on awesome projects! We want to make the process of meeting, working with, and tracking progress as convenient and hassle-free as possible. To become a part of the Code_Companion community, click "Sign Up"!</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        );
    }
}

const mapStateToProps = (state) => ({ isLoggedIn: state.auth.isLoggedIn, message: state.auth.message })

export default connect(mapStateToProps, { login })(withRouter(Login))
