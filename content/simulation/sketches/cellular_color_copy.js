// require https://cdn.jsdelivr.net/npm/p5@latest/lib/p5.min.js

/* exported setup draw */

let g1;
let g2;

function setup() {
  pixelDensity(1);
  createCanvas(512, 512);
  g1 = createGraphics(128, 128);
  g1.loadPixels();
  for (let y = 0; y < 128; y++) {
    for (let x = 0; x < 128; x++) {
      setC(g1, x, y, [random(256), random(256), random(256), 255]);
    }
  }
  g1.updatePixels();

  g2 = createGraphics(128, 128);
}

function draw() {
  g1.loadPixels();
  g2.loadPixels();

  for (let y = 0; y < 128; y++) {
    for (let x = 0; x < 128; x++) {
      // get the color of each neighbor
      const cLeft = getC(g1, x - 1, y);
      const cRight = getC(g1, x + 1, y);
      const cUp = getC(g1, x, y - 1);
      const cDown = getC(g1, x, y + 1);

      // choose one at random
      const c = random([cLeft, cRight, cUp, cDown]);

      // make this pixel that color
      setC(g2, x, y, c);
    }
  }

  g2.updatePixels();
  g1.copy(g2, 0, 0, 128, 128, 0, 0, 128, 128);

  // blit g2 to g1

  noSmooth();
  image(g1, 0, 0, 512, 512);
}

function mousePressed() {
  console.log("mousePressed");
  // toggle draw loop
  isLooping() ? noLoop() : loop();
}

function getC(g, x, y) {
  x = floor(constrain(x, 0, g.width - 1));
  y = floor(constrain(y, 0, g.height - 1));
  const i = (y * g.width + x) * 4;
  return [g.pixels[i + 0], g.pixels[i + 1], g.pixels[i + 2], g.pixels[i + 3]];
}

function setC(g, x, y, c) {
  x = floor(constrain(x, 0, g.width - 1));
  y = floor(constrain(y, 0, g.height - 1));
  const i = (y * g.width + x) * 4;
  g.pixels[i + 0] = c[0];
  g.pixels[i + 1] = c[1];
  g.pixels[i + 2] = c[2];
  g.pixels[i + 3] = c[3];
}
