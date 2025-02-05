/**
 * Draws a well-placed dot trail.
 *
 * written by Justin Bakse
 */

/// configure compform editor
// require https://cdn.jsdelivr.net/npm/p5@1.11.0/lib/p5.js
// require /mess.js

/// configure eslint
/* exported preload, setup, draw, mousePressed */
/* globals mess */

let dots = [];

function setup() {
  /// set up canvas
  pixelDensity(1);
  const p5_canvas = createCanvas(windowWidth, windowHeight);

  /// register this sketch as a Comp Form background "mess"
  mess(p5_canvas, 2000, {
    messName: "dots",
    messLink: "/js_lab/js_lab.html?/strategy/strategy_mess.js",
  });

  /// configure p5
  frameRate(60);
  fill(255, 0, 0);
  noStroke();
  colorMode(HSB, 1);
}

function draw() {
  if (mouseX === 0 && mouseY === 0) return;

  /// step
  dots.push(new Dot(mouseX, mouseY));

  // shrink oldest dot; shrink faster when there are more dots
  dots[0].radius -= 1 + dots.length / 50;

  for (const dot of dots) {
    dot.step();
  }

  // filter out dots that should be removed
  dots = dots.filter((dot) => !dot.shouldBeRemoved());

  /// draw
  clear();
  for (const dot of dots) {
    dot.draw();
  }

  if (frameCount === 100) {
    noLoop();
  }
}

class Dot {
  constructor(x, y) {
    // add a little randomness to the starting position
    // so that dots don't start exactly on top of each other
    // when the mouse isn't moving
    this.x = x + random(-0.1, 1);
    this.y = y + random(-0.1, 1);
    this.radius = 15;
    this.seeking = true;
    this.hue = map(this.x + this.y, 0, width + height, 0, 1);
  }

  step() {
    // Dots that are done seeking don't need to do anything
    if (!this.seeking) return;

    // assume we'll find a spot to land and will stop seeking
    // this assumption will be reversed if we don't
    this.seeking = false;

    // loop through all the dots
    for (const otherDot of dots) {
      // don't compare this dot to itself
      if (this === otherDot) continue;

      // if dots are close to each other
      const d = dist(this.x, this.y, otherDot.x, otherDot.y);
      const minDist = this.radius + otherDot.radius + 5;
      if (d < minDist) {
        // move the seeking dot away from the existing dot
        const dX = (this.x - otherDot.x) / d;
        const dY = (this.y - otherDot.y) / d;
        this.x += dX;
        this.y += dY;
        // shrink it
        this.radius -= 0.1;
        // and remember that we need to keep seeking
        this.seeking = true;
      }
    }
  }

  shouldBeRemoved() {
    // remove dots that get shrunk to 1
    if (this.radius < 1) return true;

    // remove dots that don't find a spot to land in time
    if (this.radius < 3 && this.seeking) return true;

    return false;
  }

  draw() {
    push();
    fill(this.hue, 1, 1);
    noStroke();
    translate(this.x, this.y);
    ellipse(0, 0, this.radius * 2, this.radius * 2);
    pop();
  }
}
