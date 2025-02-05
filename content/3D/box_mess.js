/**
 * Displays 3D boxes that rotate and move with the cursor.
 *
 * written by Ana Konzen
 * edited by Justin Bakse
 */

/// configure compform editor
// require https://cdn.jsdelivr.net/npm/p5@1.11.0/lib/p5.min.js
// require /mess.js

/// configure eslint
/* exported preload, setup, draw, mousePressed */
/* global mess */

const boxSize = 30;
const numBoxes = 100;
const boxSpeed = 0.001;
const noiseFreqY = 0.03;
const noiseFreqX = 0.01;
const noiseScaleX = 50;
const noiseScaleY = 40;

const boxAngles = [];
const delaysX = [];
const delaysY = [];

let angleShift = 0;
let lerpedMouseX = 0;
let lerpedMouseY = 0;

function setup() {
  /// set up canvas
  const p5_canvas = createCanvas(windowWidth, windowHeight, WEBGL);

  /// register this sketch as a Comp Form background "mess"
  mess(p5_canvas, 2000, {
    messName: "boxes",
    messLink: "/js_lab/js_lab.html?/3D/box_mess.js",
    authorName: "ana konzen",
    authorLink: "https://anakonzen.com",
  });

  /// configure p5
  colorMode(HSB, 1000);
  noStroke();

  // position boxes in the center
  lerpedMouseX = mouseX = width * 0.5;
  lerpedMouseY = mouseY = height * 0.5;

  // set initial angle for each box
  for (let i = 0; i < numBoxes; i++) {
    boxAngles.push({
      z: random(360),
      y: random(0.1, 1),
      x: random(0.1, 1),
    });
  }
}

function draw() {
  clear();

  lerpedMouseX = lerp(lerpedMouseX, mouseX, 0.1);
  lerpedMouseY = lerp(lerpedMouseY, mouseY, 0.1);

  //set delay for each box
  delaysX.unshift(lerpedMouseX); //add the current position to the beginning of the array
  if (delaysX.length > numBoxes) delaysX.pop(); //remove the last element if the array is longer than the number of boxes

  delaysY.unshift(lerpedMouseY);
  if (delaysY.length > numBoxes) delaysY.pop();

  //change angle shift over time and increase speed when mouse is pressed
  angleShift += 0.02;
  if (mouseIsPressed) angleShift += 0.1;

  const baseNoiseX = noise(0, frameCount * boxSpeed);
  const baseNoiseY = noise(0, 1, frameCount * boxSpeed);

  //draw

  //change coordinate system
  translate(-width / 2, -height / 2);

  //set lights
  ambientLight(0, 0, 400);
  directionalLight(1000, 0, 800, 0, 0, -1);
  directionalLight(1000, 0, 300, 0, 1, 0);
  directionalLight(1000, 0, 800, 1, 0, 0);

  //draw boxes
  for (let i = 0; i < numBoxes; i++) {
    const noiseX =
      (noise(i * noiseFreqX, frameCount * boxSpeed) - baseNoiseX) *
      (i + noiseScaleX);
    const noiseY =
      (noise(i * noiseFreqY, 1, frameCount * boxSpeed) - baseNoiseY) *
      (i + noiseScaleY);

    ambientMaterial((i * 20) % 1000, 1000, 1000);

    push();

    //position each box according to noise and delays for staggered effect. each box is positioned behind the previous box
    translate(
      delaysX[i] + boxSize * noiseX,
      delaysY[i] + boxSize * noiseY,
      -boxSize * (i + 2)
    );

    rotateX(boxAngles[i].x + angleShift);
    rotateY(boxAngles[i].y + angleShift);
    rotateZ(boxAngles[i].z + angleShift);

    box(boxSize);

    pop();
  }
}

//mess util functions
function pauseMess() {
  noLoop();
}

function resumeMess() {
  loop();
}
