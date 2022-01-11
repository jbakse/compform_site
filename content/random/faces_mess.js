// draws random composite face

const grid_width = 32;
const grid_height = 32;
const bases = 0;
const eyes = 1;
const noses = 2;
const mouths = 3;
const hairs = 4;
const accents = 5;
const beards = 6;
const trait_names = [
  "bases",
  "eyes",
  "noses",
  "mouths",
  "hairs",
  "accents",
  "beards",
  "face_colors",
  "hair_colors",
];

let p5_canvas;
let face_parts;
let tiles;

const face_colors = [];
const hair_colors = [];
const trait_spinners = {};

let x = false;
let y = 0;
let r = 0;

function preload() {
  face_parts = loadImage("./face_parts.png");
}

function setup() {
  pixelDensity(1);

  //p5_canvas = createCanvas(windowWidth * 0.5, windowHeight * 0.5);
  p5_canvas = createCanvas(windowWidth, windowHeight);

  p5_canvas.canvas.classList.add("mess");
  p5_canvas.canvas.setAttribute("style", "");

  face_colors.push(color(250, 220, 180));
  face_colors.push(color(250, 180, 140));
  face_colors.push(color(170, 120, 120));
  face_colors.push(color(0, 120, 120));
  face_colors.push(color(200, 60, 200));
  face_colors.push(color(255, 255, 255));

  hair_colors.push(color(255, 0, 0)); // bright red
  hair_colors.push(color(0, 255, 0)); // bright green
  hair_colors.push(color(100, 200, 255)); // blue
  hair_colors.push(color(255, 150, 150)); // pink
  hair_colors.push(color(255, 100, 100)); // brown
  hair_colors.push(color(255, 100, 0)); // orange
  hair_colors.push(color(255, 255, 0)); // blonde
  hair_colors.push(color(255, 0, 0)); // red
  hair_colors.push(color(100, 100, 100)); // dark grey
  hair_colors.push(color(255, 255, 255)); // white

  trait_names.forEach((name) => {
    trait_spinners[name] = {
      counter: 0,
      rate: 0,
      value: 0,
      option_count: 4,
    };
  });

  trait_spinners.face_colors = {
    counter: 0,
    rate: 0,
    value: 0,
    option_count: face_colors.length,
  };

  trait_spinners.hair_colors = {
    counter: 0,
    rate: 0,
    value: 0,
    option_count: hair_colors.length,
  };

  sliceAtlas();
  resetSpinners();

  noSmooth();
  noStroke();
  fill(255, 0, 0);
  imageMode(CENTER);
  frameRate(60);

  x = mouseX = width * 0.5;
  y = mouseY = width * 0.5;

  show();
}

function draw() {
  // step
  updateSpinners();

  // draw
  clear();
  x = lerp(x, mouseX, 0.1);
  y = lerp(y, mouseY, 0.1);
  r = (x - mouseX) * 0.004;
  drawFace(x + 50, y - 50, r, 300, 300);
}

function mousePressed() {
  resetSpinners();
}

function sliceAtlas() {
  // sigh, the atlas is really slow when used with tint
  // looks like p5 is tinting the whole atlas, not just the part being drawn
  // this code breaks the atlas up into tiles so that tinting is fast
  tiles = [];

  for (x = 0; x < 4; x++) {
    tiles[x] = [];
    for (y = 0; y < 8; y++) {
      const g = createGraphics(32, 32);
      //   g.noSmooth();
      g.image(face_parts, 0, 0, 32, 32, x * 32, y * 32, 32, 32);
      tiles[x][y] = g.get();
    }
  }
}

function resetSpinners() {
  // set spinners to random speed
  for (const key in trait_spinners) {
    const trait = trait_spinners[key];
    trait.rate = random(0.2, 1.1);
  }
}

function updateSpinners() {
  for (const key in trait_spinners) {
    const trait = trait_spinners[key];

    // slow down spinners
    trait.rate = trait.rate * 0.98;
    if (trait.rate < 0.1) {
      trait.rate = 0;
    }
    trait.counter += trait.rate;

    // when spinners "roll over" change option for that spinner
    if (trait.counter > 1) {
      trait.counter = 0;
      trait.value = randomInt(trait.option_count);
    }
  }
}

function drawFace(x, y, r, w, h) {
  translate(x, y);
  rotate(r);

  tint(face_colors[trait_spinners.face_colors.value]);
  drawTile(0, 0, w, h, trait_spinners.bases.value, bases);
  drawTile(0, 0, w, h, trait_spinners.noses.value, noses);
  drawTile(0, 0, w, h, trait_spinners.eyes.value, eyes);
  drawTile(0, 0, w, h, trait_spinners.mouths.value, mouths);

  tint(hair_colors[trait_spinners.hair_colors.value]);
  drawTile(0, 0, w, h, trait_spinners.hairs.value, hairs);
  drawTile(0, 0, w, h, trait_spinners.beards.value, beards);
  drawTile(0, 0, w, h, trait_spinners.accents.value, accents);

  noTint();
}

function randomInt(max) {
  return floor(random(0, max));
}

function drawTile(x, y, width, height, tile_x, tile_y) {
  image(tiles[tile_x][tile_y], x, y, width, height);
}

// fade the canvas out when mouse is still
let hide_timeout = null;
const wait_ms = 3000;

function show() {
  p5_canvas && p5_canvas.canvas.classList.remove("hide");
  hide_timeout && clearTimeout(hide_timeout);
  hide_timeout = setTimeout(hide, wait_ms);
}
function hide() {
  p5_canvas && p5_canvas.canvas.classList.add("hide");
}

window.addEventListener("mousemove", () => {
  show();
});

// resize canvas
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
