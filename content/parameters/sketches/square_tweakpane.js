// require https://cdn.jsdelivr.net/npm/tweakpane@3.0.7/dist/tweakpane.min.js
// require https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.min.js
/* globals Tweakpane */
/* exported setup draw */

const params = {
  pos_x: 0,
  pos_y: 0,
  size: 100,
  color: "blue",
};

const pane = new Tweakpane.Pane();

pane.addInput(params, "pos_x", { min: 0, max: 512 });
pane.addInput(params, "pos_y", { min: 0, max: 512 });
pane.addInput(params, "size", { min: 10, max: 200 });
pane.addInput(params, "color", { input: "color" });

function setup() {
  createCanvas(512, 512);

  fill(100);
  noStroke();
  rectMode(CENTER);

  // if you change a params property tweakpane will reflect it
  params.pos_x = width * 0.5;
  params.pos_y = height * 0.5;
}

function draw() {
  background(250);
  fill(params.color);

  rect(params.pos_x, params.pos_y, params.size, params.size);
}
