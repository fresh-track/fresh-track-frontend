import React, { Component } from 'react'
import Player from './Player'
import request from 'superagent'

const grabDrive = async (user) => {
  // const driveGet = this.props.match.params.friendId ? await request.get(`${process.env.REACT_APP_DB_URL}/api/v1/user/${this.props.match.params.friendId}`) : await request.get(`${process.env.REACT_APP_DB_URL}/api/v1/user/${user._id}`);
  console.log(user);
  const driveGet = await request.get(`${process.env.REACT_APP_DB_URL}/api/v1/user/${user}`);
  const driveToObject = (JSON.parse(driveGet.text));
  const randomDrive = Math.floor(Math.random() * driveToObject.drives.length);
  return driveToObject.drives[randomDrive];
}

function driveRender(drive){
  // console.log(drive)
  const driveArr = drive.audioFiles;
  // console.log(drive)
  if(driveArr.length > 0){
    return driveArr.map((value, index) => {
      return {
        name: `${value.name}`,
        singer: `${drive.driveFolder}`,
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
    }})
  }
};

export default class DrivePlayer extends Component {
  state = { audioList: null }
  async componentDidMount() {
    // console.log(this.props.user)
    const drive = this.props.match.params.friendId ? await grabDrive(this.props.match.params.friendId) : await grabDrive(this.props.user._id);
    console.log(drive);
    // const drive = await grabDrive(this.props.user);
    const audioList = await driveRender(drive);
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
