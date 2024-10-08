// require https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js
// require /microgames/sketches/p5.play.js

// art from Buch @ opengameart.org
// https://opengameart.org/content/a-platformer-in-the-forest
// https://opengameart.org/users/buch

let sprite1;

function setup() {
  createCanvas(600, 300);

  let kingImage = loadImage("/microgames/sketches/king.png");

  sprite1 = createSprite(200, 150, 100, 100);
  sprite1.addImage("main", kingImage);
  sprite1.scale = 4;
  sprite1.mouseActive = true;
}

function draw() {
  background(50, 50, 80);

  if (sprite1.mouseIsOver) sprite1.rotation = -20;
  else {
    sprite1.rotation = 0;
  }

  noSmooth();
  drawSprites();
}
