console.log("Hello, Comp Form!");

function ready(cb) {
  if (document.readyState != "loading") {
    cb();
  } else {
    document.addEventListener("DOMContentLoaded", cb);
  }
}

ready(main);

function main() {
  // spoilers
  var spoilers = document.getElementsByClassName("spoiler");
  for (const spoiler of spoilers) {
    spoiler.addEventListener("click", () => spoiler.classList.add("reveal"));
  }

  // glider slides
  var slider = document.querySelector(".glider");
  if (slider) {
    new Glider(slider, {
      slidesToShow: 1,
      dots: ".dots",
      draggable: true,
      scrollLock: true,
      dragVelocity: 1,
      arrows: {
        prev: ".prev",
        next: ".next",
      },
    });
  }
}
