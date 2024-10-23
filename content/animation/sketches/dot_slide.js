// require https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js
/* exported setup draw */

function setup() {
  createCanvas(500, 500);
  noStroke();
  fill("black");

  const button = createButton("restart");
  button.mousePressed(() => {
    window.location.reload();
  });
}

function draw() {
  let x;
  clear();

  // starting at 0 second and ending at 1.5 seconds
  // move from 100 to 400
  x = map(millis(), 0, 1500, 100, 400, true);
  ellipse(x, 100, 80, 80);

  // starting at 1.5 seconds and ending at 5 seconds
  // move from 100 to 400
  x = map(millis(), 1500, 5000, 100, 400, true);
  ellipse(x, 200, 80, 80);

  // starting at 5 seconds and ending at 5.5 seconds
  // move from 400 to 100
  x = map(millis(), 5000, 5500, 400, 100, true);
  ellipse(x, 300, 80, 80);
}
