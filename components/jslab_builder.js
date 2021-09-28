const util = require("./util.js");

module.exports = function jslabBuilder(src) {
  content = util.trimLines(`
        <div class="js-lab">
        <iframe class="js-lab" src="/components/js_lab/js_lab.html?${this.page.url}${src}">
        </iframe>
        </div>
        `);

  return content;
};
