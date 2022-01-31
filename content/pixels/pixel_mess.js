// require https://cdn.jsdelivr.net/npm/p5@latest/lib/p5.min.js
// require /sketches/_util/mess.js

/* exported setup draw */

let img;

function setup() {
  pixelDensity(1);
  const c = createCanvas(windowWidth, windowHeight);
  mess(c);
  mess_resize();
}

function draw() {
  clear();
  noSmooth();
  image(img, 0, 0, width, height);

  const img_x = floor((mouseX / width) * img.width);
  const img_y = floor((mouseY / height) * img.height);

  const c = [0, 0, 200, 255];
  setQuick(img, img_x, img_y, c);

  times(img.width * img.height, grow);

  img.updatePixels();
}

function grow() {
  const x = floor(random(img.width));
  const y = floor(random(img.height));
  const c = getQuick(img, x, y);
  if (c[2] > 0) {
    const x2 = x + floor(random(-1, 2));
    const y2 = y + floor(random(-1, 2));
    const c2 = [0, 0, c[2] - 10, c[3]];
    setQuick(img, x2, y2, c2);
  }
  c[3] -= 10;
  setQuick(img, x, y, c);
}

function mess_resize() {
  const cell_size = constrain(floor(width / 100), 10, 100);

  img = createImage(floor(width / cell_size), floor(height / cell_size));
  img.loadPixels();

  //   for (let y = 0; y < img.height; y++) {
  //     for (let x = 0; x < img.width; x++) {
  //       const c = color(random(255), random(255), random(255), 10);
  //       img.set(x, y, c);
  //     }
  //   }

  img.updatePixels();
}

function getQuick(i, x, y) {
  const index = constrain((y * i.width + x) * 4, 0, i.width * i.height * 4);
  return [
    i.pixels[index + 0],
    i.pixels[index + 1],
    i.pixels[index + 2],
    i.pixels[index + 3],
  ];
}

function setQuick(i, x, y, c) {
  const index = constrain((y * i.width + x) * 4, 0, i.width * i.height * 4);

  i.pixels[index + 0] = c[0];
  i.pixels[index + 1] = c[1];
  i.pixels[index + 2] = c[2];
  i.pixels[index + 3] = c[3];
}

function times(t, f) {
  const a = [];
  for (let i = 0; i < t; i++) {
    a.push(f(i));
  }
  return a;
}
