trimLines = function (text) {
  let lines = text.split("\n");
  for (let i = 0; i < lines.length; i++) {
    lines[i] = lines[i].trim();
  }
  text = lines.join("\n");
  return text;
};

module.exports = function jslabBuilder(src) {
  content = trimLines(`
        <div class="js-lab">
        <iframe class="js-lab" src="/components/js_lab/js_lab.html?${this.page.url}${src}">
        </iframe>
        </div>
        `);

  return content;
};
