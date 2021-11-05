// require https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js
// require /turtles/turtle/turtle.js

// basic template sketch showing how to use the Turtle class
let myTurtle;

function setup() {
  createCanvas(500, 500);
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
  for (let i = 0; i < 5; i++) {
    console.log(myTurtle.x, myTurtle.y);
    myTurtle.moveForward(100);
    myTurtle.turnRight(144);
    console.log(myTurtle.x, myTurtle.y);
  }

  noLoop();
}
