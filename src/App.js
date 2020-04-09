import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Player from './Player';
import Header from './Header';
import Profile from './Profile';
import About from './About';

class App extends Component {

  render() {
    return (
  <BrowserRouter>
    <Header />
    <Switch>

      <Route exact path='/profile' component={Profile} />
      <Route exact path='/about' component={About} />
      <Route path='/' component={Player} />} />
    
    </Switch>
  </BrowserRouter>

    );
  }
}

export default App;
