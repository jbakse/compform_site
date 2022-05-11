// require https://cdn.jsdelivr.net/npm/p5@latest/lib/p5.min.js
/* exported setup draw keyPressed*/

/**
 * draws a "consipiracy board"
 * a pin board with numerous documents, photos, Post-Its, and strings
 */

// a small p5.Graphics for drawing the faces into

const RESOLUTION = 1;
const PIXELY_SHAPES = true;
const PIXELY_FACES = true;
const MESSY = 10;

let face;

function setup() {
  console.log("P5.VERSION:", p5.VERSION);

  // make a small canvas
  // use WEBGL + noSmooth() to get non antialiased shapes and lines
  pixelDensity(1);
  if (PIXELY_SHAPES) noSmooth();
  const mainCanvas = createCanvas(192 * RESOLUTION, 108 * RESOLUTION, WEBGL);

  // scale the canvas up, without antialiasing
  mainCanvas.elt.style =
    "width: 960px; height: 540px; image-rendering: pixelated";

  // configure P5
  noLoop();

  // randomSeed(1098);
  angleMode(DEGREES);

  // set up the p5.Graphics we'll use for drawing the faces
  face = createGraphics(16, 20, WEBGL);
  face.pixelDensity(1);
  face.noSmooth();
  face.noFill();
  face.noStroke();
  face.angleMode(DEGREES);
  face.drawingContext.disable(face.drawingContext.DEPTH_TEST);

  // disable bilinear filtering on the face p5.Graphics (make it jaggy!)
  if (PIXELY_FACES) {
    p5.instance._curElement.getTexture(face).setInterpolation(NEAREST, NEAREST);
  }
}

function draw() {
  // figure out our composition
  const locations = planLocations();

  // we don't need or want depth testing
  // we want everything we draw to be on top of everything else
  // just like drawing in P2D
  drawingContext.disable(drawingContext.DEPTH_TEST);

  // clear canvas to a dark gray
  background(50);

  // in WEBGL mode 0,0 is in the center of the canvas
  // move it to the upper left corner, like P2D mode
  translate(width * -0.5, height * -0.5);

  // draw pinholes
  times(500, drawPinhole);

  // draw a document/photo at each location
  drawDocuments(locations);

  // draw strings
  drawStrings(locations);
}

/**
 * creates an array of points marking where we should draw the documents
 */

function planLocations() {
  // start by arranging the photos in a grid
  const photoLocations = populateGrid(
    { x: 0, y: 0, w: width, h: height },
    8,
    4
  );

  // offset each photo by a random amount
  photoLocations.forEach((loc) => (loc.x += random(-1 * MESSY, 1 * MESSY)));
  photoLocations.forEach((loc) => (loc.y += random(-1 * MESSY, 1 * MESSY)));

  // reorder the locations so the photos "stack" randomly
  shuffle(photoLocations);

  return photoLocations;
}

/**
 * draws a pinhole at a random location
 */

function drawPinhole() {
  push();

  fill(random([20, 40, 60]));
  noStroke();
  rect(random(width), random(height), 1, 1);

  pop();
}

/**
 * draws document at provided location
 */

function drawDocuments(locations) {
  for (const loc of locations) {
    push();
    translate(loc.x, loc.y);
    drawDocument(20, 24);
    pop();
  }
}

/**
 * draws a document of the given size at 0,0
 * use translate() to position the document
 */

function drawDocument(w, h) {
  push();

  // configure p5
  rectMode(CENTER);
  noStroke();

  // rotate the document a bit
  rotate(middleRandom(-2 * MESSY, 2 * MESSY));

  // shadow
  fill(0, 0, 0, 100);
  rect(0, 1, w + 2, h + 2);

  // paper
  fill(255);
  rect(0, 0, w, h);

  // content
  if (random() < 0.65) {
    drawFace();
  } else {
    drawText(w - 4, h - 4);
  }

  // notes
  drawPostIts(randomInt(0, 4));

  pop();
}

/**
 * draws `count` PostIts randomly positioned near 0,0
 * use translated() to position the notes
 */

function drawPostIts(count = 1) {
  times(count, () => {
    push();
    translate(random(-10, 10), random(-10, 10));
    rotate(middleRandom(-20, 20));
    drawPostIt(6, 6);
    pop();
  });
}

/**
 * draws a PostIt note of the given size at 0,0
 * use translate() to position the note
 */

function drawPostIt(w, h) {
  push();

  // shadow
  fill(0, 50);
  rect(1, 1, w, h);

  // paper
  fill(random(["pink", "yellow", "yellow"]));
  rect(0, 0, w, h);

  // text
  drawText(w - 4, h - 4);

  pop();
}

/**
 * draws left justified pixel text filling a rectangle of the given size
 * use translate() to position the text
 */

