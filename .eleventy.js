module.exports = function (eleventyConfig) {
  // markdown-it
  const markdownIt = require("markdown-it");
  const markdownLib = markdownIt("commonmark", {
    html: true,
    linkify: true,
    typographer: true,
    quotes: "“”‘’",
  });
  markdownLib.enable("linkify");
  markdownLib.enable("table");
  markdownLib.enable("replacements");
  markdownLib.enable("smartquotes");
  markdownLib.enable("strikethrough");
  markdownLib.use(require("markdown-it-anchor"));
  markdownLib.use(require("markdown-it-classy"));
  markdownLib.use(require("markdown-it-deflist"));
  eleventyConfig.setLibrary("md", markdownLib);

  // file copy operations
  eleventyConfig.addPassthroughCopy("vendor");
  eleventyConfig.addPassthroughCopy("components/js_lab");
  eleventyConfig.addPassthroughCopy("js/main.js");
  eleventyConfig.addPassthroughCopy("content/**/*.png");
  eleventyConfig.addPassthroughCopy("content/**/*.jpg");
  eleventyConfig.addPassthroughCopy("content/**/*.svg");
  eleventyConfig.addPassthroughCopy("content/**/*.js");

  // shortcodes
  eleventyConfig.addShortcode(
    "js-lab",
    require("./components/jslab_builder.js")
  );

  eleventyConfig.addShortcode(
    "js-show",
    require("./components/jsshow_builder.js")
  );

  eleventyConfig.addPairedShortcode(
    "slides",
    require("./components/slides_builder.js")
  );

  // syntax highlight
  eleventyConfig.addPlugin(require("@11ty/eleventy-plugin-syntaxhighlight"));

  // have --serve watch for sass -> css recompile
  // see: https://jkc.codes/blog/using-sass-with-eleventy/
  eleventyConfig.setBrowserSyncConfig({
    files: "./_site/css/**/*.css",
  });

  // settings
  return {
    dir: {
      input: "content",
      includes: "../_includes",
      layouts: "../_layouts",
      output: "_site",
    },
  };
};
