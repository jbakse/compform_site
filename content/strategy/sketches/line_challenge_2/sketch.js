// require https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js

// draws a rectangle, where you tell it to!

let freq_slider;
let amplitude_slider;
let time_slider;

let t = 0;

function setup() {
  createCanvas(400, 400);

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

  noStroke();

  let rays = 30;
  for (ray = 0; ray < rays; ray++) {
    let startX = (width / rays) * ray;
    let startY = 425;
    let endX = startX + noise(ray, 0) * 30;
    let endY = startY - 400 + noise(ray, 10) * 330;

    colorMode(RGB);
    fill(0, 0, 0, 50);
    for (i = 0; i < 1; i += 0.02) {
      let x = lerp(startX, endX, i);
      let y = lerp(startY, endY, i);
      let offsetX = noise(i * frequency + t, ray) * amplitude * 100;
      let offsetY = noise(i * frequency + t, ray, 100) * amplitude * 100;

      ellipse(x + offsetX, y + offsetY, 25, 25);
      ellipse(x + offsetX, y + offsetY, 20, 20);
      ellipse(x + offsetX, y + offsetY, 15, 15);
    }

    colorMode(HSB, 100);
    for (i = 0; i < 1; i += 0.01) {
      fill(noise(ray + i * 2) * 100, 100, 100);
      let x = lerp(startX, endX, i);
      let y = lerp(startY, endY, i);
      let offsetX = noise(i * frequency + t, ray) * amplitude * 100;
      let offsetY = noise(i * frequency + t, ray, 100) * amplitude * 100;

      ellipse(x + offsetX, y + offsetY, 10, 10);
    }
  }
}
