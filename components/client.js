// Auto-generated content.
// This file contains the boilerplate to set up your React app.
// If you want to modify your application, start in "index.vr.js"
'use strict'
// Auto-generated content.
import {VRInstance, ReactNativeContext, Module} from 'react-vr-web';
// import {Module} from 'react-vr-web';
// import {ReactNativeContext} from 'react-vr-web';
import * as THREE from 'three';

function init(bundle, parent, options) {
  const annyang = new Annyang();
  const vr = new VRInstance(bundle, 'vr_project_video', parent, {
    // Add custom options here
    ...options,
    cursorVisibility: 'visible',
    nativeModules: [annyang]
  });

  annyang.setNativeContext(vr.rootView.context)

  vr.render = function() {
    // Any custom behavior you want to perform on each frame goes here
  };
  // Begin the animation loop
  vr.start();
  return vr;
}

export default class Annyang extends Module {
  _rnctx: ReactNativeContext;
  recognition: Object;

  constructor() {
    super("Annyang")

    // Variables
    this._rnctx = null;

    var commands = {'Show me dogs': function() { alert("Success") }}

    if(annyang)
      console.log("annyang init success");

    annyang.addCommands(commands)
  }

  setNativeContext(rnctx: ReactNativeContext) {
    // Context
    this._rnctx = rnctx;
  }

  $start(resolve,reject) {
    this.startListening();

    // Get the speech recognition from annyang
    this.recognition = annyang.getSpeechRecognizer();

    var thisRef = this;

    // Override method onresult
    this.recognition.onresult = function(event) {

      // Get the speech result
      var SpeechResults = event.results[event.resultIndex];

      if(thisRef._rnctx !== 'undefined')
        thisRef._rnctx.invokeCallback(resolve, [SpeechResults[0].transcript]);

    }

  }


  startListening() {

    // Stop annyang if its listening
    if(annyang.isListening) {
      stop();
    }


    // Start again
    console.log("Start");
    annyang.start();
  }

  stop() {
    annyang.abort()
    console.log("Stop")
  }

}

window.ReactVR = {init};
