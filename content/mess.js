/* globals mess_resize mess_hide mess_show */

// eslint-disable-next-line
function mess(c, wait_ms = 2000) {
  c.canvas.classList.add("mess");
  c.canvas.classList.add("hide");
  setTimeout(show, 1);
  setTimeout(getSwitch, 1); //gives document time to load

  const toggleSwitch = getSwitch();
  toggleSwitch.setAttribute("checked", true); 

  toggleSwitch.addEventListener("change", function(){
    c.canvas.classList.add("off"); //independent from show() and hide()
    if(toggleSwitch.checked){
      c.canvas.classList.remove("off");
    }
  })
 
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

  
  function getSwitch(){
    return  document.getElementById("checkbox");
  }

}
