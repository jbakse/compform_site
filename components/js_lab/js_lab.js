//////////////////////////////////////////
/// Lab

const lab = {};

lab.settings = {
  autorefresh: false,
};

// returns a debounced version of the function that waits _ms_ before firing
// "eats" multiple quick calls at once, firing just the last one
// adapted from https://john-dugan.com/javascript-debounce/
lab.debounce = function (func, ms) {
  let timeout;
  ms = ms || 200;

  return function () {
    const context = this;
    const args = arguments;

    const later = function () {
      timeout = null;
      func.apply(context, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, ms);
  };
};

lab.main = function main() {
  // set up ace editor
  const editor = ace.edit("editor");
  editor.setTheme("ace/theme/tomorrow");
  editor.getSession().setMode("ace/mode/javascript");
  editor.$blockScrolling = Infinity;

  editor.commands.addCommand({
    name: "preview",
    exec: function PreviewCommand() {
      lab.inject();
    },
    bindKey: {
      mac: "cmd-s",
      win: "ctrl-s",
    },
  });

  // pull script name from url get string
  const script_name = window.location.search.substr(1) || "example.js";

  // create the "maxamize" link to open the lab as its own page
  $("#maxamize").attr("href", window.location);
  $("#maxamize").attr("target", "_top");
  if (!inIframe()) {
    $("#maxamize").hide();
  }

  // load content of script, inject into editor
  const jqxhr = $.ajax({
    url: script_name,
    success: function (source) {
      editor.setValue(source);
      editor.gotoLine(1);
    },
    dataType: "text",
  });

  // install iframe:onload listener that injects new code into preview after it is reloaded by lab.inject
  $("#preview").on("load", function () {
    const frame = $("#preview")[0];
    if (frame.contentWindow.lab_view) {
      const source = editor.getValue();

      // regex matches "// require (url)"
      const require_regex = /^\/\/ ?require (.*?)$/gm;

      // collect requested libs
      const lib_hrefs = [];
      while ((match_info = require_regex.exec(source))) {
        lib_hrefs.push(match_info[1]);
      }

      // load libs then code
      frame.contentWindow.lab_view.takeLibs(lib_hrefs, () => {
        frame.contentWindow.lab_view.takeSource(source);

        const bootstrap = `\nif (typeof p5 !== 'undefined') {new p5();}`;
        frame.contentWindow.lab_view.takeSource(bootstrap);

        frame.contentWindow.lab_view.show();
      });
    }
  });

  $(window.parent).on("scroll", lab.scroll);

  // install editor:onchange listener to reload code after edit
  if (lab.settings.autorefresh) {
    editor.getSession().on("change", function (e) {
      lab.debounced_inject();
    });
  }

  // initial inject
  lab.scroll();
};

// inject triggers a reload of the preview iframe, clearing state
// onload listener will inject code
lab.inject = function inject() {
  const frame = $("#preview")[0];
  const f_visible = check_frame_visible();
  if (f_visible) {
    // console.log("inject");
    frame.contentWindow.location.replace("/js_lab/js_lab_view.html");
  }
};

lab.was_frame_visible = false;
lab.scroll = function scroll() {
  // console.log("scroll");
  const is_frame_visible = check_frame_visible();
  if (!lab.was_frame_visible && is_frame_visible) {
    lab.show();
  }
  if (lab.was_frame_visible && !is_frame_visible) {
    lab.hide();
  }

  $("body").toggleClass("visible", is_frame_visible);

  lab.was_frame_visible = is_frame_visible;
};

lab.hide = function hide() {
  // console.log("hide");
  const frame = $("#preview")[0];
  frame.contentWindow.location.replace("about:blank");
};

lab.show = function show() {
  // console.log("show");
  lab.inject();
};

// debounced version
lab.debounced_inject = lab.debounce(lab.inject, 500);

function check_frame_visible() {
  const w = $(window.parent);
  const f = $(window.frameElement);

  // if we are not in a frame, then we are visible
  if (f.length === 0) {
    return true;
  }

  const window_top = w.scrollTop();
  const window_bottom = window_top + w.height();

  const frame_top = f.offset().top;
  const frame_bottom = frame_top + f.height();

  const is_frame_partially_visible =
    frame_bottom > window_top && frame_top < window_bottom;
  const is_frame_fully_visible =
    frame_top > window_top && frame_bottom < window_bottom;
  return is_frame_partially_visible;
}

//////////////////////////////////////////
/// Lab View

lab_view = {};

lab_view.main = function main() {
  lab_view.setupConsole();
  window.onerror = function (messageOrEvent, source, lineno, colno, error) {
    console.log(
      `<span class="error"><b>${error}</b> on line <b>${lineno}</b></span>`
    );
  };
};

// takes an array of library urls, attaches them as <scripts>
// waits for onload/onerror on each before calling cb
lab_view.takeLibs = function (hrefs, cb) {
  loaded_count = 0;
  error_count = 0;

  function checkCounts() {
    if (loaded_count + error_count === hrefs.length) {
      cb && cb();
    }
  }
  hrefs.forEach((href) => {
    const script = document.createElement("script");
    script.src = href;
    script.async = false;
    script.onload = () => {
      loaded_count++;
      checkCounts();
    };
    script.onerror = () => {
      error_count++;
      console.log(`<span class="error">Error Loading: ${href}</span>`);
      checkCounts();
    };
    document.head.appendChild(script);
  });

  checkCounts();
};

lab_view.takeSource = function takeSource(source) {
  const script = $("<script async=false>");
  script.text(source);

  const language_regex = /^\/\/ ?language (.*?)$/gm;
  const language_result = language_regex.exec(source);
  const language = language_result && language_result[1];
  if (language === "paperscript") {
    $("body").append("<canvas id='paperCanvas' width=500 height=500></canvas>");
    script.attr("type", "text/paperscript");
    script.attr("canvas", "paperCanvas");
  }
  $("body").append(script);
};

lab_view.setupConsole = function setupConsole() {
  let console_log = null;
  lab_view.console_div = null;

  if (console.log) {
    // create a div to hold the onscreen log
    lab_view.console_div = $("<div class='lab-console'>");
    $("body").append(lab_view.console_div);

    // remember the real console log
    console_log = console.log;

    // overwrite console.log with our function
    console.log = function () {
      // echo to dom console
      lab_view.appendConsole.apply(this, arguments);

      // echo to the real console
      console_log.apply(this, arguments);
    };
  }
};

lab_view.appendConsole = function appendConsole() {
  const line = $("<div>");
  const args = [].slice.call(arguments);
  line.append(args.join(" "));
  lab_view.console_div.append(line);
};

lab_view.show = function show() {
  $(".cover").removeClass("visible");
};

function inIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}

//////////////////////////////////////////
/// Show - Code for a view that just shows the sketch with no code/editing

const show = {};

show.main = function main() {
  const script_name = window.location.search.substr(1) || "example.js";

  const jqxhr = $.ajax({
    url: script_name,
    success: function (source) {
      show.inject(source);
    },
    dataType: "text",
  });
};

show.inject = function (source) {
  // regex matches "// require (url)"
  const require_regex = /^\/\/ ?require (.*?)$/gm;

  // collect requested libs
  const lib_hrefs = [];
  while ((match_info = require_regex.exec(source))) {
    lib_hrefs.push(match_info[1]);
  }

  // load libs then code
  lab_view.takeLibs(lib_hrefs, () => {
    lab_view.takeSource(source);

    const bootstrap = `\nif (typeof p5 !== 'undefined') {new p5();}`;
    lab_view.takeSource(bootstrap);

    // lab_view.show();
  });
};
