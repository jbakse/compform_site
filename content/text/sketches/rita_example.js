// require https://unpkg.com/rita

/* globals RiTa */

const storyGrammar = {
  start: "First, $phrase. Then, $phrase. Finally, $phrase, and $phrase.",
  phrase: "$subject.art $verb $object.art",
  subject: "$noun | $adjective $noun",
  object:
    "$noun | $adjective $noun | $adjective $noun and $adverb.art $adjective $noun",
  adverb: "exceptionally | somewhat",
  adjective: "proud | small | forgetful | handsome | comical | wild",
  noun: "bear | cat | dog | frog | goose | lamb | rabbit",
  verb: "becomes friends with | finds | chases | plots with",
};

const context = {};

const g = RiTa.grammar(storyGrammar, context);

display(g.expand());

function display(...strings) {
  const div = document.createElement("div");
  div.style = "font-size: 30px; margin: 10%; line-height: 1.5;";
  div.innerText = strings.join("\n");
  document.body.append(div);
}
