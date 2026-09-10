import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';
import { feedPlugin } from '@11ty/eleventy-plugin-rss';
import anchor from 'markdown-it-anchor';

import site from './src/_data/site.js';
import topics from './src/_data/topics.js';

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
    collection: { name: 'postsFeed', limit: 20 },
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
    return topics.find((topic) => topic.slug === slug)?.label ?? slug;
  });

  // First n items of a collection, for the homepage's recent-posts list.
  eleventyConfig.addFilter('head', (array = [], n) => array.slice(0, n));

  eleventyConfig.addFilter('postsMetTag', (posts = [], slug) =>
    posts.filter((post) => (post.data.tags ?? []).includes(slug)),
  );

  eleventyConfig.addFilter('tagsVanPost', (postTags = []) => {
    const known = new Set(topics.map((topic) => topic.slug));
    return postTags.filter((tag) => known.has(tag));
  });

  // The feed plugin's template does `collections.x | reverse`, so it wants
  // the list oldest-first. Reversing the newest-first `posts` collection
  // would not only invert the feed but make `limit` keep the oldest posts.
  eleventyConfig.addCollection('postsFeed', (collectionApi) =>
    collectionApi.getFilteredByTag('posts').sort((a, b) => a.date - b.date),
  );

  eleventyConfig.addCollection('posts', (collectionApi) => {
    const posts = collectionApi
      .getFilteredByTag('posts')
      .sort((a, b) => b.date - a.date);

    // Tag pages are generated from _data/topics.js, not from the posts, so a
    // typo in a post's frontmatter would silently get no page. Say so.
    const known = new Set(topics.map((topic) => topic.slug));
    const reserved = new Set(['posts', 'post']);
    for (const post of posts) {
      for (const tag of post.data.tags ?? []) {
        if (!known.has(tag) && !reserved.has(tag)) {
          console.warn(
            `[tags] "${tag}" in ${post.inputPath} has no page. ` +
              'Add it to src/_data/topics.js or fix the spelling.',
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
