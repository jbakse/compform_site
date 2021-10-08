// require https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.min.js

// random number generator
// super basic Linear congruential generator
// based on https://en.wikipedia.org/wiki/Linear_congruential_generator
// values from http://www.phy.ornl.gov/csep/rn/node11.html

let m = 16;
let c = 1;
let a = 5;
let seed = 1;

function setup() {
  for (i = 0; i < 20; i++) {
    console.log(makeRandom());
  }
}

function makeRandom() {
  seed = (seed * a + c) % m;
  return seed / m;
}
