/**
 * Draws a noisey mouse trail.
 *
 * written by Justin Bakse
 */

/// configure compform editor
// require https://cdn.jsdelivr.net/npm/p5@1.11.0/lib/p5.js
// require /mess.js

/// configure eslint
/* exported preload, setup, draw, mousePressed */
/* globals mess */

const LINE_COUNT = 30;
const LINE_CLOSENESS = 1;
const N_FREQ = 0.01;
const N_AMP = 100;

// state
let currentHue = 0;

function setup() {
  /// set up canvas
  pixelDensity(1);
  const p5_canvas = createCanvas(windowWidth, windowHeight);

  /// register this sketch as a Comp Form background "mess"
  mess(p5_canvas, 2000, {
    messName: "noise",
    messLink: "/js_lab/js_lab.html?/noise/noise_mess.js",
  });

  /// configure p5
  noFill();
  colorMode(HSB, 1);
}

function draw() {
  brush(pmouseX, pmouseY, mouseX, mouseY);
}

/**
 * draws a noisey brush effect from x1,y1 to x2, y2
 */
function brush(x1, y1, x2, y2) {
  // rather than draw from x1,y1 to x2,y2, one stroke
  // we break it up into small steps for more detail
  const stepSize = 3;
  const steps = dist(x1, y1, x2, y2) / stepSize;

  for (let n = 0; n < steps; n++) {
    // find start/end of segment
    const start_x = lerp(x1, x2, n / steps);
    const start_y = lerp(y1, y2, n / steps);
    const end_x = lerp(x1, x2, min((n + 1) / steps, 1));
    const end_y = lerp(y1, y2, min((n + 1) / steps, 1));

    // rotate the color hue
    currentHue = (currentHue + 0.01) % 1;

    // set drawing style
    strokeWeight(1);
    stroke(currentHue, 1, 1, 0.2);

    // draw multiple lines with different noise applied
    for (let i = 0; i < LINE_COUNT; i++) {
      drawNoiseLine(
        start_x,
        start_y,
        end_x,
        end_y,
        (i * LINE_CLOSENESS) / LINE_COUNT
      );
    }
  }
}

/**
 * Draws a line with noise applied to the coordinates.
 * lineNumber is used as the z-axis for the noise, so each line is a little
 * different.
 */
function drawNoiseLine(x1, y1, x2, y2, lineNumber) {
  // generate noise values to offset the line
  let nx1 = noise(x1 * N_FREQ, y1 * N_FREQ, lineNumber);
  let ny1 = noise(x1 * N_FREQ, y1 * N_FREQ, lineNumber + 10);
  let nx2 = noise(x2 * N_FREQ, y2 * N_FREQ, lineNumber);
  let ny2 = noise(x2 * N_FREQ, y2 * N_FREQ, lineNumber + 10);

  // map the offsets from [0,1) to [-N_AMP, N_AMP)
  nx1 = map(nx1, 0, 1, -N_AMP, N_AMP);
  ny1 = map(ny1, 0, 1, -N_AMP, N_AMP);
  nx2 = map(nx2, 0, 1, -N_AMP, N_AMP);
  ny2 = map(ny2, 0, 1, -N_AMP, N_AMP);

  // draw the line
  line(x1 + nx1, y1 + ny1, x2 + nx2, y2 + ny2);
}
