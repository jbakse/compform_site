/**
 * Displays a Markov chain generated sentence in the margin of the page.
 *
 * written by Ana Konzen
 * edited by Justin Bakse
 *
 * @requires RiTa.js - https://unpkg.com/rita
 */

/// configure compform editor
// require https://cdn.jsdelivr.net/npm/p5@1.11.0/lib/p5.min.js
// require https://unpkg.com/rita
// require /mess.js

/// configure eslint
/* exported preload, setup, draw, mousePressed */
/* globals mess RiTa*/

//insert content container in body if it doesn't exist
const contentContainer =
  document.querySelector(".comp-form-copy") || createContentContainer();

let lerpedMouseY = 0;
let textHue;
let wordsData = [];

function setup() {
  /// set up canvas
  const p5_canvas = createCanvas(windowWidth, windowHeight);

  /// register this sketch as a Comp Form background "mess"
  mess(p5_canvas, 2000, {
    messName: "markov",
    messLink: "/js_lab/js_lab.html?/text/text_mess.js",
    authorName: "ana konzen",
    authorLink: "https://anakonzen.com",
  });

  /// configure p5
  textSize(18);
  colorMode(HSB, 100);
  angleMode(DEGREES);
  noStroke();

  /// add listeners to update markov sentence effect on hover and click
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

function createContentContainer() {
  //should I style this more?
  const contentContainerHTML = `
  <style type="text/css">
		@import url('https://fonts.googleapis.com/css?family=Roboto:300,700');
		.comp-form-copy {
    	font-family: 'Roboto', sans-serif;
      overflow: auto;
			font-size: 1em;
      line-height: 1.5em;
      width: 25%;
      position: fixed;
      top: 0;
      left: 37.5%;
      height: 100vh;
		}
	</style>
  <div class="comp-form-copy">
    <p>
     Creativity can be expressed in many mediums, but—perhaps as a consequence of the Turing Test using verbal communication—artificial creativity is often explored in the context of natural-language text generation. This chapter introduces three common and accessible text generation tactics: string templating, Markov chains, and context-free grammars.
    </p>
    <p>
      These techniques focus on syntax—the patterns and structure of language—without much concern for semantics—the underlying meaning expressed. They tend to result in text that is somewhat grammatical but mostly nonsensical. Natural-language processing and natural-language generation are areas of active research with numerous sub-fields including automatic summarization, translation, question answering, and sentiment analysis. Much of this research is focused on semantics, knowledge, and understanding and often approaches these problems with machine learning.
      </p>
    <p>
    Generating text can be a step in the process for generating form in other media. The structure of a webpage is defined in HTML. The layout and style is defined in CSS. SVG is a popular format for defining vector images. The ABC and JAM formats represent music. Three-dimensional objects can be represented in OBJ files. All of these formats are plain text files.
    </p>
    </div>`;
  document.body.insertAdjacentHTML("beforeend", contentContainerHTML);
  return document.querySelector(".comp-form-copy");
}
