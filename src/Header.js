import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './Header.css';

export default class Header extends Component {
  render() {
    return (
      <div>
        <div className="main-title">fresh-track</div>
        <Link to='/'>player</Link> <></>
        <Link to='/profile'>profile</Link> <></>
        <Link to='/about'>about</Link> <></>
      </div>
    )
  }
}
