// require https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js
// require /turtles/turtle/turtle.js

/* global Turtle */
/* exported setup draw */
let t;
let g; // a global to hold our generator
function setup() {
  createCanvas(400, 400);

  angleMode(DEGREES);
  noFill();
  stroke("white");
  background(50);

  t = new Turtle();
  t.show();

  g = drawGenerator(); // create a generator object using the generator function
}

function draw() {
  g.next();
}

// this is a generator function for the drawing
// it uses the yield keyword to pause execution, returning control to
// the draw function. This lets us see the drawing.
// When g.next() is called the generator resumes where it left off.

function* drawGenerator() {
  while (true) {
    // go forever
    for (let i = 0; i < 36; i++) {
      // a circle in 36 steps
      t.moveForward(10);
      t.turnRight(10);
      // pause here to show frame
      yield;
    }
  }
}
