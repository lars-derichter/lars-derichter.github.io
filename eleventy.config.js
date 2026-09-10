import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';
import { feedPlugin } from '@11ty/eleventy-plugin-rss';
import anchor from 'markdown-it-anchor';

import site from './src/_data/site.js';
import tags from './src/_data/tags.js';

/** Dates render in Flemish Dutch: "10 september 2026". */
const longDate = new Intl.DateTimeFormat('nl-BE', { dateStyle: 'long' });

export default function (eleventyConfig) {
  // Assets are copied as-is; there is no CSS build step on purpose.
  eleventyConfig.addPassthroughCopy({ 'src/assets': 'assets' });
  eleventyConfig.addPassthroughCopy('src/favicon.svg');

  // Editing a stylesheet should refresh the browser without a full rebuild.
  eleventyConfig.setServerOptions({ watch: ['_site/assets/**/*.css'] });

  eleventyConfig.addPlugin(syntaxHighlight);

  // Generates /feed.xml itself, so there is no feed template to maintain.
  eleventyConfig.addPlugin(feedPlugin, {
    type: 'atom',
    outputPath: '/feed.xml',
    collection: { name: 'posts', limit: 20 },
    metadata: {
      language: site.lang,
      title: site.title,
      subtitle: site.description,
      base: site.url + '/',
      author: { name: site.author.name },
    },
  });

  // markdown-it ships with Eleventy; amendLibrary tweaks it in place.
  eleventyConfig.amendLibrary('md', (md) => {
    md.set({ html: true, linkify: true, typographer: true });
    md.use(anchor, {
      permalink: anchor.permalink.headerLink({ safariReaderFix: true }),
      level: [2, 3, 4],
      slugify: eleventyConfig.getFilter('slugify'),
    });
  });

  eleventyConfig.addFilter('datumNl', (value) => longDate.format(value));

  eleventyConfig.addFilter('htmlDatum', (value) =>
    value.toISOString().slice(0, 10),
  );

  eleventyConfig.addFilter('leestijd', (content) => {
    // Strip markup first, or every tag name counts as a word.
    const words = String(content)
      .replace(/<[^>]+>/g, ' ')
      .split(/\s+/)
      .filter(Boolean).length;
    return Math.max(1, Math.round(words / 200));
  });

  // Turns the slug in a post's frontmatter into its display label, so
  // "ai-onderwijs" can render as "AI+onderwijs".
  eleventyConfig.addFilter('tagLabel', (slug) => {
    return tags.find((tag) => tag.slug === slug)?.label ?? slug;
  });

  eleventyConfig.addFilter('tagsVanPost', (postTags = []) => {
    const known = new Set(tags.map((tag) => tag.slug));
    return postTags.filter((tag) => known.has(tag));
  });

  eleventyConfig.addCollection('posts', (collectionApi) => {
    const posts = collectionApi
      .getFilteredByTag('posts')
      .sort((a, b) => b.date - a.date);

    // Tag pages are generated from _data/tags.js, not from the posts, so a
    // typo in a post's frontmatter would silently get no page. Say so.
    const known = new Set(tags.map((tag) => tag.slug));
    const reserved = new Set(['posts', 'post']);
    for (const post of posts) {
      for (const tag of post.data.tags ?? []) {
        if (!known.has(tag) && !reserved.has(tag)) {
          console.warn(
            `[tags] "${tag}" in ${post.inputPath} has no page. ` +
              'Add it to src/_data/tags.js or fix the spelling.',
          );
        }
      }
    }

    return posts;
  });

  return {
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
      data: '_data',
    },
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
  };
}
