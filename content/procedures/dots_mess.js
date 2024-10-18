/* exported setup draw mousePressed*/
/* global mess*/

const points = [];
const dots = [];
const xMin = 10;
const xMax = 10;
const yMin = 50;
const yMax = 50;

function setup() {
  const p5_canvas = createCanvas(windowWidth, windowHeight);
  mess(p5_canvas);
  dots.push({ x: random(xMin, width - xMax), y: random(yMin, height - yMax) });
  textAlign(CENTER);
}

function draw() {
  if (points.length > 1) {
    stroke("#004cff");
    strokeWeight(2);
    for (let i = 0; i < points.length; i++) {
      if (i > 0) line(points[i - 1].x, points[i - 1].y, points[i].x, points[i].y);
    }
  }

  for (let i = 0; i < dots.length; i++) {
    fill("#004cff");
    textSize(14);
    noStroke();
    text(i + 1, dots[i].x, dots[i].y - 10);
    ellipse(dots[i].x, dots[i].y, 10, 10);
  }
}

function mousePressed() {
  const dot = dots[dots.length - 1];
  if (dist(mouseX, mouseY, dot.x, dot.y) < 10) {
    points.push({ x: dot.x, y: dot.y });
    dots.push({ x: random(xMin, width - xMax), y: random(yMin, height - yMax) });
  }
}
