https://codepen.io/mburnette/pen/LxNxNg

```css
#mess-controls {
  // border: 1px solid red;

  position: fixed;
  bottom: 10px;
  left: 10px;
  width: auto;

  border-radius: 4px;
  background: rgba(0, 0, 0, 0.3);

  padding: 10px;
  font-family: "Roboto";
  font-weight: 300;

  opacity: 1;
  transition: opacity 0.25s;
}

#mess-controls input[type="checkbox"] {
  margin-right: 5px;
}
#mess-controls label {
  user-select: none;
}

#mess-controls.hide {
  opacity: 0;
  transition: opacity 1s;
}
```

```js
const wait_ms = 5000;
let hideTimer;
function show() {
  p5_canvas && p5_canvas.canvas.classList.remove("hide");
  const mess_controls = document.getElementById("mess-controls");
  mess_controls && mess_controls.classList.remove("hide");
  hide_timeout = setTimeout(hide, wait_ms);
}
function hide() {
  p5_canvas && p5_canvas.canvas.classList.add("hide");
  const mess_controls = document.getElementById("mess-controls");
  mess_controls && mess_controls.classList.add("hide");
}
window.addEventListener("mousemove", () => {
  show();
});

const show_mess = document.getElementById("show-mess");
```

```html
<div id="mess-controls">
  <input type="checkbox" id="show-mess" /><label for="show-mess"
    >Show Background</label
  >
</div>
```
