import React from 'react';
// import Waveform from './Waveform.js';
// import Login from './Login';
import Profile from './Profile'
// import Header from './Header.js';
// import './App.css';
import { 
    BrowserRouter, 
    Route,
    Redirect,
 } from 'react-router-dom';

// const isLoggedIn = () => JSON.parse(localStorage.getItem('user'));

export default class App extends React.Component {
  render () {
    return(
    // <div className="App">

    //     <BrowserRouter>
    //         <Route path="/" render={() =>
    //         isLoggedIn()
    //             ? <Waveform />
    //             : <Redirect to='/login' />  
    //       }/>
    //         <Route path='/login' component={Login} />       
    //     </BrowserRouter>
    // </div>
<div className="App">

<BrowserRouter>
    <Route path="/" render={() =>
     <Redirect to='/profile' />  
  }/>
    <Route path='/profile' component={Profile} />       
</BrowserRouter>
</div> 
    );
  }
}
