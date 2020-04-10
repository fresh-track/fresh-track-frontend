import React, { Component } from 'react'
import Player from './Player'
import request from 'superagent'

const grabDrive = async () => {
  const driveGet = await request.get(`${process.env.REACT_APP_DB_URL}/api/v1/drive/all`);
  const driveToObject = (JSON.parse(driveGet.text));
  return driveToObject[0];
}

function driveRender(drive){
  const driveArr = drive.audioFiles;
  if(driveArr.length > 0){
    return driveArr.map((value, index) => {
      return {
        name: `${value.name}`,
        singer: `${drive._id}`,
        cover: 'https://emby.media/community/uploads/inline/355992/5c1cc71abf1ee_genericcoverart.jpg',
        musicSrc: () => {
          return fetch(`${value.url}`, {
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
    const drive = await grabDrive();
    const audioList = await driveRender(drive);
    this.setState({ audioList });
  }

  render() {
    return (
      <>
        {this.state.audioList && <Player audioList = { this.state.audioList } />}
      </>
    )
  }
}

// https://alchemy-anywhere.herokuapp.com/
// https://cors-anywhere.herokuapp.com/
// https://fresh-track-anywhere.herokuapp.com/
// https://fresh-track-anywhere-2.herokuapp.com/
