---
title: Animation
layout: compform_chapter.pug

image: /animation/images/og_image.png
hero_title: Animation
description: Procedural methods are often used to describe motion in animations. In both pre-rendered and real-time animations, an understanding of frame rate and timing are crucial for generating moving images.
software: p5.js
---

## Animation

Animation introduces intereresting creative potential because it includes the dimension of time. Because animations live in time, they excel at depicting actions, showing cause and effect, expressing narrative arcs, and telling stories.

An animation is a series of still frames be shown in very quick succession; a few seconds of animation will have hundreds of frames. Creating animations by hand can lead to [beautiful results](https://www.theguardian.com/artanddesign/2013/jan/09/oskar-fischinger-animation-disney-nazis) but is very laborious. This makes animation a great medium to explore with procedural methods. At its heart, a procedurally-generated animation is just a series of procedurally-generated images. Creating an animation with code is similar to coding a still image, but with additional instructions to express how the image will change over time.

{% slides %}
{% include slides.yaml %}
{% endslides %}

## Real-time vs. Pre-rendered

In **pre-rendered** animations, all the frames in an animation are created ahead of time and then played back seperately. In **real-time** animations, the frames are created as they are shown.

Real-time rendering for animation needs to be done quickly. To render an animation at 30 frames per second, each frame must be generated in 33 milliseconds or less. In exchange for limiting how much time can be spent rendering each frame, we gain a huge benefit. Real-time animation can react to information—including user input—that is not known ahead of time. This allows real-time animation to be _interactive_.

But pre-rendering provides its own huge benefit. Limiting the time spent rendering each frame often means compromising on the quality or complexity of the animation. When creating a pre-rendered animation, one can take as long as necessary to create each frame, allowing for high complexity and quality. Individual frames in high-end animated films often take hours or even days to render, but they look better as a result.

### Frames Per Second

Generally, faster frame rates produce smoother motion. At rates below about 10 frames per second, we tend to perceive a series of frames as independent images. Above 10, we begin to perceive a series of frames as a single image in motion. Hand-drawn animation is often shown at 12 or 24 frames per second. Films are traditionally shot at 24 frames per second. Modern video games usually target 30 or 60 frames per second. Frame rates higher than 60 frames per second don't improve animation very much, but they are helpful in some cases like e-sports and virtual reality. Virtual reality is more demanding than flat animation partly because it is trying to create an illusion of _presence_, not just motion. Current VR systems run at 90+ frames per second. VR scenes must be rendered twice—once for each eye—and in realtime, so each frame must be rendered in about 5 milliseconds.

Take a look at the metronomes below to get a feel for how framerate coresponds to smoothness. They are are animated at 5, 15, 30, and 60 frames per second.

{% js-lab "sketches/metronome_fps.js" %}

### Time Keeping

Time keeping is essential to generating animation. Time is the foundation for sequencing, pace, rhythm, and speed. Choosing an appropriate method for keeping time is an important step to getting the results you want.

Real-time animation is computed at the same rate it is shown. In real-time rendering the render time and display time are linked. Something drawn four seconds after rendering begins is seen four seconds after the animation begins. Rendering a frame faster than needed is fine: the application can simply wait to display it. If rendering the frame takes too long, however, frames will be dropped. The frame rate will dip and animation will become choppy.

Pre-rendered animation is computed at a different rate—probably much slower, but maybe faster—than it is displayed. The render time and display time are not linked. A frame seen four seconds into an animation may have been drawn several hours into the rendering job that created it.

### The Simple Approach

A common and simple approach to keeping time is to first set the frame rate, and then count the frames. In p5.js you can set the framerate with `frameRate(fps)` and get the current frame number from `frameCount`.

{% js-lab "sketches/metronome_simple.js" %}

This example draws a metronome that swings its pendulum **once every second**. The `metronome()` function draws the metronome. It takes a parameter called `pendulumAngle` which controls the position instead. The calling code is responsible for controlling how fast the arm swings. Lines 10 and 11 do this work.

- **Line 10** uses `map()` to map the current `frameCount` to `theta` such that `theta` increases by 2π every 60 frames or 1 second.
- **Line 11** calculates `pendulumAngle` using `sin()`. Because the sin function has a period of 2π, `sin(theta)` will produce a smooth wave that repeats every 1 second.

<div class="callout">

The variable `theta` in the example above is called "theta" because "theta" or "θ" is a conventional name in trigonometry for the angle input to `sin()`, `cos()`, and `tan()`.

</div>

This approach works fine for many simpler programs, but it has a problem. The `frameCount` variable tells us how many _frames_ have been drawn: It doesn't actually tell us how much _time_ has gone by. We can calculate time from `frameCount`, but only if we assume that each frame is drawn exactly on schedule. Unfortunately, that is not always the case.

### Real-time Draw Loops

The heart of a real-time animation system is the draw loop. Most real-time draw loops work something like this:

**Read Inputs » Draw Frame » Wait » Show Frame » Repeat**

In a 60fps animation, each frame should be shown for 16.6 milliseconds. If drawing the frame takes only 10 milliseconds, the loop will _wait_ for the remaining 6.6. This prevents the animation from running too fast.

<div class="sidebar link-box">

[**p5.js Draw Loop** GitHub](https://github.com/processing/p5.js/blob/ed94431045900c61cb1f78942a64e0f2a623df69/src/core/core.js#L341)

</div>

On the other hand, consider what happens if drawing a frame takes too long, let's say 20 milliseconds. The draw loop might show the frame as soon as possible, but it will still be a few milliseconds late. Alternatively, the draw loop might wait an additional 13.2 milliseconds, a longer delay but in sync with the global framerate. In either case, the frame count is now behind the actual elapsed time. These delays are cumulative: slow frames set things back but fast frames don't recover the lost time. Over time, the frame count will lag more and more.

Another way your frame count can fall out of sync with time is if your requested frame rate just isn't possible. Many environments, including p5.js in the browser, synchronize drawing to the screen's refresh rate, commonly 60hz. In p5.js your framerate will effectively get rounded to a factor of 60.

{% js-lab "sketches/frame_rate_test.js" %}

In simple games, apps, and prototypes these problems may not matter. When syncing animation to real time _does_ matter—e.g. if your animation should sync with sound playback—the simple approach above will cause problems.

### Real-time Clocks for Real-time Animation

For real-time animation, we want to base our animation on how much real time has elapsed.

The example below swings the pendulum **once per second** using `millis()` as the time base. If you slow the frame rate down with the slider, the animation becomes choppy, but the pendulum still swings at the same rate.

{% js-lab "sketches/metronome_real_time.js" %}

### Frame Counting for Pre-rendered Animation

For pre-rendered animation, we want to base our animation on the current frame, regardless of the time elapsed. We don't care how long the frames take to render because we know we will play them back at the correct rate.

The example below swings the pendulum **once per 30 frames** using `frameCount` as the time base. It is rendering _faster_ than the intended playback rate. If you slow the frame rate down with the slider, the rendering slows down. But when you export the frames and playe them back at 30fps the pendulum will swing at a steady one swing per second.

{% js-lab "sketches/metronome_pre_rendered.js" %}

## Timing Tips

### Timed Events

Imagine you want something to happen in your animation 10 seconds after it starts in your realtime animation. It is pretty likely that your event will happen between frames, so a simple equality check won't work.

<div class="bad">

```javascript
const eventTime = 10;
if (currentTime === eventTime) {
  doThing(); // probably never happens
}
```

</div>

```javascript
const eventTime = 10;
if (lastFrameTime < eventTime && currentTime >= eventTime) {
  doThing(); // will happen on the first frame after eventTime
}
```

This isn't a problem in prerendered animations if your event is scheduled for a specific frame.

```javascript
const eventFrame = 300;
if (frameCount === eventFrame) {
  doThing();
}
```

But the problem might come up if you calculate the frame based on a time.

<div class="bad">

```javascript
const eventTime = 0.75;
const eventFrame = 0.75 * 30; // = 22.5
if (frameCount === eventFrame) {
  doThing(); // never happens
}
```

</div>

You can fix this by rounding in your comparison.

```javascript
const eventTime = 0.75;
const eventFrame = 0.75 * 30; // = 22.5
if (frameCount === Math.floor(eventFrame)) {
  doThing();
}
```

### Timed Intervals

The `map()` function can be useful for mapping time to other things, like position.

```javascript
// move an ellipse from 100 to 400
// starting at 1 second and ending at 2.5 seconds
let x = map(millis(), 1000, 2500, 100, 400, true);
ellipse(x, 100, 10, 10);
```

### Modulo Beats

The modulo operator—`%`—is great for breaking time into repeated chunks or measures. The example below uses `%` and `map()` together to add a red blinking light to the metronome.

<!-- should be js-show -->

{% js-lab "sketches/metronome_modulo.js" %}

The interesting work is done on line 20:

```javascript
const red = map(millis() % 500, 0, 300, 255, 0, true);
```

First `millis() % 500` converts the time from `0 → ∞` to `0 → 500, 0 → 500, ...`. Then the map function sets `red` to decreasing values from 255 to 0 over the first 300 milliseconds of each interval.

<!-- ### Periodic Functions

Periodic functions produce repeating values in regular intervals. They are very useful for creating rhythms in procedurally-generated animation. The modulus operator and `sin()` function are both periodic and are used in the examples above to produce steadily repeating animation. -->

<!--
### Derivative Motion

for simple things: position = f(time)
what about acclearation: more complex eqations (derivities)
discrete inegration. dX += force * t; x += dX * t;

<div class="js-lab">
/animation/sketches/bounce.js
</div>



## Interactivity

low quality interactive
record input
pre-rendere with recording -->

## Exporting + Stitching Frames

Some environments support exporting frames as video, but neither JavaScript nor p5.js has this feature. However, p5.js does make it easy to export individual frames. You can create an image sequence by including the frame number in the name of each exported frame. Then the sequence can be stitched into a video using separate software. The following utility function wraps p5.js's `save()` function to make exporting image sequences easier.

```javascript
// saveFrame - a utility function to save the current frame out with a nicely formatted name
// format: name_####.extension
// name: prefix for file name
// frameNumber: number for the frame, will be zero padded
// extension: jpg or png, controls file name and image format
// maxFrame: checked against frameNumber, frames beyond maxFrame are not saved
function saveFrame(name, frameNumber, extension, maxFrame) {
  // don't save frames once we reach the max
  if (maxFrame && frameNumber > maxFrame) {
    return;
  }

  if (!extension) {
    extension = "png";
  }
  // remove the decimal part (just in case)
  frameNumber = floor(frameNumber);
  // zero-pad the number (e.g. 13 -> 0013);
  var paddedNumber = ("0000" + frameNumber).substr(-4, 4);

  save(name + "_" + paddedNumber + "." + extension);
}
```

<div class="callout warn"> 
If you are exporting frames, keep in mind that p5.js automatically uses a higher resolution on retina displays, and this is the resolution at which `save()` will export. You can use `pixelDensity(1);` before your `createCanvas()` call to disable this.
</div>

There are many applications that can take a sequence of frames and stitch them into a video. [FFmpeg](https://www.ffmpeg.org/) is a powerful command line utility for this and other video tasks. FFmpeg is a good choice for automated/back-end workflows. [After Effects](https://www.adobe.com/products/aftereffects.html) is a good choice if you are going to use the animation as part of a larger animated composition.

You can even stitch images in [Photoshop](https://www.adobe.com/products/photoshop.html):

1. Open Photoshop.
2. Choose `File` > `Open`.
3. Click on the first file of your sequence.
4. Check `Image Sequence`.
5. From the `Timeline` dropdown menu choose `Render Video....`
6. Adjust export settings.
7. Click `Render`

### Clouds

This example uses a particle effect to generate an animation of a cloud forming and dissipating. It animates 5000 particles, and can't run in realtime (at least not on my computer).

{% js-lab "sketches/save_frames.js" %}

Here is a video created from the frames exported by the example above. The frames were stiched in Photoshop.

<div class="wide">

<video src="videos/render.mp4" poster="videos/render_0030.jpg" controls></video>

</div>

This video was also created in Photoshop with a gradient map effect added.

<div class="wide">

<video src="videos/render_color.mp4" poster="videos/render_color_0030.jpg" controls></video>

</div>

## Study Examples

### Bounce

In the example below, the black circle "bobs" up and down using `sin()`. Complete the challenges below to alter this example to show a bouncing motion.

{% js-lab "challenges/bounce_01.js" %}

### Fuzzy Ellipse

In this sketch `fuzzy_ellipse(x,y,w,h,fuzz)` takes the same parameters as p5's `ellipse()` but instead of drawing one ellipse, it draws many ellipses in random positions near `x,y`. It creates a textured ellipse with a sort-of-fuzzy edge.

Take some time to study `fuzzy_ellipse()` in detail. Try to build an understanding of every line.

1. How many parameters does it take? Are they all required?
1. What does `if (dist(0, 0, xx, yy) > fuzz) continue;` do?
1. What happens without this line?
1. How many ellipses are drawn on each call of fuzzy_ellipse?

{% js-lab "challenges/fuzzy_01.js" %}

### Fuzzy Ellipse II

This example has a function called `fuzzy_ellipse_2()`. It produces output very similar to `fuzzy_ellipse()` but uses a different method.

1. Do the functions produce the exact same outcome?
1. How does `fuzzy_ellipse_2()` approach the problem differently?
1. Which is better `fuzzy_ellipse` or `fuzzy_ellipse_2`?

{% js-lab "challenges/fuzzy_02.js" %}

For lots of discussion on these two approaches, and others, and their merits take a look at this [stackoverflow question](http://stackoverflow.com/questions/5837572/generate-a-random-point-within-a-circle-uniformly).

<div class="activity challenges">

## Coding Challenges

Complete the following challenges to deepen your understanding of the examples above.

### Modify the Bounce Example

1. Imagine what would happen if you commented in line 22. `•`
1. Comment in line 22. Was the result what you expected? `•`
1. Make the ball bounce higher. `••`
1. Make the ball bounce slower. `••`
1. Make the ball bounce faster. `••`
1. Make the ball bounce exactly 1 time per second. `•••`
1. Recreate the example below. `•••`

<!-- should be js-show -->

{% js-show "challenges/bounce_02.js" %}

### Modify the Fuzzy Ellipse Example

1. Drawing a lot of transparent ellipses can be processor intensive.\
   What framerate does the fuzz example run at on your computer? `•`
1. Increase the the loop count from 100 to 1000.\
   How does that impact the drawing?\
   How does that impact the framerate? `•`
1. Increase the the loop count (again) from 1000 to 10000.\
   How does that impact the drawing?\
   How does that impact the framerate? `•`
1. Export 60 frames of this animation and turn them into a 30 fps video.\
   How long (in seconds) did it take to render 60 frames?\
   How long (in seconds) is your resulting video?\
   Does it matter what the frameRate() is set to in setup? `••`
1. Recreate the example below. `•••`
   {continue}

   {% js-show "challenges/fuzzy_challenge.js" %}

</div>

<div class="assignment">

## Keep Sketching!

### Sketch

This week focuses on creating smooth pre-rendered animations.

### Challenge: Comp Form Bumper

Create a three-second bumper for this site, Computational Form. The bumper should:

- be exactly 90 frames: 3 seconds @ 30fps.
- have a clear progression: beginning, middle, end.
- feature either the text “Compform” or “Computational Form”.
- consider including the five-triangle "Sierpinski" icon.
- consider adding music or sound in post production.
<!-- - Consider submitting multiple takes on this challenge -->

Bumper Examples:

- [My MTV](https://vimeo.com/51716890)
- [TF1 Bumpers](https://vimeo.com/91392344)
- [Much Bumpers](https://vimeo.com/17663706)
- [Nickelodeon Bumpers](https://vimeo.com/71789191)

</div>

## Reference Links

<div class='link-box'>

[**Fast and Funky 1D Nonlinear Transformations** Game Developers Conference](https://www.youtube.com/watch?v=mr5xkf6zSzk)
Great developer talk about creating interesting motion with nonlinear mapping.

[**The Illusion of Life: Disney Animation** Book](https://www.amazon.com/gp/product/0786860707?tag=parblo-20)
Now out of print, this iconic book by Disney animators describes 12 principles for good animation.

[**12 Principles of Animation: Squash and Stretch** Video](https://www.youtube.com/watch?v=haa7n3UGyDc)
Squash and stretch is a crucial principle for creating engaging, lifelike animation.

[**Animation Techniques: The Smear** Essay](https://idearocketanimation.com/8857-animation-techniques-smear/)
A history of the smear frame, featuring a gallery of images.

</div>
