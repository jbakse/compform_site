// require https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js
// require /turtles/turtle/turtle.js

let myTurtle;

function setup() {
  createCanvas(500, 500);
  angleMode(DEGREES);
  myTurtle = new Turtle();
}

function draw() {
  background(50);

  noFill();
  stroke(255);
  strokeWeight(3);

  // move to starting position (without drawing)
  myTurtle.penUp();
  myTurtle.moveTo(100, 100);

  // put the pen down to draw
  myTurtle.penDown();

  // draw the triangle
  for (let i = 0; i < 3; i++) {
    myTurtle.moveForward(300);
    myTurtle.turnRight(120);
  }

  noLoop();
}
