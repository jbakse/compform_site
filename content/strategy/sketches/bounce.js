// require https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js

let ballX = 0;
let ballSpeed = 10;

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(50);
  fill(200);

  if (ballX < 15) {
    ballSpeed = abs(ballSpeed);
  }
  if (ballX > 500 - 15) {
    ballSpeed = -abs(ballSpeed);
  }
  ballX += ballSpeed;

  ellipse(ballX, 250, 30, 30);
}
