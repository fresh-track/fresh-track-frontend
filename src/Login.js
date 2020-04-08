import React, { Component } from 'react'
import request from 'superagent';

export default class Login extends Component {
    state = {
        usernameSignIn: '',
        usernameSignUp: '',
        emailSignIn: '',
        emailSignUp: '',
        passwordSignIn: '',
        passwordSignUp: '',
    }

    handleSignIn = async () => {
        const signIn = await request.post(`${process.env.REACT_APP_DB_AUTH_URL}/login`, {
            email: this.state.emailSignIn,
            password: this.state.passwordSignIn,
        })
        // alert('you are now logged in');
        localStorage.setItem('user', JSON.stringify(signIn.body));
        this.props.history.push('/');
    }

    handleSignUp = async () => {
        const signUp = await request.post(`${process.env.REACT_APP_DB_AUTH_URL}/signup`, {
            username: this.state.usernameSignUp,
            email: this.state.emailSignUp,
            password: this.state.passwordSignUp,
        })
        // alert('you are now signed up, please login below');
        localStorage.setItem('user', JSON.stringify(signUp.body));
        this.props.history.push('/');
    }

    render() {
        return (
            <div className = "signInSignUp">
                <input className = "signUpUsername" input type ="username" value={ this.state.usernameSignUp} onChange={(e) => this.setState({ usernameSignUp: e.target.value})} />

                <input className = "signUpEmail" input type ="email" value={ this.state.emailSignUp} onChange={(e) => this.setState({ emailSignUp: e.target.value})} />

                <input input type="password" value={ this.state.passwordSignUp} onChange={(e) => this.setState({ passwordSignUp: e.target.value})} />

                <button className = "button" onClick={ this.handleSignUp }>Sign up</button>  
                <br/>
                <input className = "signInEmail" input type ="email" value={ this.state.emailSignIn} onChange={(e) => this.setState({ emailSignIn: e.target.value})} />
                <input input type="password" value={ this.state.passwordSignIn} onChange={(e) => this.setState({ passwordSignIn: e.target.value})} />

                <button className = "button" onClick={this.handleSignIn}>Sign in</button>     
   
                </div>
        )
    }
}
