import React, { Component } from 'react';

export default class UserFolder extends Component {
  render() {
  const contents = this.props.folder.audioFiles.map(file => <a href={`${file.url}`} target="_blank" rel="noopener noreferrer"><li>{file.name}</li></a>)   
    return (
      <div className="folderdiv">
        <p>{this.props.folder.driveFolder}</p>
        <ul>
          {contents}
        </ul>  
      </div>
    )
  }
}
