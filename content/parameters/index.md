---
title: Parameters
layout: compform_chapter.pug

image: /parameters/images/og_image.png
hero_title: Parameters
description: Expose parameters to make your procedural systems easier to control, explore, and develop.
software: p5.js + tweakpane
---

<script src="https://cdn.jsdelivr.net/npm/p5@1.3.1/lib/p5.min.js"></script>
<script src="/mess/rocket_mess.js"></script>

<style>

.mess-controls {
            font-family: Monaco;
            font-size: 10px;
            position: fixed;
            top: 100px;
            padding: 10px;
            z-index: 1000;
            background-color: #FF0;
            mix-blend-mode: multiply;
        }

        .mess-controls p {
            margin-top: 2em;
            margin-bottom: 0;
        }

        .mess-controls {
            opacity: 1;
            transition: opacity .25s;
        }

        .mess-controls.hide {
            opacity: 0;
            transition: opacity 1s;
        }


</style>

## Parameters

One of the most powerful and rewarding aspects of writing a procedural generation system is exploring what it can make. The initial investment of time spent coding is repaid by the ability to iterate easily and quickly. Many procedural systems can produce endless variations and can be pushed to surprising extremes. Exploring the range of the system reveals new ideas to consider and aesthetics to explore.

<!-- <div class='sidebar link-box'>

