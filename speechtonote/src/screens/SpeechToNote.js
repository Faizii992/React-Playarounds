import React, { useState, useEffect } from 'react';
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = 'en-US';
function SpeechToNote() {
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState(null);
  const [savedNotes, setSavedNotes] = useState([]);

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
    <div>
      <h2 style={{ textAlign: 'center' }}>
        <u>SPEECH TO NOTES WITH REACT</u>
      </h2>
      <div class="alert alert-success" style={{ textAlign: 'center' }}>
        Hit "Start", say what you wanna record. Once you're done, hit Stop and
        then hit "save note" if you wanna save it
      </div>
      <h1 className="my-3">Voice Notes</h1>
      <div className="container">
        <div class="row">
          <div class="card border-primary mb-3" style={{ maxWidth: '30rem' }}>
            <div class="card-header">Current Note</div>
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
                  }}
                >
                  {isListening ? <>Stop 🔴 </> : <> Start 🎤</>}
                </button>
              </h4>
              <p class="card-text"> {note}</p>
            </div>
          </div>
          <div class="card border-secondary mb-3" style={{ maxWidth: '40rem' }}>
            <div class="card-header">SAVED NOTES</div>
            <div class="card-body">
              <h4 class="card-title">All your notes are down below</h4>
              <p class="card-text">
                {savedNotes.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpeechToNote;
