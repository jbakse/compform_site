---
title: Music
layout: compform_chapter.pug

image: /music/images/og_image.png
hero_title: Music
description: Music is organized sound. This chapter covers some specific tactics for generating a short piece of music.
software: Tone.js
---

## Computational Music

Composers have long explored creating music with algorithms and chance. These works fall into a few rough categories.

Algorithmic Music
: In [algorithmic music](https://en.wikipedia.org/wiki/Algorithmic_composition), an algorithm is employed _at the time of composition_ resulting in a fixed score.

Aleatoric Music
: In [aleatoric music](https://en.wikipedia.org/wiki/Aleatoric_music), important aspects of a composition are intended to be decided _at the time of the performance_. Aleatoric music allows for variation according to the performer or chance within a specific structure.

Generative Music
: Brian Eno used the term [Generative Music](https://en.wikipedia.org/wiki/Generative_music) to describe music that is created by a system and that constantly changes.

### Examples

{% slides %}
{% include slides.yaml %}
{% endslides %}

<!-- commenting out the links because it's getting replaced with a gallery -->
<!-- [Six Marimbas](https://www.youtube.com/watch?v=mLZelvSvh3A) [Come Out](https://www.youtube.com/watch?v=g0WVh1D0N50) [Its Gonna Rain](https://www.youtube.com/watch?v=vugqRAX7xQE)
: Three compositions by Steve Reich

[Cobra](https://www.youtube.com/watch?v=UdNdSJUf_8I) [Zorn on Cobra](https://www.youtube.com/watch?v=yp-oZbmsQVw&t=152s)
: John Zorn's "game piece" music.

[Music for Airports](https://en.wikipedia.org/wiki/Ambient_1:_Music_for_Airports)
: Ambient music created by Brian Eno

[Jeremy Wentworth: WebKitSynth](http://jeremywentworth.com/projects/webkitsynth/index.html)
: Generates a short sequence, with lots of knobs to tweak.

[Happy Songs in Sad Versions](https://www.youtube.com/watch?v=En1BApnx3Co)
: Popular songs in Minor Keys. -->

<!-- Broken
[Neural Network Music](http://yoavz.com/music_rnn/)
: Academic paper (with examples) on "Music Language Modeling with Recurrent Neural Networks". -->

## Generating Music

This chapter covers some specific tactics for generating a short piece of music.

We'll look at how to plan this project, the pieces that need to be built, and how to represent data. The final generator will be implemented in JavaScript using the Tone.js library.

Our result will be a simplified version of [this demo](http://psam3060-d-s16.github.io/class_notes/week_9/sketch_music/).

<!-- <div class="callout">

The examples in the chapter originally used the p5.sound library. You can find information about building a synth with p5.sound [here](./p5_sound.html).

</div> -->

## Synthesizing a Note

Generating a melody isn't much use if we can't hear it. We could export our melody in an interchange format like MIDI, and play it back in an audio software package, but it will be more fun to build a synthesizer into our generator so we can hear the results right away. A [synthesizer](https://en.wikipedia.org/wiki/Synthesizer) is a computer program or circuit that generates sounds. Synthesizers can simulate the sounds of natural instruments like pianos, guitars, and drums or create entirely new sounds.

<div class="discussion">

## Designing the Synth

Synthesizers create sounds. What kind of sound do we want to create?

Most synthesizers offer a great deal of customization through parameters. Adjusting these parameters allows you to create a wide range of sounds.

Compare the sounds of musical instruments—pianos, guitars, violins, drums. How are these sounds similar? How are they different? What synthesizer parameters do these differences suggest?

</div>

### Timbre

When a note is played on different instruments—say a piano and guitar—the note will sound different even if it has the same pitch, length, and volume. Instruments sound different because of a variety of characteristics: spectral envelope; noisiness; attack, sustain, and decay; vibrato; tremolo; and others. Considered together these characteristics are called [timbre](https://en.wikipedia.org/wiki/Timbre) or tone.

One of the key contributors to the timbre of sounds created by a synthesizer is the shape of the generated wave. For example a sine wave has a clear, smooth sound and a square wave has a brassier, buzzier sound. Natural instruments produce varying overtones resulting in more complicated wave shapes.

![./images/wave_compare](./images/wave_compare.png)

### Envelope

Another key contributer to the sound of an instrument is its amplitude [envelope](<https://en.wikipedia.org/wiki/Envelope_(music)>), which describes how the volume of the sound changes over time. A piano produces a sound that fades out over time, but an organ can hold a note at full volume indefinetely.

Synthesizes often let you control this aspect of the sound created using an [ADSR envelope](https://www.wikiaudio.org/adsr-envelope/). An ADSR envelope is shaped with four paremeters:

**Attack** controlls how quickly the sound ramps up to full volume.

**Decay** controls how quickly the sound then ramps down to its sustain level.

**Sustain** controls how loud a held note is relative to the maximum volume reached by the attack.

**Release** controls how long the sound takes to fade away when the note is no longer held.

![./images/wave_compare](./images/adsr.png)

### Types of Synthesis

There are many ways to synthesize tones. Some of the most common are additive, subtractive, frequency modulation, amplitude modulation, wavetable, and sampled synthesis.

Additive Synthesis
: Combine simple sine wave signals together to create complexity. [Fourier theory](https://en.wikipedia.org/wiki/Fourier_series) shows us that any periodic wave shape can be generated by adding sine waves of various frequencies and amplitudes.

![./images/wave_compare](./images/wave_add.png)

Subtractive Synthesis
: In subtractive synthesis a tone with rich overtones is filtered with frequency-pass filters that subtract different overtones to create new timbres. Square and sawtooth waves have strong overtones and are often used as the source in subtractive synthesis. The [Minimoog](https://en.wikipedia.org/wiki/Minimoog) and other 1970's synthesizers often used subtractive synthesis.

Wavetable Synthesis
: In wavetable synthesis the wave isn't generated with a periodic function or math. It is simply stored as data which is used by the synthesizer.

Sampled Synthesis
: Sampled synthesis is a type of wavetable synthesis where the stored wave data is recorded from physical instruments.

FM and AM Synthesis
: In FM and AM synthesis simple square, sine, or other oscillators are chained together. This allows one oscillator to change the frequency or amplitude of the other, usually at a rate higher than the fundamental frequency being played. This results in tremolo and vibrato effects.

### Tone.js

The following exampes will use the Tone.js library to synthesize musical notes.

<div class="sidebar link-box">

[**Simple Synth** Tone.js Example](https://tonejs.github.io/examples/simpleSynth.html)

</div>

> Tone.js is a framework for creating interactive music in the browser. It provides advanced scheduling capabilities, synths and effects, and intuitive musical abstractions built on top of the Web Audio API.
>
> [Tone.js Homepage](https://tonejs.github.io/) {attrib}

Tone.js is pretty easy to get started with and well documented. Be sure to read through the [overview](https://tonejs.github.io/), browse the [API docs](https://tonejs.github.io/docs/), and look at ALL the [examples](https://tonejs.github.io/examples/). By looking at the examples you will learn what the library can do, and you'll also learn a fair amount about different synthesis techniques. At least you will learn the names of interesting techniques and common paramters. You can study the [code for the examples](https://github.com/Tonejs/Tone.js/tree/dev/examples) also. Finally, the [Tone.js Wiki](https://github.com/Tonejs/Tone.js/wiki) has important conceptual information.

Jake Albaugh's pretty cool [Musical Chord Progression Arpeggiator](https://codepen.io/jakealbaugh/full/qNrZyw/) is created with Tone.js.

#### Tone.js Synths

The Tone.js library offers a several synthesizer options. The simplest one is `Tone.Synth()`. `Tone.Synth()` pairs an oscillator that generates a tone and an ADSR envelope that controls its volume. Even though this is a pretty simple synth, it can create a wide range of sounds.

#### Using Tone.Synth()

Using `Tone.Synth()` requires only a few lines of code. Click below to play notes.

{% js-lab "tone_sketches/synth.js" %}

## Representing + Playing a Melody

Now that we can play individual musical notes, we need to create some code to play a series of notes—a melody.

<div class="discussion">

## What does a Melody Look Like?

A melody is a series of notes. What information is necessary to describe a melody? How would you represent that information in code?

</div>

The `triggerAttackRelease()` method lets us specify frequencies using musical notes, schedule notes to start a specific time, and last a specific duration. We can program a song like this:

```js
synth.triggerAttackRelease("G4", "8n", "+0:0:0");
synth.triggerAttackRelease("F#4", "8n", "+0:0:1");
synth.triggerAttackRelease("D#4", "8n", "+0:0:2");
synth.triggerAttackRelease("A3", "8n", "+0:0:3");
synth.triggerAttackRelease("G#3", "8n", "+0:0:4");
synth.triggerAttackRelease("E4", "8n", "+0:0:5");
synth.triggerAttackRelease("G#4", "8n", "+0:0:6");
synth.triggerAttackRelease("C5", "8n", "+0:0:7");
```

This plays a song, but the song is hard coded in commands. If we are going to generate a melody it will be helpful to have a data structure to represent it. That way we can build and manipulate the melody as data and play it when we are done.

### Our Melody Format

First lets figure out what we need, and what we don't need. Our melody is a list of notes. We'll use a synth that is monophonic—we can't play more than one note at a time—so we don't need support for chords. Each note needs a **pitch** and each note needs a **length**.

#### Pitch

We could represent our pitch with the raw frequency in [hertz](https://en.wikipedia.org/wiki/Heinrich_Hertz): e.g. `261.63`.

We could use [scientific pitch notation](https://en.wikipedia.org/wiki/Scientific_pitch_notation): e.g. `C4`.

We could use the [MIDI](https://en.wikipedia.org/wiki/MIDI) note value: e.g. `60`.

Hertz is a little fussy, scientific pitch notation is good for humans but not computers (hard to manipulate with math), and MIDI notes are good for computers but not for humans.

| A1   | B♭   | B    | C2   | D♭   | D    | E♭   | E    | F    | G♭   | G   | A♭    |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | --- | ----- |
| 33   | 34   | 35   | 36   | 37   | 38   | 39   | 40   | 41   | 42   | 43  | 44    |
| 55hz | 58.2 | 61.7 | 65.4 | 69.3 | 73.4 | 77.7 | 82.4 | 87.3 | 92.5 | 98  | 103.8 |

Tone.js accepts frequencies and pitch notation directly and provides functions for working with MIDI.

```js
synth.triggerAttackRelease(55, "8n");
synth.triggerAttackRelease("A1", "8n");
synth.triggerAttackRelease(Tone.Midi(33), "8n");
```

Tone.js also has functions for manipulating notes so they can be good for humans and still pretty good for computers.

```js
Tone.Frequency("A4").transpose(3); //"C5"
```

With that in mind, we'll use scientific pitch notation in our data format.

#### Length

In musical notation, note lengths are usually provided in relation to the tempo and time signature of the piece: e.g. quarter notes, half notes. Tone.js has [shorthand notation](https://github.com/Tonejs/Tone.js/wiki/Time) for this: `4n` -> quarter note, `2n` -> half note. We'll use this notation as well.

#### Notes

Notes have two values: Pitch and Length. We could use an object `{pitch: 60, length: .25}` or an array `[60, .25]` to represent our note. The object is more _explicit_ but the array is more _compact_. For a short demo like this, I think a melody will look better with arrays: let's use them.

<div class="callout warn">

Choosing to represent pitch and length in an array `[60, .25]` is semantically unclear. The array implies that order matters and its good practice for elements in an array to have the same type. An object is better for an unordered collection of values with different types. With and array the code that accesses pitch will be unclear: `note[0]; note[1];`. With an object it would be much clearer: `note.pitch; note.length;`

</div>

#### Rests

Rests are gaps between notes. They have a length, but no pitch. We could have a different format for rests, or we could use notes but set the pitch to a special value. For simplicity, let's use notes with a special pitch value. We might use `0` or `undefined` to represent a rest, but those aren't quite semantically correct. Since we can mix types in JavaScript we could use a string too: `rest`.

We could also encode the start time for each note and not include rests in our melody. If we did this though, we'd have to adjust the timing on everything when we add, remove, or move notes.

#### Our Format

Here is how our melody will look.

```javascript
// mary had a little lamb
const melody = [
  ["E4", "4n."],
  ["D4", "8n"],
  ["C4", "4n"],
  ["D4", "4n"],

  ["E4", "4n"],
  ["E4", "4n"],
  ["E4", "4n"],

  ["rest", "1m"],
];
```

### Playing our Melody Format

Tone.js's `triggerAttackRelease()` methods accept four parameters: `note`, `duration`, `time` (optional), and `velocity` (optional). This example uses `triggertAttackRelease()` to play our melody. It loops through the notes and schedules them, keeping track of the accumulated time in `t`.

This example shaves .1 seconds from each note to create a slight stacatto effect. I think this sounds a little better.

{% js-lab "tone_sketches/simple_song.js" %}

## Generating a Melody

Now we have a format to represent a melody and a function to play it. Our final challenge is the code to generate one. We can't jump into coding yet: we need a plan that we can translate into code. You can't write computer code without first deciding exactly what you want the computer to do. You can try, but you'll end up making the decisions anyway. You'll just make them as you go along, without a plan.

One approach we might consider is picking random notes and random lengths and placing them in a sequence. But that would be like generating images by randomly assigning colors to pixels: the result would be noise—in more than one sense. We don't want noise, we want to make _music_.

<div class="discussion">

## What Kind of Melody do We Want?

A melody is an _organized_ series of notes, but how do we want _our_ melody organized? What qualities do we want to ensure? What qualities do we want to leave to chance?

</div>

### Our Target Characteristics

- We are going to use the C-Major key.
- We are going to use 4/4 time.
- We will use only half-notes and quarter-notes.
- No notes will be played across the barline.
- Our melody will have no rests!
- Our melody will have 4 measures.
- These measures will have an `A` `B` `A` `C` structure.
- Our melody will start at a random place in the scale, and move up and down the scale in random steps.
- Our melody should contain mostly conjunct (single) pitch steps: e.g. `C to D`, `F to E`
- Our melody should have occasional disjunct (bigger) jumps: e.g. `C to E`.
- Our melody will end on the tonic: `C`.

### Our Melody Generator

{% js-lab "tone_sketches/melody.js" %}

<div class="discussion">

## Compare the Code to Spec

Codebases often diverge from their initial specifications. Compare the target characteristics with the melody generator above. How are they different?

</div>

<div class="assignment">

## Keep Sketching!

### Sketch

Continuing to explore generating and visualizing sound and music.

### Challenge: Write and Record a Song

It doesn't have to be good. It doesn't have to use code.

### Pair Challenge: Fork the Melody Generator

Working together—synchronously!—modify the melody generator to create songs in a new style. As you work, update the "target characteristics" list to document the sylitic decisions embedded in your version of the code.

</div>

## Explore

<div class="link-box">

[**Melody in Songwriting** Book](https://www.amazon.com/Melody-Songwriting-Techniques-Writing-Berklee/dp/063400638X)
Melody in Songwriting is an excellent book for developing melody-writing skills.

<!-- Broken Link
[C-sharp vs D-flat](http://blog.eumlab.com/c-and-db-whats-the-difference/)
:Music theory article addressing note naming within different keys. -->

[**Music Basics** Tutorial](https://www.khanacademy.org/humanities/music/music-basics2)
Khan Academy offers interactive tutorials on basic music theory, including rhythm and musical notation.

[**Web Audio API** MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
The documentation for the Web Audio API.

[**Getting Started with Web Audio** HTML5Rocks](https://www.html5rocks.com/en/tutorials/webaudio/intro/)
A comprehensive introduction to how the Web Audio API works.

[**Audio Scheduling** HTML5Rocks](https://www.html5rocks.com/en/tutorials/audio/scheduling/)
A tutorial on audio timing and scheduling in the Web Audio API.

[**I don't know who the Web Audio API is designed for** Essay](http://blog.mecheye.net/2017/09/i-dont-know-who-the-web-audio-api-is-designed-for/)
An essay that discusses the weaknesses and limitations of the Web Audio API.

[**Midi Notes and Math** UNSW](https://newt.phys.unsw.edu.au/jw/notes.html)
A breakdown of MIDI numbers and frequencies.

[**Teoria.js Music Theory Library** Library](https://github.com/saebekassebil/teoria)
A library for music software that supports musical structures and language, including chords, scales, and notes.

[**Ocenaudio** Tool](http://www.ocenaudio.com/)
Ocenaudio is a free sound editor available for both OS X and Windows. It's beginner-friendly while still offering more advanced features.

[**ChucK** Programming Language](http://chuck.cs.princeton.edu/)
ChucK is a programming language for real-time music and audio generation. Watch creator Ge Wang discuss his design and use of the program in this [video](https://www.youtube.com/watch?v=2rpk461T6l4).

</div>
