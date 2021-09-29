import React from 'react';
import SpeechRecognition from './SpeechRecognition.js';
import SpeechResults from './SpeechResults.js';
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

    console.log(this.state.spokenWords, 'this.state.spokenWords')

    return (
      <View 
        style={{
          position: 'absolute',
          // transform: [{ translate: [ -0.5, 0.5, 0 ] }],
          flexDirection: 'row',
          height: 10
        }}
      >       
        { microphoneSymbol }
        {/* <SpeechResults results={ this.state.spokenWords } /> */}
      </View>
    );
  }
}