import React, { useState, useEffect } from 'react';
import './bootstrap.min.css';
import Nav from './comp/Nav';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ObjectDetection from './screens/ObjectDetection';
import SpeechToNote from './screens/SpeechToNote';

function App() {
  return (
    <>
      <Router>
        <Nav></Nav>
        <Route exact path="/" component={SpeechToNote}></Route>
        <Route exact path="/objdetect" component={ObjectDetection}></Route>
      </Router>
    </>
  );
}

export default App;
