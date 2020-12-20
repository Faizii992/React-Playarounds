import React, { useState } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
function TextToSpeech() {
  const [val, setVal] = useState('');
  const [rate, setRate] = useState(1);

  const [voiceIndex, setVoiceIndex] = useState(null);

  const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis();

  const voice = voices[voiceIndex] || null;
  return (
    <div class=" my-3" style={{ margin: 'auto 0', textAlign: 'center' }}>
      <h2> Quit saying tl;dr, right now!</h2>
      <div class="alert alert-dismissible alert-warning">
        <button type="button" class="close" data-dismiss="alert">
          &times;
        </button>
        <h4 class="alert-heading"></h4>

        <h4>
          Do you wanna have someone read that humongous boring old
          text/paragraph your friend sent you? <br></br> USE THIS
        </h4>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <textarea
              onChange={(e) => {
                setVal(e.target.value);
              }}
              style={{ width: '100%', minHeight: '130px' }}
              class="form-control"
            ></textarea>
            <button
              onClick={() => {
                speak({ text: val, rate: rate, voice });
              }}
              class="my-2 mx-1 btn btn-warning"
            >
              PLAY!
            </button>
          </div>
          <div class="col-md-6">
            <fieldset class="form-group my-4">
              <legend>Select how fast you wanna get it done with!(Rate)</legend>
              <label for="customRange1">Rate</label>
              <input
                style={{}}
                type="range"
                class="custom-range"
                min="0"
                max="4"
                defaultValue="1"
                step="0.1"
                id="pitch"
                onChange={(event) => {
                  setRate(event.target.value);
                }}
              />
            </fieldset>
            <legend>Select a cute little accent!</legend>
            <select
              id="voice"
              name="voice"
              value={voiceIndex || ''}
              onChange={(event) => {
                setVoiceIndex(event.target.value);
              }}
            >
              <option value="">Default</option>
              {voices.map((option, index) => (
                <option key={option.voiceURI} value={index}>
                  {`${option.lang} - ${option.name}`}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TextToSpeech;
