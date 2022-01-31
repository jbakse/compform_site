// require https://cdn.jsdelivr.net/npm/tweakpane@1.5.8/dist/tweakpane.min.js
// require https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js

/*exported setup draw */

const pane = new Tweakpane();
const params = {
  frame_rate: 0,
};

function setup() {
  createCanvas(400, 400);
  frameRate(60);
  pane.addMonitor(params, "frame_rate");
  pane.addMonitor(params, "frame_rate", {
    view: "graph",
    min: 0,
    max: 60,
  });
}

function draw() {
  background("gray");

  stroke("white");
  noFill();
  line(50, 200, 350, 200);

  noStroke();
  fill(0, 0, 0, 5);
  fuzzy_ellipse(200, 200, 100, 100, 100);

  params.frame_rate = frameRate();
}

function fuzzy_ellipse(x, y, w, h, fuzz = 100) {
  for (let i = 0; i < 100; i++) {
    const xx = random(-fuzz, fuzz);
    const yy = random(-fuzz, fuzz);
    if (dist(0, 0, xx, yy) > fuzz) continue;
    ellipse(x + xx, y + yy, w, h);
  }
}
