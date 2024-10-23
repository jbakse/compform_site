// require https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js
/* exported setup draw */

let fpsDiv;

function setup() {
  pixelDensity(1);
  createCanvas(1280, 720);
  frameRate(60);
  ellipseMode(CENTER);
  noiseDetail(1);

  fpsDiv = createDiv();
}

function draw() {
  blendMode(BLEND);
  background(0);

  blendMode(ADD);
  fill(1);
  const x = width * 0.5;
  const y = height * 0.5;

  for (let i = 0; i < 20000; i++) {
    const s = sin(map(frameCount, 0, 90, 0, PI)) * 100;

    const offsetX = map(
      noise(i * 0.5, frameCount * 0.01, 0),
      0,
      0.5,
      -640,
      640
    );
    const offsetY = map(
      noise(i * 0.5, frameCount * 0.01, 1),
      0,
      0.5,
      -640,
      640
    );

    ellipse(x + offsetX, y + offsetY, s, s);
  }

  // show fps in fpsDiv
  fpsDiv.html("fps: " + ((frameCount / millis()) * 1000).toFixed(1));

  if (frameCount > 90) {
    noLoop();
  }
}
