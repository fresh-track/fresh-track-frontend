import React from 'react';
import Waveform from './Waveform.js';
import Login from './Login';
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
        <BrowserRouter>
            <Switch>
            <PrivateRoute exact path="/" component={Waveform} user={this.state.user}/>
            <Route exact path="/login" render={(props) => <Login {...props} setUser={this.setUser} user={this.state.user}/>}  />
          </Switch>     
        </BrowserRouter>
    </div>
    );
  }
}
