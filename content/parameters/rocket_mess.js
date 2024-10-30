/**
 * A simple "flock" that follows the mouse
 *
 * written by Justin Bakse
 */

/// configure compform editor
// require https://cdn.jsdelivr.net/npm/p5@1.11.0/lib/p5.js
// require /mess.js

/// configure eslint
/* exported preload setup draw mousePressed windowResized */
/* globals mess */

// references the control DOM elements
let controlsDiv;
let minSpeedSlider;
let maxSpeedSlider;
let minTurnSlider;
let maxTurnSlider;

// current parameters from the ui
let minSpeed;
let maxSpeed;
let minTurn;
let maxTurn;

// array of rocket objects
const rockets = [];

function setup() {
  /// set up canvas
  pixelDensity(1);
  const p5_canvas = createCanvas(windowWidth, windowHeight);

  /// register this sketch as a Comp Form background "mess"
  mess(p5_canvas, 2000, {
    messName: "rocket",
    messLink: "/js_lab/js_lab.html?/parameters/rocket_mess.js",
  });

  /// configure p5
  fill(255, 0, 0);
  noStroke();
  colorMode(HSB, 1);

  /// initialize the rockets
  for (let i = 0; i < 40; i++) {
    rockets.push(new Rocket());
  }

  /// create the controls
  // make sliders
  const min_speed_label = createP("Min Speed");
  minSpeedSlider = createSlider(0, 50, 8);

  const max_speed_label = createP("Max Speed");
  maxSpeedSlider = createSlider(0, 50, 12);

  const min_turn_label = createP("Min Turn");
  minTurnSlider = createSlider(0, 100, 10);

  const max_turn_label = createP("Max Turn");
  maxTurnSlider = createSlider(0, 100, 20);

  // put sliders in a div
  controlsDiv = createDiv("");
  controlsDiv.addClass("mess-controls");
  controlsDiv.addClass("hide");
  controlsDiv.child(min_speed_label);
  controlsDiv.child(minSpeedSlider);
  controlsDiv.child(max_speed_label);
  controlsDiv.child(maxSpeedSlider);
  controlsDiv.child(min_turn_label);
  controlsDiv.child(minTurnSlider);
  controlsDiv.child(max_turn_label);
  controlsDiv.child(maxTurnSlider);

  // add the styles
  addStyles();
}

function draw() {
  /// update

  // read the current values from the sliders
  minSpeed = minSpeedSlider.value();
  maxSpeed = maxSpeedSlider.value();
  minTurn = minTurnSlider.value() / 100;
  maxTurn = maxTurnSlider.value() / 100;

  for (const rocket of rockets) {
    rocket.step();
  }

  /// draw
  clear();
  for (const rocket of rockets) {
    rocket.draw();
  }
}

/**
 * Each rocket has its own speed and turnSpeed, randomly chosen at creation
 * these are stored as a normalized value in the range [0, 1) and scaled
 * based on the min/max UI params when the rocket is moved.
 */

class Rocket {
  constructor() {
    this.x = windowWidth * 0.5;
    this.y = windowHeight * 0.5;
    this.a = random(-PI, PI);
    this.hue = random();

    this.turnSpeed = random();
    this.speed = random();
  }

  step() {
    /// steer towards mouse
    // find target angle (angle from rocket to mouse)
    let angleTo = -atan2(this.x - mouseX, this.y - mouseY);
    angleTo = wrapAngle(angleTo);

    // find angle between current angle and target angle
    let deltaAngle = this.a - angleTo;
    deltaAngle = wrapAngle(deltaAngle);

    // steer
    if (deltaAngle > this.turnSpeed) {
      this.a -= map(this.turnSpeed, 0, 1, minTurn, maxTurn);
    }
    if (deltaAngle < -this.turnSpeed) {
      this.a += map(this.turnSpeed, 0, 1, minTurn, maxTurn);
    }
    this.a = wrapAngle(this.a);

    /// move forward
    this.x += sin(this.a) * map(this.speed, 0, 1, minSpeed, maxSpeed);
    this.y -= cos(this.a) * map(this.speed, 0, 1, minSpeed, maxSpeed);
  }

  draw() {
    push();
    translate(this.x, this.y);
    rotate(this.a);
    fill(this.hue, 1000, 1000);
    noStroke();
    triangle(-13, 0, 0, -30, 13, 0);
    pop();
  }
}

/**
 * Add styles to the page
 */
function addStyles() {
  const css = `
    .mess-controls {
      font-family: Monaco;
      font-size: 10px;
      position: fixed;
      top: 100px;
      padding: 10px;
      z-index: 1000;
      background-color: #ff0;
      mix-blend-mode: multiply;
      opacity: 1;
      transition: opacity 0.25s;
    }

    .mess-controls p {
      margin-top: 2em;
      margin-bottom: 0;
    }

    .mess-controls.hide {
      opacity: 0;
      transition: opacity 1s;
    }
  `;

  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
}

/**
 * Wraps an angle to the range (-PI, PI]
 */
function wrapAngle(a) {
  while (a <= -PI) a += 2 * TWO_PI;
  while (a > PI) a -= 2 * TWO_PI;
  return a;
}

/**
 * handle mess_hide callback by hiding the controls
 */
function messHide() {
  controlsDiv.addClass("hide");
}

/**
 * handle mess_show callback by showing the controls
 */
function messShow() {
  controlsDiv.removeClass("hide");
}
