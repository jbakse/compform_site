// require https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js

// draws a rectangle, where you tell it to!

let freq_slider;
let amplitude_slider;
let time_slider;

let startX = 50;
let startY = 250;
let endX = 450;
let endY = 50;

let t = 0;

function setup() {
  createCanvas(500, 300);

  createP("Frequency");
  freq_slider = createSlider(0, 500, 50);
  createP("Amplitude");
  amplitude_slider = createSlider(0, 100, 50);
  createP("Time Speed");
  time_slider = createSlider(0, 100, 50);
}

function draw() {
  background(50);
  ellipseMode(CENTER);

  let frequency = freq_slider.value() / 10;
  let amplitude = amplitude_slider.value() / 100;
  let timeStep = time_slider.value() / 1000;

  t += timeStep;
  noiseDetail(1, 0.5);

  fill(255);
  noStroke();
  for (i = 0; i < 1; i += 0.02) {
    let x = lerp(startX, endX, i);
    let y = lerp(startY, endY, i);
    let offsetX = noise(i * frequency + t) * amplitude * 100;
    let offsetY = noise(i * frequency + t, 100) * amplitude * 100;

    ellipse(x + offsetX, y + offsetY, 10, 10);
  }
}
