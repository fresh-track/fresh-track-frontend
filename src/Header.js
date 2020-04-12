import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import './Header.css';

// create components over creating methods that return jsx
const LogOut = ({ handleLogOut }) = (
  <div className="login-div" onClick={handleLogOut}>
    logout
  </div>
)

export default class Header extends Component {

  logOutButton = () => {
    if (this.props.user) return ;
  }

  handleLogOut = () => {
    localStorage.clear();
    this.props.setUser(null);
  }
  render() {
    return (
      <div className="mainHeader">
      <div className="main-title"><Link to='/player'> fresh-track </Link>
      <Link to='/player'><img className="corp-logo" src='../fresh-track-logo.png' alt="corp-logo" height="40rem" width="50rem" /></Link></div>
      <div className="navBar">
        <div className="link"><Link to='/'> home </Link></div>
        <div className="link"><Link to='/player'> player </Link></div>
        <div className="link"><Link to='/profile'> profile </Link></div>
        <div className="link"><Link to='/about'> about </Link></div>
        <a href="https://github.com/fresh-track" className="teamGitHubLink" target="_blank" rel="noopener noreferrer" >github
        <FontAwesomeIcon icon={faGithub} size="1x" /></a> 
        <div><LogOut handleLogOut={this.handleLogOut} /></div>
      </div>
      </div>
    )
  }
}
