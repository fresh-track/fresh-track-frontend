import React from 'react';
import ReactWaves from '@dschoon/react-waves';
import './Waveform.css';

import audioFile from './audio/pat.mp3';
let bandcampArr = [1413157771, 4037375649, 2926175440, 4267872102, 2358433489, 3535544007];

// let bandcampArr = [];

//function to conditionally render bandcamp iframes only if there are items in the bandcampArr
function bandcampRender(){
  if(bandcampArr.length > 0){
    return bandcampArr.map((value, index) => {
      return <iframe key={index} style={{border: 0, width: 400+'px', height: 373+'px'}} src={`https://bandcamp.com/EmbeddedPlayer/album=${value}/size=large/bgcol=ffffff/linkcol=0687f5/artwork=small/transparent=true/`} seamless title="whatever"></iframe>
    })
  }
};

export default class Waveform extends React.Component {
  state = {
    playing: false
  };
  render () {
    
    return (
      <div className="mainWave">
        <div className="playButton" onClick={() => { this.setState({ playing: !this.state.playing }) }}>
          { !this.state.playing ? '▶' : '■' }
        </div>
        <ReactWaves
          audioFile={audioFile}
          className={'react-waves'}
          options={{
            barHeight: 2,
            cursorWidth: 0,
            height: 200,
            hideScrollbar: true,
            progressColor: '#EC407A',
            responsive: true,
            waveColor: '#D1D6DA'
            // audioContext: 'whatever'
          }}
          volume={1}
          zoom={1}
          playing={this.state.playing}
        />

      { bandcampRender() }

      </div>
    )
  }
}
