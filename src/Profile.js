import React, { Component } from 'react'
import request from 'superagent';

export default class Profile extends Component {
  state = {
    userId: '',
    soundcloudUsername: '',
    bandcampUsername: '',
}

handleUpdate = async () => {
  const updateProfile = await request.post(`${process.env.REACT_APP_DB_AUTH_URL}/update/:id`, {
      id: this.state.userId,
      soundcloudProfile: this.state.soundcloudUsername,
      bandcampProfile: this.state.bandcampUsername,
  })
  localStorage.setItem('user', JSON.stringify(updateProfile.body));
  this.props.history.push('/');
}

  render() {
    return (
      <div>
        <div className = "update">
          <input className = "soundcloudUsername" input type ="text" value={ this.state.soundcloudUsername} onChange={(e) => this.setState({ soundcloudUsername: e.target.value})} />

          <input className = "bandcampUsername" input type ="text" value={ this.state.bandcampUsername} onChange={(e) => this.setState({ bandcampUsername: e.target.value})} />

          <button className = "button" onClick={ this.handleUpdate }>update</button>  
        
          </div>
      </div>
    )
  }
}
