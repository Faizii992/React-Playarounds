import React, { useState, useEffect } from 'react';
import './bootstrap.min.css';
import Nav from './comp/Nav';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './screens/HomePage';
import ObjectDetection from './screens/ObjectDetection';
import SpeechToNote from './screens/SpeechToNote';
import TextToSpeech from './screens/TextToSpeech';
import Segmentation from './screens/Segmentation';
import Ocr from './screens/Ocr';

function App() {
  return (
    <>
      <Router>
        <Nav></Nav>
        <Route exact path="/home" component={HomePage}></Route>
        <Route path="/speechtonote" component={SpeechToNote}></Route>
        <Route exact path="/objdetect" component={ObjectDetection}></Route>
        <Route exact path="/texttospeech" component={TextToSpeech}></Route>
        <Route exact path="/segmentation" component={Segmentation}></Route>
        <Route exact path="/ocr" component={Ocr}></Route>
        <Route
          exact
          path="/faizii992.github.io/objdetect"
          component={ObjectDetection}
        ></Route>
        <Route
          exact
          path="/faizii992.github.io"
          component={SpeechToNote}
        ></Route>
      </Router>
    </>
  );
}

export default App;
