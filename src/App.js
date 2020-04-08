// import React, { Component } from 'react'
// import ReactJkMusicPlayer from "react-jinke-music-player";
// import "react-jinke-music-player/assets/index.css";



// class App extends React.Component{
//   constructor() {
//     this.audioInstance = null
//   }
//   render() {
//     return (
//       <>
//         <ReactJkMusicPlayer getAudioInstance={instance => this.audioInstance = instance}/>
//         <button onClick={() => this.audioInstance.play()}>play</button>
//         <button onClick={() => this.audioInstance.pause()}>pause</button>
//         <button onClick={() => this.audioInstance.load()}>reload</button>
//         <button onClick={() => (this.audioInstance.currentTime = 40)}>
//           change current play time
//         </button>
//         <button onClick={() => (this.audioInstance.playbackRate = 2)}>
//           change play back rate
//         </button>
//         <button onClick={() => (this.audioInstance.volume = 0.2)}>change volume</button>
//         <button onClick={() => this.audioInstance.destroy()}>destory player</button>
//       </>
//     )
//   }
// }