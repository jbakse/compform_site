// require https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js

var worldImage;

function preload() {
  worldImage = loadImage("/pixels/sketches/world.png");
  // worldImage = loadImage("/pixels/sketches/world_100.png");
}

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0, 50, 50);

  fill(200, 50, 50);
  noStroke();

  var spacing = 500 / worldImage.width;
  for (var y = 0; y < worldImage.height; y++) {
    for (var x = 0; x < worldImage.width; x++) {
      var in_color = worldImage.get(x, y);
      var dot_size = (lightness(in_color) / 255) * 50;
      ellipse(
        x * spacing + spacing * 0.5,
        y * spacing + spacing * 0.5,
        dot_size,
        dot_size
      );
    }
  }

  // we don't draw the image, its just input

  noLoop();
}
