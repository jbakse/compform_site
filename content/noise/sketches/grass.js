// require https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js

function setup() {
  createCanvas(600, 200);
  ellipseMode(CENTER);
  fill(200, 50, 100);
  noStroke();
}

function draw() {
  background(255);
  let n;

  stroke(0, 0, 0, 50);

  for (let x = 15; x < width - 15; x += 1.5) {
    let offsetX = 0;
    let offsetY = 0;

    // lean (low frequency, static)
    n = noise(x * 0.1);
    offsetX += n * 20 - 10;

    // height (high frequency sampling yields independent values)
    offsetY += noise(x * 10) * 20;

    // wind( lower frequency, timed)
    n = noise(x * 0.01 + millis() * -0.001);
    offsetX += n * 40;

    line(x, 190, x + offsetX, 100 + offsetY);
  }
}
