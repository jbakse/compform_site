module.exports = function (eleventyConfig) {
  // markdown-it
  const markdownIt = require("markdown-it");
  const markdownLib = markdownIt({
    html: true,
  });
  markdownLib.use(require("markdown-it-anchor"));
  markdownLib.use(require("markdown-it-classy"));
  markdownLib.use(require("markdown-it-deflist"));
  eleventyConfig.setLibrary("md", markdownLib);

  // file copy operations
  eleventyConfig.addPassthroughCopy("vendor");
  eleventyConfig.addPassthroughCopy("content/**/*.png");
  eleventyConfig.addPassthroughCopy("content/**/*.jpg");
  eleventyConfig.addPassthroughCopy("content/**/*.svg");
  eleventyConfig.addPassthroughCopy("content/**/*.js");

  // shortcodes
  eleventyConfig.addShortcode("myShortcode", function (firstName, lastName) {
    return "short code returned this";
  });

  eleventyConfig.addPairedShortcode("slides", function (content) {
    return content;
  });

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
