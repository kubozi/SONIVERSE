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

// import React, { Component } from 'react'
// import Play from './Play';
// import Pause from './Pause';

// class Player extends Component {

// constructor(props) {
//   super(props)
//   this.state = {
//     playing: false
//   }
// }

// handlePlayerClick = () => {
//   if (!this.state.playing) {
//     this.setState({playing: true})
//   } else {
//     this.setState({playing: false})
//   }
//   this.props.onPlayerClick();
// }

//   render() {
//     return (
//       <div className="player" >
//         {this.state.playing? <Pause onPlayerClick={this.handlePlayerClick} /> : <Play onPlayerClick={this.handlePlayerClick} />}
//       </div>
//     )
//   }
// }

// export default Player