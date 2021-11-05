// require https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js

let amplitude_slider;

function setup() {
  createCanvas(300, 200);

  fill(240);
  noStroke();
  ellipseMode(CENTER);

  createP("Amplitude");
  amplitude_slider = createSlider(0, 100, 100);
  seed_checkbox = createCheckbox("Seed Random", false);
}

function draw() {
  background(50);

  if (seed_checkbox.checked()) {
    randomSeed(1);
  }

  let amplitude = amplitude_slider.value();

  // draw a pulsing circle at the top
  let w = 50 + random(0, 1) * amplitude;
  ellipse(width * 0.5, height * 0.25, w, w);

  // draw a line of ellipses with varying size
  for (let x = 0; x < width; x += 20) {
    let w = 10 + random(0, 0.1) * amplitude;
    ellipse(x, height * 0.75, w, w);
  }
}
