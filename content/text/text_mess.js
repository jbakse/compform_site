//created with RiTa markov

const container = document.querySelector(".comp-form-copy");

let randomSentence = false;

let textHue;

let x = 0;
let y = 0;

function setup() {
  const p5_canvas = createCanvas(windowWidth, windowHeight);
  mess(p5_canvas);
  colorMode(HSB, 1000);

  //generate new sentence from the text of each paragraph
  for (const child of container.children) {
    child.addEventListener("mouseover", function () {
      randomSentence = generateSentence(child);
      textHue = random(1000);
    });

    child.addEventListener("click", function () {
      randomSentence = generateSentence(child);
      textHue = random(1000);
    });
  }
}

function draw() {
  //maybe do a spinner with text glitching?
  x = lerp(x, mouseX, 0.1);
  y = lerp(y, mouseY, 0.1);

  //check if randomSentenceExists
  if (randomSentence) {
    //draw
    clear();
    textSize(18);
    stroke(textHue, 1000, 1000);
    // let sWidth = textWidth(randomSentence);
    // rect(mouseX - 10, mouseY - 22, sWidth + 20, 30);
    text(randomSentence, x, y);
  }
}

function generateSentence(child) {
  const rm = new RiTa.RiMarkov(2, { temperature: 20 });
  rm.addText(child.innerText);

  return rm.generate({
    minLength: 3,
    temperature: 20,
    maxLength: 15,
    allowDuplicates: true,
  });
}
