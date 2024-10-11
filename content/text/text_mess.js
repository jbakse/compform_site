/**
 * Displays a Markov chain generated sentence in the margin of the page.
 *
 * written by Ana Konzen
 * edited by Justin Bakse
 *
 * @requires RiTa.js - https://unpkg.com/rita
 */

/* exported setup draw*/
/* global mess RiTa*/

const contentContainer = document.querySelector(".comp-form-copy");

let lerpedMouseY = 0;
let textHue;
let wordsData = [];

function setup() {
  const p5_canvas = createCanvas(windowWidth, windowHeight);
  mess(p5_canvas);

  textSize(18);
  colorMode(HSB, 100);
  angleMode(DEGREES);
  noStroke();

  // Update markov sentence effect on hover and click
  for (const child of contentContainer.children) {
    child.addEventListener("mouseover", updateSentence);
    child.addEventListener("click", updateSentence);
  }
}

function updateSentence() {
  const text = [
    this.previousElementSibling?.innerText,
    this.innerText,
    this.nextElementSibling?.innerText,
  ].join(" ");

  textHue = random(100);

  const words = generateSentenceWords(text);

  wordsData = words.map((word) => ({
    word: word,
    jitterX: random(-5, 5),
    jitterY: random(-5, 5),
    jitterA: random(-5, 5),
  }));
}

function generateSentenceWords(text = "") {
  const rm = new RiTa.RiMarkov(2, { temperature: 5, disableInputChecks: true });
  rm.addText(text);

  const sentence = rm.generate({
    minLength: 2,
    temperature: 5,
    maxLength: 15,
    allowDuplicates: true,
  });

  return sentence.split(/\s+/g);
}

function draw() {
  lerpedMouseY = lerp(lerpedMouseY, mouseY, 0.1);
  clear();
  if (wordsData.length < 1) return;

  /// settings
  const lineHeight = 40;
  const wordSpacing = 17;
  const innerMargin = 20;
  const outerMargin = 30;

  const contentWidth = contentContainer.querySelector("p").clientWidth;
  const columnWidth = (windowWidth - contentWidth) / 2 - innerMargin;

  /// calculate linebreaks
  // linebreaks is array of indexes of words before linebreaks occur
  const linebreaks = [];
  let currentWidth = 0;
  for (let i = 0; i < wordsData.length; i++) {
    currentWidth += textWidth(wordsData[i].word) + wordSpacing;
    if (currentWidth > columnWidth - outerMargin) {
      linebreaks.push(i);
      currentWidth = textWidth(wordsData[i].word) + wordSpacing;
    }
  }

  /// determine sentence position
  const sentenceY = lerpedMouseY;

  if (mouseX > width / 2) {
    /// left side, left justified
    const sentenceX = windowWidth - columnWidth + innerMargin;
    let currentLine = 0;
    let currentX = 0;
    let currentY = 0;
    for (let i = 0; i < wordsData.length; i++) {
      // draw the word
      const word = wordsData[i].word;
      const wordX = sentenceX + currentX + wordsData[i].jitterX;
      const wordY = sentenceY + currentY + wordsData[i].jitterY;
      const wordAngle = wordsData[i].jitterA;
      drawWord(textHue, word, wordX, wordY, wordAngle);

      // update carriage position
      currentX += textWidth(wordsData[i].word) + wordSpacing;

      // wrap if break
      if (i + 1 === linebreaks[currentLine]) {
        currentLine++;
        currentX = 0;
        currentY += lineHeight;
      }
    }
  } else {
    /// right side, right justified
    // render backwards, bottom to top, right to left
    const sentenceX = 0 + columnWidth - innerMargin;
    let currentLine = linebreaks.length - 1;
    let currentX = 0;
    let currentY = linebreaks.length * lineHeight;
    for (let i = wordsData.length - 1; i >= 0; i--) {
      // draw the word
      const word = wordsData[i].word;
      const wordX = sentenceX + currentX + wordsData[i].jitterX;
      const wordY = sentenceY + currentY + wordsData[i].jitterY;
      const wordAngle = wordsData[i].jitterA;
      drawWord(
        textHue,
        word,
        wordX - textWidth(wordsData[i].word),
        wordY,
        wordAngle
      );

      // update carriage position
      currentX -= textWidth(wordsData[i].word) + wordSpacing;

      // wrap if break
      if (i === linebreaks[currentLine]) {
        currentLine--;
        currentX = 0;
        currentY -= lineHeight;
      }
    }
  }
}

function drawWord(textHue, word, wordX, wordY, wordAngle) {
  push();
  // Position the word
  translate(wordX, wordY);
  rotate(wordAngle);

  // Draw backing rectangle
  fill(textHue, 100, 80);
  rect(-5, -5, textWidth(word) + 10, 30);

  // Draw the word text
  fill(100);
  textAlign(LEFT, TOP);
  text(word, 0, 0);
  pop();
}
