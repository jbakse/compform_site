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
  let n, x;
  clear();

  // starting at 0 second and ending at 1.5 seconds
  // move from 100 to 400
  n = map(millis(), 0, 1500, 0, 1, true); // first map to 0-1
  x = map(easeInOutCubic(n), 0, 1, 100, 400); // apply ease, map to output range
  ellipse(x, 100, 80, 80);

  // starting at 1.5 seconds and ending at 5 seconds
  // move from 100 to 400
  n = map(millis(), 1500, 5000, 0, 1, true);
  x = map(easeInOutCubic(n), 0, 1, 100, 400);
  ellipse(x, 200, 80, 80);

  // starting at 5 seconds and ending at 5.5 seconds
  // move from 400 to 100
  n = map(millis(), 5000, 5500, 0, 1, true);
  x = map(easeInOutCubic(n), 0, 1, 400, 100);

  ellipse(x, 300, 80, 80);
}

// from https://easings.net/#easeInOutCubic
function easeInOutCubic(x) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}
