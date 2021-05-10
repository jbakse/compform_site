module.exports = function (eleventyConfig) {
  // markdown-it
  const markdownIt = require("markdown-it");
  const markdownLib = markdownIt("commonmark", {
    html: true,
    linkify: true,
    typographer: true,
    quotes: "“”‘’",
  });
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

  // eleventyConfig.addPairedShortcode(
  //   "assignment",
  //   require("./components/assignment_builder.js")
  // );

  // eleventyConfig.addPairedShortcode(
  //   "links-sidebar",
  //   require("./components/links-sidebar_builder.js")
  // );

  eleventyConfig.addPairedShortcode(
    "slides",
    require("./components/slides_builder.js")
  );

  // syntax highlight
  eleventyConfig.addPlugin(require("@11ty/eleventy-plugin-syntaxhighlight"));

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
