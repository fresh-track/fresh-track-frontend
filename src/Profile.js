import React, { Component } from 'react'
import request from 'superagent';
import './Profile.css'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import UserFolder from './UserFolder';
import FriendFolder from './FriendFolder';

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
    open: false,
    userFolders: [],
    friendFolders: []
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
    this.props.history.push('/profile');
  } catch (err) {
    this.setState({ open: true })
  }
}

handleGetFolders = async (userInfo) => {
  let friendFolders = [];
  const user = await request.get(`${process.env.REACT_APP_DB_URL}/api/v1/user/${userInfo._id}`).withCredentials();
  this.setState({ userFolders: user.body.drives })
  const userMatch = await request.get(`${process.env.REACT_APP_DB_URL}/api/v1/user/friend-folders`).withCredentials();
  userMatch.body.forEach(userM => {
    if (userM._id === userInfo._id) {
      friendFolders = userM.friendFolders;
    }
  })
  this.setState({ friendFolders: friendFolders })
}

componentDidMount() {
  this.setState({ user: this.props.user })
  this.handleGetFolders(this.props.user)
}

  render() {
    const userFolderNodes = this.state.userFolders.map(folder => <UserFolder folder={folder}></UserFolder>);
  const friendFolderNodes = this.state.friendFolders.map(folder => { 
    console.log(folder.userRef);
    console.log(this.state.user.followedUsers)
    let friendName;
    this.state.user.followedUsers.forEach(followedUser => {
      console.log(followedUser.friendId)
      if(followedUser.friendId === folder.userRef) friendName = followedUser.friend
    }) 
    return <FriendFolder folder={folder} friendName={friendName}></FriendFolder> 
  });
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
        <div className="userfolderdiv">
          <h2>{this.state.user.username}'s Folders</h2>
          {userFolderNodes}
        </div>
        <div className="userfolderdiv">
          <h2>Friend Folders</h2>
          {friendFolderNodes}
        </div>
        <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.closeSB}>
                    <Alert onClose={this.closeSB} severity="warning">User does not exist</Alert>
                </Snackbar>
      </div>
    )
  }
}
