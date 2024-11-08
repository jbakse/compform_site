/**
 * Draws a margin doodle using a turtle
 *
 * written by Justin Bakse
 */

/// configure compform editor
// require https://cdn.jsdelivr.net/npm/p5@1.11.0/lib/p5.min.js
// require /turtles/turtle/turtle.js
// require /mess.js

/// configure eslint
/* exported preload, setup, draw, mousePressed */
/* globals mess, Turtle */

// the global turtle instance
let t;

// the generator function that draws the margin doodle
let g;

function setup() {
  /// set up canvas
  pixelDensity(1);
  const p5_canvas = createCanvas(windowWidth, windowHeight);

  /// configure p5
  noFill();
  stroke("black");
  strokeWeight(2);
  angleMode(DEGREES);

  /// register this sketch as a Comp Form background "mess"
  mess(p5_canvas, 2000, {
    messName: "doodle",
    messLink: "/js_lab/js_lab.html?/turtles/turtle_mess.js",
  });

  // create the generator object
  g = drawGen();

  // create the turtle
  t = new Turtle();
  t.show();
}

function draw() {
  g.next();
}

function* drawGen() {
  // repeat this forever
  while (true) {
    // clear the screen
    background("white");

    // position the turtle
    t.penUp();
    t.moveTo(40, 100);
    t.turnTo(0);
    t.penDown();

    // zig zag down the page
    while (t.y < height - 100) {
      yield t.moveForward(25);
      yield t.moveForward(25);
      yield t.moveForward(25);
      yield t.moveForward(25);
      for (let i = 0; i < 10; i++) {
        t.turnRight(18);
        yield t.moveForward(6);
      }

      yield t.moveForward(25);
      yield t.moveForward(25);
      yield t.moveForward(25);
      yield t.moveForward(25);
      for (let i = 0; i < 10; i++) {
        t.turnLeft(18);
        yield t.moveForward(6);
      }
    }
  }
}
