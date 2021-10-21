// require https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.min.js

var pos_x_slider, pos_y_slider, size_slider, color_picker;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight * 0.5);

  fill(100);
  noStroke();
  rectMode(CENTER);

  createP("Horizontal Position");
  pos_x_slider = createSlider(0, width, width * 0.5);

  createP("Size");
  size_slider = createSlider(10, 200, 100);

  createP("Color");
  color_picker = createInput("#648EDE", "color");
}

function draw() {
  background(250);
  fill(color_picker.value());
  var pos_x = pos_x_slider.value();
  var pos_y = height * 0.5;
  var size = size_slider.value();
  rect(pos_x, pos_y, size, size);
}
