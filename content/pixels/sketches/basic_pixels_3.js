// require https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  img = createImage(10, 10);
  img.loadPixels();

  for (let i = 0; i < 50; i++) {
    let c = color(255, 0, 0);
    img.set(random(10), random(10), c);
  }

  img.updatePixels();

  noSmooth();
  image(img, 0, 0, width, height);
  noLoop();
}
