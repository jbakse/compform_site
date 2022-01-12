---
title: Hello, p5!
layout: compform_chapter.pug

image: /p5/images/og_image.png
hero_title: Hello, p5!
description: Many of the examples on this site use p5.js, a Javascript creative coding library.
software: p5.js + github
---

<script src="https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js"></script>
<script src="/mess.js"></script>
<script src="./flakes_mess.js"></script>

## Processing and p5.js

This book explores a wide range of media and provides examples in a variety of languages and libraries. The most commonly used library is [p5.js](https://p5js.org/), a very popular Javascript creative coding library. The p5.js is a javascript version of the [Processing](<(https://processing.org/)>) creative coding language and library.

Both Processing and p5.js were created to support students learning computer programming within a creative art and design context. Because p5.js has a contained scope and a strong community, it is a great library for teaching, learning, sketching, and experimenting.

A full introduction to p5.js is outside of the scope of this book, but this chapter aims to point you in the right direction.

### Processing

[Processing](https://processing.org/) is a programming language created for visual artists learning to make creative coding projects. It was released in 2001 by MIT Media Lab alumni and creative coders [Casey Reas](http://reas.com/) and [Benjamin Fry](http://benfry.com/). The project is now also led by [Daniel Shiffman](http://shiffman.net/), who has published a number of popular books and video tutorials on creating art with Processing.

Processing combines a simple programming environment, a programming language built on top of Java, and a drawing library to create an low friction entry point for creative computing. In addition to the basic but powerful [drawing API](https://processing.org/reference/), and has libraries for other common applications like sound and networking.

### p5.js

The p5.js library was created by artist [Lauren McCarthy](http://lauren-mccarthy.com/) to brings the Processing API and spirit to Javascript and the web. Programming with p5.js is very similar to working in Processing, with the benefit that p5.js sketches work in any modern browser.

<!-- ## Gallery -->

Here are a few examples to give you an idea of what kinds of things people make with p5.js

{% slides %}
{% include slides.yaml %}
{% endslides %} |

## A p5.js Example Sketch

Want to try p5.js RIGHT NOW? The example below draws a very simple house. You can try changing or adding to the house by editing the code below. You'll need to hit cmd/ctrl-s to update the code after you make changes.

{% js-lab "sketches/house.js" %}

## Learning Processing and p5.js

Processing and p5.js are both widely popular open-source projects with large, active communities. They are also both well documented. You can start with either language, you don't need to know Processing to learn p5.js. These resources are a good place to start.

<div class="link-box">

[**Processing**Library Website](https://processing.org/) Processing Homepage, API reference, and tutorials.

[**p5.js**Library Website](https://p5js.org/) pt.js Homepage, API reference, and tutorials.

[**The Coding Train**Video Tutorials](http://shiffman.net/videos/) Dan Shiffman has a wealth of video tutorials for p5.js and creative code.

[**JS Drawing & Animation**Khan Academy Course](https://www.khanacademy.org/computing/computer-programming/programming) Complete, free course on drawing with code using p5.js.

</div>

## Sketching Locally

You can try out p5.js in the editor above, but to start making your own sketches you'll want a better setup. The most common way to work with p5.js is to use a local editor and browser. You will probably need a local web server too, because Chrome won't let your code do certain things unless it comes from a server.

### Recommended Tools

#### Code Editor

To edit your sketches, you'll need a code editor. I use [VS Code](https://code.visualstudio.com/) with the following extensions.

| Package     | Purpose                                                                                                                          |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Live Server | The Live Server extension makes it very simple to properly serve you sketches to your browser                                    |
| Prettier    | Prettier is a code formatter. It makes sure that your spaces and indents are consistent, improving the readability of your code. |
| ESLint      | ESLint will audit your code to find potential problems.                                                                          |

#### Web Browser

To view your sketches, you'll load them in a web browser. I tend to use [Google Chrome](https://www.google.com/chrome/browser/desktop/) because I like its developer tools. In Chrome, be sure to open the Javascript console with `command-option-j`. If you have problems in your code, chrome will report errors in the console.

### Creating a p5.js Project

To create a p5.js Project from scratch you need to do a few things.

1. Install a text editor and browser.
2. Download the p5.js library.
3. Create an `.html` file that includes the p5.js library.
4. Write a sketch in Javascript. The script will be included either in `<script>` tags with your `.html` file or in a seperate `.js` file.
5. Load the `.html` file in a browser to see it run.

This process is detailed in the [p5.js Get Started guide](https://p5js.org/get-started/).

### Tips

1. Always Read your Error Messages

   Once you are up and running be sure to open the Javascript console to see error messages and debugging information. In Chrome you can open the console with the `View » Developer » JavaScript Console` menu or by pressing `command-option-j`. When something goes wrong with your code, Chrome tries to help by providing error messages in the console. Sometimes these messages are not very clear, but they are always more helpful than nothing.

   Keep the console open all of the time.

2. Run a Local Server

   If you are working with a source code editor like VS Code, you are going to need a local server or your web browser will complain about security issues. The Live Server extension for VS Code makes this super simple.

3. Use Live Reload

   It is important to break down your problem into small steps and try them out one by one. It is a good idea to reload your sketch after each small change, so you will be reloading very often. Manual reloading requires saving, switching to the browser, and reloading. Live Server provides live reloading by default. It will tell the browser to reload every time you save. This keeps you in your editor and speeds up your workflow.

4. Use a Code Formatter

   When your code is well formatted it is easier to read and it is easier to spot mistakes. A code formatter will keep your code consistently formated completely automatically, giving you this benefit without any extra effort.

<!--
### The Comp Form p5.js Template Project


## Getting Started Sketching in p5

For the first few weeks, we'll be using p5 for our sketches. Rather than create a separate project repo for each sketch, keep your sketches organized in one repo. I've created a template project for your sketches.

We'll run through these steps to get up and running with the template together in class.

- Starting a New Project
  - Create a Github Account / Log Into Github
  - Create a Repo on Github
  - Clone the Repo to Your Computer, With Github for Mac
  - Add/Modify A `README.md` File
  - Commit the Files
  - Push Your Commits
  - Check `github.com` to confirm your `README.md` synced.


- Use the Class p5 Sketches Template
  - Download —**Don't Fork**— the Template
  - Add the Files to Your Project
  - Verify the Starter Sketches Work
  - Commit and Push

- Duplicate a template sketch

- Start Sketching!




### Some Basic Examples

[[ 2 or 3 very basic examples that show the drawing api, maybe one of them is a little more complicated, procedrual coolness ]]

[[ challenges? ]]



## What Git and Github Are

- [Github Desktop for Mac](https://desktop.github.com/)

[Git](http://git-scm.com/) is a version control system. As you work on a project it will grow and change. Git keeps track of the changes you make to the files in your project, keeping a valuable history. With version control, you can review changes to a file over time and you can revert a single file or entire project to an earlier version if (when) something goes wrong. Git also provides powerful tools for sharing your work with others and merging the work of teammates.

[Github](http://www.github.com) is a service that hosts software projects that use Git. Github builds on Git, adding features for collaborative coding such as bug tracking and code reviews. Github hosts a huge array of open-source and private projects and libraries.

Normally, you use the Git software through its command line interface. If you are not comfortable using the command line, you won't be comfortable using Git in this way. [Github Desktop](https://desktop.github.com/) is a simple graphical user interface for Git, with added integration with Github. Github desktop isn't as powerful as the command line interface, but it can cover the basic workflows we'll use in class.


### Getting Started with Git and Github
[[ just a little info?]]
 -->

<!-- <style>
td:first-child { width : 25% }
</style> -->

<!--
<div class="link-box">


[Casey Reas](http://reas.com/)

[Benjamin Fry](http://benfry.com/)

[Daniel Shiffman](http://shiffman.net/)

</div> -->
