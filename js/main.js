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
  var spoilers = document.getElementsByClassName("spoiler");
  console.log(spoilers);
  for (const spoiler of spoilers) {
    spoiler.addEventListener("click", () => spoiler.classList.add("reveal"));
  }
}

// $(main);

// function main() {
//   $(".carousel").carousel({
//     interval: false,
//     wrap: false,
//   });
//   $(".carousel").carousel("pause");

//   var els = document.getElementsByClassName("spoiler");
//   for (var i = 0; i < els.length; i++) {
//     let el = els[i];
//     els[i].addEventListener("click", () => el.classList.add("reveal"));
//   }
// }

// $(window).on("load", () => {
//     console.log("activate labs");

//     $("iframe[data-src]").each(function() {
//         $(this).attr("src", $(this).attr("data-src"));
//     });

// });

// $(document).ready(function() {

//     // $(".menu-dropdown").addClass("active");
//     $(".topic-section").css({
//         "display": "inherit"
//     });

//     $(document).on("click", ".logo", function() {
//         if ($(".menu-dropdown").hasClass("active")) {
//             $(".menu-dropdown").removeClass("active");
//         } else {
//             $(".menu-dropdown").addClass("active");
//         }
//     });

//     $(document).on("click", ".menu-dropdown ul li", function() {
//         $(".menu-dropdown").removeClass("active");
//         // $(this).attr('id');
//         $(".topic-section").css({
//             "display": "inherit"
//         });
//     });

// });
