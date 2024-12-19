// require https://cdn.jsdelivr.net/npm/p5@0.7.3/lib/p5.min.js

class Termite {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this.turnTo(random(2 * PI));
    this.senseCooldown = 0;
  }

  turnTo(a) {
    this.dX = sin(a) * 2;
    this.dY = cos(a) * 2;
  }
  step() {
    // move
    this.x += this.dX;
    this.y += this.dY;

    if (this.x > width) this.dX = -abs(this.dX);
    if (this.y > height) this.dY = -abs(this.dY);
    if (this.x < 0) this.dX = abs(this.dX);
    if (this.y < 0) this.dY = abs(this.dY);

    if (this.senseCooldown-- < 0) this.sense();
  }

  sense() {
    for (const w of woodchips) {
      if (w === this.heldSprite) continue;

      if (compareDist(this.x, this.y, w.x, w.y, 3)) {
        if (this.heldSprite) {
          this.heldSprite = null;
          // this.turnTo(random(2 * PI));
          this.senseCooldown = 20;
          break;
        } else {
          this.heldSprite = w;
          break;
        }
      }
    }

    // move held sprite
    if (this.heldSprite) {
      this.heldSprite.x = this.x;
      this.heldSprite.y = this.y;
    }
  }

  draw() {
    push();
    noStroke();
    if (this.senseCooldown > 0) {
      fill(100, 0, 0);
    } else {
      fill(255, 0, 0);
    }
    ellipse(this.x, this.y, 10, 10);
    pop();
  }
}

class Woodchip {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  step() {
    // noop
  }
  draw() {
    push();
    noStroke();
    fill(0, 255, 0);
    triangle(this.x, this.y, this.x + 5, this.y + 8, this.x + 10, this.y);
    pop();
  }
}

const termites = [];
const woodchips = [];
const sprites = [];

function setup() {
  createCanvas(600, 600);
  frameRate(60);
  for (let i = 0; i < 50; i++) {
    const t = new Termite(random(width), random(height));
    termites.push(t);
    sprites.push(t);
  }

  for (let i = 0; i < 250; i++) {
    const w = new Woodchip(random(width), random(height));
    woodchips.push(w);
    sprites.push(w);
  }
}

function draw() {
  stepApp();
  drawApp();
}

function stepApp() {
  const steps = mouseIsPressed ? mouseX : 1;
  for (let n = 0; n < steps; n++) {
    for (const s of sprites) {
      s.step();
    }
  }
}

function drawApp() {
  background(10);
  for (const s of sprites) {
    s.draw();
  }
}

function compareDist(x1, y1, x2, y2, n) {
  if (abs(x1 - x2) > n) return false;
  if (abs(y1 - y2) > n) return false;
  return dist(x1, y1, x2, y2) < n;
}
