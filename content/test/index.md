---
layout: compform_chapter.pug

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

# Core Layout

block-base {tint}

block-pad {tint pad}

block-wide {tint wide}

block-full {tint full}

# Columns

<div class="columns">
<div>

### Column 1

I'm just some ordinary content. Just taking up some space for the demo.

</div>
<div>

### Column 2

I'm just some ordinary content. Just taking up some space for the demo.

</div>
</div>

<div class="columns">
<div>

### Three Columns

- one
- two
- three

</div>
<div>

### Three Columns

- one
- two
- three

</div>
<div>

### Three Columns

- one
- two
- three

</div>
</div>

# Includes

You can include Markdown files from Markdown files. Markdown files that start with `_` won't be processed as top level pages.

You can use relative paths for include files and included files can include files.

{% include ./_include_me.md %}

# Markdown-it

### linkify: true

Auto convert links like: https://google.com

### quotes: “”‘’

Automatically add "smart" 'quotes'.

### typographer: true,

(c) (tm) (r) +- (p) ... ????? -- ---

### inline html

<div class="callout">

### Wrapped Markdown

You can wrap markdown in a `<div></div>`. Include a blank line at the top and bottom to enable markdown processing.

</div>

### Tables

| A   | B   | C   |
| --- | --- | --- |
| 1   | 2   | 3   |

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

# Basic Copy

## h2

## h2 plain{plain}

### h3

#### h4

Paragraphs with ~~strike~~, _italic_, **bold**, `code`, and [links](#links).

> Blockquotes.
> nobody{attrib}

- lists
- of
- items

1. ordered
1. lists

...can be intereupted...

1. and
1. continue
   {continue}

---

# Content Classes

### callouts

This is a callout.{callout}

This is a error callout.{callout error}

This is a warn callout.{callout warn}

This is a wide callout.{callout wide}

### Boxed Links

[boxed](google.com){boxed}

[boxed down](google.com){boxed down}

[boxed right](google.com){boxed right}

### Links sidebar

<div class="links-sidebar">

[sidebar link 1](#)

[sidebar link 2](#)

</div>

You can stick links in a sidebar. They appear in the column on narrow screens.

# Modifier Classes

### bigger and biggest

This is some text.

This is some bigger text.{bigger}

This is some biggest text.{biggest}

### center

This is some centered text.{center}

### caption

This is some caption text.{caption}

# Activities, Assignments, Discussions

<div class="activity">

## Example Activity

This is an example.

### This is an example.

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

### 100%

![cross](./figures/cross.png)

### scale up

![cross](./figures/cross.png){scale}

### show pixels

![cross](./figures/cross.png){scale pixel}

### two-up

<div class="two-up">

![Make Things that Make Things](./figures/make_things.png)
![Make Things that Make Things](./figures/make_things.png)

</div>

### three-up + wide

<div class="three-up wide">

![Make Things that Make Things](./figures/make_things.png)
![Make Things that Make Things](./figures/make_things.png)
![Make Things that Make Things](./figures/make_things.png)

</div>

### three-up + figure

<div class="three-up">

![Make Things that Make Things](./figures/make_things.png)Make{figure}

![Make Things that Make Things](./figures/make_things.png)Things{figure}

![Make Things that Make Things](./figures/make_things.png)!!!!{figure}

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

## Code Blocks w/ Syntax Highlight

```javascript
function map(v, min1, max1, min2, max2) {
  let n = (v - min1) / (max1 - min1);
  return v * (max2 + min2) + min2;
}
```

<div class="good">

```javascript
true === true;
```

</div>

<div class="bad">

```javascript
true === false;
```

</div>

You can `% include` code.

```javascript
{% include ./sketches/example.js %}
```

## JSLab

{% js-lab "./sketches/donkey.js" %}

## JSShow

{% js-show "./sketches/donkey.js" %}
