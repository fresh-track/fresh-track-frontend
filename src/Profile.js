import React, { Component } from 'react'
import request from 'superagent';
import './Profile.css'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={10} variant="filled" {...props} />;
}

export default class Profile extends Component {
  state = {
    user: '',
    soundcloudUsername: '',
    bandcampUsername: '',
    driveFolder: '',
    friend: '',
    open: false
}

closeSB = (event, reason) => {
  if (reason === 'clickaway') {
      return;
  }
  this.setState({ open: false })
};

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
  try {
    const updateProfile = await request.put(`${process.env.REACT_APP_DB_URL}/api/v1/user/${this.state.friend}`).withCredentials();
    localStorage.setItem('user', JSON.stringify(updateProfile.body));
    this.props.history.push('/player');
  } catch (err) {
    this.setState({ open: true })
  }
}

componentDidMount() {
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
        <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.closeSB}>
                    <Alert onClose={this.closeSB} severity="warning">User does not exist</Alert>
                </Snackbar>
      </div>
    )
  }
}
