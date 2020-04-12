import React, { Component } from 'react';
import AudioVisualizer from './AudioVisualizer';

class AudioAnalyser extends Component {
  // some of your components use the older constructor syntax, others use
  // the more modern class property syntax. pick one
  state = {
    audioData: new Uint8Array(0)
  }

  componentDidMount() {
    // audioContext does not need to be added as a class property
    const audioContext = new (AudioContext || webkitAudioContext)();
    this.analyser = audioContext.createAnalyser();
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.source = audioContext.createMediaElementSource(this.props.audio);
    this.source.connect(this.analyser).connect(audioContext.destination);
    this.rafId = requestAnimationFrame(this.tick);
  }

  tick() {
    this.analyser.getByteTimeDomainData(this.dataArray);
    this.setState({ audioData: this.dataArray });
    this.rafId = requestAnimationFrame(this.tick);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rafId);
    this.analyser.disconnect();
    this.source.disconnect();
  }

  render() {
    return <AudioVisualizer audioData={this.state.audioData} />;
  }
}

export default AudioAnalyser;
