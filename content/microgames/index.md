---
title: Microgames
layout: compform_chapter.pug

image: /microgames/images/og_image.png
hero_title: Microgames
description: Microgames are tiny games, stripped to their essential elements, often playable in a few seconds.
software: p5.js + p5.play
---

<!--
<script>
TogetherJSConfig_hubBase = "https://clover-grateful-source.glitch.me/";
//https://clover-grateful-source.glitch.me/
</script>
<script src="https://togetherjs.com/togetherjs-min.js"></script>

<div style="cursor: pointer; margin-top: 1em; padding: 5px; border: 1px solid black; display: inline-block" onclick="TogetherJS(this); return false;">Collaborate!</div> -->
<script src="https://cdn.jsdelivr.net/npm/p5@1.11.0/lib/p5.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.11.0/addons/p5.sound.min.js"></script>
<script src="../mess.js"></script>
<script src="./fish_mess.js"></script>

## Microgames

Minigames are small videogames included within larger videogames. They are often included as [Easter eggs](<https://en.wikipedia.org/wiki/Easter_egg_(media)>) or to add variety to the larger game. The hit first-person shooter BioShock used a minigame version of Pipe Dream—a classic puzzler—as the mechanic used to hack door locks and machines. Final Fantasy 7 introduced a Chocobo Racing minigame that allowed players to capture, breed, and race large, rideable birds. In Animal Crossing, players can decorate their home with playable NES games.

Some games are made up almost entirely of minigames. Party games like Mario Party, Rayman: Raving Rabbids, and 1-2-Switch allow players to compete in a series of minigame events. Evoland I + II are RPGs that mix many videogame styles and mechanics both by including many minigames and by evolving the presentation of the main game itself.

Minigames provide many benefits in game design. They offer a change of pace from the main game, reducing player fatigue. They are usually low stakes, reducing player stress. A well-placed minigame can improve the pacing of the main game significantly. Offering a break before a spike in the action will increase the apparent contrast in the intensity.

{% slides %}
{% include slides.yaml %}
{% endslides %}

Minigames don't have the weight of a full game. They don't have advance a story or provide the amount of mechanics, levels, and content expected of full games. They are free to focus on a small set of ideas, deliver some fun gameplay, and move on.

The [WarioWare](<https://en.wikipedia.org/wiki/Wario_(franchise)>) series, which debuted in 2003 on the Game Boy Advance, pushed the single-minded focus of minigames as far as possible. WarioWare presents the player with a rapid-fire sequence of microgames that demand only a single action from the player and take just seconds to play. As soon as the player completes one challenge, another begins.

<!-- commenting this out because now there's a gallery

<div class="three-up">

![WarioWare](figures/ww-stop.png)
![WarioWare](figures/ww-car.png)
![WarioWare](figures/ww-catch.png)

</div> -->

Designing and building Microgames is a great way to explore game design. Their small scope allows even a single person to conceive, build, and test a game idea in a short amount of time. Each microgame is stripped to its essential element, allowing no distractions to cover up weak central mechanic. When building a microgame is left with a little to worry about as possible beyond the essentials of game design.

<div class="activity">

## What is a Game?

Many interactive artifacts fall into the categories of _games_, _toys_, or _tools_. What is the difference?

### Class, 10 minutes

Group these interactive artifacts into games, toys, and tools.

Legos, Monopoly, Photoshop, Hammers, Tops, Dolls, Chess, Super Mario Brothers, Pac-man, Telephones

Do any of these artifacts belong in more than one category?

Do any of these artifacts belong in other, missing categories?

### Groups, 5 minutes

Brainstorm at least 10 defining or characteristic features of games.

### Groups, 5 minutes

Order your features by importance.

### Class, 10 minutes

Compare group lists.

### Class, 5 minutes

Compare features to each of the artifacts in the list above. Do these features support the way each artifact was grouped?

</div>

## p5.play

<div class="sidebar link-box">

[**p5.play homepage** Library Website](http://p5play.molleindustria.org/)

</div>

The p5.play library builds on p5.js to add features commonly needed in interactive applications, especially games. The p5.play homepage describes the library like this:

> p5.play provides a <a href="http://p5play.molleindustria.org/examples/index.html?fileName=sprite.js" target="_blank">Sprite</a> class to manage visual objects in <a href="http://p5play.molleindustria.org/examples/index.html?fileName=sprite4.js" target="_blank">2D space</a> and features such as <a href="http://p5play.molleindustria.org/examples/index.html?fileName=sprite3.js" target="_blank">animation support</a>, <a href="http://p5play.molleindustria.org/examples/index.html?fileName=collisions.js" target="_blank">basic collision detection</a> and <a href="http://p5play.molleindustria.org/examples/index.html?fileName=collisions4.js" target="_blank">resolution</a>, sprite <a href="http://p5play.molleindustria.org/examples/index.html?fileName=sprite8.js" target="_blank">grouping</a>, helpers for mouse and keyboard <a href="http://p5play.molleindustria.org/examples/index.html?fileName=keyPresses.js" target="_blank">interactions</a>, and a <a href="http://p5play.molleindustria.org/examples/index.html?fileName=camera.js" target="_blank">virtual camera</a>. </p>

Since p5.play builds on p5.js it should feel pretty familiar. One key difference is that p5.play provides a scene graph. When you create a new sprite, p5.play remembers that it is part of the scene. When you set the velocity of a sprite, p5.play remembers that for you too. When you call `drawSprites()`, p5.play will move and draw all the sprites.

<div class="callout">

**NOTE:** p5.play hasn't been updated in a while, and produces some console errors in newer browsers. The examples seem to work fine still.

</div>

## Study Examples

### p5.play Animation

This example shows the basics of p5.play: creating, animating, and drawing sprites.

{% js-lab "sketches/sprites_start.js" %}

Character art by [Buch](https://opengameart.org/users/buch) @ [opengameart.org](https://opengameart.org/content/a-platformer-in-the-forest)

### p5.play Interaction

This example shows how to use the `.mouseIsOver` property of a sprite for user interaction.

{% js-lab "sketches/interaction.js" %}

<div class="activity challenges">

## Coding Challenges

Explore this chapter's example code by completing the following challenges.{intro}

### Modify the p5.play Animation Example

1. Comment out the `addImage` lines. See what happens. Then comment them back. `•`
1. Change the size parameters on `createSprite`. What happens? Why was this the result? `•`
1. The Kid in Green is running backwards. Fix that. Tip: `mirrorX` `••`
1. Make The King run to the right. `••`
1. Make The King and The Kid in Green run towards each other. Make them stop when they collide. Tip: `overlap()` `•••`
1. Make The King and The Kid in Green “bounce” when they collide. Tip: Look at the “bouncing” p5play example. `•••`

### Modify the p5.play Interaction Example

1. Comment out the `mouseActive` line. See what happens. Then comment it back. `•`
1. Make The King spin when the mouse is over him. `•`
1. Make The King spin when the mouse is NOT over him. `••`
1. Make The King spin when he is clicked, and stop when clicked again. `••`
1. Remove The King from the scene when he is clicked. Start the scene with 10 kings. `•••`
1. Create a microgame from this example! `•••`
   {continue}

</div>

<div class="assignment">

## Keep Sketching!

### Sketch

Build interactive experiments that focus on minimally expressing a single mechanic.

### Challenge: Couch Co-op

Cooperative games are games where two or more players work together to achieve a goal. Pandemic, Forbidden Island, and Hanabi are great co-op board games. Portal 2, Lovers in a Dangerous Spacetime, and Towerfall are great co-op videogames.

Couch co-op games are local multiplayer videogames, where two people play together on the same screen—and on the same couch.

Create a couch co-op microgame!

</div>

## Explore

<div class="link-box">

[**What Makes a Good Puzzle?** Game Maker's Toolkit](https://www.youtube.com/watch?v=zsjC6fa_YBg)
Game Maker's Toolkit is an excellent Youtube series about game design. This video addresses how to design a good micro challenge, and [The Secret Of Mario's Jump](https://www.youtube.com/watch?v=7daTGyVZ60I) analyzes player input.

[**Piskel** Tool](https://www.piskelapp.com/)
A tool for building animated sprites.

[**Js13kGames** Competition](https://js13kgames.com/)
How much game can fit in 13k of Javascript? Find out in this coding competition.

[**The Nothings Suite** Collection](https://pippinbarr.github.io/the-nothings-suite/)
A collection of microgames made using Unity, Twine, and PICO-8 by Pippin Barr.

[**GIPHY Arcade** Tool](https://arcade.giphy.com/)
Play, share, and build customized microgames through GIPHY.

</div>

<style>
  .spoiler h3 {
    margin-top: 0;    
  }
  .spoiler {
      position: relative;
  }
  .spoiler::after {
      content: "Redacted! We'll look at this in class.";
      font-family: "Roboto";
      font-size: 10px;
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      text-align: center;
      padding: 30px;
      background: black;
      color: white;
      
  }
</style>

<script>
var els = document.getElementsByClassName("spoiler");
for (var i = 0; i < els.length; i++) {
    let el = els[i];
    els[i].addEventListener('click', ()=>el.classList.remove("spoiler"));
}
</script>
