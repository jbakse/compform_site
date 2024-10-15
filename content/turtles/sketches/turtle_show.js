// require https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js
// require /turtles/turtle/turtle.js

/* global Turtle */
/* exported setup draw */
let t;

function setup() {
  createCanvas(400, 400);

  angleMode(DEGREES);
  noFill();
  stroke("white");
  background(50);

  t = new Turtle();
  t.show();
}

function draw() {
  //   t.turnLeft(frameCount);
  for (let i = 0; i < 36; i++) {
    t.moveForward(10);
    t.turnRight(10);
  }
}
