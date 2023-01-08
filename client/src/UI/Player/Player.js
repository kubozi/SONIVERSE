import React, { Component, useState } from 'react'
import Play from './Play';
import Pause from './Pause';
import './Player.css';

const Player = (props) => {

const handlePlayerClick = () => {
    props.onPlayerClick();
}

    return (
      <div className="player" >
        {props.playing? <Pause onPlayerClick={handlePlayerClick} /> : <Play onPlayerClick={handlePlayerClick} />}
      </div>
    );
  }

export default Player