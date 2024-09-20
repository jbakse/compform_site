console.log(
  "%cHello, Comp Form!",
  "color: white; background: black; padding:5px; border-radius: 3px;",
);

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

  // glider.js slide shows
  var gliders = document.querySelectorAll(".glider");
  gliders.forEach((item) => {
    new Glider(item, {
      slidesToShow: 1,
      dots: item.parentNode.querySelector(".dots"),
      draggable: true,
      scrollLock: true,
      dragVelocity: 1,
      arrows: {
        prev: item.parentNode.querySelector(".prev"),
        next: item.parentNode.querySelector(".next"),
      },
    });
  });
}
