/**
 * The blog's topics, and the single source of truth for which tag pages
 * exist. src/tags/tag.njk paginates over this list, so adding a topic is
 * one entry here plus using its slug in a post's frontmatter.
 *
 * NOT named tags.js on purpose: a global data file called `tags` shadows
 * Eleventy's own `tags` frontmatter key, and every page would then read the
 * topic list as its own tags. The URLs stay /tags/ regardless.
 *
 * The slug is what you write in frontmatter and what appears in the URL;
 * the label is what readers see, which is why "ai-onderwijs" can display
 * as "AI+onderwijs".
 */
export default [
  {
    slug: 'ai',
    label: 'AI',
    description:
      'Wat artificiële intelligentie kan, niet kan, en wat ze met ons doet.',
  },
  {
    slug: 'onderwijs',
    label: 'Onderwijs',
    description:
      'Lesgeven, leren en het hoger onderwijs, los van welke technologie dan ook.',
  },
  {
    slug: 'ai-onderwijs',
    label: 'AI+onderwijs',
    description:
      'Waar de twee elkaar raken: AI in de klas, in de opdracht en in de evaluatie.',
  },
];
