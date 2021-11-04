// require https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js

function setup() {
  createCanvas(400, 200);
  frameRate(60);
  noStroke();
}

function draw() {
  background(50);

  for (let i = 0; i < 11; i++) {
    let seconds = millis() / 1000.0;
    let s = sin(seconds * TWO_PI + i / 5.0);
    fill(s < 0 ? "red" : "white");
    ellipse(100 + i * 20, 100, 100, abs(s) * 100);
  }
}
