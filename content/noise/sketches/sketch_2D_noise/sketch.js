// require https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js

function setup() {
  createCanvas(600, 600, WEBGL);
}

function draw() {
  background(255);
  drawNoise();
  // save();
  noLoop();
  angleMode(DEGREES);
}

function drawNoise() {
  stroke(0);
  noStroke();
  let frequency = 0.01;
  let amplitude = 1;

  for (let z = 0; z < height; z += 50) {
    push();
    translate(0, 0, -601);
    rotateY(radians(45));
    translate(-300, -300, 400 - z * 2);
    fill(0, 0, 0);

    rect(-3, -3, 606, 606);
    pop();

    for (let y = 0; y < height; y += 30) {
      for (let x = 0; x < width; x += 30) {
        let n = noise(x * frequency, y * frequency, z * frequency);
        n = n * amplitude * 255;
        fill(n);
        push();
        translate(0, 0, -600);
        rotateY(radians(45));
        translate(-300, -300, 400 - z * 2);
        rect(x, y, 30, 30);
        pop();
      }
    }
  }
}
