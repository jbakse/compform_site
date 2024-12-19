// require https://cdn.jsdelivr.net/npm/p5@latest/lib/p5.min.js

const gravity = 1; // accelerate 1 pixel per frame
let velocity = 0;
let y = 10;

function setup() {
  createCanvas(720, 480);
  background("black");
}

function draw() {
  // numerically integrate the velocity and position
  velocity += gravity;
  y += velocity;

  // bounce off the bottom
  if (y > height) {
    y = height;
    velocity = -abs(velocity);
  }

  background("black");
  fill("white");
  noStroke();

  ellipse(360, y, 20, 20);
}
