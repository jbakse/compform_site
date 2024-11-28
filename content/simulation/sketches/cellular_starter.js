// require https://cdn.jsdelivr.net/npm/p5@latest/lib/p5.min.js

/* exported setup draw */

let g1;
let g2;

function setup() {
  pixelDensity(1);
  createCanvas(512, 512);

  // create a buffer to hold the state of the simulation
  g1 = createGraphics(128, 128);
  g1.background(0);
  g1.fill(255);
  g1.noStroke();
  g1.rect(16, 16, 8, 8);
  g1.rect(64, 16, 8, 8);
  g1.rect(16, 102, 8, 8);

  // create a second buffer to hold the next state of the simulation
  g2 = createGraphics(128, 128);
}

function draw() {
  // prepare g1 and g2 for reading/writing .pixels[]
  g1.loadPixels();
  g2.loadPixels();

  // copy each pixel from g1 to g2
  for (let y = 0; y < 128; y++) {
    for (let x = 0; x < 128; x++) {
      const c = getC(g1, x, y);
      const cUp = getC(g1, x, y - 1);
      const cRight = getC(g1, x + 1, y);
      const cDown = getC(g1, x, y + 1);
      const cLeft = getC(g1, x - 1, y);

      // if this pixel is black (in red channel)
      if (!c[0]) {
        // if any neighbor is non-black (in red channel), make this one white
        if (cUp[0] || cRight[0] || cDown[0] || cLeft[0]) {
          setC(g2, x, y, [255, 0, 0, 255]);
          continue;
        }
      }

      setC(g2, x, y, c);
    }
  }

  // update g2 after writing
  g2.updatePixels();

  // blit g2 to g1
  g1.copy(g2, 0, 0, 128, 128, 0, 0, 128, 128);

  // show g1
  noSmooth();
  image(g1, 0, 0, 512, 512);
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
