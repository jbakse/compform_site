const boxSize = 25;
const numBoxes = 100;
const hues = [];
const randomAngles = [];
const delays_x = [];
const delays_y = [];
let angleShift = 0;
let x = 0;
let y = 0;

function setup() {
  const p5_canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  mess(p5_canvas);

  colorMode(HSB, 1000);
  noStroke();

  //position boxes in the center
  x = mouseX = width * 0.5;
  y = mouseY = width * 0.5;

  //set color and angle for each box
  for (let i = 0; i < numBoxes; i++) {
    hues.push((i * 20) % 1000);
    randomAngles.push(random(0.1, 1));
  }
}

function draw() {
  clear();

  //change coordinate system
  translate(-width / 2, -height / 2);

  x = lerp(x, mouseX, 0.2);
  y = lerp(y, mouseY, 0.2);

  //set delay for each box
  delays_x.unshift(x);
  if (delays_x.length > numBoxes) delays_x.pop();

  delays_y.unshift(y);
  if (delays_y.length > numBoxes) delays_y.pop();

  //set lights
  ambientLight(0, 0, 700);
  directionalLight(1000, 0, 400, 0, 0, -1);
  directionalLight(1000, 0, 300, 0, 1, 0);
  directionalLight(1000, 0, 700, 1, 0, 0);

  //draw boxes
  for (let i = 0; i < numBoxes; i++) {
    let nx =
      (noise(i * 0.2, frameCount * 0.001) -
        noise(0 * 0.2, frameCount * 0.001)) *
      80;
    let ny =
      (noise(i * 0.02, 1, frameCount * 0.002) -
        noise(0, 1, frameCount * 0.002)) *
      100;

    push();
    ambientMaterial(hues[i], 1000, 1000);
    //set delay for each box
    translate(delays_x[i], delays_y[i]);
    //rotate boxes horizontally
    // rotateY(240);
    //position each box according to noise. each box is positioned behind the previous box
    translate(boxSize * nx, boxSize * ny, -boxSize * i);

    //rotate each box when mouse is pressed
    if (mouseIsPressed) {
      angleShift += 0.002;
    }
    rotateZ(angleShift * randomAngles[i]);

    box(boxSize);
    pop();
  }
}
