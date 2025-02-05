/**
 * Connect the dots to create a Sierpinski triangle.
 *
 * written by Ana Konzen
 * edited by Justin Bakse
 *
 */

/// configure compform editor
// require https://cdn.jsdelivr.net/npm/p5@1.11.0/lib/p5.js
// require https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.11.0/addons/p5.sound.min.js
// require /mess.js

/// configure eslint
/* exported setup, draw, mousePressed */
/* globals mess */

// holds the triangle dots
const dots = [];

// holds the triangles
const triangles = [];

let triangleHue = 0;

function setup() {
  /// set up canvas
  const p5_canvas = createCanvas(windowWidth, windowHeight);

  /// register this sketch as a Comp Form background "mess"
  mess(p5_canvas, 6000, {
    messName: "sierpinski",
    messLink: "/js_lab/js_lab.html?/procedures/sierpinski_mess.js",
    authorName: "ana konzen",
    authorLink: "https://anakonzen.com",
  });

  /// configure p5
  colorMode(HSB, 255);
  textAlign(CENTER);

  /// initialize the first base triangle

  // get the smallest side of the canvas
  const triangleSide =
    width > height ? (height - 100) / sqrt(3) : (width - 100) / 2;

  makeTriangle(width / 2, height - 50, triangleSide);
  dots.push(triangles[0].dots[0]);
}

function draw() {
  clear();

  /// draw the lines
  if (dots.length > 2) {
    strokeWeight(2);
    const nLines = dots.length - 1;

    for (let i = 1; i < nLines; i++) {
      if (i % 4 === 0) continue; // skip the last dot of each triangle

      stroke(dots[i].hue, 225, 215);
      line(
        dots[i].x,
        dots[i].y,
        dots[(i - 1) % nLines].x,
        dots[(i - 1) % nLines].y
      );
    }
  }

  /// draw the dots and their number
  for (let i = 0; i < dots.length; i++) {
    let dotSize;

    // if the dot is not clicked and the mouse is not over it, make it pulse
    if (!dots[i].clicked && dist(mouseX, mouseY, dots[i].x, dots[i].y) > 10) {
      dotSize = 10 + sin(millis() * 0.01) * 2;
    } else {
      dotSize = 10;
    }

    fill(dots[i].hue, 225, 215);
    textSize(14);
    noStroke();

    // if the dot is the last one, draw the number below it
    const dotNumberY = i % 4 === 3 ? dots[i].y + 20 : dots[i].y - 10;

    text(i + 1, dots[i].x, dotNumberY);
    ellipse(dots[i].x, dots[i].y, dotSize, dotSize);
  }
}

function mousePressed() {
  const dot = dots[dots.length - 1];

  // check if the mouse is over the last dot
  if (dist(mouseX, mouseY, dot.x, dot.y) < 10) {
    dot.clicked = true;

    // if the last dot is the first one, make the next triangle
    if (triangles[0].dots.length === 1) {
      makeSierpinski(
        triangles[0].dots[0].x,
        triangles[0].dots[0].y,
        triangles[0].side
      );

      triangles.shift(); // remove the first triangle
      dots.push(triangles[0].dots[0]); // add the first dot
    } else {
      dots.push(triangles[0].dots[1]); // add the second dot
      triangles[0].dots.shift(); // remove the first dot
    }
  }
}

function makeSierpinski(x, y, side) {
  /// make the three triangles

  const halfSide = side / 2;
  const triangleHeight = (sqrt(3) / 2) * side;

  makeTriangle(x, y - triangleHeight, halfSide);
  makeTriangle(x - halfSide, y, halfSide);
  makeTriangle(x + halfSide, y, halfSide);
}

function makeTriangle(x, y, side) {
  /// make a triangle with the given side

  const triangleHeight = (sqrt(3) / 2) * side;

  triangleHue = (triangleHue + 10) % 255;

  // x1 and y1 are the top of the triangle, x2 and y2 are the bottom left, x3 and y3 are the bottom right
  const x1 = x;
  const y1 = y;
  const x2 = x - side / 2;
  const y2 = y - triangleHeight;
  const x3 = x + side / 2;
  const y3 = y - triangleHeight;

  // add the triangle to the array
  triangles.push({
    side: side,
    dots: [
      { x: x1, y: y1, clicked: false, hue: triangleHue },
      { x: x2, y: y2, clicked: false, hue: triangleHue },
      { x: x3, y: y3, clicked: false, hue: triangleHue },
      { x: x1, y: y1, clicked: false, hue: triangleHue },
    ],
  });
}
