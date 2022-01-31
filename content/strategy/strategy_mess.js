// draws well placed dot trail

/* exported preload setup draw mousePressed windowResized */

let dots = [];

function preload() {}

function setup() {
  pixelDensity(1);
  const p5_canvas = createCanvas(windowWidth, windowHeight);

  mess(p5_canvas);

  frameRate(60);
  fill(255, 0, 0);
  noStroke();
  colorMode(HSB, 1000);
}

function draw() {
  clear();
  if (mouseX === 0 && mouseY === 0) return;

  //   scale(0.25);
  //   mouseX *= 4;
  //   mouseY *= 4;

  dots.push(new Dot(mouseX, mouseY));

  var index;
  index = dots.length - 1;
  while (index >= 0) {
    dots[index].step();
    index--;
  }

  index = dots.length - 1;
  while (index >= 0) {
    dots[index].draw();
    index--;
  }
}

class Dot {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 15;
    this.seeking = true;
    this.hue = map(this.x + this.y, 0, width + height, 1, 1000);
  }

  step() {
    // shrink old dot
    dots[0].r -= 0.02;
    // if we have a long tail, start shrinking more old dots to clean up quicker
    if (dots.length > 100) {
      dots[1].r -= 0.02;
      dots[2].r -= 0.02;
      dots[3].r -= 0.02;
    }

    // remove dots that get shrunk to 1
    if (this.r < 1) {
      _removeItem(dots, this);
    }

    // remove dots that don't find a spot to land in time
    if (this.r < 3 && this.seeking) {
      _removeItem(dots, this);
    }

    // seek
    if (!this.seeking) return;

    // assume we'll find a spot to land and will stop seeking
    // this assumption will be reversed if we don't
    this.seeking = false;

    // loop through all the other dots
    let index = dots.length - 1;
    while (--index >= 0) {
      let that = dots[index];

      // don't compare this dot to itself
      if (this === that) {
        continue;
      }

      // if dots are close to each other
      let d = dist(this.x, this.y, that.x, that.y);
      if (d < this.r + that.r + 5) {
        // move the seeking dot away from the existing dot
        let dX = (this.x - that.x) / d;
        let dY = (this.y - that.y) / d;
        this.x += dX;
        this.y += dY;
        this.r -= 0.1;
        this.seeking = true;
      }
    }
  }

  draw() {
    push();
    translate(this.x, this.y);
    fill(this.hue, 1000, 1000);
    noStroke();
    ellipse(0, 0, this.r * 2, this.r * 2);
    pop();
  }
}

function _removeItem(array, element) {
  const index = array.indexOf(element);
  if (index == -1) return;
  array.splice(index, 1);
}
