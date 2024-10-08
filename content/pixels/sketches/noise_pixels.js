function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  img = createImage(30, 30);
  img.loadPixels();
  for (let y = 0; y < img.width; y++) {
    for (let x = 0; x < img.height; x++) {
      let r = noise(x * 0.1, y * 0.1, 0) * 255;
      let g = noise(x * 0.1, y * 0.1, 100) * 255;
      let b = noise(x * 0.1, y * 0.1, 200) * 255;

      let c = color(r, g, b);

      img.set(x, y, c);
    }
  }
  img.updatePixels();

  noSmooth();
  image(img, 0, 0, width, height);
  noLoop();
}
