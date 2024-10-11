//created with RiTa markov

const container = document.querySelector(".comp-form-copy");

let randomSentence = false;

let textHue;

let x = 0;
let y = 0;

let randomx = [];
let randomy = [];
let randomang = [];

let currentChild;

function setup() {
  const p5_canvas = createCanvas(windowWidth, windowHeight);
  mess(p5_canvas);
  colorMode(HSB, 100);
  angleMode(DEGREES);
  noStroke();

  const children = container.children;

  //generate new sentence from the text of each paragraph
  for (let i = 0; i < children.length; i++) {
    currentChild = children[i];
    let prevText = false;
    let nextText = false;
    if (i > 0) prevText = children[i - 1].innerText;

    let currentText = currentChild.innerText;

    if (i < children.length - 1) nextText = children[i + 1].innerText;


    currentChild.addEventListener("mouseover", function () {
      randomSentence = generateSentence(prevText, currentText, nextText);
      textHue = random(100);
      randomx = [];
      randomy = [];
      randomang = [];
      for (let i = 0; i < randomSentence.length; i++) {
        randomx.push(random(-5, 5));
        randomy.push(random(-5, 5));
        randomang.push(random(-5, 5));
      }
    });

    currentChild.addEventListener("click", function () {
      randomSentence = generateSentence(prevText, currentText, nextText);
      textHue = random(100);
      randomx = [];
      randomy = [];
      randomang = [];
      for (let i = 0; i < randomSentence.length; i++) {
        randomx.push(random(-5, 5));
        randomy.push(random(-5, 5));
        randomang.push(random(-5, 5));
      }
    });
  }
}

function draw() {
  clear();

  textSize(18);

  //check if randomSentence exists and is long enough
  y = lerp(y, mouseY, 0.1);

  if (randomSentence && randomSentence.length > 1) {
    let wordSpacing = 17;
    let columnWidth = (windowWidth - currentChild.clientWidth - 20) / 2;
    let maxWidth = columnWidth - 30;

    // calculate the total width of the line and add breakpoints
    let breakpoints = [];
    let lineWidth = 0;
    for (let i = 0; i < randomSentence.length; i++) {
      lineWidth += textWidth(randomSentence[i]) + wordSpacing + randomx[i];
      if (lineWidth > maxWidth) {
        breakpoints.push(i);
        lineWidth = textWidth(randomSentence[i]) + wordSpacing + randomx[i];
      }
    }


    if (mouseX > width / 2) x = windowWidth - columnWidth + 10;
    else x = columnWidth - 10;

    let xOffset = 0;
    let lineCount = 0;
    let lineHeight = 40;

    if (mouseX > width / 2) {
      for (let i = 0; i < randomSentence.length; i++) {

        const word = randomSentence[i];

        if (i === breakpoints[lineCount]) {
          xOffset = 0;
          lineCount++;
        }

        let wordX = x + xOffset + randomx[i];
        let wordY = y + randomy[i] + lineCount * lineHeight;
        let wordAngle = randomang[i];

        drawSentence(textHue, word, wordX, wordY, wordAngle);

        xOffset += textWidth(word) + wordSpacing + randomx[i];
      }
    } else {
      lineCount = breakpoints.length;
      for (let i = randomSentence.length - 1; i >= 0; i--) {

        const word = randomSentence[i];

        if (i + 1 === breakpoints[lineCount - 1]) {
          xOffset = 0;
          lineCount--;
        }

        let wordX = x - textWidth(word) - xOffset - randomx[i];
        let wordY = y + randomy[i] + lineCount * lineHeight;
        let wordAngle = randomang[i];

        drawSentence(textHue, word, wordX, wordY, wordAngle);

        xOffset += textWidth(word) + wordSpacing + randomx[i];

      }
    }
  }
}

function generateSentence(prevText, currentText, nextText) {

  const rm = new RiTa.RiMarkov(2, { temperature: 5 });
  if (prevText) rm.addText(prevText);
  rm.addText(currentText);
  if (nextText) rm.addText(nextText);

  const sentence = rm.generate({
    minLength: 2,
    temperature: 5,
    maxLength: 15,
    allowDuplicates: true,
  });

  return sentence.split(/\s+/g);
}

function drawSentence(textHue, word, wordX, wordY, wordAngle) {

  //draw rectangle
  push();
  fill(textHue, 100, 80);
  translate(wordX - 5, wordY - 20);
  rotate(wordAngle);
  rect(0, 0, textWidth(word) + 10, 30);
  pop();

  // draw text
  push();
  fill(100);
  translate(wordX, wordY);
  rotate(wordAngle);
  text(word, 0, 0);
  pop();
}
