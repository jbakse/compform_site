// require https://cdn.jsdelivr.net/npm/p5@latest/lib/p5.min.js
/* exported preload setup draw */
/* global p5 */

let heartImage;

function preload() {
  heartImage = loadImage(
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAAXNSR0IArs4c6QAAAEZJREFUGFd9jcsNACAIQ9tB2MeR3YdBMBBq8CIXPi2vBICIiOwkOedatllqWO6Y8yOWoyuNf1GZwgmf+RRG2YXr+xVFmA8HZ9Mx/KGPMtcAAAAASUVORK5CYII="
  );
}

function setup() {
  console.log("P5.VERSION:", p5.VERSION);

  // create a small canvas that won't use anti-aliasing
  pixelDensity(1);
  noSmooth();
  const c = createCanvas(192, 108, WEBGL);

  // display the canvas scaled up, so we can clearly see the pixels
  c.elt.style = "width: 950px; height: 540px; image-rendering: pixelated";

  // turn off bilinear filtering for the image
  p5.instance._curElement
    .getTexture(heartImage)
    .setInterpolation(NEAREST, NEAREST);

  noLoop();
  ellipseMode(CORNER);
}

function draw() {
  // move 0, 0 to the upper left corner
  translate(-width / 2, -height / 2);

  background("gray");

  // ellipse
  push();
  noStroke();
  fill("white");
  ellipse(8, 8, 32, 32);
  pop();

  // rotated square
  push();
  noStroke();
  fill("white");
  translate(72, 24);
  rotate(0.1);
  translate(-16, -16);
  rect(0, 0, 32, 32);
  pop();

  // rotated square outline
  push();
  noFill();
  stroke("white");
  translate(120, 24);
  rotate(0.1);
  translate(-16, -16);
  rect(0, 0, 32, 32);
  pop();

  // not rotated square outline
  push();
  noFill();
  stroke("white");
  translate(120, 24);
  translate(-8, -8);
  rect(0, 0, 16, 16);
  translate(0.5, 0.5); // translate into the centers of the pixel grid (this cleans up 1 pixel lines)
  rect(4, 4, 8, 8);
  pop();

  // lines
  push();
  noFill();
  stroke("white");
  line(152, 8, 152 + 32, 8 + 32);
  strokeWeight(8);
  line(152, 8 + 32, 152 + 32, 8);
  pop();

  // images
  image(heartImage, 16, 64);
  image(heartImage, 48, 64, 32, 32);
}
