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
  console.log(spoilers);
  for (const spoiler of spoilers) {
    spoiler.addEventListener("click", () => spoiler.classList.add("reveal"));
  }

  // glider slides
  new Glider(document.querySelector(".glider"), {
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
