import React from 'react';
import {
  asset,
  Text,
  Image,
  View,
  NativeModules,
  Animated,
} from 'react-vr';

export default class SpeechRecognition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interactionActive: true,
      annyang: NativeModules.Annyang,
      animationValue: new Animated.Value(0)
    }
  }

  componentDidMount() {
    Animated.timing(
    this.state.animationValue,
      {toValue: 1},
    ).start();
  }

  async onGazeEnter() {
    try {
      console.log('Active');
      var output = await this.state.annyang.start();

      if(output) this.props.outputHandler(output);

      this.state.annyang.stop();

    } catch(e) { console.log(e); }
  }

  render() {
    var output = null;

    if(this.state.interactionActive) {
      output = (
        <Image source={ asset('microphone.png') } 
          style={{
            width: 0.2,
            height: 0.3,
            overflow: 'visible',
            borderRadius: 0.2,
          // transform: [{ translate: [ this.props.x, 0, 0 ] }]
          }} 
        />
      );
    }

    return (
      <View onEnter={ this.onGazeEnter.bind(this) }
        style={{
          position: 'absolute',
          height: 2
          // transform: [{ translate: [ 0.25, 0.5, 0.25 ] }]
      }}>
        {output}
      </View>
    )
  }
}