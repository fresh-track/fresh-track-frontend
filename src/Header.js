import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import './Header.css';

export default class Header extends Component {
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
      <div>
        <div className="main-title">fresh-track</div>
        <Link to='/'>player</Link> <></>
        <Link to='/profile'>profile</Link> <></>
        <Link to='/about'>about</Link> <></>
        {this.logOutButton()}
      </div>
    )
  }
}
