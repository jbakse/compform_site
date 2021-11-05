// require https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js

function setup() {
  createCanvas(500, 500);
  noLoop();
}

function draw() {
  background(50);
  fill(200);
  noStroke();
  for (let i = 0; i < 100; i++) {
    const x = random(500);
    const y = random(500);

    ellipse(x, y, 10, 10);
  }
}
