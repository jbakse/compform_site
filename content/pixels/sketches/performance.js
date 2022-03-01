// require https://cdn.jsdelivr.net/npm/p5@latest/lib/p5.js

/* exported preload setup draw*/

// height and width of the image to test
// be careful turning this up, the slow case can be very slow
// with big images
const TEST_SIZE = 200;

let testImage;

function preload() {
  testImage = loadImage(`https://placekitten.com/g/${TEST_SIZE}/${TEST_SIZE}`);
}

function setup() {
  createCanvas(TEST_SIZE * 3, TEST_SIZE);
  noSmooth();
  noLoop();
}

function draw() {
  let startTime;
  let endTime;

  background(255);

  // draw original image
  image(testImage, 0, 0);

  // invert with built in get() + set()
  const testImageCopy = createImage(TEST_SIZE, TEST_SIZE);
  testImageCopy.copy(
    testImage,
    0,
    0,
    TEST_SIZE,
    TEST_SIZE,
    0,
    0,
    TEST_SIZE,
    TEST_SIZE
  );

  startTime = performance.now();
  invertStandard(testImageCopy);
  endTime = performance.now();

  console.log("invertStandard: ", endTime - startTime);

  image(testImageCopy, TEST_SIZE, 0);

  // invert with direct pixel array access
  testImageCopy.copy(
    testImage,
    0,
    0,
    TEST_SIZE,
    TEST_SIZE,
    0,
    0,
    TEST_SIZE,
    TEST_SIZE
  );

  startTime = performance.now();
  invertQuick(testImageCopy);
  endTime = performance.now();

  console.log("invertQuick: ", endTime - startTime);

  image(testImageCopy, TEST_SIZE * 2, 0);

  noLoop();
}

function invertStandard(img) {
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      const c = img.get(x, y);
      c[0] = 255 - c[0]; // invert red
      c[1] = 255 - c[1]; // invert green
      c[2] = 255 - c[2]; // invert blue
      // don't touch alpha
      img.set(x, y, c);
    }
  }
  img.updatePixels();
}

function invertQuick(img) {
  // load up the pixel[] array so we can read colors out of it
  img.loadPixels();

  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      const c = getQuick(img, x, y);
      c[0] = 255 - c[0]; // invert red
      c[1] = 255 - c[1]; // invert green
      c[2] = 255 - c[2]; // invert blue
      // don't touch alpha
      setQuick(img, x, y, c);
    }
  }

  img.updatePixels();
}

// getQuick()
// find the RGBA values of the pixel at `x`, `y` in the pixel array of `img`
// unlike get() this functions only supports getting a single pixel
// it also doesn't do any bounds checking or other checks
//
// we don't need to worry about screen pixel density here, because we are
// not reading from the screen, just an image

function getQuick(img, x, y) {
  const i = (y * img.width + x) * 4;
  return [
    img.pixels[i],
    img.pixels[i + 1],
    img.pixels[i + 2],
    img.pixels[i + 3],
  ];
}

// setQuick()
// set the RGBA values of the pixel at `x`, `y` in the pixel array of `img`
// unlike set() this functions only supports setting a single pixel
// it doesn't work with a p5 color object
// it also doesn't do any bounds checking or other checks
function setQuick(img, x, y, c) {
  const i = (y * img.width + x) * 4;

  img.pixels[i + 0] = c[0];
  img.pixels[i + 1] = c[1];
  img.pixels[i + 2] = c[2];
  img.pixels[i + 3] = c[3];
}
