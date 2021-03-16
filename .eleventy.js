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
  eleventyConfig.addPassthroughCopy("src/entry.js");
  eleventyConfig.addPassthroughCopy("content/**/*.png");
  eleventyConfig.addPassthroughCopy("content/**/*.jpg");
  eleventyConfig.addPassthroughCopy("content/**/*.svg");
  eleventyConfig.addPassthroughCopy("content/**/*.js");

  // shortcodes
  eleventyConfig.addShortcode("myShortcode", function (firstName, lastName) {
    return "short code returned this";
  });

  // eleventyConfig.addPairedShortcode("slides", function (content) {
  //   return content;
  // });

  eleventyConfig.addPairedShortcode(
    "slides",
    require("./builders/slides_builder.js")
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
