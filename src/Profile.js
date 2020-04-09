import React, { Component } from 'react'
import request from 'superagent';
import './Profile.css'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


export default class Profile extends Component {
  state = {
    user: '',
    soundcloudUsername: '',
    bandcampUsername: '',
    driveFolder: '',
    dropboxFolder: '',
}

handleUpdate = async () => {
  const updateProfile = await request.patch(`${process.env.REACT_APP_DB_AUTH_URL}/update/:id`, {
      id: this.state.userId,
      soundcloudProfile: this.state.soundcloudUsername,
      bandcampProfile: this.state.bandcampUsername,
  })
  localStorage.setItem('user', JSON.stringify(updateProfile.body));
  this.props.history.push('/');
}

handleAddDrive = async () => {
  const addDrive = await request.get(`${process.env.REACT_APP_DB_URL}/api/v1/drive/add?driveFolder=${this.state.driveFolder}`).withCredentials();
  window.open(addDrive.text)
}

handleAddDropbox = async () => {
  const updateProfile = await request.post(`${process.env.REACT_APP_DB_URL}/dropbox`)
  localStorage.setItem('user', JSON.stringify(updateProfile.body));
  this.props.history.push('/');
}

  render() {
    return (
      <div className="profilediv">
        <div className="updatediv">
          <TextField id="standard-basic" label="Soundcloud Username" type="text" value={this.state.soundcloudUsername} onChange={(e) => this.setState({ soundcloudUsername: e.target.value })} />
          <TextField id="standard-basic" label="Bandcamp Username" type="text" value={this.state.bandcampUsername} onChange={(e) => this.setState({ bandcampUsername: e.target.value })} />
          <Button variant="contained" color="primary" size="small" className="button" onClick={this.handleUpdate}>Update Profile</Button>
        </div>
        <div className="updatediv">
          <TextField id="standard-basic" label="Google Drive Folder" type="text"  value={this.state.driveFolder} onChange={(e) => this.setState({ driveFolder: e.target.value })} />
          <Button variant="contained" color="primary" size="small" className="button" onClick={this.handleAddDrive}>Add</Button>
        </div>
        <div className="updatediv">
          <TextField id="standard-basic" label="Dropbox Folder" type="text"  value={this.state.dropboxFolder} onChange={(e) => this.setState({ dropboxFolder: e.target.value })} />
          <Button variant="contained" color="primary" size="small" className="button" onClick={this.handleAddDropbox}>Add</Button>
        </div>
      </div>
    )
  }
}
