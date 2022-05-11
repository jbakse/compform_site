---
title: Conspiracy Board
layout: compform_chapter.pug

header_title: "Conspiracy Board"
next:
next_url:
previous:
previous_url:

hero_title: Conspiracy Board

description: Creating a procedurally generated pixelated collage with Javascript and p5.js
software: p5.js

image: http://compform.net/random/conspiracy_board/seed_1098_HD.png
---

## Case Study: Conspiracy Board

Conspiracy Board is a program written in about 400 lines of JavaScript using p5.js. It generates a pixelated pin-up board collaged with documents, photos, sticky notes, and strings. It randomizes many aspects of the drawing each run, but they all share a similar overall look. On the other hand, since the drawing is made from code, it is easily make changes and try different ideas.

{% js-show "./conspiracy_06_loop.js" %}

## Video Tutorial

Before you dive into reading the code, you can watch this video that walks you through the basics.

<div style="">
<iframe width="730" height="410" src="https://www.youtube.com/embed/E7BBxBkDbho" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Pixelated p5.js

The p5.js [noSmooth()](https://p5js.org/reference/#/p5/noSmooth) function doesn't actually work as documented. It does disable smoothing of images, but shapes and lines are still drawn with anti-aliasing. You can even see this in the example on the documentation page!

I don't think its possible to get non-anti-aliased shapes and lines in p5.js using the P2D render, because the underlying canvas API doesn't support it. You _can_ get non-anti-aliased shapes and lines in p5.js using the WEBGL renderer though. Set it up like this:

```javascript
function setup() {
  // use WEBGL + noSmooth() to get non antialiased shapes and lines
  pixelDensity(1);
  if (PIXELY_SHAPES) noSmooth();
  const mainCanvas = createCanvas(192, 108, WEBGL);

  // optionally scale the canvas up so we can see the pixels
  mainCanvas.elt.style =
    "width: 960px; height: 540px; image-rendering: pixelated";
}
```

## Study the Source

Here is the entire program, with ample comments.

{% js-lab "./conspiracy_06.js" %}
