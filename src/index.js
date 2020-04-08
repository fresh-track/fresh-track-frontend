// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
import React from "react";
import ReactDOM from "react-dom";
import Player from "./Player"
// import Waveform from "./Waveform";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Player />,
  // <Waveform />,
  // <ReactJkMusicPlayer {...options} />,
  document.getElementById("root")
);
serviceWorker.unregister();