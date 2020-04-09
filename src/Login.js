import React, { Component } from 'react'
import request from 'superagent';
import './Login.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={10} variant="filled" {...props} />;
}

export default class Login extends Component {
    state = {
        usernameSignIn: '',
        usernameSignUp: '',
        emailSignIn: '',
        emailSignUp: '',
        passwordSignIn: '',
        passwordSignUp: '',
        logged: true,
        open: false
    }

    // openSB = () => {
    //     this.setState({ open: true })
    // };

    closeSB = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ open: false })
    };

    signUpOrLogin = () => {
        if (!this.state.logged) {
            return <div className="signlogdiv">
                <TextField id="standard-basic" label="Username" className="signUpUsername" input type="username" value={this.state.usernameSignUp} onChange={(e) => this.setState({ usernameSignUp: e.target.value })} />
                <TextField id="standard-basic" label="Email" className="signUpEmail" input type="email" value={this.state.emailSignUp} onChange={(e) => this.setState({ emailSignUp: e.target.value })} />
                <TextField id="standard-password-input" label="Password" type="password" autoComplete="current-password" value={this.state.passwordSignUp} onChange={(e) => this.setState({ passwordSignUp: e.target.value })} />
                <Button variant="contained" color="primary" size="small" className="button" onClick={this.handleSignUp}>Sign up</Button>
            </div>
        } else {
            return <div className="signlogdiv">
                <TextField id="standard-basic" label="Email" className="signInEmail" type="email" value={this.state.emailSignIn} onChange={(e) => this.setState({ emailSignIn: e.target.value })} />
                <TextField id="standard-password-input" label="Password" type="password" autoComplete="current-password" value={this.state.passwordSignIn} onChange={(e) => this.setState({ passwordSignIn: e.target.value })} />
                <Button variant="contained" color="primary" size="small" className="button" onClick={this.handleSignIn}>Login</Button>
            </div>
        }
    }

    handleSignIn = async () => {
        try {
            const signIn = await request.post(`${process.env.REACT_APP_DB_AUTH_URL}/login`, {
                email: this.state.emailSignIn,
                password: this.state.passwordSignIn,
            })
            localStorage.setItem('user', JSON.stringify(signIn.body));
            this.props.setUser(signIn);
            this.props.history.push('/');

        } catch (err) {
            this.setState({ responseError: err })
            this.setState({ open: true })
        }
    }

    handleSignUp = async () => {
        try {
            const signUp = await request.post(`${process.env.REACT_APP_DB_AUTH_URL}/signup`, {
                username: this.state.usernameSignUp,
                email: this.state.emailSignUp,
                password: this.state.passwordSignUp,
            })
            localStorage.setItem('user', JSON.stringify(signUp.body));
            this.props.setUser(signUp);
            this.props.history.push('/');
        } catch (err) {
            this.setState({ responseError: err })
            this.setState({ open: true })
        }
    }

    logOutButton = () => {
        if (this.props.user) return <div className="login-div"><Button variant="contained" color="secondary" size="small" className="button" onClick={e => this.handleLogOut()}>Logout</Button></div>;
    }

    handleLogOut = () => {
        localStorage.clear();
        this.props.setUser({ body: null });
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="signInSignUp">
                <Button variant="contained" color="secondary" size="small" onClick={e => this.setState({logged: !this.state.logged})}>{this.state.logged ? "Create an Account": "Go to Login"}</Button>
                {this.signUpOrLogin()}
                {this.logOutButton()}
                <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.closeSB}>
                    <Alert onClose={this.closeSB} severity="warning">Error</Alert>
                </Snackbar>
            </div>
        )
    }
}
