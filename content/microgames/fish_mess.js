/**
 * Microgame with fish swimming across the screen.
 * Click on the fish to make them explode.
 *
 * written by Ana Konzen
 * edited by Justin Bakse
 *
 */

/// configure compform editor
// require https://cdn.jsdelivr.net/npm/p5@1.11.0/lib/p5.js
// require https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.11.0/addons/p5.sound.min.js
// require /mess.js

/// configure eslint
/* exported setup, draw, preload, mousePressed, windowResized */
/* exported pauseMess, resumeMess */
/* global mess p5*/

// holds the fish sprites
const fishies = [];

// game settings
const fishNum = 8;
const fishMargin = 60;
const fishSpeed = 2;
const snapGridSize = 5;
const hueShiftInterval = 200; // how often fish color changes, in frames
const explosionDuration = 60; // how long to show explosion effect, inframes
const winDuration = 80; // how long to show the win message, inframes

let resetInterval;

// sound components
let scoreOscillator;
let scoreEnvelope;

// game state
let fishiesHue = 0;
let currentScore = 0;

// object to hold loaded images
let images = {};

function preload() {
  // load fish, explosion, and win sprites
  images = {
    fish1: {
      main: loadImage("/microgames/sprites/fishy1.png"),
      highlight: loadImage("/microgames/sprites/fishy1_highlight.png"),
    },
    fish2: {
      main: loadImage("/microgames/sprites/fishy2.png"),
      highlight: loadImage("/microgames/sprites/fishy2_highlight.png"),
    },
    winMessage: {
      main: loadImage("/microgames/sprites/win.png"),
      highlight: loadImage("/microgames/sprites/win_highlight.png"),
    },
    explosionFrames: [
      loadImage("/microgames/sprites/boom1.png"),
      loadImage("/microgames/sprites/boom2.png"),
      loadImage("/microgames/sprites/boom3.png"),
    ],
  };
}

function setup() {
  /// set up canvas
  const p5_canvas = createCanvas(windowWidth, windowHeight);

  /// register this sketch as a Comp Form background "mess"
  mess(p5_canvas, 2000, {
    messName: "fishies",
    messLink: "/js_lab/js_lab.html?/microgames/fish_mess.js",
    authorName: "ana konzen",
    authorLink: "https://anakonzen.com",
  });

  /// configure p5
  colorMode(HSB, 1);
  imageMode(CENTER);
  noStroke();

  /// init game state
  fishiesHue = random(1);

  /// create the fish objects, these will be reused across resets
  for (let i = 0; i < fishNum; i++) {
    fishies.push(new Fish(i));
  }

  /// initialize sound components
  scoreEnvelope = new p5.Envelope();
  scoreEnvelope.setADSR(0.02, 0.25, 0, 0.05); // quick attack and decay
  scoreEnvelope.setRange(0.5, 0); // attack and release level

  scoreOscillator = new p5.Oscillator("square");
  scoreOscillator.amp(scoreEnvelope);
  scoreOscillator.start();

  resetGame();
}

function draw() {
  /// step
  if (frameCount % resetInterval === 0) resetGame();
  if (frameCount % hueShiftInterval === 0) fishiesHue = random(1);

  for (const fish of fishies) {
    fish.update();
  }

  /// draw
  clear();
  for (const fish of fishies) {
    fish.draw();
  }
}

function mousePressed() {
  // resume audio if blocked by browser
  if (getAudioContext().state !== "running") getAudioContext().resume();

  for (const fish of fishies) {
    fish.mousePressed();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  resetGame();
}

function resetGame() {
  currentScore = 0;
  for (const fish of fishies) {
    fish.reset();
  }
  resetInterval =
    (width + (images.fish1.main.width + fishMargin) * fishNum) / fishSpeed + 50;
}

function playScoreSound() {
  // increase pitch with each successful click
  scoreOscillator.freq(150 * pow(1.3, currentScore));
  scoreEnvelope.play();
}

function playWinSound() {
  const winOscillator = new p5.Oscillator("square");
  winOscillator.start();
  winOscillator.amp(0.5);

  // sequence of frequencies to create the melody
  // a simple scale (A, B, C, D, E, F, G)
  const frequencies = [440, 494, 523, 587, 659, 698, 784];
  // time between each note in milliseconds
  const delay = 100;

  //schedule each note to play after a delay
  frequencies.forEach((freq, i) => {
    setTimeout(() => winOscillator.freq(freq), i * delay);
  });

  // stop when done
  setTimeout(() => winOscillator.stop(), frequencies.length * delay);
}

class Fish {
  constructor(index) {
    this.index = index;
    this.width = images.fish1.main.width;
    this.height = images.fish1.main.height;
    this.swaySpeed = 0.04;
    this.swayAmplitude = random(8, 12);
    this.swayPhase = random(TWO_PI);

    this.reset();
  }

  reset() {
    // randomly choose fish sprite and reset position and state
    this.fishImages = random() < 0.5 ? images.fish1 : images.fish2;
    this.state = "swimming";
    this.timer = 0;

    // start x off-screen
    this.x = (this.width + fishMargin) * this.index + width;
    this.y = height / 2;
  }

  drawFish() {
    image(this.fishImages.main, 0, 0);
    push();
    tint(fishiesHue - 0.1, 0.3, 1);
    image(this.fishImages.highlight, 0, 0);
    pop();
  }

  drawWinMessage() {
    if (this.timer < winDuration) {
      image(images.winMessage.main, 0, 0);
      push();
      tint(fishiesHue - 0.1, 0.3, 1);
      image(images.winMessage.highlight, 0, 0);
      pop();
    }
  }

  drawExplosion() {
    if (this.timer < explosionDuration) {
      const frame = map(
        this.timer,
        0,
        explosionDuration,
        0,
        images.explosionFrames.length
      );
      image(images.explosionFrames[floor(frame)], 0, 0);
    }
  }

  snapDownTo(num, multiple) {
    return floor(num / multiple) * multiple;
  }

  getSway() {
    // calculate the fish's sway (up and down motion) on a sine
    // curve based on time and phase
    return (
      sin(frameCount * this.swaySpeed + this.swayPhase) * this.swayAmplitude
    );
  }

  getY() {
    // snap the sprite's y position to a pixel grid
    return this.snapDownTo(this.y + this.getSway(), snapGridSize);
  }

  getX() {
    // snap the sprite's x position to a pixel grid
    return this.snapDownTo(this.x, snapGridSize);
  }

  mousePressed() {
    if (this.isCloseToMouse(20)) {
      // increase score if fish wasn't clicked before
      if (this.state === "swimming") currentScore++;

      // if all fishies were clicked
      if (currentScore === fishNum) {
        if (this.state === "swimming") playWinSound();
        this.state = "win";
      } else {
        if (this.state === "swimming") playScoreSound();
        this.state = "exploded";
      }
    }
  }

  isCloseToMouse(threshold) {
    return (
      mouseX > this.getX() - threshold &&
      mouseX < this.getX() + this.width + threshold &&
      mouseY > this.getY() - threshold &&
      mouseY < this.getY() + this.height + threshold
    );
  }

  update() {
    if (this.state === "swimming") {
      this.x -= fishSpeed;
    } else {
      this.timer++;
    }
  }

  draw() {
    push();
    tint(fishiesHue, 0.75, 1);
    translate(this.getX(), this.getY());
    if (this.state === "swimming") {
      this.drawFish();
    } else if (this.state === "win") {
      this.drawWinMessage();
    } else if (this.state === "exploded") {
      this.drawExplosion();
    }
    pop();
  }
}
