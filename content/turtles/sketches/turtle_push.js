// require https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.14/p5.js
// require /turtles/turtle/turtle.js

var myTurtle;

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
  myTurtle.moveTo(250, 385);
  myTurtle.penDown();

  for (var i = 0; i < 180; i++) {
    myTurtle.moveForward(25 + i * 0.1);
    myTurtle.turnLeft(10);
    drawLeaf();
  }
}

function drawLeaf() {
  myTurtle.pushState();

  for (i = 0; i < 15; i++) {
    myTurtle.moveForward(2);
    myTurtle.turnLeft(18);
  }

  myTurtle.popState();
}
