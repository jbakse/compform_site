// require https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js

let worldImage;

function preload() {
  worldImage = loadImage("/pixels/sketches/world.png");
}

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  worldImage.loadPixels();

  for (let y = 0; y < worldImage.height; y++) {
    for (let x = 0; x < worldImage.width; x++) {
      let in_color = worldImage.get(x, y);

      let r = red(in_color);
      let g = green(in_color);
      let b = blue(in_color);
      let out_color = color(r * random(), g * random(), b * random());

      worldImage.set(x, y, out_color);
      worldImage.updatePixels();
    }
  }

  noSmooth();
  image(worldImage, 0, 0, width, height);

  noLoop();
}
