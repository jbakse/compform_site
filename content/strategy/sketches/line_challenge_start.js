// require https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js

// draws a rectangle, where you tell it to!

let amplitude_slider;

let startX = 50;
let startY = 250;
let endX = 450;
let endY = 50;

function setup() {
  createCanvas(500, 300);

  createP("Amplitude");
  amplitude_slider = createSlider(0, 100, 50);
}

function draw() {
  background(50);
  ellipseMode(CENTER);

  let amplitude = amplitude_slider.value() / 100;

  noiseDetail(1, 0.5);

  fill(255);
  noStroke();

  // study this loop. do you understand how the line of ellipses is created?
  for (i = 0; i < 1; i += 0.02) {
    let x = lerp(startX, endX, i);
    let y = lerp(startY, endY, i);

    // hint: drive offsetX and offsetY with noise() instead of random()
    let offsetX = (random() - 0.5) * amplitude * 10;
    let offsetY = (random() - 0.5) * amplitude * 10;

    ellipse(x + offsetX, y + offsetY, 10, 10);
  }
}
