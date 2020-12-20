import React, { useState, useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import Webcam from 'react-webcam';
import * as cocossd from '@tensorflow-models/coco-ssd';

function ObjectDetection() {
  const drawRect = (detections, ctx) => {
    // Loop through each prediction
    console.log(detections);
    detections.forEach((prediction) => {
      // Extract boxes and classes
      console.log(prediction);
      const [x, y, width, height] = prediction['bbox'];
      const text = prediction['class'];

      // Set styling
      const color = Math.floor(Math.random() * 16777215).toString(16);
      ctx.strokeStyle = '#' + color;
      ctx.font = '28px Arial';

      // Draw rectangles and text
      ctx.beginPath();
      ctx.fillStyle = '#' + color;
      ctx.fillText(text, x, y);
      ctx.rect(x, y, width, height);
      ctx.stroke();
    });
  };
  const CanvasRef = useRef(null);
  const WebcamRef = useRef(null);
  useEffect(() => {
    runCoco();
  }, []);
  const runCoco = async () => {
    const net = await cocossd.load();
    console.log('detected');
    setInterval(() => {
      detect(net);
    }, 10);
  };
  const detect = async (net) => {
    if (
      WebcamRef.current.video.readyState == 4 &&
      WebcamRef.current != null &&
      typeof WebcamRef.current != 'undefined'
    ) {
      console.log(WebcamRef.current.video.videoWidth);
      console.log(WebcamRef.current.video.width);
      WebcamRef.current.video.width = WebcamRef.current.video.videoWidth;

      WebcamRef.current.video.height = WebcamRef.current.video.videoHeight;
      CanvasRef.current.width = WebcamRef.current.video.width;
      CanvasRef.current.height = WebcamRef.current.video.height;
      const video = WebcamRef.current.video;
      const obj = await net.detect(video);
      const ctx = CanvasRef.current.getContext('2d');
      drawRect(obj, ctx);
    }
  };
  return (
    <div>
      <div class="alert alert-dismissible alert-warning">
        <button type="button" class="close" data-dismiss="alert">
          &times;
        </button>
        <h4 class="alert-heading">Oh yus!</h4>
        <p class="mb-0">Let's put a smile on that pretty face!</p>
      </div>
      <Webcam
        muted={true}
        ref={WebcamRef}
        style={{
          width: '50%',
          position: 'absolute',
          top: '25%',
          left: '20%',
          zindex: '8',
        }}
      ></Webcam>

      <canvas
        ref={CanvasRef}
        style={{
          width: '50%',
          position: 'absolute',
          top: '25%',
          left: '20%',
          zindex: '7',
        }}
      ></canvas>
      <h3 style={{ textAlign: 'center' }}>Object Detection</h3>
    </div>
  );
}

export default ObjectDetection;