function drawText(w, h) {
  push();

  // configure p5
  noFill();

  // move to the upper left hand of our rectangle
  translate(-w * 0.5, -h * 0.5);

  for (let y = 0; y < h; y += 3) {
    // draw highlight
    if (random() < 0.25) {
      stroke("yellow");
      strokeWeight(2);
      line(random(1, w), y, w - random(1, w), y);
    }

    // draw line
    if (random() < 0.9) {
      stroke("black");
      strokeWeight(1);
      line(0, y, w - random(0, w * 0.5), y);
    }
  }

  pop();
}

/**
 * draws a face
 * 1. draw into `face` p5.Graphics
 * 2. draw that onto the main canvas
 *
 * reuses the same p5.Graphics object to draw each face, so
 * the size is not configurable
 *
 * use translate() to position face
 */

function drawFace() {
  // define our limited palette
  const white = 255;
  const lightGray = 200;
  const midGray = 150;
  const darkGray = 100;
  const darkerGray = 50;

  face.push();

  // draw background
  face.background(random([darkGray, lightGray]));

  // offset our face in the frame
  face.translate(random(-3, 3), random(-3, 3));

  // upper hair
  face.fill(random([lightGray, midGray, darkGray, darkerGray]));
  if (random() < 0.75) {
    face.ellipse(0, -3, 12, 10);
  }
  // lower hair
  if (random() < 0.5) {
    face.ellipse(0, +3, 12, 10);
  }

  // shirt
  face.fill(random([50, midGray, darkerGray]));
  face.ellipse(0, 10, 22, 15);

  // head shadow
  face.fill(0, 50);
  face.ellipse(0, 2, 12, 15);

  // head
  face.fill(random([lightGray, lightGray, lightGray, darkGray]));
  face.ellipse(0, 0, 12, 12);

  // highlights
  face.fill(255, 60);
  face.ellipse(0, -4, 8, 3); // forehead
  face.ellipse(0, 1, random(1, 3), random(2, 5)); // nose
  face.ellipse(-4, +1, 2, 2); // left cheek
  face.ellipse(+4, +1, 3, 3); // right cheek

  // shadows
  face.fill(0, 30);
  face.ellipse(0, 2, 2, 1); // under nose
  face.ellipse(0, 5, random(3, 4), random(2, 3)); // chin

  // mouth
  face.fill(0, 60);
  face.ellipse(0, 3, random(3, 5), random(1, 2)); // mouth

  // eyes
  face.fill(white);
  face.ellipse(-2, -1, 3, 2);
  face.ellipse(+2, -1, 3, 2);

  // irises
  const eyeColor = random([midGray, darkGray]);
  const shift = random(-1, 1);
  face.fill(eyeColor);
  face.ellipse(-2 + shift, -1, 1.5, 1.5);
  face.ellipse(+2 + shift, -1, 1.5, 1.5);

  face.pop();

  // draw the `face` onto the main canvas
  push();
  imageMode(CENTER);
  image(face, 0, 0);
  pop();
}

/**
 * draws clusters of strings connecting documents
 */

function drawStrings(photoLocations) {
  times(2, () => {
    const start = random(photoLocations);
    times(random(3, 6), () => {
      const end = random(photoLocations);
      drawString(start, end);
    });
  });
}

/**
 * draws a single string from the starting point the the ending point
 */

function drawString(start, end) {
  push();

  // shadow
  stroke(0, 150);
  line(start.x, start.y + 1, end.x, end.y + 1);
  // string
  stroke("red");
  line(start.x, start.y, end.x, end.y);

  pop();
}

/**
 * divides the given rect into a grid
 * returns array of points representing the center of each grid cell
 */

function populateGrid(rect, cols, rows) {
  const points = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      points.push({
        x: rect.x + (rect.w / cols) * (col + 0.5),
        y: rect.y + (rect.h / rows) * (row + 0.5),
      });
    }
  }
  return points;
}

/**
 * returns a random number biased towards the center of the range
 * increase `rolls` for more bias
 */

function middleRandom(min, max, rolls = 2) {
  let v = 0;
  for (let roll = 0; roll < rolls; roll++) {
    v += random(min, max);
  }
  return v / rolls;
}

/**
 * returns a random integer between `min` and `max`
 */

function randomInt(min, max) {
  return floor(random(min, max));
}

/**
 * calls function `f`, `t` times
 * provided function receives the index of the iteration as an argument
 * returns array of the results
 */

function times(t, f) {
  const a = [];
  for (let i = 0; i < t; i++) {
    a.push(f(i));
  }
  return a;
}

/**
 * downloads the drawing as a .png file
 */

function keyPressed() {
  if (key === "s") {
    saveCanvas("conspiracy", "png");
  }
}
