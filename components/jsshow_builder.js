trimLines = function (text) {
  let lines = text.split("\n");
  for (let i = 0; i < lines.length; i++) {
    lines[i] = lines[i].trim();
  }
  text = lines.join("\n");
  return text;
};

module.exports = function jsshowBuilder(src) {
  content = trimLines(`
        <div class="js-show">
        <iframe class="js-show" src="/components/js_lab/js_show.html?${this.page.url}${src}">
        </iframe>
        </div>
        `);

  return content;
};