[Wikipedia:<br/>Parameter](https://en.wikipedia.org/wiki/Parameter#Computing)

</div> -->

Procedural generators can provide enormous creative leverage. They allow expressive artistic control while automating much of the work. This control is afforded by exposing parameters. Parameters are adjustable values that influence the internal behavior of a system.

{% slides %}
{% include slides.yaml %}
{% endslides %}

### Parameter Space

<div class="sidebar link-box">

[**How secure is 256 bit security?** 3Blue1Brown](https://www.youtube.com/watch?v=S9JGmA5_unY)

</div>

A [parameter space](https://en.wikipedia.org/wiki/Parameter_space) is the set of all possible combinations of values for the parameters of a system. The parameter space of a system can grow very quickly. A system with one [boolean](https://en.wikipedia.org/wiki/Boolean_data_type) parameter can be configured in just two ways. If the system has 8 boolean parameters, it can be configured in 256 ways. A system with 16 boolean parameters will have 65,536 combinations. This rapid growth is referred to as [combinatorial explosion](https://en.wikipedia.org/wiki/Combinatorial_explosion).

When changes to input parameters map to interesting changes in output, combinatorial explosion can make a procedural system very powerful. Consider a program that generates faces by choosing from 4 options for each of these traits: hair style, hair color, eye color, eye shape, nose shape, mouth shape, ear shape, and face shape. Such a system can generate `4^8` or `65,536` distinct faces. If the system supported two more similar traits that number of outputs would grow to `1,048,576`!

### Sameyness

Leveraging combinatorial explosion in your procedural system does not guarantee _variety_.

Sometimes different parameters will lead to the same final output. Sometimes the output will differ only slightly or in ways that are not meaningul or important. When this happens a system's output can feel monotonous, uninteresting, and "samey". A system that takes just two numeric parameters (as 32-bit floats) has [a little less](https://stackoverflow.com/questions/7744016/how-many-distinct-values-can-be-stored-in-floating-point-formats) than `18,446,744,073,709,551,616` (18.4 Quintillion!) states. This is an inconceivably large number, but it is quite likely that many of those states would look very similar. The p5.js `ellipse()` function takes four parameters: x, y, width, and height. These are each 64-bit floats, so there are 2^256 possible combinations. Thats [115 quattuorvigintillion](https://www.wolframalpha.com/input/?i=2%5E256) different circles! In practice though, a 50 pixel wide circle and a 50.001 pixel wide circle look the same and most of those circles won't even fall on your canvas at all.

When creating interfaces for procedural systems, focus on exposing parameters that allow for _interesting_ variation.

<div class='discussion'>

## The Blue Square

Imagine a program that draws squares like the one below. What parameters might such a program accept?

![A Blue Square](./figures/blue-square.png "A Blue Square"){scale wide}

</div>

### Parametric Design

[Parametric Design](https://en.wikipedia.org/wiki/Parametric_design) is a design approach where designs are defined as systems that produce output that can be customized by adjusting parameters. For example, a parametric design for a bicycle might accept a parameter for the rider’s height and provide a customized frame to suit.

A critical aspect of parametric designs is that they represent the _design intent_, rather than just the _design product_. This allows parametric designs to adjust to fit provided parameters and create new design products as needed.

We often think of parameters as inputs, but the parameters exposed in parametric design can also be thought of as desired traits of the output.

Imagine a machine that makes a snowman. The machine might take parameters for how large the bottom, middle, and top snowball should be. This interface would afford a good deal of flexibility, but might also lead to poorly proportioned or even infeasible snowmen. Instead the machine could be designed to take a single parameter representing the desired height of the snowman, and internally calculate the sizes of each snowball according to relationships determined by the designer rather than the user.

### Benefits of Parameterization

You explore the range of a procedural genertion system by changing the values of its parameters and seeing what happens. In simple sketches you might tweak parameters directly, by changing [hard-coded](https://en.wikipedia.org/wiki/Hard_coding) values directly in the source.

It is almost always worth taking time to identify useful parameters in your code, consider their possible values, and expose them in a way that encourages exploration. Doing so will lead to _better user experiences_, _better code_, and _better results_.

#### Better User Experience

Exploring the parameter space of a system by tweaking hard-coded values doesn't work very well. Tweaking hard-coded values is slow—the project has to be re-built and re-run after each change—which discourages exploration. Also, a slow feedback cycle makes it harder to understand the effects of each change. Tweaking hard-coded values in the code is also difficult and error-prone. Which values should you change for particular effects? Do you need to change the value in multiple places? Will changing a particular value just break things?

Exposing key values in your program as parameters makes them easier to document, understand, and use. These benefits of a good interface usually far outweigh the time required to implement it.

#### Better Code

Procedural generation code often grows organically and iteratively: tweak some code, run it to see what it builds, get inspired, and then tweak again. Iterative growth leads to code that is increasingly disorganized, hard to read, and hard to change. Exposing parameters helps to organize the code by separating configuration and implementation.

Exposing parameters doesn't necessiarly require creatring a GUI for them. Early versions of a program often contain a lot of [magic numbers](<https://en.wikipedia.org/wiki/Magic_number_(programming)>). Simply changing these magic numbers into named constants helps make the code easier to read and easier reason about. Organizing your code into well-factored functions with carefully chosen parameters helps even more. Thinking of your program as a collection of components—each with their own parameter-driven interface—will generally lead to better organized, more maintainable code.

#### Better Results

On small projects—projects that you don't plan on sharing—it is tempting to skip the time needed to clean up code, factor out parameters, and create a better UI. This is often a false economy. These efforts are usually quickly repaid.

When you can explore the parameter space of your procedural systems more quickly, you can explore it more thoroughly. You will find more interesting possibilities, ideas, and aesthetics to explore further.

<!--
### An Example

The following code has been adapted from a real program that displays animated messages.

<div class='bad'>

```javascript
// original version
offset = 40 * transitionPercent + transitionPercent * sin(i + 3 * 0.5) * 80;
```

</div>

It calculates an offset used in an animated transition. The original has several magic numbers: `40`, `3`, `.5`, and `80` and had become hard to reason about and change.

This revised version is better.

<div class='good'>

```javascript
// revised version
offset = transitionPercent * sin(angle + phase) * amplitude;
```

</div>

The main expression is now much clearer. It contains fewer terms and is better organized. The magic numbers have been replaced with named values which are easier to understand. Because they are variables, they can be set elsewhere in the code, or exposed as function arguments.

Notably, this code doesn't do _exactly_ the same thing as the original version. Some of the complexity in the original was left over from an earlier approach and no longer needed. Considering the code as a system and identifying and naming its parameters made the unneeded complexity easy to spot and fix. -->

## Parameters & Interface Design

### Interfaces

When thinking about software we often define the **interface** as the part of the application that is _visible to_ and _manipulated by_ the user. I think it is better consider an interface as a common boundary, or overlap, between two systems. Interfaces are shaped by the qualities of both systems.

Two of the most important types of interfaces of software systems are **user interfaces** (UIs) and **application programming interfaces** (APIs).

- The **UI** is the part of a software system that a person uses to control it. The UI accepts user input and provides feedback. It overlaps with the user and is designed around the capabilities and nature of both the software and the user. The UI is the primary interface in most _applications_.

- The **API** is the part of a software system that is used by programmers to connect it with other software systems. A well-designed API considers both the software system itself and how other software systems will want to use it. The API is the primary interface in most _libraries_.

It is common for a piece of software to have both a UI and an API. For example, twitter provides a user interface for making and reading tweets and an API for integrating twitter into existing systems.

### Exposing Parameters

Exposing parameters allows artists and designers to create systems that can be controlled by others—and themselves—more easily. Choosing which parameters to expose is a core concern of software interface design. When choosing, consider the following:

- Which parameters should be exposed?
- Which parameters are required, and which are optional?
- Which values should be accepted for each parameter?

<div class="sidebar link-box">

[**Constraint Solver** Matt Keeter](https://www.mattkeeter.com/projects/constraints/)

</div>

I sometimes find it helpful to consider wether my parameters should be method-oriented or goal-oriented. By method-oriented, I mean parameters that control what the procedure does. By goal-oriented, I mean parameters what control what the procedure achieves. This isn't a practical difference and programming languages don't make a distinction between these things. This is just a way of thinking about parameters and their purpose that can be helpful when designing interfaces. If you take an internal, hard-coded value of a function and turn it into a parameter, it will probably be a method-oriented parameter almost by defintion. It often takes a little more effort, and some additions to the code, to introduce a goal-oriented parameter because the code needs to figure out how to reach the goal. [Constraint solvers](https://en.wikipedia.org/wiki/Constraint_programming) are algorithms that try to find solutions satisfying several goal-oriented parameter at once.

#### Balance

Exposing **more**...

- gives your user more control.
- makes your interface harder to understand.
- allows your users to do more good things.

Exposing **less**...

- gives you more control.
- makes your interface easier to understand.
- prevents your users from doing bad things.

#### Presenting Your Interface

Once you have decided what to expose via your interface, you must consider how to communicate your interface options to your users:

- What will you name each parameter?
- What UI controls will you use for each parameter?
- How will you group and order the UI controls?
- How will you explain the purpose of each parameter?

#### Feedback

Feedback shows users the impact their actions have on the system. Without feedback, systems are very hard to learn and use. With clear and responsive feedback, even systems that are difficult to describe can often be intuitively understood.

In simple cases, showing users the end result of their choices after each change may be enough. In more complex situations, it is often helpful to provide intermediate feedback. Many procedural systems are too complex to provide realtime feedback. For systems that take a long time to calculate, providing immediate confirmation of user input is important. Sometimes it can be very helpful to provide a low-quality, but quick, preview as well.

#### Keep Your User In Mind

The way that you think about your software system is often very different from the way your users think about it.

- Who will be using your software?
- Why will they be using it? What will they be trying to do?
- Do they understand how your software works under the hood? Should they?

When designing, step back and consider the relationship between your project and your user.

![what_you_design](figures/what_you_design-01.svg)

<div class='activity'>

## Fictional Machines

Practice designing user interfaces without real-world constraints.

Begin by thinking about your machine and your user. What does your machine do? What does your user need?

1. Choose a machine from the list below. Spend 5 minutes thinking about the full range of options your machine might be able to support.
1. Choose a user from the list below. Spend 5 minutes considering the relationship between your machine and your user.

Think about how your user will control your machine. What options would the user want control of? What would the user want automated?

1. Imagine one method-oriented parameter to expose to your user.
1. Imagine one goal-oriented parameter to expose to your user.
1. Imagine one parameter you will **not** expose to your user.
1. For each parameter carefully choose a name, data type, and possible values if applicable.

### Machine Types

- A self-driving car
- Planet terraformer
- Grocery-shopping bot
- Song Composer
- Genetic pet builder
- Love potion mixer

### Users

- A daily user
- A one-time user
- A child
- An enthusiast
- Another machine
- A technophobe

</div>

## Parameters + p5

### Globals as Interfaces

A quick-and-dirty way to make your comp form sketches “tweakable” is to use global constants for your parameters and group them at the top of the script. This is very easy to set up, and works particularly well for small one-off sketches. However, this approach slows down exploration because you still need to re-run your sketch after each change.

- Choose clear variable names that explain the purpose of each parameter.
- Use comments to explain the parameter in more detail, document legal value ranges, and suggest good values.
- Keep in mind that [global variables are evil](https://stackoverflow.com/questions/19158339/why-are-global-variables-evil). Use constants instead of variables, if your language supports them. If your language doesn't support true constants use a naming convention, such as all caps, to indicate that a value shouldn't be changed.

{% js-lab "sketches/square.js" %}

Take a moment to explore the parameter space of the sketch above by tweaking the globals. What happens if you set them both to 100?

### Method-oriented vs Goal-oriented

These next two examples both have a function named `stipleRect()` that fills a rectangular region with randomly placed dots. The first four parameters of each implementation are the same: `left` `top` `width` and `height`. The fifth parameter is different. In the method-oriented example, the fifth parameter controls how many dots to draw directly. In the goal-oriented example, the fifth parameter controls how densley the dots should be placed, and the function internally calculates how many dots it needs to draw to achieve that goal.

#### Stipple Rect (Method-oriented)

{% js-lab "sketches/stipple_rect.js" %}

#### Stipple Rect (Goal-oriented)

{% js-lab "sketches/stipple_rect_2.js" %}

### Globals as Interface

The [p5 DOM functions](https://p5js.org/reference/#group-DOM) provide functions that allow you create HTML elements and user interface controls. This is more complicated to set up, but still pretty quick. It is a much better choice if you want anyone else to adjust your parameters. You should consider this approach even for projects only you will use; it allows you to explore your parameter space without having to reload your sketch.

- Label your inputs clearly.
- Consider your interface carefully.
- Use `select()` in p5 if you want to make your controls in HTML.
- Consider styling your interface with CSS.

{% js-lab "sketches/square_slider.js" %}

### HTML Interfaces with Tweakpane

[Tweakpane](https://cocopon.github.io/tweakpane/) is a javascript library that lets you quickly setup and display a interactive pane for adjusting parameters.

{% js-lab "sketches/square_tweakpane.js" %}

<div class='activity'>

## Coding Challenges

Explore using parameters by completing the following challenges. Reference the study examples above.

<!-- <br/> Don't skip any. -->

<!-- | Time                 | Comment                                                                              |
| -------------------- | ------------------------------------------------------------------------------------ |
| < 6 in 20 Minutes    | You need to put in some extra work to strengthen your understanding of these topics. |
| 6 in 20 Minutes      | Good.                                                                                |
| All 10 in 20 Minutes | Great.                                                                               | -->

### Modify the Globals as Interface Example{difficulty}

1. Make each square a different randomly-chosen size.{easy}
1. Add a white stroke to the squares. {easy}
1. Add a global variable parameter to control the width of the stroke. {medium}
1. Add global variable parameters to control the minimum and maximum size of the square.{medium}
1. Draw the square in two sizes: small and large. Randomly generate which of the two sizes the square will be. {hard}
1. Add parameters to control the small size, large size, and percentage chance of drawing a large or small square. {hard}

### Modify the HTML Interfaces with Tweakpane Example

1. Add a slider to control the vertical position of the square. {easy}
1. Add a color picker to control the background color of the sketch. {medium}
1. Instead of drawing the square, draw a "target" of concentric white and red rings. Draw more rings to make a bigger target. {hard}
   {continue}

</div>

<div class='assignment'>

## Keep Sketching!

### Base

Continue experimenting with procedurally-generated images. Now, focus on exposing parameters and exploring the parameter spaces of your sketches. You can mix random and parametric elements, but I suggest doing at least a couple of sketches that are not random at all.{bigger}

### Individual Challenge: Face Generator

Build a face-generating tool. This tool will create an image of a face that can be adjusted by the user with sliders and other inputs.

- Don’t use the built-in shape drawing commands like rect and ellipse. Build your face from hand-drawn or photographic images.
- Make your resulting images look as seamless and cohesive as possible.
- Inputs can range from straightforward (eye color, nose size) to complex (anger, lighting).

### Pair Challenge: Code Swap

#### Part 1

1. Create an computationally generated image.
2. Post your image.
3. Pass the code—not the image—to your partner.

#### Part 2

1. Receive the code from your partner.
2. Extend the code in any way you wish.
3. Post the result.

</div>

## Reference Links

[p5: Reference](https://p5js.org/reference/)
: Documentation on the p5 API.

[dat.gui](https://github.com/dataarts/dat.gui)
: Popular, lightweight tool for quickly making nice-looking interfaces.

[How secure is 256 bit security?](https://www.youtube.com/watch?v=S9JGmA5_unY)
: The fantastic YouTube channel 3Blue1Brown explores combinatorial explosion in the context of cryptographic security.

[A History of Parametric](http://www.danieldavis.com/a-history-of-parametric/)
: A history of parametricism and parametric architecture, beginning before the invention of the computer.

[Engare](http://www.engare.design/)
: A game about motion and geometry that draws on the mathematical principles of Islamic pattern design.

[Variable Fonts](https://v-fonts.com/)
: A compilation of [OpenType variable fonts](https://medium.com/variable-fonts/https-medium-com-tiro-introducing-opentype-variable-fonts-12ba6cd2369), which offer parametric control over weight, contrast, and other variables.

[Safavid Surfaces and Parametricism](https://archinect.com/features/article/29553480/safavid-surfaces-and-parametricism)
: Article describing "parametric design tools have brought about a contemporary resurgence of surface articulation".
