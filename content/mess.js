// draws a rainbow maze
let p5_canvas;

// config
const color_steps = 1000;
const target_size = 10;
const color_s = 1;
const color_b = 1;

// globals
let grid_cols = 0;
let grid_rows = 0;
let grid_width = 0;
let grid_height = 0;
let grid = [];
let history = [];
let current_cell = {
  x: 0,
  y: 0,
  c: 0,
};

function setup() {
  p5_canvas = createCanvas(windowWidth, windowHeight);

  p5_canvas.canvas.classList.add("mess");
  p5_canvas.canvas.setAttribute("style", "");

  colorMode(HSB, color_steps);
  noStroke();

  mess_resize();
}

function mess_resize() {
  clear();

  // find best fit for grid
  grid_cols = floor(windowWidth / target_size);
  grid_rows = floor(windowHeight / target_size);
  grid_width = width / grid_cols;
  grid_height = height / grid_rows;

  // start in lower right corner
  current_cell.x = grid_cols - 1;
  current_cell.y = grid_rows - 1;

  // initialize 2d array
  for (var i = 0; i < grid_cols; i++) {
    grid[i] = [];
  }
}

function draw() {
  step();
}

function step() {
  let x = 0;
  let y = 0;
  let found_open_cell = false;

  // look at adjacent cells in random order, try to find open cell
  // direction is biased right
  let directions = shuffle(["up", "right", "down", "left", "right"]);
  for (const dir of directions) {
    x = current_cell.x;
    y = current_cell.y;

    if (dir == "up") {
      y--;
    } else if (dir == "right") {
      x++;
    } else if (dir == "down") {
      y++;
    } else if (dir == "left") {
      x--;
    }

    x = constrain(x, 0, grid_cols - 1);
    y = constrain(y, 0, grid_rows - 1);

    if (!grid[x][y]) {
      found_open_cell = true;
      break;
    }
  }

  if (found_open_cell) {
    // move into cell
    current_cell.c = ++current_cell.c % color_steps;
    current_cell.x = x;
    current_cell.y = y;

    // mark cell as full
    grid[current_cell.x][current_cell.y] = true;

    // add new cell to history
    history.push({
      x: current_cell.x,
      y: current_cell.y,
      c: current_cell.c,
    });

    // draw new cell
    fill(current_cell.c, color_steps * color_s, color_steps * color_b);
    rect(
      current_cell.x * grid_width,
      current_cell.y * grid_height,
      grid_width + 1,
      grid_height + 1
    );
  } else {
    // hit a dead end
    if (history.length) {
      // back up
      current_cell = history.pop();
    } else {
      // all done
      noLoop();
    }
  }
}

let resize_timeout;
window.addEventListener("resize", (e) => {
  clearTimeout(resize_timeout);
  resize_timeout = setTimeout(() => {
    p5_canvas.canvas.setAttribute("style", "");
    mess_resize && mess_resize();
  }, 100);
});
