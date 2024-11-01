/**
 * Draws an interactive Truchet tile pattern with color cycling.
 *
 * written by [Your Name]
 */

/// configure compform editor
// require https://cdn.jsdelivr.net/npm/p5@1.11.0/lib/p5.js
// require /mess.js

/// configure eslint
/* exported preload, setup, draw, mousePressed */
/* globals mess */

// settings
const GRID_SIZE = 32;

// state
const images = {};
let grid;
let colorCycle = 0;

function preload() {
  images.tile1 = loadImage("/tiles/truchet_1.png");
  images.tile2 = loadImage("/tiles/truchet_2.png");
}

function setup() {
  /// set up canvas
  pixelDensity(1);
  const p5_canvas = createCanvas(windowWidth, windowHeight);

  /// configure p5

  noStroke();

  /// register this sketch as a Comp Form background "mess"
  mess(p5_canvas, 2000, {
    messName: "truchet",
    messLink: "/js_lab/js_lab.html?/tiles/truchet_mess.js",
  });

  grid = create2DArray(width / GRID_SIZE + 1, height / GRID_SIZE + 1, false);
}

function draw() {
  /// step
  const gridX = floor(mouseX / GRID_SIZE);
  const gridY = floor(mouseY / GRID_SIZE);
  const pgridX = floor(pmouseX / GRID_SIZE);
  const pgridY = floor(pmouseY / GRID_SIZE);

  if (gridX != pgridX || gridY != pgridY) {
    setTile(gridX, gridY);
    setTile(gridX + 1, gridY);
    setTile(gridX - 1, gridY);
    setTile(gridX, gridY + 1);
    setTile(gridX, gridY - 1);
  }

  /// draw
  clear();
  colorCycle = (colorCycle + 0.001) % 1;
  const tinted1 = tintImage(images.tile1, colorCycle, 1, 1);
  const tinted2 = tintImage(images.tile2, colorCycle, 1, 1);
  drawTiles({ tinted1, tinted2 });
}

/**
 * Sets or toggles the tile type at the specified grid position.
 * If the tile is unset (false) or type 1, it changes to type 2.
 * Otherwise, changes to type 1.
 */
function setTile(x, y) {
  if (x < 0 || x >= grid.length) return;
  if (y < 0 || y >= grid[0].length) return;
  if (grid[x][y] == 1) {
    grid[x][y] = 2;
  } else {
    grid[x][y] = 1;
  }
}

/**
 * Draws all tiles in the grid using the provided tinted images.
 */
function drawTiles(tinted1, tinted2) {
  for (let y = 0; y < height - GRID_SIZE; y += GRID_SIZE) {
    for (let x = 0; x < width - GRID_SIZE; x += GRID_SIZE) {
      const gridX = floor(x / GRID_SIZE);
      const gridY = floor(y / GRID_SIZE);

      if (grid[gridX][gridY] == 1) {
        image(tinted1, x, y, GRID_SIZE * 2, GRID_SIZE * 2);
      }
      if (grid[gridX][gridY] == 2) {
        image(tinted2, x, y, GRID_SIZE * 2, GRID_SIZE * 2);
      }
    }
  }
}

/**
 * Creates a tinted version of the provided image using HSB colors
 *
 * drawing with a tint() in p5 is slow, so we pre-tint the image and use it
 * for all the drawing this frame
 */
function tintImage(image, h, s, b) {
  const tinted = createGraphics(64, 64);
  tinted.colorMode(HSB, 1);
  tinted.tint(h, s, b);
  tinted.image(image, 0, 0, 64, 64);
  return tinted;
}

/**
 * Creates a 2D array with the specified dimensions and initial value.
 * @param {number} cols - Number of columns
 * @param {number} rows - Number of rows
 * @param {*} value - Initial value for all elements
 * @returns {Array<Array<*>>} 2D array initialized with the specified value
 */
function create2DArray(cols, rows, value) {
  return Array.from({ length: Math.floor(cols) }, () =>
    Array.from({ length: Math.floor(rows) }, () => value)
  );
}
