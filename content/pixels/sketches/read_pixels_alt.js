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

  for (let y = 0; y < worldImage.height; y++) {
    for (let x = 0; x < worldImage.width; x++) {
      const in_color = worldImage.get(x, y);

      const r = red(in_color);
      const g = green(in_color);
      const b = blue(in_color);

      let out_color;
      if (r === 255) {
        out_color = color(255, 0, 0);
      } else {
        out_color = color(0, 0, 255);
      }

      worldImage.set(x, y, out_color);
      worldImage.updatePixels();
    }
  }

  noSmooth();
  image(worldImage, 0, 0, width, height);

  noLoop();
}
