import React from 'react';
import Player from './Player';
import Login from './Login';
import Header from './Header';
import Profile from './Profile';
import About from './About';
import PrivateRoute from './PrivateRoute.js';
// import Header from './Header.js';
// import './App.css';
import { 
    BrowserRouter, 
    Route,
    Switch
 } from 'react-router-dom';

export default class App extends React.Component {
  state = { user: JSON.parse(localStorage.getItem('user')) };

  setUser = user => {
    this.setState({ user: user.body })
  }

  render () {
    return(
    <div className="App">
        <Header />
        <BrowserRouter>
            <Switch>
            <PrivateRoute exact path="/" component={Player} user={this.state.user}/>
            <Route exact path="/login" render={(props) => <Login {...props} setUser={this.setUser} user={this.state.user}/>}  />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/about' component={About} />
          </Switch>     
        </BrowserRouter>
    </div>
    );
  }
}
