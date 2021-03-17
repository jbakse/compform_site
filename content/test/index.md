---
layout: compform_chapter.pug
debug: false

title: Test
header_title: Test
hero_title: Test
description: This is only a test
software: markdown

previous: false
previous_url: false
next: false
next_url: false
---

# Includes

You can include Markdown files from Markdown files. Markdown files that start with `_` won't be processed as top level pages.

You can use relative paths for include files and included files can include files.

{% include ./_include_me.md %}

# Markdown-it

### linkify: true

Auto convert links like: https://google.com

### quotes: "“”‘’"

Automatically add "smart quotes."

### typographer: true,

(c) (tm) (r) +- (p) ... ????? -- ---

### inline html

<div class="callout">

### Callout

You can wrap markdown in a `<div></div>`. Include a blank line at the top and bottom to enable markdown processing.

</div>

# Markdown-it Plugins

### markdown-it-anchor

`markdown-it-anchor` automatically adds id's to headers. The h1 above ("Markdown-it Plugins") will have `id="markdown-it-plugins"`

### markdown-it-classy

This paragraph has the blue class.{blue}

<style>
.blue { color: blue }
</style>

### markdown-it-deflist

Term 1
: Definition One

Term 2
: Definition Two

# Content Classes

## callout

This is a callout.{callout}

This is a error callout.{callout error}

This is a warn callout.{callout warn}

## full-width

This is a full width callout.{callout full-width}

## bigger and biggest

This is some bigger text.{bigger}

This is some biggest text.{biggest}

## center

center{center}

## caption

This is some caption text.{caption}

# Boxed Links

[boxed](google.com){boxed}

[boxed down](google.com){boxed down}

[boxed right](google.com){boxed right}

# Links sidebar

<div class="links-sidebar">

[google](google.com)

</div>

You can stick links in a sidebar.

# Columns

<div class="columns">
<div class="half">

- one
- two
- three

</div>
<div class="half">

- one
- two
- three

</div>
</div>

# Activities, Assignments, Discussions

<div class="activity">

## Example Activity

This is an example.

This is an example.

</div>

<div class="assignment">

## Example Assignment

This is an example.

This is an example.

</div>

<div class="discussion">

## Example Discussion

This is an example.

This is an example.

</div>

# Images

`.jpg`, `.png`, and `.svg` files are copied over
![Make Things that Make Things](./figures/make_things.png)

### two-up

<div class="two-up">

![Make Things that Make Things](./figures/make_things.png)
![Make Things that Make Things](./figures/make_things.png)

</div>

### three-up + full-width

<div class="three-up full-width">

![Make Things that Make Things](./figures/make_things.png)
![Make Things that Make Things](./figures/make_things.png)
![Make Things that Make Things](./figures/make_things.png)

</div>

# Slides

{% slides %}
{% include ./test_slides.yaml %}
{% endslides %}

# Spoilers

<div class="spoiler" >

### Spoiler

This is a spoiler.

This is a spoiler.

</div>

# Javascript

## Syntax Highlighting

```javascript
function map(v, min1, max1, min2, max2) {
  let n = (v - min1) / (max1 - min1);
  return v * (max2 + min2) + min2;
}
```

Code can be included. `.js` files are copied over

```javascript
{% include ./sketches/example.js %}
```

## JSLab

{% js-lab "./sketches/donkey.js" %}

## JSShow
