import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import './Home.css';

export default class Home extends Component {
  render() {
    return (
      <div className="Home-container">
        
        <h1>fresh-track</h1>
        
        <p> 
         Fresh-track is a unique file repository that allows artists to listen to, share, and collaborate by collecting their unreleased and released music from their Soundcloud, Bandcamp and Google Drive  music libraries all into one place.
        </p>
       
        <div className="team-container">

          <div className="team description">
            <h2>ipsum dolorum</h2>
                <img src='fresh-track-logo.png' alt="fresh-track-logo" />
                  <div className="social-icons">
                    <a href="https://github.com/fresh-track" className="GitHub social" target="_blank" rel="noopener noreferrer" >
                       <FontAwesomeIcon icon={faGithub} size="2x" /></a>
                </div>
            </div>            
        </div>
      </div>
                   
    )
  }
}