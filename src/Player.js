import React from 'react';
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import AudioAnalyser from './AudioAnalyser';
import './Player.css';

let bandcampArr = [1413157771, 4037375649, 2926175440, 4267872102, 2358433489, 3535544007];
// let driveArr = ['1iSDrOQH7IG8OFczKrVX19IyAlO5HNDfX', '135T3wOSF_o6VMamNfmrgt9kfTbVucWDE', '1grL_7KMiGpzAJU4jP6dBLq-9RzfyD70l'];

//function to conditionally render bandcamp iframes only if there are items in the bandcampArr
function bandcampRender(){
  if(bandcampArr.length > 0){
    return bandcampArr.map((value, index) => {
      return <iframe key={index} style={{border: 0, width: 400+'px', height: 373+'px'}} src={`https://bandcamp.com/EmbeddedPlayer/album=${value}/size=large/bgcol=ffffff/linkcol=0687f5/artwork=small/transparent=true/`} seamless title="whatever"></iframe>
    })
  }
};

// function driveRender(){
//   if(driveArr.length > 0){
//     return driveArr.map((value, index) => {
//       return {
//         name: 'filename.mp3',
//         singer: 'username',
//         cover: 'https://emby.media/community/uploads/inline/355992/5c1cc71abf1ee_genericcoverart.jpg',
//         musicSrc: () => {
//           return fetch(`https://cors-anywhere.herokuapp.com/https://drive.google.com/u/0/uc?id=${value}&export=download`, {
//             headers: {
//               origin: null
//             }
//           })
//             .then(res => res.blob())
//             .then(blob => URL.createObjectURL(blob));
//         },
//     }})
//   }
// };

// const audioList1 = driveRender()
// console.log(audioList1);

const audioList1 = [
  // {
  //   name: 'push',
  //   singer: 'budge',
  //   cover: 'https://emby.media/community/uploads/inline/355992/5c1cc71abf1ee_genericcoverart.jpg',
  //   musicSrc: () => {
  //     return Promise.resolve(
  //       'https://drive.google.com/u/0/uc?id=1iSDrOQH7IG8OFczKrVX19IyAlO5HNDfX&export=download'
  //     )
  //   },
  // },
  {
    name: 'Despacito',
    singer: 'Luis Fonsi',
    musicSrc: () => {
      return fetch(`https://cors-anywhere.herokuapp.com/http://res.cloudinary.com/alick/video/upload/v1502689683/Luis_Fonsi_-_Despacito_ft._Daddy_Yankee_uyvqw9.mp3`, {
        headers: {
          origin: null
        }
      })
        .then(res => res.blob())
        .then(blob => URL.createObjectURL(blob));
    },
  },
]

const options = {
  audioLists: audioList1,
  autoPlay: false,
  remember: false,
  mode: 'full',
  showMiniProcessBar: true,
  autoHiddenCover: true,
  spaceBar: true,
}

export default class Player extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      audio: null
    }
  }
  componentDidMount() {
    const audio = document.querySelector('audio')
    // console.log(audio)
    this.setState({audio})
  }

  render () {
    const customDownloader = (downloadInfo) => {
      const link = document.createElement('a')
      link.href = downloadInfo.src // a.mp3
      link.download = downloadInfo.filename || 'test'
      document.body.appendChild(link)
      link.click()
    }
   
    return (
      <div className="player">
        {this.state.audio && <AudioAnalyser audio={this.state.audio} />}
        <ReactJkMusicPlayer customDownloader={customDownloader} {...options} />
        { bandcampRender() }
      </div>
    )
  }
}

// 'https://drive.google.com/u/0/uc?id=11XJo0wqvvusgml3bNxUK3TwpQkhzriDV&export=download'
// https://www.dropbox.com/s/ru4za6l9u1s93mh/DF%20Kick.wav?dl=1