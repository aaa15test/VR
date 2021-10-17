import React from 'react';
import SpeechRecognition from './SpeechRecognition.js';
import { View } from 'react-vr';

export default class Speech extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      spokenWords: ''
    }
  }

  speechRetriever(event) {
    this.setState({ spokenWords: event });
    this.props.playerController(event)
  }

  render() {
    const microphoneSymbol = 
      <SpeechRecognition x={0} speaking={this.props.enableSpeaking} 
        outputHandler={this.speechRetriever.bind(this)} 
      />

    return (
      <View 
        style={{
          position: 'absolute',
          flexDirection: 'row',
          height: 10
        }}
      >       
        { microphoneSymbol }
      </View>
    );
  }
}