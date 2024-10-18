/* exported setup draw preload mousePressed*/
/* global mess*/

document.head.insertAdjacentHTML("beforeend", `<link href="https://fonts.googleapis.com/css2?family=Jersey+20&display=swap" rel="stylesheet">`);

const sprites = [];

const stepSize = 50;
// const spriteSpeed = 2;

let frog;
let boom1;
let boom2;
let boom3;

const numSprites = 10;
let numPoints = 0;


const spriteMargin = 100;

let spritehue;

function preload() {
  frog = loadImage("./sprites/frog.png");
  boom1 = loadImage("./sprites/boom1.png");
  boom2 = loadImage("./sprites/boom2.png");
  boom3 = loadImage("./sprites/boom3.png");
}

function setup() {
    const p5_canvas = createCanvas(windowWidth, windowHeight);
  mess(p5_canvas);

  pixelDensity(1);
  colorMode(HSB, 1000);

  for (let i = 0; i < numSprites; i++) {
    sprites.push({
      baseX: i * (frog.width + spriteMargin),
      baseY: height,
      snappedY: 0,
      snappedX: 0,
    //   amplitude: random(height - 200, height - 100),
    amplitude: height - 200,
      speed: 0.008,
    //   phase: random(PI * 2),
    phase: PI * 2,
      explode: false,
      timer: 0,
    //   hue: random(1000),
    });
  }
  spritehue = random(1000);

  imageMode(CENTER);
}

function draw() {
  background(1000);

  fill("#32a852");
  textAlign(RIGHT);
  textFont("'Jersey 20', sans-serif");
  textSize(30);
  text(`POINTS: ${numPoints}`, width - 50, 50);

  noStroke();
  
  for(const sprite of sprites){
  drawFrog(sprite);
    
  }
  
}

function mousePressed() {
  for (const sprite of sprites) {
    if (
      mouseX > sprite.baseX - 30 &&
      mouseX < sprite.baseX + frog.width + 30 &&
      mouseY > sprite.snappedY - 30 &&
      mouseY < sprite.snappedY + frog.height + 30
    ) {
      sprite.explode = true;
      numPoints++;
    }
  }
}

function drawFrog(sprite){
  // for (let sprite of sprites) {
    const jump = abs(
      sin(frameCount * sprite.speed + sprite.phase) * sprite.amplitude
    );
    sprite.snappedY = round((sprite.baseY - jump) / stepSize) * stepSize;

    tint(spritehue, 500, 1000);
    push();
    if (sprite.snappedY >= height - 8) {
    //   sprite.hue = random(1000);
    spritehue = random(1000);
      sprite.explode = false;
    //   sprite.amplitude = random(height - 200, height - 100);
      sprite.timer = 0;
    }
 
    translate(sprite.baseX, sprite.snappedY);

    if (!sprite.explode) {
      image(frog, 0, 0);
    } else {
      sprite.timer++;

      if (sprite.timer < 10) {
        image(boom1, 0, 0);
      } else if (sprite.timer < 20) {
        image(boom2, 0, 0);
      } else if (sprite.timer < 30) {
        image(boom3, 0, 0);
      }
    }

    pop();
  // }
  
}
