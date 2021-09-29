import React from 'react'
import {
  AppRegistry,
  asset,
  Text,
  View,
  VideoPano,
  VrButton,
  VideoControl,
  MediaPlayerState
} from 'react-vr'
import AnnyangRecognition from './components/AnnyangRecognition.js'

// react-native start --reset-cache in one terminal and left it open
// react-native run-android in another terminal

// 2951045a4b684a1b8e55559ae973a19e

// API KEY
// 46419222
// SECRET
// 0a41b6317d25de32b62679c2cc368c03657ea296

// SESSION ID
// 1_MX40NjQxOTIyMn5-MTU2ODIxMzM0OTE3MH40azRFMVRNWHVJUzlCTXl1MUJ4VFdRNWF-fg

export default class vr_project_video extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedState: 'Video1',
      index: 0,
      playerState: new MediaPlayerState({ muted: false,
        volume: 0.5, loop: true }),
      playControl: 'play'
    }
  }

  stateClicked = selection => {
    let newState
    switch(selection) {
      case 0:
        newState = 'Video1'
        break
      case 1:
        newState = 'Video2'
        break
      case 2:
        newState = 'Video3'
        break
      case 3:
        newState = 'Video4'
        break
    }
    this.setState({ selectedState: newState })
    this.setState({ index: selection })
  }

  render() {
    states = [ 'Video1', 'Video2', 'Video3', 'Video4' ]

    const playerController = (e) => {
      if(e==='next') {
        if(this.state.index < states.length-1){
          this.setState({ index: this.state.index+1})
          this.setState({ selectedState: states[this.state.index]})
        }
        else {
          this.setState({ index: 0})
          this.setState({ selectedState: states[0]})
        }
      }
      if(e!=='next') this.setState({ playControl: e })
    }

    return (
      <View>
        <View style={{
          flex: 1,
          width: 3,
          margin: 0
        }}>
          <VideoPano source={asset(this.state.selectedState + '.mp4', 
            {format: 'mp4', layout: 'SPHERE'})}
            playerState={this.state.playerState}
            playControl={this.state.playControl} />
        </View>
        
        <View  
          style={{
            width: 1,
            flexDirection: 'column',
            alignItems: 'stretch',
            layoutOrigin: [5.5, 0.8],
            transform: [{ translate: [0, 0, -5] }]
          }} 
        >
          <AnnyangRecognition playerController={playerController.bind(this)} />
          <TextBoxes stateClicked={this.stateClicked.bind(this)} states={states} 
            selectedState={this.state.selectedState} />

          <VideoControl style={{ height: 0.2, width: 3,  marginLeft: '10px', 
            position: 'absolute', top: '170px' }} 
            playerState={ this.state.playerState }
          />
        </View>
      </View>
    )}
}

class TextBoxes extends React.Component {
  render() {
    return (
      <View>
        { this.props.states.map((video, index) => {
          return (
            <VrButton key={index} onClick={() => this.props.stateClicked(index)}>
            <View key={index} style={{ margin: 0.1, height: 0.3, 
              backgroundColor: this.props.selectedState===video 
              ? '#080FCC' : '#4DA6FF'}}>
              <Text style={{fontSize: 0.2, textAlign: 'center', fontWeight: 'bold'}}>
                {video}
              </Text>
            </View>
          </VrButton>
          )         
        })}
      </View>
  )}
}

AppRegistry.registerComponent('vr_project_video', () => vr_project_video)