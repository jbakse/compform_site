/**
 * Draws a cellular automata mouse trail effect
 *
 * written by Justin Bakse
 */

/// configure compform editor
// require https://cdn.jsdelivr.net/npm/p5@1.11.0/lib/p5.min.js
// require /mess.js

/// configure eslint
/* exported preload, setup, draw, mousePressed */
/* globals mess */

// the image that we will do the pixel work on
let bufferImge;
let currentHue = 0;

function setup() {
  /// set up canvas
  pixelDensity(1);
  const p5_canvas = createCanvas(windowWidth, windowHeight);

  /// configure p5
  noSmooth();
  colorMode(HSB, 1);

  /// register this sketch as a Comp Form background "mess"
  mess(p5_canvas, 2000, {
    messName: "pixels",
    messLink: "/js_lab/js_lab.html?/pixels/pixel_mess.js",
  });

  // create the inital buffer image
  messResize();
}

function draw() {
  clear();
  background("white");

  // draw a pixel under the mouse
  const c = [255, 255, 255, 255];
  const img_x = floor((mouseX / width) * bufferImge.width);
  const img_y = floor((mouseY / height) * bufferImge.height);
  setQuick(bufferImge, img_x, img_y, c);

  // run the grow method a bunch of times
  times(bufferImge.width * bufferImge.height, grow);

  // copy the buffer to the screen
  bufferImge.updatePixels();
  image(bufferImge, 0, 0, width, height);

  push();
  blendMode(ADD);
  currentHue = (currentHue + 0.003) % 1;
  fill(currentHue, 1, 1);
  noStroke();
  rect(0, 0, width, height);
  pop();
}

/**
 * Selects a random pixel and spreads it to a random neighboring pixel
 */
function grow() {
  // choose a random pixel
  const x = floor(random(bufferImge.width));
  const y = floor(random(bufferImge.height));
  // get its color
  const c = getQuick(bufferImge, x, y);

  // if the pixel has some red in it
  if (c[0] > 0) {
    // choose a random neighbor
    const x2 = x + floor(random(-1, 2));
    const y2 = y + floor(random(-1, 2));

    // set that neighbor to a slightly darker copy
    const c2 = [c[0] - 10, c[0] - 10, c[2] - 10, c[3]];
    setQuick(bufferImge, x2, y2, c2);
  }

  // reduce this pixel's alpha
  c[3] -= 10;
  setQuick(bufferImge, x, y, c);
}

/**
 * Creates a new buffer low-res image based on the window size.
 */
function messResize() {
  const cell_size = constrain(floor(width / 100), 10, 100);
  bufferImge = createImage(floor(width / cell_size), floor(height / cell_size));
  bufferImge.loadPixels();
}

/**
 * Gets the RGBA color values of an image's pixel at the specified coordinates.
 * @param {p5.Image} i - The source image
 * @param {number} x - The x coordinate of the pixel
 * @param {number} y - The y coordinate of the pixel
 * @returns {number[]} [r, g, b, a] representing the pixel color
 */
function getQuick(i, x, y) {
  const index = constrain((y * i.width + x) * 4, 0, i.width * i.height * 4);
  return [
    i.pixels[index + 0],
    i.pixels[index + 1],
    i.pixels[index + 2],
    i.pixels[index + 3],
  ];
}

/**
 * Sets the RGBA color values of an images' pixel at the specified coordinates.
 * @param {p5.Image} i - The target image
 * @param {number} x - The x coordinate of the pixel
 * @param {number} y - The y coordinate of the pixel
 * @param {number[]} c - [r, g, b, a] representing the pixel color
 */
function setQuick(i, x, y, c) {
  const index = constrain((y * i.width + x) * 4, 0, i.width * i.height * 4);

  i.pixels[index + 0] = c[0];
  i.pixels[index + 1] = c[1];
  i.pixels[index + 2] = c[2];
  i.pixels[index + 3] = c[3];
}

/**
 * Executes a function multiple times and collects the results in an array.
 * @param {number} t - The number of times to execute the function
 * @param {Function} f - The function, receives current index as parameter
 * @returns {Array} An array containing the results of each function call
 */
function times(t, f) {
  const a = [];
  for (let i = 0; i < t; i++) {
    a.push(f(i));
  }
  return a;
}
