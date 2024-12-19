// require https://cdn.jsdelivr.net/npm/p5@latest/lib/p5.min.js

// notes
// i use angle/magnitude for velocity, an xy vector might be better
// collision detection is n^2, a quad tree might be better
// https://github.com/timohausmann/quadtree-js/blob/master/quadtree.js

const birds = [];

function setup() {
  createCanvas(720, 480);
  background(0);

  /// populate birds
  for (const _ of range(100)) {
    const bird = new Bird();
    bird.location.x = random(-500, 500);
    bird.location.y = random(-500, 500);
    bird.angle = 0;
    bird.speed = random([1, 3]);
    birds.push(bird);
  }
}

function draw() {
  /// step birds
  for (const bird of birds) {
    bird.step();
  }

  /// draw
  background(0);
  translate(width / 2, height / 2);
  for (const bird of birds) {
    bird.draw();
  }
  fill(200);
  ellipse(0, 0, 20, 20);
  ellipse(mouseX - width / 2, mouseY - height / 2, 20, 20);
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
    /// flocking behaviors
    // https://en.wikipedia.org/wiki/Boids?useskin=vector
    // separation: steer to avoid crowding local flockmates
    // alignment: steer towards the average heading of local flockmates
    // cohesion: steer to move towards the (center of mass) of local flockmates

    this.applySeparation();
    this.applyAlignment();
    this.applyCohesion();

    /// additional behaviors
    this.turnTowardCenter();
    this.avoidMouse();
    this.avoidCenter();

    /// move
    this.location.x += cos(this.angle) * this.speed;
    this.location.y += sin(this.angle) * this.speed;
  }

  turnTowardCenter() {
    this.turnTowardPoint({ x: 0, y: 0 }, 0.005);
  }

  applySeparation() {
    for (const bird of birds) {
      if (bird === this) continue;
      if (pointDistance(this.location, bird.location) > 20) continue;
      this.turnTowardPoint(bird.location, -0.05, true);
    }
  }

  applyAlignment() {
    const nearbyBirds = this.getNearbyBirds(100);
    if (nearbyBirds.length === 0) return;

    const angles = nearbyBirds.map((bird) => bird.angle);
    const targetA = averageAngles(angles);
    const deltaA = angleBetweenAngles(this.angle, targetA);
    this.angle = rotateAngle(this.angle, deltaA * 0.1);
  }

  applyCohesion() {
    const nearbyBirds = this.getNearbyBirds(100);
    if (nearbyBirds.length === 0) return;

    const locations = nearbyBirds.map((bird) => bird.location);
    const targetPoint = averagePoints(locations);
    this.turnTowardPoint(targetPoint, 0.005);
  }

  avoidMouse() {
    const mouseLocation = { x: mouseX - width / 2, y: mouseY - height / 2 };
    if (pointDistance(this.location, mouseLocation) > 50) return;
    this.turnTowardPoint(mouseLocation, -0.05, true);
  }

  avoidCenter() {
    const center = { x: 0, y: 0 };
    if (pointDistance(this.location, center) > 50) return;
    this.turnTowardPoint(center, -0.1, true);
  }

  turnTowardPoint(point, amount, fixed = false) {
    const targetA = angleBetweenPoints(this.location, point);
    const deltaA = angleBetweenAngles(this.angle, targetA);
    const turnAmount = fixed ? sign(deltaA) * amount : deltaA * amount;
    this.angle = rotateAngle(this.angle, turnAmount);
  }

  getNearbyBirds(radius) {
    return birds.filter((bird) => {
      if (bird === this) return false;
      return pointDistance(this.location, bird.location) < radius;
    });
  }

  draw() {
    push();

    translate(this.location.x, this.location.y);
    rotate(this.angle);

    fill("white");
    noStroke();
    triangle(8, 0, 0, 3, 0, -3);

    pop();
  }
}

/// angle functions

// returns the equivalent angle between -PI and PI
function normalizeAngle(a) {
  return modulo(a + PI, TWO_PI) - PI;
}

// returns a random angle between -PI and PI
function randomAngle() {
  return normalizeAngle(random(TWO_PI));
}

// adds amount to angle, wrapping around at -PI and PI
function rotateAngle(angle, amount) {
  return normalizeAngle(angle + amount);
}

// returns the smallest angle from angle a to angle b, in range -PI to PI
// understands wrapping, looks clockwise or counterclockwise
function angleBetweenAngles(a, b) {
  return normalizeAngle(b - a);
}

// returns the average of the provided angles
// supports wrapping by converting them to unit vectors, averaging the vectors, and converting back to an angle
// e.g. average of -3 and 3 is PI, not 0.
function averageAngles(angles) {
  let x = 0;
  let y = 0;

  for (const angle of angles) {
    x += Math.cos(angle);
    y += Math.sin(angle);
  }

  return Math.atan2(y, x);
}

// returns the average of the provided points
function averagePoints(points) {
  let x = 0;
  let y = 0;

  for (const point of points) {
    x += point.x;
    y += point.y;
  }

  return { x: x / points.length, y: y / points.length };
}

/// point functions

// returns distance between two points
function pointDistance(a, b) {
  return dist(a.x, a.y, b.x, b.y);
}

// returns the angle from point a to point b, in range -PI to PI
function angleBetweenPoints(a, b) {
  return atan2(b.y - a.y, b.x - a.x);
}

// finds the bounds of the provided points
function pointsBounds(points) {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (const point of points) {
    minX = min(minX, point.x);
    maxX = max(maxX, point.x);
    minY = min(minY, point.y);
    maxY = max(maxY, point.y);
  }

  return { minX, minY, maxX, maxY };
}

/// scalar functions

// returns n modulo m [0, m)
// javascript % provides a remainder, not a modulo
// -1 % 5 = -1
// mod(-1, 5) = 4
function modulo(n, m) {
  return ((n % m) + m) % m;
}

// returns the sign of a number
function sign(n) {
  return n >= 0 ? 1 : -1;
}

/// utility functions

// returns an array of numbers from start to end (exclusive) with optional step
function range(start, end, step) {
  if (end === undefined) {
    end = start;
    start = 0;
  }
  if (step === undefined) {
    step = 1;
  }
  const result = [];
  for (let i = start; i < end; i += step) {
    result.push(i);
  }
  return result;
}
