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
  dots.push({
    x: random(width / 2 - 100, width / 2 + 100),
    y: random(height / 2 - 100, height / 2 + 100),
    clicked: false,
  });
  textAlign(CENTER);
}

function draw() {
  clear();
  if (points.length > 1) {
    stroke("#004cff");
    strokeWeight(2);
    for (let i = 0; i < points.length; i++) {
      if (i > 0) line(points[i - 1].x, points[i - 1].y, points[i].x, points[i].y);
    }
  }

  for (let i = 0; i < dots.length; i++) {
    let dotSize;
    let dotColor;

    if (!dots[i].clicked && dist(mouseX, mouseY, dots[i].x, dots[i].y) > 10) {
      dotSize = 10 + sin(millis() * 0.01) * 2;
      dotColor = "#ff0000";
    } else {
      dotColor = "#004cff";
      dotSize = 10;
    }
    if (dist(mouseX, mouseY, dots[i].x, dots[i].y) < 10){
      cursor(HAND);
    }
    fill(dotColor);
    textSize(14);
    noStroke();
    text(i + 1, dots[i].x, dots[i].y - 10);
    ellipse(dots[i].x, dots[i].y, dotSize, dotSize);
  }
}

function mousePressed() {
  const dot = dots[dots.length - 1];
  if (dist(mouseX, mouseY, dot.x, dot.y) < 10) {
    dot.clicked = true;
    points.push({ x: dot.x, y: dot.y });
    dots.push({ x: random(xMin, width - xMax), y: random(yMin, height - yMax), clicked: false });
  }
}
