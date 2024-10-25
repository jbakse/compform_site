/**
 * Microgame with fish swimming across the screen.
 * Click on the fish to make them explode.
 *
 * written by Ana Konzen
 * edited by Justin Bakse
 *
 */

/* exported setup draw preload mousePressed*/
/* global mess*/

const sprites = [];
const boomFrames = [];

const numSprites = 8;
const spriteMargin = 60;
const spriteSpeed = 2;
const stepSize = 5;

let hueTimer = 0;
let score = 0;

let fish1 = {};
let fish2 = {};
let winMessage = {};

let spriteHue;

function preload() {
  // load fish drawings and explosion frames
  fish1 = { main: loadImage("./sprites/fishy1.png"), highlight: loadImage("./sprites/fishy1_highlight.png") };
  fish2 = { main: loadImage("./sprites/fishy2.png"), highlight: loadImage("./sprites/fishy2_highlight.png") };

  boomFrames[0] = loadImage("./sprites/boom1.png");
  boomFrames[1] = loadImage("./sprites/boom2.png");
  boomFrames[2] = loadImage("./sprites/boom3.png");

  winMessage = { main: loadImage("./sprites/win.png"), highlight: loadImage("./sprites/win_highlight.png") };
}

function setup() {
  // initialize canvas and mess info
  const p5_canvas = createCanvas(windowWidth, windowHeight);
  mess(p5_canvas, {
    messName: "fishes",
    messLink: "https://editor.p5js.org/ana-konzen/sketches/pWXNXXJRx",
    authorName: "ana konzen",
    authorLink: "https://anakonzen.com",
  }, resumeMess, pauseMess);

  colorMode(HSB, 100);

  for (let i = 0; i < numSprites; i++) {
    sprites.push({
      img: random() > 0.5 ? fish1 : fish2,
      width: fish1.main.width,
      baseX: i * (fish1.main.width + spriteMargin) + width,
      baseY: height / 2,
      snappedY: 0,
      snappedX: 0,
      speed: 0.04,
      amplitude: random(8, 12),
      phase: random(TWO_PI),
      exploded: false,
      win: false,
      timer: 0,
    });
  }
  imageMode(CENTER);
  spriteHue = random(100);
}

function draw() {
  background(100);

  noStroke();
  hueTimer++;
  if (hueTimer > 200) {
    hueTimer = 0;
    spriteHue = random(100);
  }
  for (const sprite of sprites) {
    // calculate the fish's sway (up and down motion) on a sine curve based on time and phase
    const sway = sin(frameCount * sprite.speed + sprite.phase) * sprite.amplitude;
    // snap the fish's y position to a pixel grid
    sprite.snappedY = floor((sprite.baseY + sway) / stepSize) * stepSize;

    tint(spriteHue, 75, 100);

    push();

    // if the fish has moved off-screen, reset it
    if (sprite.baseX < -sprite.width) resetSprite(sprite);

    // snap the fish's x position to a pixel grid
    sprite.snappedX = floor(sprite.baseX / stepSize) * stepSize;

    translate(sprite.snappedX, sprite.snappedY);

    if (!sprite.exploded) {
      displayFish(sprite);
    } else {
      sprite.timer++;
      if (sprite.win) {
        displayWinningSprite(sprite);
      } else {
        displayExplodingSprite(sprite);
      }
    }

    pop();
  }
}

function mousePressed() {
  for (const sprite of sprites) {
    if (isMouseOnSprite(sprite, 20)) {
      
      if (!sprite.exploded) score++; //only increase score if sprite wasn't clicked before

      // check if all sprites were clicked (score is a multiple of numSprites)
      if (score % numSprites === 0) {
        sprite.win = true;
      } else {
        sprite.win = false;
      }
      sprite.exploded = true;
    }
  }
}

function displayExplodingSprite(sprite) {
  if (sprite.timer < 20) {
    image(boomFrames[0], 0, 0);
  } else if (sprite.timer < 40) {
    image(boomFrames[1], 0, 0);
  } else if (sprite.timer < 60) {
    image(boomFrames[2], 0, 0);
  } else if (sprite.timer > 80) {
    sprite.baseX -= spriteSpeed;
  }
}

function displayWinningSprite(sprite) {
  if (sprite.timer < 80) {
    image(winMessage.main, 0, 0);
    push();
    tint(spriteHue - 10, 30, 100);
    image(winMessage.highlight, 0, 0);
    pop();
  } else {
    sprite.baseX -= spriteSpeed;
  }
}

function displayFish(sprite) {
  sprite.baseX -= spriteSpeed;
  image(sprite.img.main, 0, 0);
  push();
  tint(spriteHue - 10, 30, 100);
  image(sprite.img.highlight, 0, 0);
  pop();
}

function resetSprite(sprite) {
  if (!sprite.exploded) score = 0; //reset score if sprite wasn't clicked
  sprite.img = random() > 0.5 ? fish1 : fish2;
  sprite.exploded = false;
  sprite.timer = 0;
  sprite.baseX = width + sprite.width;
}

// check if mouse is close to sprite
function isMouseOnSprite(sprite, proximity) {
  return (
    mouseX > sprite.snappedX - proximity &&
    mouseX < sprite.snappedX + fish1.main.width + proximity &&
    mouseY > sprite.snappedY - proximity &&
    mouseY < sprite.snappedY + fish1.main.height + proximity
  );
}



//util mess functions
function pauseMess() {
  noLoop();
}

function resumeMess() {
  loop();
}