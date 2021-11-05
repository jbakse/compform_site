// require https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(50);

  noStroke();
  ellipseMode(CENTER);
  colorMode(HSB, 100);

  let noiseFrequency = 0.02;

  for (let i = 0; i < 100; i++) {
    let x = (random(width) + random(width) + random(width)) * 0.33;
    let y = (random(height) + random(height) + random(height)) * 0.33;
    let size = noise(x * noiseFrequency, y * noiseFrequency) * 20 + 2;
    let hue = noise(x * noiseFrequency, y * noiseFrequency) * 150 - 25;
    fill(hue, 100, 100);
    ellipse(x, y, size, size);
  }

  noLoop();
}
