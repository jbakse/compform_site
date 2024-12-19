/* exported setup, draw, mousePressed */
/* globals mess */

const points = [];
const dots = [];
const xMin = 10;
const xMax = 10;
const yMin = 50;
const yMax = 50;

function setup() {
  const p5_canvas = createCanvas(windowWidth, windowHeight);
  mess(p5_canvas, 2000, {
    messName: "dots",
    messLink: "/js_lab/js_lab.html?/procedures/dots_mess.js",
    authorName: "ana konzen",
    authorLink: "https://anakonzen.com",
  });
  colorMode(HSB, 255);
  dots.push({
    x: random(width / 2 - 100, width / 2 + 100),
    y: random(height / 2 - 100, height / 2 + 100),
    clicked: false,
    hue: 0,
  });
  textAlign(CENTER);
}

function draw() {
  clear();
  if (points.length > 1) {
    strokeWeight(2);
    for (let i = 1; i < points.length; i++) {
      //gradient line
      const from = color(points[i].hue, 255, 225);
      const to = color(points[(i - 1) % points.length].hue, 255, 225);
      stroke(lerpColor(from, to, 0.5));
      line(
        points[i].x,
        points[i].y,
        points[(i - 1) % points.length].x,
        points[(i - 1) % points.length].y
      );
    }
  }

  for (let i = 0; i < dots.length; i++) {
    let dotSize;
    if (!dots[i].clicked && dist(mouseX, mouseY, dots[i].x, dots[i].y) > 10) {
      dotSize = 10 + sin(millis() * 0.01) * 2;
    } else {
      dotSize = 10;
    }
    if (dist(mouseX, mouseY, dots[i].x, dots[i].y) < 10) {
      cursor(HAND);
    }
    fill(dots[i].hue, 255, 225);
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
    points.push({ x: dot.x, y: dot.y, hue: dot.hue });
    dots.push({
      x: random(xMin, width - xMax),
      y: random(yMin, height - yMax),
      clicked: false,
      hue: (dot.hue + 10) % 255,
    });
  }
}
