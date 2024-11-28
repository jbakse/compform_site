// require https://cdn.jsdelivr.net/npm/p5@latest/lib/p5.min.js

const balls = [];

const gravity = { x: 0, y: 1 };

const kRestituion = 0.9;

function setup() {
  createCanvas(720, 480);
  background("black");
  initBalls();
}

function initBalls() {
  balls.length = 0;
  for (let i = 0; i < 10; i++) {
    const ball = {
      position: { x: 180, y: 240 },
      velocity: { x: random(-10, 10), y: random(-35, -15) },
      radius: 10,
    };
    balls.push(ball);
  }
}

function draw() {
  if (frameCount % 180 === 0) initBalls();

  for (const ball of balls) {
    stepParticle(ball);
  }

  background("black");
  fill("white");
  noStroke();

  for (const ball of balls) {
    drawParticle(ball);
  }
}

function stepParticle(ball) {
  // apply gravity to velocity
  ball.velocity.x += gravity.x;
  ball.velocity.y += gravity.y;

  // apply air resistance
  ball.velocity.x *= 0.99;
  ball.velocity.y *= 0.99;

  // apply velocity to position
  ball.position.x += ball.velocity.x;
  ball.position.y += ball.velocity.y;

  // apply collision detection
  if (ball.position.x - ball.radius < 0) {
    ball.velocity.x = Math.abs(ball.velocity.x) * kRestituion;
    ball.position.x = 0 + ball.radius;
  }
  if (ball.position.x + ball.radius > width) {
    ball.velocity.x = -Math.abs(ball.velocity.x) * kRestituion;
    ball.position.x = width - ball.radius;
  }
  if (ball.position.y + ball.radius > height) {
    ball.velocity.y = -Math.abs(ball.velocity.y) * kRestituion;
    ball.position.y = height - ball.radius;
  }
}

function drawParticle(ball) {
  ellipse(ball.position.x, ball.position.y, ball.radius * 2, ball.radius * 2);
}
