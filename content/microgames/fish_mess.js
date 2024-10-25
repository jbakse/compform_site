/* exported setup draw preload mousePressed*/
/* global mess*/

const sprites = [];
const boomFrames = [];

const numSprites = 3;
const spriteMargin = 60;
const spriteSpeed = 1;
const stepSize = 5;

let hueTimer = 0;
let score = 0;

let fish1 = {};
let fish2 = {};
let winMessage = {};
let spriteHue;

function preload() {
  fish1 = {main: loadImage("./sprites/fishy1.png"), highlight: loadImage("./sprites/fishy1_highlight.png")};
  fish2 = {main: loadImage("./sprites/fishy2.png"), highlight: loadImage("./sprites/fishy2_highlight.png")};
  
  boomFrames[0] = loadImage("./sprites/boom1.png");
  boomFrames[1] = loadImage("./sprites/boom2.png");
  boomFrames[2] = loadImage("./sprites/boom3.png");

  winMessage = {main: loadImage("./sprites/win.png"), highlight: loadImage("./sprites/win_highlight.png")};
}

function setup() {
  const p5_canvas = createCanvas(windowWidth, windowHeight);
  mess(p5_canvas, {messName: "fishes", messLink: "https://editor.p5js.org/ana-konzen/sketches/pWXNXXJRx", authorName: "ana konzen", authorLink: "https://anakonzen.com"});

  colorMode(HSB, 100);

  for (let i = 0; i < numSprites; i++) {
    sprites.push({
      img: random() > 0.5 ? fish1 : fish2,
      width: fish1.main.width,
      baseX: i * (fish1.main.width + spriteMargin) + width,
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
    const sway = sin(frameCount * sprite.speed + sprite.phase) * sprite.amplitude;
    sprite.snappedY = floor((sprite.baseY + sway) / stepSize) * stepSize;

    tint(spriteHue, 75, 100);
    push();
    if (sprite.baseX < -sprite.width) {
      if (!sprite.explode) score = 0;
      sprite.img = random() > 0.5 ? fish1 : fish2;
      sprite.explode = false;
      sprite.timer = 0;
      sprite.baseX = width + sprite.width;
    }
    sprite.snappedX = floor(sprite.baseX / stepSize) * stepSize;
    translate(sprite.snappedX, sprite.snappedY);
    if (!sprite.explode) {
      sprite.baseX -= spriteSpeed;
      image(sprite.img.main, 0, 0);
      push();
    tint(spriteHue - 10, 30, 100);
      image(sprite.img.highlight, 0, 0);
      pop();

    } else {
      sprite.timer++;
 
      if (score % numSprites === 0 && sprites.indexOf(sprite) === sprites.length - 1) {
       if (sprite.timer < 80){
        image(winMessage.main, 0, 0);
        push();
        tint(spriteHue - 10, 30, 100);
        image(winMessage.highlight, 0, 0);
        pop();
       } else {
        sprite.baseX -= spriteSpeed;
       }
  
    } else {
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
  }
    pop();
  }
}

function mousePressed() {
  for (const sprite of sprites) {
    if (
      mouseX > sprite.snappedX - 30 &&
      mouseX < sprite.snappedX + fish1.main.width + 30 &&
      mouseY > sprite.snappedY - 30 &&
      mouseY < sprite.snappedY + fish1.main.height + 30
    ) {
      if (!sprite.explode) score++;
      sprite.explode = true;
    }
  }
}
