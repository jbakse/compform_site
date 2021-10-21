// require https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.min.js

// Number of squares to draw
const SQUARE_COUNT = 10;

// The width of the squares, in pixels.
const SQUARE_SIZE = 10;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  fill(100);
  noStroke();
  rectMode(CENTER);
}

function draw() {
  background(50);
  fill(200, 100, 100);
  for (var i = 0; i < SQUARE_COUNT; i++) {
    rect(random(0, width), random(0, height), SQUARE_SIZE, SQUARE_SIZE);
  }
  noLoop();
}
