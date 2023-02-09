// require https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js

let recentValue = null;
const buckets = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

let deck = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let position = 0;

function valueFromDeck() {
  let v = deck[position];
  position++;
  if (position > deck.length) {
    deck = shuffle(deck);
    v = deck[0];
    position = 0;
  }
  return v;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(16);
  deck = shuffle(deck);
}

function draw() {
  clear();

  text("Click to Generate Number", 10, 20);

  if (recentValue !== null) {
    text(recentValue, 10, 40);
  }

  drawBuckets();
}

// draw buckets draws a histogram showing how many values have fallen in each bucket
function drawBuckets() {
  for (i = 0; i < buckets.length; i++) {
    text(i, 10 + 20 * i, height - 10);

    const barLeft = 10 + 20 * i;
    const barBottom = height - 30;
    const barHeight = buckets[i] * 15;

    rect(barLeft, barBottom, 15, -barHeight);
  }
}

function mouseReleased() {
  // pick a number
  recentValue = valueFromDeck();

  // increment the bucket that number falls into
  buckets[floor(recentValue)] += 1;
}
