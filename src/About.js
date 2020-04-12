import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faBandcamp } from '@fortawesome/free-brands-svg-icons';
import './About.css';

// create components to prevent duplicate jsx
const Developer = ({ name, linkedin, github, img }) => (
  <div className="photo">
    <h2>{name}</h2>
    <img src={img} alt={name} />
    <div className="social-icons">
      <a href={`https://www.linkedin.com/in/${linkedin}/`} className="Linkedin social" target="_blank" rel="noopener noreferrer" >
        <FontAwesomeIcon icon={faLinkedin} size="2x" />
      </a>
      <a href={`https://github.com/${github}`} className="GitHub social" target="_blank" rel="noopener noreferrer" >
        <FontAwesomeIcon icon={faGithub} size="2x" />
      </a>
    </div>
  </div>
)

export default class About extends Component {
  render() {
    return (
      <div className="about-container">
        
        <h1>fresh-track trio</h1>
        
        <p> 
        Fresh-track is brought to you by a group of Portland, Oregon based developers dedicated to bringing musicians and music lovers a new kind of music sharing experience. 
        </p>
       
        <div className="team-container">
          <Developer name="chris ficht"
            img="Chris_Ficht.jpg"
            linkedin="chrisficht"
            github="cficht" />

          <Developer name="mikey romay"
            img="Mikey_Romay.jpg"
            linkedin="michaelromay"
            github="mikeymasonic" />

          <Developer name="will piro"
            img="Will_Piro.jpg"
            linkedin="willpiro"
            github="shaka2pass" />     
            
        </div>
      </div>
                   
    )
  }
}
