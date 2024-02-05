import React, { useEffect, useRef, useState } from "react";

import WaveSurfer from "wavesurfer.js";
import Player from '../../UI/Player/Player';

import './Waveform.css'

const formWaveSurferOptions = ref => ({
  container: ref,
  waveColor: "#eee",
  progressColor: "grey",
  cursorColor: "OrangeRed",
  barWidth: 5,
  barRadius: 3,
  responsive: true,
  height: 100,
  // If true, normalize by the maximum peak instead of 1.0.
  normalize: true,
  // Use the PeakCache to improve rendering speed of large waveforms.
  partialRender: true
});

export default function Waveform({ url }) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlay] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const [, updateState] = React.useState();

  // create new WaveSurfer instance
  // On component mount and when url changes
  useEffect(() => {
    setPlay(false);

    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);

    wavesurfer.current.setCursorColor('transparent');

    wavesurfer.current.load(url);

    wavesurfer.current.on("ready", function() {
      // https://wavesurfer-js.org/docs/methods.html
      // wavesurfer.current.play();
      // setPlay(true);

      // make sure object stillavailable when file loaded
      if (wavesurfer.current) {
        wavesurfer.current.setVolume(volume);
        setVolume(volume);
      }
    });

    wavesurfer.current.on("finish", function() {
      setPlay(false);
      wavesurfer.current.seekTo(0);
    });

    // Removes events, elements and disconnects Web Audio nodes.
    // when component unmount
    return () => wavesurfer.current.destroy();
  }, [url]);

  const handlePlayPause = () => {
    setPlay(!playing);
    wavesurfer.current.playPause();
  };
  
  const onVolumeChange = e => {
    const { target } = e;
    const newVolume = +target.value;

    if (newVolume) {
      setVolume(newVolume);
      wavesurfer.current.setVolume(newVolume || 1);
    }
  };
      
  return (
    <div className="waveform-container">
      <div className="controls">
        <Player playing={playing} onPlayerClick={handlePlayPause}/>
      </div>
      <div id="waveform" ref={waveformRef} />
    </div>
  );
}