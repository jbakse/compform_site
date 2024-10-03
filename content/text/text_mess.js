//created with RiTa markov

const container = document.querySelector(".comp-form-copy");

let randomSentence = false;

let textHue;

let x = 0;
let y = 0;

let randomx = [];
let randomy = [];
let randomang = [];

function setup() {
  const p5_canvas = createCanvas(windowWidth, windowHeight);
  mess(p5_canvas);
  colorMode(HSB, 100);
  angleMode(DEGREES);
  noStroke();

  //generate new sentence from the text of each paragraph
  for (const child of container.children) {
    child.addEventListener("mouseover", function () {
      randomSentence = generateSentence(child);
      textHue = random(100);
      randomx = [];
      randomy = [];
      randomang = [];
      for (let i = 0; i < randomSentence.length; i++) {
        randomx.push(random(-5, 5));
        randomy.push(random(-10, 10));
        randomang.push(random(-5, 5));
      }
    });

    child.addEventListener("click", function () {
      randomSentence = generateSentence(child);
      textHue = random(100);
      randomx = [];
      randomy = [];
      randomang = [];
      for (let i = 0; i < randomSentence.length; i++) {
        randomx.push(random(-5, 5));
        randomy.push(random(-10, 10));
        randomang.push(random(-5, 5));
      }
    });
  }
}

function draw() {
  clear();

  //maybe do a spinner with text glitching?
  x = lerp(x, mouseX, 0.1);
  y = lerp(y, mouseY, 0.1);


  //check if randomSentenceExists
  if (randomSentence && randomSentence.length > 1) {
  let xoffset = 0;
    //calculate sentenceWidth
    let sentenceWidth = 0;
    for (let i = 0; i < randomSentence.length; i++) {
      sentenceWidth += textWidth(randomSentence[i]) + 12;
    }
    sentenceWidth -= 12;

    //draw
    for (let i = 0; i < randomSentence.length; i++) {
      const word = randomSentence[i];
      let wordW = textWidth(word);
      textSize(18);


      push();
      fill(textHue, 100, 80);
      if (mouseX > width / 2) {
        translate(x + xoffset + randomx[i] - 5, y + randomy[i] - 20);
      } else {
        translate(
          x + xoffset + randomx[i] - sentenceWidth - 5,
          y + randomy[i] - 20
        );
      }
      rotate(randomang[i]);
      rect(0, 0, wordW + 10, 30);
      pop();

      push();
      fill(100);
      if (mouseX > width / 2) {
        translate(x + xoffset + randomx[i], y + randomy[i]);
      } else {
        translate(x + xoffset + randomx[i] - sentenceWidth, y + randomy[i]);
      }

      rotate(randomang[i]);
      text(word, 0, 0);
      pop();
      xoffset += wordW + 10;
    }
  }
}

function generateSentence(child) {
  const rm = new RiTa.RiMarkov(2, { temperature: 20 });
  rm.addText(child.innerText);

  const sentence = rm.generate({
    minLength: 2,
    temperature: 20,
    maxLength: 12,
    allowDuplicates: true,
  });

  return sentence.split(/\s+/g);
}
