import React from 'react';
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import AudioAnalyser from './AudioAnalyser';
import './Player.css';
import request from 'superagent';
import { Link } from 'react-router-dom';
// http://fresh-track-staging.herokuapp.com/api/v1/drive/all

let bandcampArr = [1413157771, 4037375649, 2926175440, 4267872102, 2358433489, 3535544007];
// let driveArrOld = ['1iSDrOQH7IG8OFczKrVX19IyAlO5HNDfX', '135T3wOSF_o6VMamNfmrgt9kfTbVucWDE', '1grL_7KMiGpzAJU4jP6dBLq-9RzfyD70l'];
// let audioList1;

//function to conditionally render bandcamp iframes only if there are items in the bandcampArr
function bandcampRender(){
  if(bandcampArr.length > 0){
    return bandcampArr.map((value, index) => {
      return <iframe key={index} style={{border: 0, width: 400+'px', height: 373+'px'}} src={`https://bandcamp.com/EmbeddedPlayer/album=${value}/size=large/bgcol=ffffff/linkcol=0687f5/artwork=small/transparent=true/`} seamless title="whatever"></iframe>
    })
  }
};



export default class Player extends React.Component {
  //bandcamp display state
  state = {
    open: false,
    friendOpen: false,
    audio: null,
    friends: []
  }

  onSwitch = () => {
    this.setState({
      open: !this.state.open,
    });
  }

   userBandcamp(username) {
    console.log(username)
    if(username === 'whatever2') {
      return <button onClick={this.onSwitch} className='bandcamp-button'>
      {!this.state.open ? 'bandcamp' : 'close'}
    </button>
    }
  }
  

  async componentDidMount() {
    // this.returnPlayer();
    const getFriends = await request.get(`${process.env.REACT_APP_DB_URL}/api/v1/user/${this.props.user._id}`).withCredentials()
    const audio = document.querySelector('audio')
    this.setState({friends: getFriends.body.followedUsers})
    // console.log(this.state.friends)
    this.setState({audio})
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  
  container = React.createRef();

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }
  handleClickOutside = event => {
    if (this.container.current && !this.container.current.contains(event.target)) {
      this.setState({
        friendOpen: false,
      });
    }
  };
  handleButtonClick = () => {
    this.setState(state => {
      return {
        friendOpen: !state.friendOpen,
      };
    });
  };

  // handleRefresh = (friendId) => {
  //   window.location.href = `/${friendId}`
  // };

  // refreshPage(friendId) {
  //   window.location.href = `/${friendId}`
  //   // window.location.reload(false);
  // }
  refreshPage(friendId) {
    window.location.href = `/player/${friendId}`
    // window.location.reload(false);
  }

  render () {
    const friendNodes = this.state.friends.map (friend => <Link onClick={e => this.refreshPage(friend.friendId)} key ={friend._id} to={`/${friend.friend}`}><li key={friend._id}>{friend.friend}</li></Link>);
    const options = {
      audioLists: this.props.audioList,
      autoPlay: false,
      remember: false,
      mode: 'full',
      showMiniProcessBar: true,
      autoHiddenCover: true,
      spaceBar: true,
      preLoad: false
    }

    const customDownloader = (downloadInfo) => {
      const link = document.createElement('a')
      link.href = downloadInfo.src
      link.download = downloadInfo.filename || 'test'
      document.body.appendChild(link)
      link.click()
    }
    // console.log(this.state)
    return (
      <div>
        
      
      <div className="container" ref={this.container}>
          <button type="button" className="button" onClick={this.handleButtonClick}>
            ☰
          </button>
          {this.state.friendOpen && (
            <div className="container">
              <ul>
                <li key="username" onClick={e => this.refreshPage('')}>{this.props.user.username}</li>
                {friendNodes}
              </ul>
            </div>
          )}
        </div>
        { this.userBandcamp(this.props.user.username) }
        {/* <button onClick={this.onSwitch} className='bandcamp-button'>
            {!this.state.open ? 'bandcamp' : 'close'}
          </button> */}
        <div className="player">
      <div className='visualizer'>
      {this.state.audio && <AudioAnalyser audio={this.state.audio} />}
      </div>
      <div className = 'bandcamp-bottom' style={{display: this.state.open ? 'block' : 'none'}}>{ bandcampRender() }</div>
      
        <ReactJkMusicPlayer customDownloader={customDownloader} {...options} />
      </div>
      </div>
    )
  }
}
