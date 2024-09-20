// Turtle

// Basic turtle graphics implementation:
// https://en.wikipedia.org/wiki/Turtle_graphics
// Written by Justin Bakse +  Alex Silva

class Turtle {
  #stateStack;

  constructor(x = width * 0.5, y = height * 0.5) {
    this.x = x;
    this.y = y;
    this.bearing = 0;
    this.isPenDown = true;
    this.#stateStack = [];
  }

  // moveTo
  // moves the turtle to location (newX,newY), drawing a line if pen is down
  moveTo(newX, newY) {
    if (this.isPenDown) {
      line(this.x, this.y, newX, newY);
    }
    this.x = newX;
    this.y = newY;
  }

  // moveForward
  // moves the turtle along its current bearing, drawing a line if pen is down
  moveForward(distance) {
    const newX = this.x + cos(this.bearing) * distance;
    const newY = this.y + sin(this.bearing) * distance;
    this.moveTo(newX, newY);
  }

  // moveBackward
  // moves the turtle backward along its current bearing, drawing a line if pen is down
  moveBackward(distance) {
    this.moveForward(-distance);
  }

  // turnTo
  // changes the turtle's bearing to the provided angle in degrees
  turnTo(angleDegrees) {
    this.bearing = angleDegrees;
  }

  // turnRight
  // rotates the turtle's bearing clockwise by the provided angle in degrees
  turnRight(amountDegrees) {
    this.bearing += amountDegrees;
  }

  // turnLeft
  // rotates the turtle's bearing counter-clockwise by the provided angle in degrees
  turnLeft(amountDegrees) {
    this.bearing -= amountDegrees;
  }

  // penUp
  // tells the turtle to not draw while moving
  penUp() {
    this.isPenDown = false;
  }

  // penDown
  // tells the turtle to draw a line when it moves
  penDown() {
    this.isPenDown = true;
  }

  // pushState
  // records the turtle's current state (position, bearing, + pen position)
  // so that it can be restored later with popState()
  pushState() {
    this.#stateStack.push({
      x: this.x,
      y: this.y,
      bearing: this.bearing,
      isPenDown: this.isPenDown,
    });
  }

  // popState
  // restores the turtle's state to the top recorded state on the stack (most recent)
  popState() {
    if (this.#stateStack.length === 0) {
      console.error(
        "Turtle: No states left on stack. Make sure your calls to .pushState and .popState are balanced."
      );
      return;
    }
    const state = this.#stateStack.pop();
    this.x = state.x;
    this.y = state.y;
    this.bearing = state.bearing;
    this.isPenDown = state.isPenDown;
  }

  // image
  // draws and image centered on the turtle's current location and aligned with the turtle's rotation (forward = up)
  image(i, w, h) {
    push();
    translate(this.x, this.y);
    rotate(this.bearing + PI * 0.5);
    imageMode(CENTER);
    image(i, 0, 0, w, h);
    pop();
  }
}
