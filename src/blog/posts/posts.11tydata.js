/**
 * Directory data for every post in this folder.
 *
 * It lives here rather than in src/blog/ so it cannot reach the blog index:
 * a computed permalink there would rewrite /blog/ to /blog/blog/.
 *
 * Filenames carry the date (2026-09-10-titel.md): Eleventy strips that
 * prefix from `page.fileSlug` and reads `page.date` from it, so the
 * permalink stays clean and the post needs no `date` in its frontmatter.
 */

// `serve` and `watch` mean a local preview, where drafts should be visible.
const isPreview = process.env.ELEVENTY_RUN_MODE !== 'build';

export default {
  layout: 'post.njk',
  tags: ['posts'],
  eleventyComputed: {
    // A draft is kept out of collections and never written to _site/ in a
    // real build, but shows up in `npm start` so you can read it back.
    eleventyExcludeFromCollections: (data) => Boolean(data.draft) && !isPreview,
    // Computed from the raw markdown, not from templateContent: reading a
    // collection item's rendered content while another template builds
    // throws TemplateContentPrematureUseError.
    leestijd: (data) => data.page.rawInput,
    permalink: (data) => {
      if (data.draft && !isPreview) return false;
      return `/blog/${data.page.fileSlug}/`;
    },
  },
};
