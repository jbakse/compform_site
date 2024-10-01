---
title: Text
layout: compform_chapter.pug

image: /text/images/og_image.png
hero_title: Text
description: Explore generating strings with templates, Markov chains, and context-free grammars.
software: javascript + html
---

<!-- [[ leah, want to take a crack at the hero desc? again? ]] -->

<script src="https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js"></script>
<script src="https://unpkg.com/rita"></script>
<script src="../mess.js"></script>
<script src="./text_mess.js"></script>

## Computational Text

Procedural generation can be used to create form in almost any media: image, video, animation, sound, sculpture. This chapter introduces some tactics for procedurally generating text, which may be the media most often computationally generated. Web pages are built out of text, and most of the time this text is computationally generated at least to some degree.

<div class="sidebar link-box">

[**How Search Works** Google](https://www.google.com/search/howsearchworks/)

</div>

<!-- <img src="./images/google.png" style = "border: 1px solid #AAA; width: 320px; position: absolute; left: -340px;" /> -->

Consider how a Google [search result](https://www.google.com/search?q=comp%20form) page is built.
Google uses programs to crawl the web, collecting a database of information about every page. When you perform a search, another program searches this database for relevant information. This information is then carefully excerpted, summarized, formatted, and collated. The resulting web page of results is built on the fly and sent to your browser for you to read.

Social media sites like Facebook and Twitter are software systems for collecting and sharing user-created content, largely text. Even websites primarily concerned with other media, like YouTube and Instagram, must generate HTML text to showcase their videos and images.

<div class="callout">

**The Imitation Game**

Search engines and social media sites are certainly procedurally generating text, but for the most part they are not generating _content_. Few would argue that these sites are being truly _creative_. In fact, many have argued that computers are not capable of true creativity at all.

> Not until a machine can write a sonnet or compose a concerto because of thoughts and emotions felt, and not by the chance fall of symbols, could we agree that machine equals brain—that is, not only write it but know that it had written it. No mechanism could feel (and not merely artificially signal, an easy contrivance) pleasure at its successes, grief when its valves fuse, be warmed by flattery, be made miserable by its mistakes, be charmed by sex, be angry or depressed when it cannot get what it wants.
>
> Geoffrey Jefferson{attrib}

In 1950, [Alan Turing](https://en.wikipedia.org/wiki/Alan_Turing) directly addressed this argument and several others in [Computing Machinery and Intelligence](https://www.csee.umbc.edu/courses/471/papers/turing.pdf), in which he considered the question "Can machines think?" Rather than answering the question directly, Turing proposes an _imitation game_, often referred to as the Turing Test, which challenges a machine to imitate a human over "a teleprinter communicating between two rooms". Turing asks whether a machine could do well enough that a human interrogator would be unable to tell such a machine from an actual human. He argues that such a test would actually be **harder** than needed to prove the machine was thinking—after all, a human can certainly think, but could not convincingly imitate a computer.

</div>

### Generating Language

Creativity can be expressed in many mediums, but—perhaps as a consequence of the Turing Test using verbal communication—artificial creativity is often explored in the context of natural-language text generation. This chapter introduces three common and accessible text generation tactics: string templating, Markov chains, and context-free grammars.

These techniques focus on **syntax**—the patterns and structure of language—without much concern for **semantics**—the underlying meaning expressed. They tend to result in text that is somewhat grammatical but mostly nonsensical. Natural-language processing and natural-language generation are areas of active research with numerous sub-fields including automatic summarization, translation, question answering, and sentiment analysis. Much of this research is focused on semantics, knowledge, and understanding and often approaches these problems with machine learning.

### Generating other Media via Text

Generating text can be a step in the process for generating form in other media. The structure of a webpage is defined in [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML). The layout and style is defined in [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS). [SVG](https://developer.mozilla.org/en-US/docs/Web/SVG) is a popular format for defining vector images. The [ABC](https://en.wikipedia.org/wiki/ABC_notation) and [JAM](https://en.wikipedia.org/wiki/JAM_notation) formats represent music. Three-dimensional objects can be represented in [OBJ](https://en.wikipedia.org/wiki/Wavefront_.obj_file) files. **All of these formats are plain text files.**

You can think about these media in terms of the text files that represent them. This provides a fundamentally different point of view and can lead to novel approaches for generating form.

### Programs that Write Programs

Most programming languages are themselves text-based. Programs that generate programs are common and important computing tools. [Compilers](https://en.wikipedia.org/wiki/Compiler) are programs that rewrite code from one language to another. GUI coding environments like [Blocky](https://blockly-demo.appspot.com/static/demos/generator/index.html) and [MakeCode](https://makecode.com/) generate corresponding JavaScript. Interface builders like the one in Xcode generate code scaffolding which can be added to manually. Of course, programs that write programs can also have more esoteric functions. A [Quine](<https://en.wikipedia.org/wiki/Quine_(computing)>) is a program that generates a copy of itself.

## Examples of Computational Text

{% slides %}
{% include ./slides.yaml %}
{% endslides %}

### Content Generators

<div class="link-box">

[**Subreddit Simulator** Reddit](https://www.reddit.com/r/SubredditSimulator/)
The Subreddit Simulator is a subreddit populated entirely by bots using Markov Chains trained on posts made across Reddit. This [post](https://www.reddit.com/r/SubredditSimulator/comments/3g9ioz/what_is_rsubredditsimulator/) explains the sub more thoroughly.

[**NaNoGenMo 2018** Competition](https://github.com/NaNoGenMo/2018)
Annual competition to procedurally generate a 50,000 word novel.

[**Indie Game Generator** Tool](http://orteil.dashnet.org/gamegen)
An instant pitch for your next game project. Here's [another](https://applepinegames.com/tech/steam-game-generator) generator.

[**Pentametron** Twitter Bot](http://orteil.dashnet.org/gamegen)
A Twitter bot that pairs up tweets to create couplets in iambic pentameter.

</div>

### Procedural Journalism

<div class="link-box">

[**The Best and Worst Places to Grow Up** New York Times](https://www.nytimes.com/interactive/2015/05/03/upshot/the-best-and-worst-places-to-grow-up-how-your-area-compares.html)
This fantastic NYT piece looks at how where someone grows up impacts income. To make the information relatable the story adapts itself based on the location of the reader.

[**Interactive Journalism** Collection](https://github.com/wbkd/awesome-interactive-journalism)
A curated collection of "outstanding examples of visual and interactive journalism".

[**The little girl/boy who lost her/his name** New York Times](https://www.nytimes.com/2015/12/23/business/media/personalizing-books-via-robot.html?_r=0)
NYT covers a custom, made-to-order children's book.

[**Associated Press** Media Outlet](https://www.ap.org/)
The Associated Press procedurally generates [college sports coverage](https://www.ap.org/press-releases/2015/ap-ncaa-to-grow-college-sports-coverage-with-automated-game-stories) and [corporate earnings reports](https://blog.ap.org/announcements/automated-earnings-stories-multiply).

</div>

### Bots

<div class="link-box">

[**ELIZA** wikipedia.org](https://en.wikipedia.org/wiki/ELIZA)
In 1964 Joseph Weizenbaum created ELIZA, a therapist chatbot that you can still [talk to today](http://psych.fullerton.edu/mbirnbaum/psych101/Eliza.htm).

[**Tay** wikipedia.org](<https://en.wikipedia.org/wiki/Tay_(bot)>)
Tay was an AI Twitter bot created by Microsoft and launched on March 23, 2016. Less than a day later, it was shut down after posting many controversial, inflammatory, and racist tweets. Read more about it on [The Verge](http://www.theverge.com/2016/3/24/11297050/tay-microsoft-chatbot-racist).

</div>

## String Templates

String templating is a basic but powerful tool for building text procedurally. If you have ever completed a [Mad Lib](http://www.madlibs.com/) fill-in-the-blank story, you've worked with the basic idea of string templates.

<div class="activity">

## Make an Amendment!

This demo populates a template with the words you provide to generate a new constitutional amendment. <br/><br/> [view source](http://compform.net/js_lab/js_lab.html?/text/sketches/first_amendment.js)

<!-- [[issue with page resizing/cutting off beginning of lines]] -->

{% js-show "sketches/first_amendment.js" %}

</div>
<br/>

Since generating HTML strings is such a common problem in web development, there are many javascript libraries for working with string templates including [Mustache](https://mustache.github.io/), [Handlebars](http://handlebarsjs.com/), [doT](https://olado.github.io/doT/), [Underscore](http://underscorejs.org/), and [Pug/Jade](https://pugjs.org/).

Starting with ES6, JavaScript has native support for string templates via [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals). Template literals are now [widely supported](http://kangax.github.io/compat-table/es6/) in browsers without the need for a preprocessor.

A JavaScript template literal is a string enclosed in back-ticks:

```javascript
`I am a ${noun}!`;
```

The literal above has one placeholder: `${noun}`. The content of the placeholder is evaluated as a javascript expression and the result is inserted into the string.

```javascript
let day = "Monday";
console.log(`I ate ${2 * 4} apples on ${day}!`);
// I ate 8 apples on Monday!
```

### Book Title

This example generates a book title and subtitle by populating string templates with words randomly chosen from a curated list.

{% js-lab "sketches/title/title.js" %}

### Life Expectancy

This example uses string templates and data lookups to create personalized text.

{% js-lab "sketches/death/death.js" %}

## Markov Chains

[Markov chains](https://en.wikipedia.org/wiki/Markov_chain)
produce sequences by choosing each item based on the previous item and a table of weighted options. This table can be trained on examples, allowing Markov chains to mimic different text styles. Markov chains are a useful tool for procedurally generating anything that can be represented as a sequence, including text, music, or events.

<div class="activity">

## Markov Chain

Explore the Markov chain algorithm with paper and pencil using this worksheet.

### Build the Model

The right side of the worksheet lists every word that occurs in the Dr. Seuss poem. These are the "keys". Find every occurrence of each key in the poem. Write the following word in the corresponding box. Do not skip repeats.

### Generate Text

Choose a random word from the keys. Write it down. Choose a word at random from the corresponding box, and write it down. Continue this process, choosing each word based on the previous one.

<div class="link-box">

[**markov.svg**worksheet](../handouts/markov.svg)

</div>

<!-- <div class="boxed">
 .download
<a href="../handouts/markov.svg" download>markov.svg</a>
</div> -->

</div>

### Markov Text Generator

This example creates a Markov chain model based on provided text and then generates text based on that model.

{% js-lab "sketches/markov.js" %}

## Context-Free Grammars

Consider this html excerpt:

<div class="bad">

```html
<div><b>Hello, World!</div></b>
```

</div>

This isn't proper html. The `b` tag should be closed before the `div` tag.

```html
<div><b>Hello, World!</b></div>
```

HTML is text, and it can be represented by a text string. But not all text strings are valid HTML. HTML is a [formal language](https://en.wikipedia.org/wiki/Formal_language) and it has a [formal grammar](https://en.wikipedia.org/wiki/Formal_grammar), a set of rules that define which sequences of characters are valid. Only strings that meet those rules can be properly understood by code that expects HTML.

[Context-free grammars](https://en.wikipedia.org/wiki/Context-free_grammar) are a subtype of formal grammars that are useful for generating text. A context-free grammar is described as a set of replacement rules. Each rule represents a legal replacement of one symbol with zero, one, or multiple other symbols. In a context-free grammar, the rules don't consider the symbols before or after—the context around—the symbol being replaced.

### Story Teller

The following example uses a context-free grammar to generate a short story. This example uses [Tracery](https://github.com/galaxykate/tracery), created by [Kate Compton](http://www.galaxykate.com/). The [Cheap Bots, Done Quick](https://cheapbotsdonequick.com/) service lets you [make Twitterbots](http://programminghistorian.github.io/ph-submissions/lessons/intro-to-twitterbots) very quickly using Tracery. You can learn more about Tracery by watching this [talk (16:16)](https://www.gdcvault.com/play/1023377/Tech) by Kate Compton.

{% js-lab "sketches/tracery_example.js" %}

Here is the same generator, created using [RiTa](http://rednoise.org/rita/) instead of Tracery. RiTa is a javascript library for working with natural language. It includes a context-free grammar parser, a Markov chain generator, and other natural language tools.

{% js-lab "sketches/rita_example.js" %}

### Marquee Maker

HTML is text, so CFGs can generate HTML!

{% js-lab "sketches/tracery_html.js" %}

<div class="activity challenges">

## Coding Challenges

Explore this chapter's example code by completing the following challenges.{intro}

{% js-lab "sketches/challenge.js" %}

### Modify the Example Above

1. Change the value of `person` to a different name. `•`
1. Change the value of `number` to a random integer between 0 and 100. `•`
1. Add a second sentence to the template with two new placeholders. `•`
1. Add an 's' to 'computer' when `number` is not 1. `•`
1. Add this to your template: `The word "${word}" has ${letterCount} letters`. `•`
1. Create a variable for `word` and set its value to a random word from a small list. `••`
1. Create a variable for `letterCount` and set its value to the number of letters in `word`.`••`
1. Instead of using `console.log()` to show the expanded template, inject the result into the webpage.`•••`
1. Alter the program so that the dynamic parts of the template appear in bold. `•••`

</div>

<div class="assignment">

## Keep Sketching!

### Sketch

Explore generating and displaying text.

### Challenge: It Was a Dark and Stormy Night

Make a program that generates [bad](https://en.wikipedia.org/wiki/It_was_a_dark_and_stormy_night) short stories that start with "It was a dark and stormy night."

The story must:

- be bad.
- be short.
- start with "It was a dark and stormy night."
- be generated by code: consider using templates, [Tracery](https://github.com/galaxykate/tracery), Markov Chains, or anything you want.

Ideally, your story should:

- be grammatically perfect.
- make sense, with consistent characters, relationships, and actions.
- follow a dark and stormy theme.
- be of the horror or mystery genre.
- have a clear structure: beginning (exposition), middle (rising action/conflict), and end (resolution).

</div>

## Explore

<!-- Currently broken
[RiTa](https://rednoise.org/rita/index.php)
: Software toolkit for computational literature.
-->
<div class="link-box">

[**Twine** Tool](http://twinery.org/)
Open-source tool for telling interactive, nonlinear stories.

[**Context-Free Grammar** The Coding Train](https://www.youtube.com/watch?v=Rhqk9HYiB7Q)
Daniel Shiffman talks about context-free grammars, Tracery, and RiTa.

[**Context-Free Challenge** The Coding Train](https://www.youtube.com/watch?v=8Z9FRiW2Jlc)
Daniel Shiffman builds a small context-free grammar from scratch.

[**L-Systems** Wikipedia](https://en.wikipedia.org/wiki/L-system)
L-systems are a type of formal grammar often used in procedural graphics generation.

[**Insignificant Little Vermin** Game](https://egamebook.com/vermin/v/latest/)
This game, written by Filip Hracek, renders an open-world RPG game in writing.

[**donjon** Collection](https://donjon.bin.sh/)
Large collection of random text and dungeon generators for D&D and tabletop roleplaying.

</div>
