import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { fab } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

export default class About extends Component {
  render() {
    return (
      <div className="about-container">
        
        <h1> ABOUT OUT TEAM </h1>

        <p> 
        The Fresh Track team is brought to you by a dev trio dedicated to brining music lovers a new kind of music repository for artists to upload, share, and collaborate on their unreleased music tracks from their Soundcloud, Bandcamp, Google Drive and Drop Box music libraries. 
        </p>

        <div className="team-container">

          <div className="photo">
            <h2>Chris Ficht</h2>
                <img src='Chris_Ficht.jpeg' alt="Chris" />
                <div className="socialicons">
                <a href="https://www.linkedin.com/in/chrisficht/" className="Linkedin social" >
                <FontAwesomeIcon icon={faLinkedin} size="2x" /> </a>
                <a href="https://github.com/cficht" className="GitHub social" >
                <FontAwesomeIcon icon={faGithub} size="2x" /></a>
                </div>
                    </div>            

                    <div className="photo">
                        <h2>Mikey Romay</h2>
                        <img src='Mikey_Romay.jpeg' alt="Mikey Romay" />

                        <div className="socialicons">
                            <a href="https://www.linkedin.com/in/michaelromay/" className="Linkedin social" >
                                <FontAwesomeIcon icon={faLinkedin} size="2x" /></a>
                            <a href="https://github.com/mikeymasonic" className="GitHub social">
                                <FontAwesomeIcon icon={faGithub} size="2x" /></a>
                        </div>
                    </div>

                    <div className="photo">
                        <h2>Will Piro</h2>
                        <img src='Will_Piro.jpeg' alt="Will" />

                        <div className="socialicons">
                            <a href="https://www.linkedin.com/in/willpiro/" className="Linkedin social">
                                <FontAwesomeIcon icon={faLinkedin} size="2x" /></a>
                            <a href="https://github.com/shaka2pass" className="GitHub social">
                                <FontAwesomeIcon icon={faGithub} size="2x" /></a>
                        </div>
                    </div>
                </div>
              </div>
                   
    )
  }
}
