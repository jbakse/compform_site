const util = require("./util.js");

module.exports = function jsshowBuilder(src) {
  const url_directory = this.page.url.substr(
    0,
    this.page.url.lastIndexOf("/") + 1
  );
  content = util.trimLines(`
        <div class="js-show">
        <iframe class="js-show" src="/js_lab/js_show.html?${url_directory}${src}">
        </iframe>
        </div>
        `);

  return content;
};
