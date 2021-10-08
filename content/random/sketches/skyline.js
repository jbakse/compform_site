// require https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.min.js

let values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let position = 0;

function setup() {
  createCanvas(1200, 200);
  noLoop();

  noStroke();
  fill(255, 255, 255);

  deck = shuffle(deck);

  noLoop();
}

function draw() {
  background(200, 200, 210);
  fill(100);

  let x = 0;
  for (x = 0; x < width; x += 20) {
    let buildingHeight = floor(pickHeight()) * 15;
    rect(x, height * 0.9 - buildingHeight, 20, buildingHeight);
  }

  fill(150);
  rect(0, height * 0.9, width, height * 0.5);
}

function pickHeight() {
  // even
  return random(0, 10);

  // low
  // return min(
  //     random(0, 10),
  //     random(0, 10),
  //     random(0, 10),
  //     random(0, 10)
  // );

  // high
  // return max(
  //     random(0, 10),
  //     random(0, 10),
  //     random(0, 10),
  //     random(0, 10)
  // );

  // normal
  // return (
  //     random(0, 10)+
  //     random(0, 10)+
  //     random(0, 10)+
  //     random(0, 10)
  // ) * .25;

  // deck
  // return valueFromDeck();
}

function valueFromDeck() {
  // find the value at the current position in the deck
  let v = deck[position];

  // change the position for next time
  position++;

  // if we run out of "cards", shuffle and start over from the top
  if (position > 9) {
    deck = shuffle(deck);
    position = 0;
  }

  // return the value
  return v;
}
