---
title: Tile Maps
layout: compform_chapter.pug

image: /tiles/images/og_image.png
hero_title: Tile Maps
description: Tile mapping—creating images by arranging small graphic tiles—is a widely used technique with a range of technical and artistic benefits.
software: pencil + paper
---

<script src="https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js"></script>
<script src="/mess.js"></script>
<script src="./truchent_mess.js"></script>

## Tile Sets and Maps

From masonry and tile to fabrics to movable type: artists and designers have been arranging modular motifs on grids for centuries. This approach affords a variety of aesthetic and practical benefits. It leads to designs with natural visual rhythm and concord while allowing for variety and complexity. It combines the benefits of mass production and manual customization. It also allows the creative work to be split up: a single designer creates the system and local craftsmen apply it.

In digital media, tile maps and sets are used frequently and commonly associated with the 8-bit and 16-bit video game era. Hardware limitations imposed strict limits on designers. Designers pushed these limits to creative extremes, creating enduring visual styles. Today's games do not face the same hardware restrictions, but modular graphic systems are still an important tool for artists. Support for tile maps is built into many contemporary game engines, including [Unity](https://docs.unity3d.com/Manual/class-Tilemap.html) and [GameMaker Studio](https://www.yoyogames.com/en/gamemaker).

{% slides %}
{% include slides.yaml %}
{% endslides %}

## Designing Tile Sets

The most basic tile set is a single image. Repeating this image, side by side by side, creates a pattern. With a little care, the image can be designed to match up edge-to-edge so the seams are hidden.

