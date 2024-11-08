---
title: Turtle Graphics
layout: compform_chapter.pug

image: /turtles/images/og_image.png
hero_title: Turtle Graphics
description: Introduced as a feature of Logo programming language in 1969, turtle graphics connect computer drawing to how we move our bodies through space, and encourage approaching computational form with a new mindset.
software: p5.js + custom library
---

## Logo and Turtle Graphics

The Logo computer programming language was [created in 1967](http://el.media.mit.edu/logo-foundation/what_is_logo/history.html) by Wally Feurzeig, Seymour Papert, and Cynthia Solomon to explore how programming can help children learn critical thinking and problem-solving. One of the creators of Logo, Seymour Papert, wrote the 1980 book [Mindstorms](https://www.amazon.com/Mindstorms-Children-Computers-Powerful-Ideas/dp/0465046746/ref=asap_bc?ie=UTF8) which discusses Logo and its goals:

> In many schools today, the phrase "computer-aided instruction" means making the computer teach the child. One might say _the computer is being used to program the child_. In my vision, _the child programs the computer_ and, in doing so, both acquires a sense of mastery over a piece of the most modern and powerful technology and establishes an intimate contact with some of the deepest ideas from science, from mathematics, and from the art of intellectual model building.

<div class="sidebar link-box">

[**Scratch + Turtles** MIT](https://scratch.mit.edu/projects/196503540/)

</div>

One of the key ideas introduced in Logo was [turtle graphics](https://en.wikipedia.org/wiki/Turtle_graphics). The turtle was originally a small programmable physical robot that carried a pen and could trace its path as it moved. Logo could control this turtle with simple commands like `left` and `right` to turn and `forward` to move. This idea was extended to drawing on-screen using a virtual turtle.

<div class="two-up pad">

![Papert w/ turtle](https://cyberneticzoo.com/wp-content/uploads/Papert-x640.jpg)Seymour Papert with a physical turtle robot, photo by Cynthia Solomon{scale}

![turtle screenshot](images/turtle.png)A virtual turtle in action!{scale}

</div>

Turtles provide a new set of tools for expressing an image in code. They don't change _what you can do_: the turtle class provided in this chapter uses the standard p5.js drawing API under the hood. Instead, using a turtle changes _how you do it_.

Logo's use of turtles allows students to make a strong association between what happens in the program and how they move their own bodies in the real world. Papert called this _body-syntonic_ learning. Body-syntonic learning supports the understanding of abstract ideas through sensory experience. Papert often discussed these ideas in his writing and videos.

<div class="link-box">

<!-- Link to shorter cut is broken

[**Seymour Papert and Students (1972)** Video](https://www.youtube.com/watch?v=5dZMgdqy7zY)
See [here](https://www.youtube.com/watch?v=xMzojQFyMo0) for the longer cut of this video. -->

[**Seymour Papert and Students (1972)** Video](https://www.youtube.com/watch?v=xMzojQFyMo0)
An in-depth video where Papert discusses his work on computer-aided teaching for children.

[**Seymour Papert on Logo (1986)** Video Series](http://el.media.mit.edu/logo-foundation/resources/onlogo/index.html)
A two-part video series where Papert shares his thoughts on learning and evaluates the technical aspects of Logo.

[**Seymour Papert on Logo: Teaching (1986)** Video](https://youtu.be/ZG9cYhekB8A?t=4m25s)
Watch the clip from 4:25 - 6:40 to hear Papert talk about turtle graphics and body-syntonic learning.

[**Learning with Toys (1986)** Video](https://www.youtube.com/watch?v=IhEovwWiniY)
A short excerpt where Papert touches on learning, play, and programming.

</div>

{% slides %}
{% include ./slides.yaml %}
{% endslides %}

<div class="activity">

## Be the Turtle

Explore body-syntonic reasoning by acting out a logo-like program.

### Write a Program

- Draw an image from the deck and keep it secret.
- Think about the path someone would need to take to trace that image as they walked.
- Write a series of instructions for tracing the image using `turn(angle)` and `forward(steps)`.

### Run a Program

- Break into pairs.
- Trade instructions, but not images, with your partner.
- Follow the instructions your partner wrote, and think about the shape you are tracing on the ground.
- Draw an image of the path you took, and compare that image with your partner's original image.

### Discuss

Did involving your bodily senses and physical movement impact how you thought about the program?

</div>

## A Shift in Perspective

Most graphics APIs—including p5.js—use a [Cartesian coordinate system](https://en.wikipedia.org/wiki/Cartesian_coordinate_system). To draw a line in p5.js you might use code like this:

```javascript
line(100, 100, 200, 200);
```

This prioritizes the `x,y` coordinates of the **start** and **end** of the line. The **length** and **angle** of the line are deprioritized. You can infer them, but they are not directly specified. Also note that these positions are **absolute** coordinates measured on the canvas.

Turtle graphics flips these priorities around. This is code you might write to draw a line using a turtle:

```javascript
right(45);
forward(100);
```

Now the line's **angle** and **length** are specified instead of its **start** and **end**. This is one of the key shifts in thinking encouraged by turtle graphics.

The second shift becomes apparent if we ask where the line in the second example should be drawn. We can figure out the angle and length of a line from its start and end points, but we can't go the other way. Knowing the length and angle of a line does not tell us where it should be drawn. In turtle graphics, commands like `right` and `forward` are **relative** to the turtle.

This shift in priorities makes some things easier to express and some things harder:

<div class="columns">

<div class="half">

**Cartesian: Drawing a Square**

```javascript
rect(100, 100, 100, 100);
```

</div>

<div class="half">

**Turtle Graphics: Drawing a Square**

```javascript
t.moveTo(100, 100);
t.penDown();
for (side = 0; side < 4; side++) {
  t.forward(100);
  t.turnRight(90);
}
```

</div>

</div>

<div class="columns">

<div class="half">

**Cartesian: Drawing a Star**

```javascript
line(100, 100, 200, 100);
line(200, 100, 119.09, 158.77);
line(119.09, 158.77, 150, 63.67);
line(150, 63.67, 180.9, 158.77);
line(180.9, 158.77, 100.0, 100.0);
```

</div>

<div class="half">

**Turtle Graphics: Drawing a Star**

```javascript
t.moveTo(100, 100);
t.penDown();
for (side = 0; side < 5; side++) {
  t.forward(100);
  t.turnRight(144);
}
```

</div>

</div>

Drawing a square using rect and Cartesian coordinates works well. The turtle graphics version is longer and less clear. But for the star, the Cartesian code is very awkward and unclear. Changing the star's position or size would take a lot of work. Work should be done by computers, not programmers. The turtle code for drawing the star mirrors how we might describe the figure. It is a more natural expression of the idea, easier to understand, and easier to modify.

<!-- <div class="s-lab">

/turtles/sketches/turtle_star.js
</div> -->

Both approaches can be used to draw a square or star. We are not [_forced_](https://en.wikipedia.org/wiki/Technological_determinism) to draw specific things by either framework, but each framework encourages a different way of thinking. Just as working directly with pixels encourages different forms than working with higher-level drawing APIs, working with turtle graphics encourages yet other forms.

Two of the forms that turtles tend to encourage are [spirograph](https://en.wikipedia.org/wiki/Spirograph)-like figures and recursive trees.

### Spirograph

This example draws a 72-pointed star. Technically, this isn't really [what a Spirograph draws](https://en.wikipedia.org/wiki/Hypotrochoid), but shares some visual characteristics, like rotational symmetry.

{% js-lab "sketches/turtle_spirograph.js" %}

### Recursive Tree I

Turtles are often paired with recursion to draw tree-like forms. Study this simpified example to see how, and see the _Recursive Tree II_ below for a little more detailed example.

{% js-lab "sketches/turtle_tree.js" %}

<div class="callout">

### Make your own Drawing Machines

Changing your approach and mental model has a significant effect on the solutions you create. Turtles are just one example of a "drawing machine" that provides a new way of thinking about drawing. Inventing your own drawing machine is a rewarding exercise that can lead to new ways of approaching problems, a deeper understanding of programming, and new aesthetics to explore.

</div>

## A Simple Turtle in p5.js

To explore using turtle graphics with p5.js, I've created a basic turtle class for you to use. The examples above and below use this library, and you can copy it into your sketches.

Grab [the code here](turtle/turtle.html).

<!-- <div class="s-lab">

/turtles/sketches/turtle_house.js
</div> -->

### Comp Form Turtle API

`myTurtle = new Turtle(x, y)`
: The turtle constructor: it creates a turtle object. It takes optional `x`, `y` starting coordinates or defaults to the center of the sketch.

`myTurtle.x`
`myTurtle.y`
`myTurtle.bearing`
`myTurtle.isPenDown`
: Get info about the turtle's current state.

`myTurtle.moveForward(distance)`
: Moves the turtle forward `distance` pixels along its current bearing, drawing a line if pen is down.

`myTurtle.moveBackward(distance)`
: Moves the turtle backward `distance` pixels from its current bearing, drawing a line if pen is down.

`myTurtle.moveTo(x, y)`
: Instantly transports the turtle to the provided `x`,`y` location, drawing a line if pen is down.

`myTurtle.turnRight(angle)`
: Rotates the turtle's bearing clockwise by `angle`.

`myTurtle.turnLeft(angle)`
: Rotates the turtle's bearing counter-clockwise by `angle`.

`myTurtle.turnTo(angle)`
: Changes the turtle's bearing to the provided `angle`. The angle is measured in clockwise from straight right.

`myTurtle.penUp()`
: Tells the turtle to stop drawing lines while it moves.

`myTurtle.penDown()`
: Tells the turtle to start drawing lines while it moves.

`myTurtle.image(image, width, height)`
: Draws an image centered on the turtle's current location and aligned with the turtle's rotation.

`myTurtle.pushState()`
: Records the turtle’s current state (position, bearing, etc.) to a stack.

`myTurtle.popState()`
: Restores the turtle’s state to the top recorded state on the stack.

`myTurtle.show()`
: Show the a small triangle representing the turtle.

`myTurtle.hide()`
: Hide the turtle.

## Turtle Examples

<!-- ### Turtle Square Example

This basic example creates a turtle and uses it to draw a square.
{% js-lab "sketches/turtle_square.js" %} -->

### A Triangle

This basic example creates a turtle and uses it to draw a triangle.

{% js-lab "sketches/turtle_triangle.js" %}

### Multiple Triangles

This example moves the main drawing code into the `drawTriangle()` function which takes a turtle as its argument. The location of the triangle is controlled by moving the turtle before calling `drawTriangle()`.

{% js-lab "sketches/turtle_triangles.js" %}

### Images

The turtle class can also draw images aligned with the current position of the turtle.

{% js-lab "sketches/turtle_image.js" %}

### Push + Pop

You can use `push()` and `pop()` together to take a break from drawing one shape, draw something else, and then return to the original shape.

{% js-lab "sketches/turtle_push.js" %}

### Recursive Tree II

A common application of turtle graphics is drawing organic branching shapes, like trees.

{% js-lab "sketches/turtle_tree_2.js" %}

### Showing The Turtle

The turtle objects show() and hide() methods can be used to display a small triangle representing the turtle's current position and bearing.

{% js-lab "sketches/turtle_show.js" %}

It can be helpful while your working to see where the turtle ends up.

### Showing The Turtle in Action

<div class="sidebar link-box">

[**Generator Functions** MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)

</div>

Sometimes it can be useful—or just fun—to see the turtle moving as it makes the drawing. Normally p5.js waits until the end of the draw loop to show the results of your drawing. But you can use [generator functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) to see your drawing get made step by step. Generator functions are an advanced feature of JavaScript that allows you to create functions that can be exited and re-entered.

{% js-lab "sketches/turtle_show_yield.js" %}

<div class="activity challenges">

## Coding Challenges

Explore this chapter's example code by completing the following challenges.{intro}

### Modify the Triangle Example

1. Draw a pentagon. `•`
1. Draw an octagon. `••`
1. Draw a circle. `••`
1. Draw a circle with a dashed line. Tip: `penUp() + penDown()` `•••`
1. Draw a spiral. `•••`
1. Using a loop, draw 10 concentric triangles. `•••`
1. Draw the figure below. `•••`
1. Create a `function polygon(sides)` that receives a `sides` parameter and draws a regular polygon. `•••`

![challenge_1.png](challenge_1.png)

### Modify the Multiple Triangles Example

1. Draw each triangle with different colored strokes. `•`
1. Change the triangle function to draw pentagons. `••`
1. Draw a 3x3 grid of pentagons. `•••`
   {continue}

Style Tip: If you change what a function does, you should change its name as well. Did you change the function name when completing challenge 6?

### Modify the Spirograph Example

1. Change the `moveForward()` parameter to `i * 3`. `•`
1. Center the drawing in the middle of the canvas. `••`
1. Comment out the `noLoop()`. `•`
1. Change the `turnRight()` parameter to `175 + frameCount`. `•`
   {continue}

</div>

<div class="assignment">

## Keep Sketching!

### Sketch

Explore using turtle graphics. Start with a crazy spirograph thing and get that out of the way. Then see how much variety you can get from the turtle.

### Challenge: Animal Face

Using turtle graphics, create an **intricate** portrait of an animal. Begin by choosing an animal. Look at photo references of your animal and note interesting details, textures, patterns, and features. How can you translate those details into your sketch? Create your sketch primarily using turtle graphics techniques.

### Pair Challenge: Turtle Garden

Work with a partner. Draw a garden.

</div>

## Explore

<div class="link-box">

[**The Seeds that Seymour Sowed** Essay](https://www.media.mit.edu/posts/the-seeds-that-seymour-sowed/)
Mitchel Resnick reflects on the work and research of Seymour Papert.

[**Rough.js** Library](https://roughjs.com/)
A tool for creating graphics with a sketchy, hand-drawn aesthetic.

[**Turtle for Processing** Library](http://leahbuechley.com/Turtle/)
A turtle library for Processing from Leah Buechley.

[**iLogo** Web Editor](http://www.cr31.co.uk/logojs/logo.html)
Draw with turtles on this web editor, iLogo.

</div>

<script src="https://cdn.jsdelivr.net/npm/p5@1.11.0/lib/p5.js"></script>
<script src="/mess.js"></script>
<script src="./turtle/turtle.js"></script>
<script src="./turtle_mess.js"></script>
