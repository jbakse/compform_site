// require https://cdn.jsdelivr.net/npm/p5@latest/lib/p5.min.js

const nodes = [];

function setup() {
  createCanvas(720, 480);

  const nodeCount = 40;

  for (let i = 0; i < nodeCount; i++) {
    const newNode = {
      x: width * 0.33,
      y: map(i, 0, nodeCount, 40, 440),
      dX: 0,
      dY: 0,
      parent: i === 0 ? null : nodes.at(-1),
    };
    nodes.push(newNode);
  }

  for (const node of nodes) {
    if (node.parent) {
      node.length = dist(node.x, node.y, node.parent.x, node.parent.y);
    }
  }
}

function draw() {
  for (let i = 0; i < 100; i++) {
    step();
  }

  background("black");

  // Draw the mosue
  fill("white");
  noStroke();
  ellipse(mouseX, mouseY, 80, 80);

  // Draw the chain
  for (const node of nodes) {
    ellipse(node.x, node.y, 10, 10);
  }
  //   noFill();
  //   stroke("white");
  //   strokeWeight(10);
  //   beginShape();
  //   for (const node of nodes) {
  //     vertex(node.x, node.y);
  //   }
  //   endShape();
}

function step() {
  // / mouse force
  for (const node of nodes) {
    if (!node.parent) continue;
    const currentDistance = dist(node.x, node.y, mouseX, mouseY);
    const minDistance = 50;
    if (currentDistance < minDistance) {
      const angle = atan2(node.y - mouseY, node.x - mouseX);
      const dx = cos(angle) * (minDistance - currentDistance);
      const dy = sin(angle) * (minDistance - currentDistance);
      node.dX += dx * 0.1;
      node.dY += dy * 0.1;
    }
  }

  // / spring force
  for (const node of nodes) {
    if (!node.parent) continue;
    const currentLength = dist(node.x, node.y, node.parent.x, node.parent.y);
    const stretch = currentLength - node.length;
    const angle = atan2(node.y - node.parent.y, node.x - node.parent.x);
    const dx = cos(angle) * stretch * 0.5;
    const dy = sin(angle) * stretch * 0.5;
    node.dX -= dx * 0.1;
    node.dY -= dy * 0.1;
    if (!node.parent.parent) continue;
    node.parent.dX += dx * 0.1;
    node.parent.dY += dy * 0.1;
  }

  // / gravity
  for (const node of nodes) {
    if (!node.parent) continue;
    node.dY += 0.005;
  }

  // / dampen
  for (const node of nodes) {
    if (!node.parent) continue;
    node.dX *= 0.95;
    node.dY *= 0.95;
  }

  // / momentum
  for (const node of nodes) {
    if (!node.parent) continue;
    node.x += node.dX;
    node.y += node.dY;
  }
}
