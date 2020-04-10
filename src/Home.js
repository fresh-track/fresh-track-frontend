import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import './Home.css';

export default class Home extends Component {
  render() {
    return (
      
      <div className="Home-container">
        
        <h1 className ="company-name">fresh-track</h1>
        
          <p className="company-description"> 
           Fresh-track is a unique file repository that allows artists to listen to, share, and collaborate on their unreleased and released music from their Soundcloud, Bandcamp and Google Drive music libraries all into one place.
          </p>
       
        <div className="logo-container">
          <div className="team-description">
            <h2 className="get-started">Click on the fresh-track icon to get started!</h2>
            <Link to='/player'><img className="corpo-logo" src='fresh-track-logo.png' alt="fresh-track-logo" /></Link>
          </div>            
        </div>
      </div>
                   
    )
  }
}