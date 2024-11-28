// require https://cdn.jsdelivr.net/npm/p5@latest/lib/p5.min.js

// This simulation demonstrates the difference between numerical integration and analytical integration.
// Numerical integration approximates the motion step-by-step, while analytical integration calculates an exact position formula.

// Ball object representing the current state (position and velocity) of the ball
const ballStart = {
  position: { x: 180, y: 240 },
  velocity: { x: 10, y: -10 },
};

// make a deep copy of the ball
const ball = structuredClone(ballStart);

// Gravity is a constant force pulling the ball downwards, modeled as acceleration
const gravity = { x: 0, y: 1 };

function setup() {
  createCanvas(720, 480);
  background("black");
  drawAnalyticArc();
}

function draw() {
  numericallyStepBall(1);

  fill("white");
  noStroke();
  ellipse(ball.position.x, ball.position.y, 10, 10); // Draw the current position of the ball
}

// Analytical Integration: Calculates the exact position of the ball at time t
// This uses the formula: position = startPosition + startVelocity * t + 0.5 * acceleration * t^2
// t represent a specific time
// Draw the arc using analytical integration to calculate the exact position over time
function drawAnalyticArc() {
  noFill();
  stroke("gray");
  strokeWeight(1);
  beginShape();
  for (let t = 0; t < 100; t++) {
    const pT = {
      x:
        ballStart.position.x +
        ballStart.velocity.x * t +
        0.5 * gravity.x * t * t,
      y:
        ballStart.position.y +
        ballStart.velocity.y * t +
        0.5 * gravity.y * t * t,
    };
    vertex(pT.x, pT.y);
  }
  endShape();
}

// Numerical Integration: Updates the ball's position and velocity step-by-step
// Euler's method
// Instead of calculating the exact position, it approximates by applying small changes repeatedly
// dT represents a change in time from one step to the next
function numericallyStepBall(dT = 1) {
  // Update velocity by adding the change caused by gravity (acceleration) over the time step (dT)
  ball.velocity.x += gravity.x * dT;
  ball.velocity.y += gravity.y * dT;

  // Update position by adding the change caused by velocity over the time step (dT)
  ball.position.x += ball.velocity.x * dT;
  ball.position.y += ball.velocity.y * dT;
}

// improved Euler's method
function numericallyStepBallImproved(dT = 1) {
  // Calculate the velocity at the midpoint of the time step
  const midVelocity = {
    x: ball.velocity.x + 0.5 * gravity.x * dT,
    y: ball.velocity.y + 0.5 * gravity.y * dT,
  };

  // Update the position using the midpoint velocity
  ball.position.x += midVelocity.x * dT;
  ball.position.y += midVelocity.y * dT;

  // Update the velocity using the midpoint acceleration
  ball.velocity.x += gravity.x * dT;
  ball.velocity.y += gravity.y * dT;
}
