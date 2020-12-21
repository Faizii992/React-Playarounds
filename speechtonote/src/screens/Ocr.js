import React, { useState, useEffect, useRef } from 'react';
import { createWorker } from 'tesseract.js';
import { useSpeechSynthesis } from 'react-speech-kit';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
registerPlugin(FilePondPluginImagePreview);
const worker = createWorker({
  logger: (m) => console.log(m),
});
function Ocr() {
  const [text, setText] = useState('');
  //const [ocr, setOcr] = useState('');
  const [val, setVal] = useState('');
  let workerRef = useRef();
  let pondRef = useRef();

  async function setOcr(File) {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');

    const {
      data: { text },
    } = await worker.recognize(File.file);
    setText(text);
    setVal(text);
  }
  const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis();
  return (
    <div class="my-5" style={{ display: 'flex', justifyContent: 'center' }}>
      <div class="container">
        <div class="alert alert-dismissible alert-info">
          <button type="button" class="close" data-dismiss="alert">
            &times;
          </button>
          <strong>Hold up!</strong>{' '}
          <h3>Wanna read out that boring old long message?</h3>
        </div>

        <div class="row">
          <div class="col-md-6">
            <FilePond
              ref={pondRef}
              onremovefile={(err, file) => {
                setOcr('');
              }}
              onaddfile={(err, file) => {
                setOcr(file);
              }}
            ></FilePond>
          </div>

          <div class="col-md-6">
            <textarea
              style={{ minHeight: '120px' }}
              disabled
              value={text}
              class="form-control"
            ></textarea>

            <button
              onClick={() => {
                speak({ text: val });
              }}
              class="my-2 mx-1 btn btn-secondary"
            >
              PLAY!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ocr;
