import React from 'react';
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import AudioAnalyser from './AudioAnalyser';
import './Player.css';

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
    audio: null
  }

  onSwitch = () => {
    this.setState({
      open: !this.state.open,
    });
  }

  componentDidMount() {
    // this.returnPlayer();
    const audio = document.querySelector('audio')
    console.log(audio)
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

  render () {
    const options = {
      audioLists: this.props.audioList,
      autoPlay: false,
      remember: false,
      mode: 'full',
      showMiniProcessBar: true,
      autoHiddenCover: true,
      spaceBar: true,
    }

    const customDownloader = (downloadInfo) => {
      const link = document.createElement('a')
      link.href = downloadInfo.src // a.mp3
      link.download = downloadInfo.filename || 'test'
      document.body.appendChild(link)
      link.click()
    }
    console.log(this.state)
    return (
      <div>
        <button onClick={this.onSwitch} className='bandcamp-button'>
            {!this.state.open ? 'bandcamp' : 'close'}
          </button>
      
      <div className="container" ref={this.container}>
          <button type="button" className="button" onClick={this.handleButtonClick}>
            ☰
          </button>
          {this.state.friendOpen && (
            <div className="container">
              <ul>
                <li>Homie 1</li>
                <li>Homie 2</li>
                <li>Homie 3</li>
                <li>Homie 4</li>
              </ul>
            </div>
          )}
        </div>
        <div className="player">
      <div className='visualizer'>
      {this.state.audio && <AudioAnalyser audio={this.state.audio} />}
      </div>
      <div style={{display: this.state.open ? 'block' : 'none'}}>{ bandcampRender() }</div>
        <ReactJkMusicPlayer customDownloader={customDownloader} {...options} />
      </div>
      </div>
    )
  }
}
