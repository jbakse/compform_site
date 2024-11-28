// require https://cdn.jsdelivr.net/npm/p5@latest/lib/p5.min.js

const PARTICLE_COUNT = 100;
const particles = [];

function setup() {
  createCanvas(720, 480);
  background("black");

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const particle = {
      position: { x: 0, y: 0 },
      velocity: { x: 0, y: 0 },
      age: 0,
      alive: false,
    };
    particles.push(particle);
  }
}

function draw() {
  emitParticle();

  for (const particle of particles) {
    stepParticle(particle);
  }

  background("black");
  fill("white");
  noStroke();

  for (const particle of particles) {
    drawParticle(particle);
  }
}

function emitParticle() {
  const p = particles.find((p) => !p.alive);
  if (!p) return;
  p.position.x = mouseX;
  p.position.y = mouseY;
  p.velocity.x = random(-5, 5);
  p.velocity.y = random(-25, -15);
  p.age = 0;
  p.alive = true;
}

function stepParticle(particle) {
  if (!particle.alive) return;

  // apply gravity to velocity
  const gravity = { x: 0, y: 1 };
  particle.velocity.x += gravity.x;
  particle.velocity.y += gravity.y;

  // apply air resistance
  particle.velocity.x *= 0.92;
  particle.velocity.y *= 0.92;

  // apply velocity to position
  particle.position.x += particle.velocity.x;
  particle.position.y += particle.velocity.y;

  // age
  particle.age++;
  if (particle.age > 100) {
    particle.alive = false;
  }
}

function drawParticle(particle) {
  if (!particle.alive) return;
  const radius = map(particle.age, 0, 100, 10, 0);
  ellipse(particle.position.x, particle.position.y, radius * 2, radius * 2);
}
