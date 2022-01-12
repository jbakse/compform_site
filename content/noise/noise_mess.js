// draws noise trail

/* exported preload setup draw mousePressed windowResized */

// config
const lines = 50;
const line_closeness = 1;
const in_scale = 0.01;
const out_scale = 100;

// state
let old_x = false;
let old_y = false;
let c_hue = 0;

function setup() {
  pixelDensity(1);
  const p5_canvas = createCanvas(windowWidth, windowHeight);
  mess(p5_canvas);

  noFill();
  colorMode(HSB, 1000);
}

function draw() {
  // don't start if p5 hasn't got a mouse position yet
  if (mouseX == 0 && mouseY == 0) {
    return;
  }

  // init mouse_state
  if (old_x === false) {
    old_x = mouseX;
    old_y = mouseY;
  }

  // draw brush
  brush(old_x, old_y, mouseX, mouseY);

  // update mouse state
  old_x = mouseX;
  old_y = mouseY;
}

function brush(x1, y1, x2, y2) {
  // draw line as series of 3 pixel line segments
  // this smooths out the curves
  let steps = dist(x1, y1, x2, y2) / 3;
  steps = max(steps, 1);

  for (let n = 0; n < steps; n++) {
    //color
    c_hue = ++c_hue % 1000;
    stroke(c_hue, 1000, 1000, 200);

    // find start/end of segment
    let start_x = lerp(x1, x2, n / steps);
    let start_y = lerp(y1, y2, n / steps);
    let end_x = lerp(x1, x2, (n + 1) / steps);
    let end_y = lerp(y1, y2, (n + 1) / steps);

    //draw brush
    strokeWeight(1);
    for (let i = 0; i < lines; i++) {
      noiseLine(
        start_x,
        start_y,
        end_x,
        end_y,
        (i * line_closeness) / lines,
        in_scale,
        out_scale
      );
    }
  }
}

function noiseLine(x1, y1, x2, y2, n, in_scale, out_scale) {
  x1 += (noise(x1 * in_scale, y1 * in_scale, n) - 0.5) * out_scale;
  y1 += (noise(x1 * in_scale, y1 * in_scale, n) - 0.5) * out_scale;

  x2 += (noise(x2 * in_scale, y2 * in_scale, n) - 0.5) * out_scale;
  y2 += (noise(x2 * in_scale, y2 * in_scale, n) - 0.5) * out_scale;

  line(x1, y1, x2, y2);
}
