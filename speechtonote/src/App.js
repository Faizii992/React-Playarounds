import React, { useState, useEffect } from 'react';
import './bootstrap.min.css';
import Nav from './comp/Nav';
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = 'en-US';
function App() {
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState(null);
  const [savedNotes, setSavedNotes] = useState([]);
  const [isRec, setisRec] = useState(false);

  useEffect(() => {
    HandleListen();
  }, [isListening]);
  function HandleListen() {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        console.log('mic is on');
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log('mic is stopping');
      };
    }
    mic.onstart = () => {
      console.log('conclusion');
    };
    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('');
      console.log(transcript);
      setNote(transcript);
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  }

  return (
    <>
      <Nav></Nav>
      <h2 style={{ textAlign: 'center' }}>
        <u>SPEECH TO NOTES WITH REACT</u>
      </h2>
      <h1 className="my-3">Voice Notes</h1>
      <div className="container">
        <div class="row">
          <div class="card border-primary mb-3" style={{ maxWidth: '30rem' }}>
            <div class="card-header">Header</div>
            <div class="card-body">
              <h4 class="card-title">
                {' '}
                <button
                  onClick={() => {
                    setSavedNotes([...savedNotes, note]);
                    setNote('');
                  }}
                  type="button"
                  class="btn btn-primary"
                  disabled={!note}
                >
                  Save new note
                </button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  onClick={() => {
                    setIsListening((prevState) => !prevState);
                    setisRec((prevState) => !prevState);
                  }}
                >
                  {isRec ? <>Stop 🔴 </> : <> Start 🎤</>}
                </button>
              </h4>
              <p class="card-text"></p>
            </div>
          </div>
          <div class="card border-secondary mb-3" style={{ maxWidth: '40rem' }}>
            <div class="card-header">Header</div>
            <div class="card-body">
              <h4 class="card-title">Secondary card title</h4>
              <p class="card-text">
                {savedNotes.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
