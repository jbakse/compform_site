/* exported mess */

// rename or document hide off class names

function mess(c, wait_ms = 2000, creditInfo = {}) {
  /// if url contains "js_lab"
  if (window.location.href.includes("js_lab")) return;

  /// set up canvas
  c.canvas.setAttribute("style", ""); // remove p5.js default styles
  c.canvas.classList.add("mess");
  c.canvas.classList.add("hide"); // start hidden
  setTimeout(showMess, 1); // show immediately after init

  /// set up mess UI
  createMessUI();
  const showMessCheckbox = document.getElementById("show-mess-checkbox");

  //check local storage for user preference
  showMessCheckbox.checked = localStorage.getItem("messState") !== "hide";

  toggleMess();

  showMessCheckbox.addEventListener("change", toggleMess);

  /// manange fading the canvas in and out based on mouse movement
  let hideTimeout = null;
  function showMess() {
    c.canvas.classList.remove("hide");
    hideTimeout && clearTimeout(hideTimeout);
    hideTimeout = setTimeout(hideMess, wait_ms);

    window.messShow?.(); // call messShow if mess defines it
  }

  function hideMess() {
    c.canvas.classList.add("hide");

    window.messHide?.(); // call messHide if mess defines it
  }

  window.addEventListener("mousemove", () => {
    showMess();
  });

  /// handle canvas resizing
  window.addEventListener("resize", () => {
    resizeCanvas(windowWidth, windowHeight);
    c.canvas.setAttribute("style", ""); // remove p5.js default styles

    window.messResize?.(); // call messResize if mess defines it
  });

  function toggleMess() {
    // hide or show the canvas based on the checkbox
    c.canvas.classList.toggle("off", !showMessCheckbox.checked);
    // start or stop the mess and save the user preference
    if (showMessCheckbox.checked) {
      window.resumeMess ? window.resumeMess() : loop();
      localStorage.setItem("messState", "show");
    } else {
      window.pauseMess ? window.pauseMess() : noLoop();
      localStorage.setItem("messState", "hide");
    }
  }

  function createMessUI() {
    let creditLine = "";

    // credit lines must have messName and messLink
    if (creditInfo?.messLink && creditInfo?.messName) {
      creditLine += ` — <a href="${creditInfo.messLink}">${creditInfo.messName}</a>`;

      // credited author is optional
      if (creditInfo?.authorLink && creditInfo?.authorName) {
        creditLine += ` by <a href="${creditInfo.authorLink}">${creditInfo.authorName}</a>`;
      }

      // uncredited author is optional
      if (!creditInfo?.authorLink && creditInfo?.authorName) {
        creditLine += ` by ${creditInfo.authorName}`;
      }
    }

    document.body.insertAdjacentHTML(
      "beforeend",
      `
      <div class="mess-UI">
        <label class="switch" for="show-mess-checkbox">
          <input type="checkbox" id="show-mess-checkbox" checked/>
          <div class="slider round"></div>
          <div class="label">${creditLine}</div>
        </label>
      </div>`
    );
  }
}
