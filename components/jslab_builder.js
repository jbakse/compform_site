const util = require("./util.js");

module.exports = function jslabBuilder(src) {
  const url_directory = this.page.url.substr(
    0,
    this.page.url.lastIndexOf("/") + 1
  );
  content = util.trimLines(`
        <div class="js-lab">
        <iframe class="js-lab" src="/js_lab/js_lab.html?${url_directory}${src}">
        </iframe>
        </div>
        `);

  return content;
};
