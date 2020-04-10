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
    friend: '',
}

handleUpdate = async () => {
  const updateProfile = await request.patch(`${process.env.REACT_APP_DB_URL}/api/v1/user/${this.state.user._id}`, {
      soundcloudUsername: this.state.soundcloudUsername,
      bandcampUsername: this.state.bandcampUsername,
  }).withCredentials();
  localStorage.setItem('user', JSON.stringify(updateProfile.body));
  this.props.history.push('/');
}

handleAddDrive = async () => {
  const addDrive = await request.get(`${process.env.REACT_APP_DB_URL}/api/v1/drive/add?driveFolder=${this.state.driveFolder}`).withCredentials();
  window.location.href = `${addDrive.text}`;
}

handleAddFriend = async () => {
  const updateProfile = await request.put(`${process.env.REACT_APP_DB_URL}/api/v1/user/${this.state.friend}`).withCredentials();
  localStorage.setItem('user', JSON.stringify(updateProfile.body));
  this.props.history.push('/');
}

componentDidMount() {
  console.log(this.props.user)
  this.setState({ user: this.props.user })
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
          <TextField id="standard-basic" label="Add Friend" type="text"  value={this.state.friend} onChange={(e) => this.setState({ friend: e.target.value })} />
          <Button variant="contained" color="primary" size="small" className="button" onClick={this.handleAddFriend}>Add</Button>
        </div>
      </div>
    )
  }
}
