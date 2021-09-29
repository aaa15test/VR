import React from 'react';
import Speech from './Speech.js';
import { View } from 'react-vr';

export default class AnnyangRecognition extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      iconsActive: true
    };
  }

  playControl = e => {
    this.props.playerController(e)
  }

  render() {
    return (
      <View style={{ width: 0.8, height: 0.5, alignItems: 'center', }}>
        <View onEnter={ () => this.setState({ iconsActive: true }) } onExit={ () => this.setState({ iconsActive: false }) }>
          <Speech x={0} enableSpeaking={ this.state.iconsActive } 
            playerController={this.playControl.bind(this)}/>
        </View>
      </View>
    );
  }
};
