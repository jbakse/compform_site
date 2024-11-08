/**
 * Draws colorful falling confetti with mouse interaction.
 *
 * written by Justin Bakse
 */

/// configure compform editor
// require https://cdn.jsdelivr.net/npm/p5@1.11.0/lib/p5.js
// require /mess.js

/// configure eslint
/* exported preload, setup, draw, mousePressed */
/* globals mess */

// settings
const SPAWN_RATE = 10;
const GRAVITY = 0.8;
const DRAG = 0.9;
const AIR_FORCE = 1;

// state
let flakes = [];
let colorIndex = 0;

function setup() {
  /// set up canvas
  pixelDensity(1);
  const p5_canvas = createCanvas(windowWidth, windowHeight);

  /// configure p5
  colorMode(HSB, 1);

  /// register this sketch as a Comp Form background "mess"
  mess(p5_canvas, 2000, {
    messName: "flakes",
    messLink: "/js_lab/js_lab.html?/p5/flakes_mess.js",
  });
}

function draw() {
  /// update
  if (frameCount % SPAWN_RATE === 0) {
    flakes.push(new Flake(mouseX, mouseY));
  }

  for (const flake of flakes) {
    flake.step();
  }

  // filter out flakes that should be removed
  flakes = flakes.filter((flake) => !flake.shouldBeRemoved());

  /// draw
  clear();
  for (const flake of flakes) {
    flake.draw();
  }
}

/**
 * Represents a single confetti flake with position, movement, and color.
 */
class Flake {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.deltaX = random(-5, 5);
    this.deltaY = random(-1, -5);
    this.air = random(0, 2 * PI);
    this.deltaAir = random(0.05, 0.1);
    this.color = colorIndex;
    this.scale = 0;
    colorIndex = (colorIndex + 0.05) % 1;
  }

  step() {
    // gravity
    this.deltaY += GRAVITY;

    // drag
    this.deltaX *= DRAG;
    this.deltaY *= DRAG;

    // add a little side to side motion
    // this isn't really simulating air in any principled way
    // but it looks nice
    this.air += this.deltaAir;
    const airForce = sin(this.air);
    this.deltaX += airForce * AIR_FORCE;

    // position
    this.x += this.deltaX;
    this.y += this.deltaY;

    // ease the scale toward 200
    this.scale = lerp(this.scale, 200, 0.2);
  }

  shouldBeRemoved() {
    return this.y > height * 1.1;
  }

  draw() {
    push();
    noStroke();
    fill(this.color, 1, 1);
    translate(this.x, this.y);
    shearX(0.2);
    rotate(this.deltaX * 0.04);
    rect(0, 0, this.scale, this.scale);
    pop();
  }
}