You can build on this simple premise in many ways: alternate tiles, rotatable tiles, complex collections of tiles that work together. You can work with different grids as well: squares are commonly used, but many other [shapes can tessellate](https://www.mathsisfun.com/geometry/tessellation.html).

### Repeating Tiles

The basic repeating tile: top matches bottom, left matches right. Below, simple repeating tiles are used to create striped, houndstooth, and herringbone patterns.

![patterns](./figures/patterns.png){scale}

### Repeating Tiles with Alternates

Top matches bottom, left matches right. Alternate tiles used to break up the repetition and add visual interest.

![patterns](./figures/patterns_alt.png){scale}

### Rotatable Tiles

Top matches bottom, left, and right. Rotated tiles still match up nicely. These are sometimes called [Truchet tiles](https://en.wikipedia.org/wiki/Truchet_tiles).

![truchet](./figures/patterns_truchet.png){scale}

### Edge-matched Tile Sets

A set of tiles where the sides of each tile match up to the opposing side of another tile in the set. Edge-matched tiles are great for forming lines.

![set](./figures/patterns_set.png){scale}

One way to create a tile set is to consider each edge to be one of two states: occupied or empty. Since there are 4 sides, and each has two states, there will be 4^2, or 16, tiles in the set.

![edge_full_shadow](./figures/edge_full_shadow.png){scale}

Depending on the design, some of these tiles may be rotations of other tiles.

![edge_full](./figures/edge_full.png){scale}

In those cases, a smaller set can be used.

![edge_5](./figures/edge_5.png){scale}

The tiles can be arranged to create patterns and form.

![edge_form](./figures/edge_form.png){scale}

Using different tile sets with the same tile map can create a variety of looks.

![multi_comp_form](./figures/multi_comp_form.png){scale wide pixel}

The examples above were generated with [this tile mapping tool from cr31](http://www.cr31.co.uk/stagecast/wang/stage.html).

### Corner-matched Tile Sets

You can also create a set by considering the corners to be empty or occupied. Corner-matched tiles are great for forming shapes.

![corner_16](./figures/corner_16.png){scale}

![corner_form](./figures/corner_form.png){scale wide}

<div class="discussion">

## Tile Set Discussion

Discuss the aesthetic and practical features of tile sets and maps.

- How does this method impact design rhythm, complexity, concord, similarity, repetition?
- How are tile maps different from and similar to patterns?
- What kinds of forms does this method lead to naturally? How can these be embraced or avoided?
- What are the essential elements of this method?
- How does a tile kit like this compare to building kits like Lego blocks?
- How does a tile kit compare to a font?
- How could these tiles work in 3 dimensions?

<!-- - How does working within constraints impact creativity?
- What are the advantages/disadvantages to working by hand?
- How would variations on the tile work? Staggered? Triangles? Rectangles?
- What if each edge/corner had three states instead of two? -->

</div>

<div class="activity">

## Tile Set Workshop

Create an edge-matched tile kit with markers on paper squares.

First, design a tile set. Create a design that allows rotation—this is faster than creating a full set. The image below shows which tiles you need to make.
![edge_counts](./figures/edge_counts.png){scale}

Once you have designed your kit start copying. You can create additional copies by hand or mechanically.

Once you have made your kit, use it to create a variety of forms. Try building out each letter in the alphabet. After playing with your set, start experimenting however you wish.

<!--
Before the end of the class take a picture of your work and **post it the class sketch blog.**

At the end of class, trade your tiles with another student in the class. This week use your partner's tiles to create a sketch, and **post it to the sketch blog.**

### Deliverables

1. In-class: Sketch Blog post using your own tile set.
2. Homework: Sketch Blog post using your partner's tile set. -->

</div>

## Procedural Tile Mapping

Early computer games were often severely constrained by available storage, memory, and processing power. Super Mario Bros for the NES had only 40 kilobytes of storage for everything: the game code, character and world art, and music.

This single screenshot of Mario dying in World 1-1 is 8 kilobytes alone.
![Super Mario Bros 1-1](./figures/smb_1_1.png){scale pixel}

This is possible because SMB builds the world from a small set of reusable tiles that can be re-colored and re-used in multiple ways. For example, the bush and the cloud in the screenshot above use the same tiles with different palettes. Below is a dump of the tiles and palettes used in SMB.

![SMB Tiles](https://gamasutra.com/db_area/images/news/253377/fig03.png){scale pixel}

### 1-bit per Tile

Maps for edge-matched tile sets can be represented very efficiently using a single bit for each tile. Comparing the state of adjacent tiles determines which tile should be drawn in each grid position.

<div class="two-up">

![Bit Map](./figures/overlay_drawn.png)1-Bit Map

![Road](./figures/road_drawn.png)
Derived Roadway Drawing

</div>

The roadway image above was produced by following these rules:

<div class="callout">

1. If the tile is unset, draw nothing.
2. If the tile is set, check the surrounding tiles:
   - If the tile above is also set, add 1 point.
   - If the tile to the right is also set, add 2 points.
   - If the tile below is also set, add 4 points.
   - If the tile to the left is also set, add 8 points.
3. Draw the tile that matches the accumulated points.

</div>

![tile_bitmask](./figures/tile_bitmask.png){scale}

This point scheme generates a unique value for every combination of neighboring tile states.

### Roadway

This example demonstrates the above approach. You can click grid squares to toggle them on and off.

{% js-lab "sketches/tilemapper.js" %}

<div class="assignment">

## Keep Sketching!

Experiment with creating images using tile mapping. Explore each of the tactics discussed above.

### Sketch

Daily exercise:

1. Create a new tile set.
2. Use the tile set to create a design.
<!-- 3. Screengrab or photograph your work and post to the class sketch blog. -->

Explore a different idea every day. If you need some ideas, consider using one of the following prompts.

<!-- If you use one of these prompts, mention it in your blog post. -->

`paper` `pixels` `vectors` `typography` `self-portrait` `3d` `hexagons` `triangles` `photocopier` `big` `huge` `edge` `corner` `pattern` `trade` `teamwork` `stamps` `scissors` `make-things-that-make-things`

### Challenge: Alphabet

Design a full alphabet using a single tile set. Create a composition that shows your alphabet in use.

<!-- Post an image of your tileset and your composition to the sketch blog. -->

### Pair Challenge: Tile Swap

Partner with another person. Create a tile set and trade it with your partner. Use the tileset you receive to create a composition.

<!-- Post an image of your tile set and your composition to the sketh blog. -->

</div>

## Explore

<div class="link-box">

[**Wang Tile Maze Design** cr31.co.uk](http://www.cr31.co.uk/stagecast/wang/intro.html) An excellent resource with lots of information on tile sets, tile maps, and wang titles.

[**Maze Algorithms** Jamis Buck](http://www.jamisbuck.org/mazes/) Many, _many_ maze generator algorithms complete with step-by-step visualizations from the author of _Mazes for Programmers_.

[**Tile Map Links** Redblob Games](http://www-cs-students.stanford.edu/~amitp/gameprog.html#tiles) Amit Patel at Red Blob writes great essays on game-programming concepts. Here are his links to tile-map-related articles.

[**Breaking the NES for Shovel Knight** Tech + Art Paper](https://www.gamasutra.com/blogs/DavidDAngelo/20140625/219383/Breaking_the_NES_for_Shovel_Knight.php) Shovel Knight is an amazing retro platformer from [Yacht Club Games](http://yachtclubgames.com/). Developer David D'Angelo discusses how Nintendo's specific technical limitations and abilities influenced Shovel Knight's design.

[**How "oldschool" Graphics Worked** Video](https://www.youtube.com/watch?v=Tfh0ytz8S0k) Overview of the hardware limitations and creative solutions in early pixel graphics.

</div>
