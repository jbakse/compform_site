// require https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js

let freq_slider;
let amplitude_slider;
let octive_slider;

function setup() {
  createCanvas(640, 360);

  fill(240);
  noStroke();
  rectMode(CENTER);
  ellipseMode(CENTER);

  createP("Frequency");
  freq_slider = createSlider(0, 100, 50);
  createP("Amplitude");
  amplitude_slider = createSlider(0, 20000, 10000);
  createP("Octaves");
  octive_slider = createSlider(1, 8, 1);
}

function draw() {
  background(50);

  // prettyMistake();
  // field();
  // field2();
  field3();
}

function field() {
  let frequency = freq_slider.value() / 1000;
  let amplitude = amplitude_slider.value() / 100;
  noiseDetail(octive_slider.value(), 0.5);

  for (let y = 0; y < height; y += 25) {
    for (let x = 0; x < width; x += 25) {
      let n = noise(x * frequency, y * frequency);
      n = n * amplitude;
      ellipse(x, y, n, n);
    }
  }
}

function field2() {
  let frequency = freq_slider.value() / 1000;
  let amplitude = amplitude_slider.value() / 100;
  noiseDetail(octive_slider.value(), 0.5);

  for (let y = 0; y < height; y += 15) {
    for (let x = 0; x < width; x += 15) {
      let n = noise(x * frequency, y * frequency);
      n = n * amplitude;
      if (1 < n) {
        ellipse(x, y, 15, 15);
      }
    }
  }
}

function field3() {
  let frequency = freq_slider.value() / 1000;
  let amplitude = amplitude_slider.value() / 1000;
  noiseDetail(octive_slider.value(), 0.5);
  randomSeed(1);
  for (let y = 0; y < height; y += 15) {
    for (let x = 0; x < width; x += 15) {
      let n = noise(x * frequency, y * frequency);

      if (0.5 < n) {
        ellipse(x, y, 15, 15);
      }
    }
  }
}

function prettyMistake() {
  let frequency = freq_slider.value() / 1000;
  let amplitude = amplitude_slider.value() / 100;
  noiseDetail(octive_slider.value(), 0.5);

  for (let y = 0; y < height; y += 5) {
    for (let x = 0; x < width; x += 5) {
      let n = noise(x * frequency, y * frequency);
      n = n * amplitude;
      ellipse(x, y - n, 5, 5);
    }
  }
}
