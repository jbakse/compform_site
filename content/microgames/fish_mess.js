/* exported setup draw preload mousePressed*/
/* global mess*/


document.head.insertAdjacentHTML("beforeend", `<link href="https://fonts.googleapis.com/css2?family=Jersey+20&display=swap" rel="stylesheet">`);

const sprites = [];

const stepSize = 10;
const fishSpeed = 1;

let fish1;
// let fish2;
let boom1;
let boom2;
let boom3;
let numPoints = 0;
const numSprites = 20;

const fishMargin = 60;

function preload() {
  fish1 = loadImage("./sprites/fishy.png");
  // fish2 = loadImage("./sprites/fishy2.png");
  boom1 = loadImage("./sprites/boom1.png");
  boom2 = loadImage("./sprites/boom2.png");
  boom3 = loadImage("./sprites/boom3.png");
}

function setup() {
  const p5_canvas = createCanvas(windowWidth, windowHeight);
  mess(p5_canvas);

  colorMode(HSB, 1000);

  for (let i = 0; i < numSprites; i++) {
    sprites.push({
      baseX: i * (fish1.width + fishMargin) + width,
      baseY: height / 2,
      snappedY: 0,
      snappedX: 0,
      amplitude: random(8, 12),
      speed: 0.04,
      phase: random(TWO_PI),
      explode: false,
      timer: 0,
    });
  }
  imageMode(CENTER);
  hue = random(1000);
}

function draw() {
  background(1000);
  fill("#32a852");
  textAlign(RIGHT);
  textFont("'Jersey 20', sans-serif");
  textSize(30);
  text(`POINTS: ${numPoints}`, width - 50, 50);

  noStroke();
  for (const sprite of sprites) {
    const sway = sin(frameCount * sprite.speed + sprite.phase) * sprite.amplitude;
    sprite.snappedY = floor((sprite.baseY + sway) / stepSize) * stepSize;

    tint(hue, 500, 1000);
    push();
    sprite.baseX -= fishSpeed;
    if (sprite.baseX <= -50) {
      hue = random(1000);
      sprite.explode = false;
      sprite.timer = 0;
      sprite.baseX = width + numSprites * (fish1.width + fishMargin);
    }
    sprite.snappedX = floor(sprite.baseX / stepSize) * stepSize;
    translate(sprite.snappedX, sprite.snappedY);
    if (!sprite.explode) {
      image(fish1, 0, 0);
    } else {
      sprite.timer++;
      if (sprite.timer < 20) {
        image(boom1, 0, 0);
      } else if (sprite.timer < 40) {
        image(boom2, 0, 0);
      } else if (sprite.timer < 60) {
        image(boom3, 0, 0);
      }
    }

    pop();
  }
}

function mousePressed() {
  for (const sprite of sprites) {
    if (
      mouseX > sprite.snappedX - 30 &&
      mouseX < sprite.snappedX + fish1.width + 30 &&
      mouseY > sprite.snappedY - 30 &&
      mouseY < sprite.snappedY + fish1.height + 30
    ) {
      sprite.explode = true;
      numPoints++;
    }
  }
}
