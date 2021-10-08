const util = require("./util.js");

module.exports = function jsshowBuilder(src) {
  content = util.trimLines(`
        <div class="js-show">
        <iframe class="js-show" src="/components/js_lab/js_show.html?${this.page.url}${src}">
        </iframe>
        </div>
        `);

  return content;
};
