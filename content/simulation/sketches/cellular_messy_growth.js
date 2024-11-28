// require https://cdn.jsdelivr.net/npm/p5@latest/lib/p5.min.js

/* exported setup draw */

let g1;
let g2;
let currentHue;

function setup() {
  pixelDensity(1);
  createCanvas(512, 512);

  g1 = createGraphics(128, 128);
  g1.background(0);
  g1.fill(255);
  g1.noStroke();
  g1.noSmooth();
  g1.rect(16, 16, 8, 8);

  g2 = createGraphics(128, 128);

  currentHue = 0;
}

function draw() {
  g1.loadPixels();
  g2.loadPixels();
  currentHue = (currentHue + 0.002) % 1;

  // copy each pixel from g1 to g2
  for (let y = 0; y < 128; y++) {
    for (let x = 0; x < 128; x++) {
      // get current color
      const c = getC(g1, x, y);

      const cUp = getC(g1, x, y - 1);
      const cRight = getC(g1, x + 1, y);
      const cDown = getC(g1, x, y + 1);
      const cLeft = getC(g1, x - 1, y);

      // if this pixel is already set
      if (!isBlack(c)) {
        //...copy color and continue
        setC(g2, x, y, c);
        continue;
      }

      // if any neighbor is not black
      if (
        !isBlack(cUp) ||
        !isBlack(cRight) ||
        !isBlack(cDown) ||
        !isBlack(cLeft)
      ) {
        // a small chance of growth
        if (random() < 0.1) {
          // make this pixel the current hue
          const rgba = hsbToRgb(currentHue, 1, 1, 255);
          setC(g2, x, y, rgba);
          continue;
        }
      }
    }
  }

  g2.updatePixels();

  // blit g2 to g1
  g1.copy(g2, 0, 0, 128, 128, 0, 0, 128, 128);

  noSmooth();
  image(g1, 0, 0, 512, 512);
}

function isBlack(c) {
  return c[0] === 0 && c[1] === 0 && c[2] === 0;
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

// convert HSB color to RGB color
// adapted from https://stackoverflow.com/questions/17242144/javascript-convert-hsb-hsv-color-to-rgb-accurately
function hsbToRgb(h, s, b, a) {
  let r, g, b2;

  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = b * (1 - s);
  const q = b * (1 - f * s);
  const t = b * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      (r = b), (g = t), (b2 = p);
      break;
    case 1:
      (r = q), (g = b), (b2 = p);
      break;
    case 2:
      (r = p), (g = b), (b2 = t);
      break;
    case 3:
      (r = p), (g = q), (b2 = b);
      break;
    case 4:
      (r = t), (g = p), (b2 = b);
      break;
    case 5:
      (r = b), (g = p), (b2 = q);
      break;
  }

  return [r * 255, g * 255, b2 * 255, a];
}
