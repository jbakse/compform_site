// require https://cdn.jsdelivr.net/npm/p5@latest/lib/p5.min.js

/* exported setup draw */

let g1;
let g2;

function setup() {
  pixelDensity(1);
  createCanvas(512, 512);
  g1 = createGraphics(128, 128);
  g1.background("black");
  g1.loadPixels();
  for (let i = 0; i < 10; i++) {
    setC(g1, random(128), random(128), [255, 255, 255, 255]);
  }
  g1.updatePixels();

  g2 = createGraphics(128, 128);
}

function draw() {
  g1.loadPixels();
  g2.loadPixels();

  // copy each pixel from g1 to g2
  for (let y = 0; y < 128; y++) {
    for (let x = 0; x < 128; x++) {
      // get current color

      const c = isOn(g1, x, y);
      const cUp = isOn(g1, x, y - 1);
      const cUpRight = isOn(g1, x + 1, y - 1);
      const cRight = isOn(g1, x + 1, y);
      const cDownRight = isOn(g1, x + 1, y + 1);
      const cDown = isOn(g1, x, y + 1);
      const cDownLeft = isOn(g1, x - 1, y + 1);
      const cLeft = isOn(g1, x - 1, y);
      const cUpLeft = isOn(g1, x - 1, y - 1);

      if (!c) {
        if (cUp && !cUpRight && !cUpLeft) {
          setC(g2, x, y, [255, 255, 255, 255]);
          continue;
        }

        if (cDown && !cDownRight && !cDownLeft) {
          setC(g2, x, y, [255, 255, 255, 255]);
          continue;
        }

        if (cRight && !cDownRight && !cUpRight) {
          setC(g2, x, y, [255, 255, 255, 255]);
          continue;
        }

        if (cLeft && !cDownLeft && !cUpLeft) {
          setC(g2, x, y, [255, 255, 255, 255]);
          continue;
        }
      }

      const cIn = getC(g1, x, y);
      // cIn[0] -= 10;
      // cIn[1] -= 10;
      // cIn[2] -= 10;
      setC(g2, x, y, cIn);
    }
  }

  g2.updatePixels();

  // blit g2 to g1
  g1.copy(g2, 0, 0, 128, 128, 0, 0, 128, 128);

  noSmooth();
  image(g1, 0, 0, 512, 512);
}

// returns true if the pixel rgb is non-black
function isOn(g, x, y) {
  const c = getC(g, x, y);
  return c[0] > 0 || c[1] > 0 || c[2] > 0;
}

function maxC(...colors) {
  return colors.reduce(
    (acc, c) => [
      max(acc[0], c[0]),
      max(acc[1], c[1]),
      max(acc[2], c[2]),
      max(acc[3], c[3]),
    ],
    [0, 0, 0, 0]
  );
}

function getC(g, x, y) {
  x = floor(constrain(x, 0, g.width));
  y = floor(constrain(y, 0, g.width));
  const i = (y * g.width + x) * 4;
  return [g.pixels[i + 0], g.pixels[i + 1], g.pixels[i + 2], g.pixels[i + 3]];
}

function setC(g, x, y, c) {
  x = floor(constrain(x, 0, g.width));
  y = floor(constrain(y, 0, g.width));
  const i = (y * g.width + x) * 4;
  g.pixels[i + 0] = c[0];
  g.pixels[i + 1] = c[1];
  g.pixels[i + 2] = c[2];
  g.pixels[i + 3] = c[3];
}

function mousePressed() {
  console.log("mousePressed");
  // toggle draw loop
  isLooping() ? noLoop() : loop();
}
