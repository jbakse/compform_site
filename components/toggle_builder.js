/* create toggle button */

//html based on https://codepen.io/AllThingsSmitty/pen/MmxxOz/

const util = require("./util.js");

module.exports = function showToggle() {
    content = util.trimLines(`
        <div class="comp-form-toggle">
            <div class="container">
                <label class="switch" for="checkbox">
                    <input type="checkbox" id="checkbox" />
                    <div class="slider round"></div>
                </label>
            </div>
        </div>
        `);
  
    return content;
  };