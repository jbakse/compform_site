// require https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js

let freq_slider;
let amplitude_slider;
let octave_slider;

function setup() {
  createCanvas(640, 300);

  rectMode(CENTER);

  createP("Frequency");
  freq_slider = createSlider(0, 500, 50);
  createP("Amplitude");
  amplitude_slider = createSlider(0, 200, 100);
  createP("Octaves");
  octave_slider = createSlider(1, 8, 1);

  animate_checkbox = createCheckbox("Animate Noise", false);
}

function draw() {
  background(50);
  ellipseMode(CENTER);
  let frequency = freq_slider.value() / 1000;
  let amplitude = amplitude_slider.value() / 100;
  noiseDetail(octave_slider.value(), 0.5);

  // draw grid lines where the input to noise is 1,2,3,...
  // 1 / frequency = period
  stroke(100, 100, 100);
  for (let x = 0; x < width; x += 1 / frequency) {
    line(x, 0, x, height);
  }

  // draw horizontal grid lines
  line(0, height * 0.5, width, height * 0.5);
  line(0, height * 0.25, width, height * 0.25);
  line(0, height * 0.125, width, height * 0.125);

  // draw function plot
  fill(240);
  noStroke();
  for (let x = 0; x < width; x += 0.5) {
    let n;
    if (animate_checkbox.checked()) {
      n = noise(x * frequency, frameCount * 0.01);
    } else {
      n = noise(x * frequency);
    }

    n = n * amplitude * height;
    ellipse(x, height - n, 4, 4);
  }
}
