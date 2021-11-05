// require https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js

// Dot Challenge Starting Point

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(50);

  noStroke();
  ellipseMode(CENTER);

  let noiseFrequency = 0.02;

  for (let i = 0; i < 100; i++) {
    // these points are not scattered in the same way
    // how can you make the arrangement match the challenge?
    let x = random(width);
    let y = random(height);

    // the diameter shouldn't always be 10, it needs to vary
    let diameter = 10;

    // the colors also need to change
    // what colorMode would be easiest to work with?
    fill(255, 255, 255);

    ellipse(x, y, diameter, diameter);
  }

  noLoop();
}
