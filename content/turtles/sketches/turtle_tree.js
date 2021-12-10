// require https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js
// require /turtles/turtle/turtle.js

let myTurtle;

function setup() {
  createCanvas(500, 500);
  noFill();
  stroke(255);
  background(50);
  noLoop();
  myTurtle = new Turtle();
}

function draw() {
  myTurtle.penUp();
  myTurtle.moveTo(250, 450);
  myTurtle.turnTo(-90);
  myTurtle.penDown();
  drawBranch(100);
}

function drawBranch(length) {
  if (length < 10) {
    return;
  }

  // draw this branch
  myTurtle.moveForward(length);

  // left child
  myTurtle.pushState();
  myTurtle.turnLeft(35);
  drawBranch(length * 0.75);
  myTurtle.popState();

  // right child
  myTurtle.pushState();
  myTurtle.turnRight(35);
  drawBranch(length * 0.75);
  myTurtle.popState();
}
