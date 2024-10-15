/*exported draw, setup*/
/*globals Turtle*/

let t, g;

function setup() {
  const p5_canvas = createCanvas(windowWidth, windowHeight);
  mess(p5_canvas);

  angleMode(DEGREES);
  noFill();
  stroke("black");
  strokeWeight(2);

  t = new Turtle();
  t.show();
  g = drawGen();
}

function draw() {
  g.next();
}

function* drawGen() {
  while (true) {
    background("white");
    t.penUp();
    t.moveTo(40, 100);
    t.penDown();
    while (t.y < height - 100) {
      yield t.moveForward(100);
      for (let i = 0; i < 10; i++) {
        t.turnRight(18);
        yield t.moveForward(6);
      }

      yield t.moveForward(100);
      for (let i = 0; i < 10; i++) {
        t.turnLeft(18);
        yield t.moveForward(6);
      }
    }
  }
}
