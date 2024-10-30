/**
 * Generates random pixel-art faces.
 *
 * written by Justin Bakse
 */

/// configure compform editor
// require https://cdn.jsdelivr.net/npm/p5@1.11.0/lib/p5.js
// require /mess.js

/// configure eslint
/* exported preload setup draw mousePressed windowResized */
/* globals mess */

// A single image sprite atlas containing all the face parts
let facePartsImage;

// 2D array of of each 32x32 pixel tile from the facePartsImage sprite atlas
const faceTiles = [];

// arrays of p5 color objects
const faceColors = [];
const hairColors = [];

/**
 * Spinners are used to keep track of the current option for each trait.
 *
 * Spinners have 4 properties:
 * currentOption: integer index of the current option
 * optionCount: how many options there are for this trait
 * spinPosition: 0-1 how close the spinner is to choosing a new currentOption
 * spinSpeed: how fast the spinner is spinning
 *

 */
const traitSpinners = {
  bases: {},
  eyes: {},
  noses: {},
  mouths: {},
  hairs: {},
  accents: {},
  beards: {},
  face_colors: {},
  hair_colors: {},
};

// animation state
let easedMouseX;
let easedMouseY;
let faceRotation;

function preload() {
  facePartsImage = loadImage("/random/face_parts.png");
}

function setup() {
  /// set up canvas
  pixelDensity(1);
  const p5_canvas = createCanvas(windowWidth, windowHeight);

  /// register this sketch as a Comp Form background "mess"
  mess(p5_canvas, 2000, {
    messName: "faces",
    messLink: "/js_lab/js_lab.html?/random/faces_mess.js",
  });

  /// configure p5
  noSmooth();
  noStroke();
  fill(255, 0, 0);
  imageMode(CENTER);

  /// Process face parts image
  sliceFacePartsAtlas();

  /// Set up the spinners
  for (const key in traitSpinners) {
    const trait = traitSpinners[key];
    trait.currentOption = 0;
    trait.optionCount = 4;
    trait.spinPosition = 0;
    trait.spinSpeed = 0;
  }

  // set up face colors
  faceColors.push(color(250, 220, 180));
  faceColors.push(color(250, 180, 140));
  faceColors.push(color(170, 120, 120));
  faceColors.push(color(0, 120, 120));
  faceColors.push(color(200, 60, 200));
  faceColors.push(color(255, 255, 255));
  traitSpinners.face_colors.optionCount = faceColors.length;

  // set up hair colors
  hairColors.push(color(255, 0, 0)); // bright red
  hairColors.push(color(0, 255, 0)); // bright green
  hairColors.push(color(100, 200, 255)); // blue
  hairColors.push(color(255, 150, 150)); // pink
  hairColors.push(color(255, 100, 100)); // brown
  hairColors.push(color(255, 100, 0)); // orange
  hairColors.push(color(255, 255, 0)); // blonde
  hairColors.push(color(255, 0, 0)); // red
  hairColors.push(color(100, 100, 100)); // dark grey
  hairColors.push(color(255, 255, 255)); // white
  traitSpinners.hair_colors.optionCount = hairColors.length;

  startSpinners();

  /// set up state
  // start the face in the center of the screen
  easedMouseX = width * 0.5;
  easedMouseY = width * 0.5;
  // hack: set an initial value for mouse loc that will change when mouse moves
  mouseX = easedMouseX;
  mouseY = easedMouseY;
}

function draw() {
  /// step
  updateSpinners();
  // ease the face towards the mouse
  easedMouseX = lerp(easedMouseX, mouseX, 0.1);
  easedMouseY = lerp(easedMouseY, mouseY, 0.1);

  // give it a little lean while it moves
  faceRotation = (easedMouseX - mouseX) * 0.004;

  /// draw
  clear();
  drawFace(easedMouseX + 50, easedMouseY - 50, faceRotation, 300, 300);
}

function mousePressed() {
  startSpinners();
}

/**
 * Sets the spinSpeed of each spinner to a random value.
 */

function startSpinners() {
  for (const key in traitSpinners) {
    const trait = traitSpinners[key];
    trait.spinSpeed = random(0.2, 1.1);
  }
}

/**
 * Updates the spinners.
 *
 * spinPosition increases by spinSpeed. When spinPosition reaches 1, it resets
 * to 0 and currentOption is rechosen at random.
 */

function updateSpinners() {
  for (const key in traitSpinners) {
    const trait = traitSpinners[key];

    // slow down spinners
    trait.spinSpeed = trait.spinSpeed * 0.98;

    // stop spinners when they get slow enough
    if (trait.spinSpeed < 0.1) {
      trait.spinSpeed = 0;
    }

    // increment spinner
    trait.spinPosition += trait.spinSpeed;

    // when spinners "roll over" change option for that spinner
    if (trait.spinPosition > 1) {
      trait.spinPosition = 0;
      trait.currentOption = randomInt(trait.optionCount);
    }
  }
}

/**
 * Draws a face at the given position, rotation, and size.
 * Uses the current options from each traitSpinner to choose the face parts.
 */
function drawFace(x, y, r, w, h) {
  push();
  translate(x, y);
  rotate(r);

  const basesRow = 0;
  const eyesRow = 1;
  const nosesRow = 2;
  const mouthsRow = 3;
  const hairsRow = 4;
  const accentsRow = 5;
  const beardsRow = 6;

  tint(faceColors[traitSpinners.face_colors.currentOption]);
  image(faceTiles[traitSpinners.bases.currentOption][basesRow], 0, 0, w, h);
  image(faceTiles[traitSpinners.noses.currentOption][nosesRow], 0, 0, w, h);
  image(faceTiles[traitSpinners.eyes.currentOption][eyesRow], 0, 0, w, h);
  image(faceTiles[traitSpinners.mouths.currentOption][mouthsRow], 0, 0, w, h);

  tint(hairColors[traitSpinners.hair_colors.currentOption]);
  image(faceTiles[traitSpinners.hairs.currentOption][hairsRow], 0, 0, w, h);
  image(faceTiles[traitSpinners.beards.currentOption][beardsRow], 0, 0, w, h);
  image(faceTiles[traitSpinners.accents.currentOption][accentsRow], 0, 0, w, h);

  pop();
}

/**
 * Slices the facePartsImage sprite atlas into individual images.
 *
 * Using tint() when drawing a portion of the atlas is slow, because
 * p5.js is tinting the whole atlas, not just the part being drawn.
 *
 * This function creates a 2D array of graphics objects, each representing a
 * 32x32 pixel tile from the face parts image. The tiles are stored in the
 * global `tiles` array.
 */
function sliceFacePartsAtlas() {
  for (easedMouseX = 0; easedMouseX < 4; easedMouseX++) {
    faceTiles[easedMouseX] = [];
    for (easedMouseY = 0; easedMouseY < 8; easedMouseY++) {
      const g = createGraphics(32, 32);
      g.image(
        facePartsImage,
        0,
        0,
        32,
        32,
        easedMouseX * 32,
        easedMouseY * 32,
        32,
        32
      );
      faceTiles[easedMouseX][easedMouseY] = g.get();
    }
  }
}

/**
 * Returns a random integer in the range [0, max).
 */
function randomInt(max) {
  return floor(random(0, max));
}
