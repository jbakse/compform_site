/**
 * Microgame with fish swimming across the screen.
 * Click on the fish to make them explode.
 *
 * written by Ana Konzen
 * edited by Justin Bakse
 *
 */

/* exported setup draw preload mousePressed windowResized pauseMess resumeMess */
/* global mess p5*/

// require https://cdn.jsdelivr.net/npm/p5@1.11.0/lib/p5.min.js
// require https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.11.0/addons/p5.sound.min.js

const fishies = [];

// game settings
const fishNum = 8;
const fishMargin = 60;
const fishSpeed = 2;
const stepSize = 5;
const hueShiftInterval = 200; // interval for shifting fish hue
const explosionDuration = 60; // how long to show explosion effect
const winDuration = 80; // how long to show the win message

let scoreOscillator;
let scoreEnvelope;

let resetInterval;
let fishiesHue;

let currentScore = 0;

let images = {};

function preload() {
  // load fish, explosion, and win sprites
  images = {
    fish1: {
      main: loadImage("./sprites/fishy1.png"),
      highlight: loadImage("./sprites/fishy1_highlight.png"),
    },
    fish2: {
      main: loadImage("./sprites/fishy2.png"),
      highlight: loadImage("./sprites/fishy2_highlight.png"),
    },
    explosionFrames: [
      loadImage("./sprites/boom1.png"),
      loadImage("./sprites/boom2.png"),
      loadImage("./sprites/boom3.png"),
    ],
    winMessage: {
      main: loadImage("./sprites/win.png"),
      highlight: loadImage("./sprites/win_highlight.png"),
    },
  };
}

function setup() {
  // initialize canvas and mess info
  const p5_canvas = createCanvas(windowWidth, windowHeight);
  mess(p5_canvas, 2000, {
    messName: "fishies",
    messLink: "https://editor.p5js.org/ana-konzen/sketches/pWXNXXJRx",
    authorName: "ana konzen",
    authorLink: "https://anakonzen.com",
  });

  for (let i = 0; i < fishNum; i++) {
    fishies.push(new Fish(i));
  }

  fishiesHue = random(1);

  //calculate the time it takes for all fish to cross the screen + a small delay
  resetInterval = (width + (images.fish1.main.width + fishMargin) * fishNum) / fishSpeed + 50;

  // initialize envelope and oscillator for score sound
  scoreEnvelope = new p5.Envelope();
  scoreEnvelope.setADSR(0.02, 0.25, 0, 0.05); // quick attack and decay
  scoreEnvelope.setRange(0.5, 0); // start loud and fade quickly

  scoreOscillator = new p5.Oscillator("square");
  scoreOscillator.amp(scoreEnvelope);
  scoreOscillator.start();

  colorMode(HSB, 1);
  imageMode(CENTER);
  noStroke();
}

function draw() {
  //set state

  //change hue every few frames
  if (frameCount % hueShiftInterval === 0) {
    fishiesHue = random(1);
  }

  for (const fish of fishies) {
    fish.update();
  }

  if (frameCount % resetInterval === 0) resetGame();

  //draw
  background(1);
  for (const fish of fishies) {
    fish.draw();
  }
}

function mousePressed() {
  if (getAudioContext().state !== "running") getAudioContext().resume(); // resume audio if blocked by browser

  for (const fish of fishies) {
    if (fish.isCloseToMouse(20)) {
      if (fish.state === "swimming") currentScore++; //only increase score if fish wasn't clicked before

      // check if all fishies were clicked
      if (currentScore === fishNum) {
        fish.state = "win";
        playWinSound();
      } else {
        fish.state = "exploded";
        playScoreSound();
      }
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  for (const fish of fishies) {
    fish.reset();
  }
  resetInterval = (width + (images.fish1.main.width + fishMargin) * fishNum) / fishSpeed;
}

function resetGame() {
  //reset score and fish states
  currentScore = 0;
  for (const fish of fishies) {
    fish.reset();
  }
}

function playScoreSound() {
  scoreOscillator.freq(150 * pow(1.3, currentScore)); // increase pitch with each successful click
  scoreEnvelope.play();
}

function playWinSound() {
  const winOscillator = new p5.Oscillator("square");
  winOscillator.start();
  winOscillator.amp(0.5);

  // sequence of frequencies to create the melody
  const frequencies = [440, 494, 523, 587, 659, 698, 784]; // a simple scale (A, B, C, D, E, F, G)
  const delay = 100; // time between each note in milliseconds

  //schedule each note to play after a delay
  frequencies.forEach((freq, i) => {
    setTimeout(() => {
      winOscillator.freq(freq);
      if (i === frequencies.length - 1) {
        // stop the oscillator after the last note
        winOscillator.stop();
      }
    }, i * delay);
  });
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
    this.fishImages = random() > 0.5 ? images.fish1 : images.fish2;
    this.state = "swimming";
    this.timer = 0;
    this.x = (this.width + fishMargin) * this.index + width; // start off-screen
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
      image(images.explosionFrames[floor(this.timer / 20) % images.explosionFrames.length], 0, 0);
    }
  }

  snapTo(num, multiple) {
    return floor(num / multiple) * multiple;
  }

  getSway() {
    // calculate the fish's sway (up and down motion) on a sine curve based on time and phase
    return sin(frameCount * this.swaySpeed + this.swayPhase) * this.swayAmplitude;
  }

  getY() {
    // snap the sprite's y position to a pixel grid
    return this.snapTo(this.y + this.getSway(), stepSize);
  }

  getX() {
    // snap the sprite's x position to a pixel grid
    return this.snapTo(this.x, stepSize);
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

//mess util functions
function pauseMess() {
  noLoop();
}

function resumeMess() {
  loop();
}
