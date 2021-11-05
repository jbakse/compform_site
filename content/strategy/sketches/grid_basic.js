// require https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js

function setup() {
  createCanvas(500, 500);
  noLoop();
}

function draw() {
  background(50);
  fill(200);
  noStroke();
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      ellipse(x * 50 + 25, y * 50 + 25, 10, 10);
    }
  }
}
