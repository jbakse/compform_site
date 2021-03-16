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

# Markdown-it

## linkify: true
Auto convert links like: http://google.com

## quotes: "“”‘’"

Automatically add "smart quotes."


## typographer: true,
(c) (tm) (r) +-  (p) ... ????? -- ---

## inline html

<div class="callout">

### Callout

You can wrap markdown in a `<div></div>`. Include a blank line at the top and bottom to enable markdown processing.

</div>

## markdown-it-anchor
`markdown-it-anchor` automatically adds id's to headers. The h1 above ("Markdown-it Plugins") will have `id="markdown-it-plugins"`

## markdown-it-classy

This paragraph has the blue class.{blue}

<style>
.blue { color: blue }
</style>

## markdown-it-deflist

Term 1
: Definition One

Term 2
: Definition Two

# Content Classes

## Callout
This is a callout.{callout}


# Images
`.jpg`, `.png`, and `.svg` files are copied over
![Make Things that Make Things](./figures/make_things.png)

# Slides

{% slides asdf %}
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

Might be nice to make a shortcode for this.{callout}

## JSLab

## JSShow



# Includes
You can include Markdown files from Markdown files. Markdown files that start with `_` won't be processed as top level pages.

You can use relative paths for include files and included files can include files.

{% include ./_include_me.md %}
