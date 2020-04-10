import React from 'react';
import Home from './Home';
import Login from './Login';
import Header from './Header';
import Profile from './Profile';
import About from './About';
import PrivateRoute from './PrivateRoute.js';

import { 
    BrowserRouter, 
    Route,
    Switch
 } from 'react-router-dom';
import DrivePlayer from './DrivePlayer';

export default class App extends React.Component {
  state = { user: JSON.parse(localStorage.getItem('user')) };

  setUser = user => {
    this.setState({ user: user.body })
  }

  render () {
    return(
    <div className="App">
        <BrowserRouter>
        <Header user={this.state.user} setUser={this.setUser}/>
            <Switch>
            <Route exact path ="/" component ={Home} />
            <PrivateRoute exact path="/player/:friendId?" component={DrivePlayer} user={this.state.user}/>
            <Route exact path="/login" render={(props) => <Login {...props} setUser={this.setUser} user={this.state.user}/>}  />
            <PrivateRoute exact path='/profile' component={Profile} user={this.state.user}/>
            <Route exact path='/about' component={About} />
          </Switch>     
        </BrowserRouter>
    </div>
    );
  }
}
