// require https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.14/p5.js

// Number of Squares to Draw
let num_squares = 10;

// The width of the squares.
let square_size = 10;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  fill(100);
  noStroke();
  rectMode(CENTER);
}

function draw() {
  background(50);
  fill(200, 100, 100);
  for (let i = 0; i < num_squares; i++) {
    rect(random(0, width), random(0, height), square_size, square_size);
  }
  noLoop();
}
