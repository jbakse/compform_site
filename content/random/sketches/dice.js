// require https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js

let generatedNumber = null;
const buckets = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function generateNumber() {
  // even distribution
  return random(0, 10);

  // you can scale and slide a random (0-1) value yourself: [4-8)
  // return random() * 4 + 4;

  // roll a standard die
  // return floor(random(0,6)) + 1;
  // return floor(random(1,7));

  // this won't quite work. why?
  //return floor(random(1,6));

  // generate two numbers, and average them to get a middle bias
  // return (random(0,10) + random(0,10)) / 2;

  // pick the lower of two random numbers for low bias
  // return min(random(0,10), random(0,10));

  // pick the higher of two random numbers for high bias
  // return max(random(0,10), random(0,10));

  // average more than two numbers to get something like normal, bell curve distribution
  // return (random(0,10) + random(0,10) + random(0,10)) / 3;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(16);
}

function draw() {
  clear();

  text("Click to Generate Number", 10, 20);
  if (generatedNumber !== null) {
    text(generatedNumber, 10, 40);
  }

  drawBuckets();
}

// draw buckets draws a histogram showing how many values have fallen in each bucket
function drawBuckets() {
  for (i = 0; i < buckets.length; i++) {
    text(i, 10 + 20 * i, height - 10);

    let barLeft = 10 + 20 * i;
    let barBottom = height - 30;
    let barHeight = buckets[i] * 15;

    rect(barLeft, barBottom, 15, -barHeight);
  }
}

function mouseReleased() {
  // pick a number
  generatedNumber = generateNumber();

  // increment the bucket that number falls into
  buckets[floor(generatedNumber)] += 1;
}
