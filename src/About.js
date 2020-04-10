import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import './About.css';

export default class About extends Component {
  render() {
    return (
      <div className="about-container">
        
        <h1>fresh-track trio</h1>
        
        <p> 
        Fresh-track is brought to you by a group of Portland, Oregon based developers dedicated to bringing musicians and music lovers a new kind of music sharing experience. 
        </p>
       
        <div className="team-container">

          <div className="photo">
            <h2>chris ficht</h2>
                <img src='Chris_Ficht.jpg' alt="Chris" />
                  <div className="social-icons">
                    <a href="https://www.linkedin.com/in/chrisficht/" className="Linkedin social" target="_blank" rel="noopener noreferrer" >
                       <FontAwesomeIcon icon={faLinkedin} size="2x" /> </a>
                    <a href="https://github.com/cficht" className="GitHub social" target="_blank" rel="noopener noreferrer" >
                       <FontAwesomeIcon icon={faGithub} size="2x" /></a>
                </div>
            </div>            
            

          <div className="photo">
              <h2>mikey romay</h2>
                <img src='Mikey_Romay.jpg' alt="Mikey Romay" />
                  <div className="social-icons">
                    <a href="https://www.linkedin.com/in/michaelromay/" className="Linkedin social" target="_blank" rel="noopener noreferrer" >
                      <FontAwesomeIcon icon={faLinkedin} size="2x" /></a>
                    <a href="https://github.com/mikeymasonic" className="GitHub social" target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon icon={faGithub} size="2x" /></a>
                </div>
          </div>

          <div className="photo">
              <h2>will piro</h2>
                <img src='Will_Piro.jpg' alt="Will" />
                  <div className="social-icons">
                    <a href="https://www.linkedin.com/in/willpiro/" className="Linkedin social" target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon icon={faLinkedin} size="2x" /></a>
                    <a href="https://github.com/shaka2pass" className="GitHub social" target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon icon={faGithub} size="2x" /></a>
                    </div>
                  </div>
        </div>
      </div>
                   
    )
  }
}
