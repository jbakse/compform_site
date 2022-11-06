// require /text/tracery.min.js

const storyGrammar = {
  story: ["First, #phrase#. Then, #phrase#. Finally, #phrase#, and #phrase#."],
  phrase: ["#subject.a# #verb# #object.a#"],
  subject: ["#noun#", "#adjective# #noun#"],
  object: [
    "#noun#",
    "#adjective# #noun#",
    "#adjective# #noun# and #adverb.a# #adjective# #noun#",
  ],
  adverb: ["exceptionally", "somewhat"],
  adjective: ["proud", "small", "forgetful", "handsome", "comical", "wild"],
  noun: ["bear", "cat", "dog", "frog", "goose", "lamb", "rabbit"],
  verb: ["becomes friends with", "finds", "chases", "plots with"],
};

function main() {
  const grammar = tracery.createGrammar(storyGrammar);
  const story = grammar.flatten("#story#");
  display(story);
}

function display(...strings) {
  const div = document.createElement("div");
  div.style = "font-size: 30px; margin: 10%; line-height: 1.5;";
  div.innerText = strings.join("\n");
  document.body.append(div);
}

// tracery doesn't load immediately, not sure why, so kludge it
setTimeout(main, 10);
