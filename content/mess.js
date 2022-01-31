/* globals mess_resize mess_hide mess_show */

// eslint-disable-next-line
function mess(c, wait_ms = 2000) {
  c.canvas.classList.add("mess");
  c.canvas.classList.add("hide");
  setTimeout(show, 1);
  c.canvas.setAttribute("style", "");

  // fade the canvas out when mouse is still
  let hide_timeout = null;

  function show() {
    c.canvas.classList.remove("hide");
    hide_timeout && clearTimeout(hide_timeout);
    hide_timeout = setTimeout(hide, wait_ms);

    if (window.mess_show) mess_show();
  }

  function hide() {
    c.canvas.classList.add("hide");

    if (window.mess_hide) mess_hide();
  }

  window.addEventListener("mousemove", () => {
    show();
  });

  // resize canvas
  window.addEventListener("resize", () => {
    resizeCanvas(windowWidth, windowHeight);
    c.canvas.setAttribute("style", "");

    if (window.mess_resize) mess_resize();
  });
}
