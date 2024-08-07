// require https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js
// require https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.0/addons/p5.sound.js

let frequency = 220;
let myOscillator;

function setup() {
  createCanvas(400, 200);

  myOscillator = new p5.Oscillator("sine");
  myOscillator.amp(1); // set amplitude
  myOscillator.freq(frequency); // set frequency
  // myOscillator.start(); // start oscillating
  frameRate(2);

  startButton = createButton("start");
  startButton.mousePressed(start);

  stopButton = createButton("stop");
  stopButton.mousePressed(stop);

  recordButton = createButton("record");

  recordButton.mousePressed(function () {
    record(5000);
  });
}

function start() {
  myOscillator.start(); // start oscillating
}

function stop() {
  myOscillator.stop(); // start oscillating
}

function draw() {
  background(50);

  frequency += random(-50, 50); // vary frequency using brownian motion
  frequency = constrain(frequency, 100, 500);

  console.log(frequency);
  myOscillator.freq(frequency);
}

// uses the p5 SoundRecorder and SoundFile classes to record the audio output.
// begins recording when called. records for _length_ time in milliseconds.
function record(length) {
  let soundRecorder = new p5.SoundRecorder();
  let soundFile = new p5.SoundFile();
  soundRecorder.record(soundFile);
  setTimeout(function () {
    console.log("Recording Complete");
    soundRecorder.stop();
    save(soundFile, "output.wav");
  }, length);
}
