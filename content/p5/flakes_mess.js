// draws colorflow confetti

/* exported preload setup draw mousePressed windowResized */

let flakes = [];

let c = 0;

function preload() {}

function setup() {
  pixelDensity(1);
  const p5_canvas = createCanvas(windowWidth, windowHeight);

  mess(p5_canvas);

  colorMode(HSB, 1000);
}

function draw() {
  clear();

  // spawn
  if (frameCount % 10 === 0) {
    flakes.push(new Flake(mouseX, mouseY));
  }

  // draw flakes
  var index = flakes.length - 1;
  while (index >= 0) {
    flakes[index].draw();
    index--;
  }
}

function _removeItem(array, element) {
  const index = array.indexOf(element);
  if (index == -1) return;
  array.splice(index, 1);
}

class Flake {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.deltaX = random(-5, 5);
    this.deltaY = random(-1, -5);
    this.air = random(0, 2 * PI);
    this.deltaAir = random(0.05, 0.1);
    this.c = c;
    this.scale = 0;
    c = (c + 50) % 1000;
  }
  draw() {
    // drag
    this.deltaX *= 0.9;
    this.deltaY *= 0.9;

    // gravity
    this.deltaY += 0.8;

    // air
    this.air += this.deltaAir;
    let air = sin(this.air);
    air = pow(air, 1) * 1;
    this.deltaX += air;

    // integrate
    this.x += this.deltaX;
    this.y += this.deltaY;

    // kill
    if (this.y > height * 1.1) {
      _removeItem(flakes, this);
    }

    this.scale = lerp(this.scale, 200, 0.2);

    push();
    noStroke();
    fill(this.c, 1000, 1000);

    translate(this.x, this.y);
    shearX(0.2);
    rotate(this.deltaX * 0.04);

    rect(0, 0, this.scale, this.scale);
    pop();
  }
}
