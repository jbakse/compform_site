// require https://cdn.jsdelivr.net/npm/p5@latest/lib/p5.min.js

const birds = [];

function setup() {
  createCanvas(720, 480);

  for (let i = 0; i < 100; i++) {
    const bird = new Bird();
    bird.location.x = random(width);
    bird.location.y = random(height);
    bird.angle = randomAngle();
    birds.push(bird);
  }
}

function draw() {
  /// step
  for (const bird of birds) {
    bird.step();
  }

  /// draw
  background("black");
  for (const bird of birds) {
    bird.draw();
  }
}

function mousePressed() {
  // toggle draw loop
  isLooping() ? noLoop() : loop();
}

class Bird {
  constructor() {
    this.location = { x: 0, y: 0 };
    this.angle = 0;
    this.speed = 1;
  }

  step() {
    const center = { x: 360, y: 240 };
    const aToCenter = angleBetweenPoints(this.location, center);
    const t = angleBetweenAngles(this.angle, aToCenter);
    this.angle = normalizeAngle(this.angle + t * 0.01);
    this.location.x += cos(this.angle) * this.speed;
    this.location.y += sin(this.angle) * this.speed;
  }

  draw() {
    push();
    translate(this.location.x, this.location.y);
    rotate(this.angle);
    fill("white");
    noStroke();

    beginShape();
    vertex(9, 0);
    vertex(0, 2);
    vertex(0, -2);
    endShape(CLOSE);
    pop();
  }
}

// returns the angle you need to rotate a by to get an equivalent angle to B
// goes clockwise or counterclockwise depending on which way is shorter
// returns a number between -PI and PI
function angleBetweenAngles(a, b) {
  return normalizeAngle(b - a);
}

// return random angle -PI to PI
function randomAngle() {
  return normalizeAngle(random(TWO_PI));
}

// return equivalent angle between -PI and PI
function normalizeAngle(a) {
  return modulo(a + PI, TWO_PI) - PI;
}

function angleBetweenPoints(p1, p2) {
  return normalizeAngle(atan2(p2.y - p1.y, p2.x - p1.x));
}

// a mod function that does not return negative numbers
// -2 % 5 = -2 // javascript % operator returns negative numbers
// mod(-2, 5) = 3 // we want 3
function modulo(n, m) {
  return ((n % m) + m) % m;
}
