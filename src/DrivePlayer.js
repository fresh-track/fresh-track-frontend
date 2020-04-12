import React, { Component } from 'react'
import Player from './Player'
import request from 'superagent'

const grabDrive = async (user) => {
  const driveGet = await request.get(`${process.env.REACT_APP_DB_URL}/api/v1/user/${user}`);
  const driveToObject = driveGet.body;
  let driveConvert = driveToObject.drives;
  if (driveConvert < 1) {
    const newDriveGet = await request.get(`http://fresh-track-staging.herokuapp.com/api/v1/drive/all`);
    driveConvert = newDriveGet.body;
  }
  const randomDrive = Math.floor(Math.random() * driveConvert.length);
  return driveConvert[randomDrive];
}

// give function a more relevant name
// it doesnt render anything
function getAudioList(drive) {
  const driveArr = drive.audioFiles;
  // exit early if conditions aren't right.
  // makes code read easier
  if(!driveArr.length) return null;
  
  return driveArr.map((value, index) => ({
      name: value.name, // this is already a string
      singer: drive.driveFolder, // this is already a string
      cover: 'https://emby.media/community/uploads/inline/355992/5c1cc71abf1ee_genericcoverart.jpg',
      musicSrc: () => {
        // return fetch(`${value.url}`, {
          return fetch(`https://fresh-track-anywhere.herokuapp.com/${value.url}`, {
          headers: {
            origin: null
          }
        })
          .then(res => res.blob())
          .then(blob => URL.createObjectURL(blob));
      },
  }));
};

export default class DrivePlayer extends Component {
  state = { audioList: null }
  async componentDidMount() {
    const drive = await grabDrive(this.props.match.params.friendId || this.props.user._id);
    // don't need to await this getAudioList is not async
    const audioList = getAudioList(drive);
    this.setState({ audioList });
  }

  render() {
    return (
      <>
        {this.state.audioList && <Player user = { this.props.user } audioList = { this.state.audioList } />}
      </>
    )
  }
}

// https://alchemy-anywhere.herokuapp.com/
// https://cors-anywhere.herokuapp.com/
// https://fresh-track-anywhere.herokuapp.com/
// https://fresh-track-anywhere-2.herokuapp.com/
