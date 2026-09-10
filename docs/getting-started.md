# Getting started

Everything you need for the day-to-day: write a post, tag it, preview it,
publish it.

## Once

```bash
npm install
```

Node 24 or later. `.node-version` pins it, so mise picks it up.

## Every time

```bash
npm start
```

Opens the site on <http://localhost:8080> and rebuilds on save. Leave it running
while you write.

| Command                | Does                                         |
| ---------------------- | -------------------------------------------- |
| `npm start`            | Preview with live reload; drafts are visible |
| `npm run build`        | Build to `_site/`; drafts are left out       |
| `npm run format`       | Prettier over everything except templates    |
| `npm run format:check` | Check formatting without writing             |
| `npm run clean`        | Delete `_site/`                              |

## Writing a post

Make a file in `src/blog/posts/` named `YYYY-MM-DD-een-titel.md`:

```markdown
---
title: Een titel
description: Eén of twee zinnen. Verschijnt in de lijst en in de feed.
tags: [ai, onderwijs]
---

De eerste alinea.
```

That is the whole contract.

- **The date comes from the filename.** Eleventy strips the prefix, so the post
  lands at `/blog/een-titel/` and you never write a `date:` field.
- **`description` is not optional in practice.** It is the standfirst on the
  post, the summary in every listing, and the description search engines show.
- **`tags` are slugs from `src/_data/topics.js`.** See below.
- Everything else is plain Markdown. Headings start at `##`; the `#` is the
  title in the front matter.

### Front matter fields

| Field         | Required | Notes                                  |
| ------------- | -------- | -------------------------------------- |
| `title`       | yes      | Sentence case, never Title Case        |
| `description` | yes      | One or two sentences                   |
| `tags`        | yes      | A list of slugs from `topics.js`       |
| `draft`       | no       | `true` keeps it out of `npm run build` |

### Drafts

Add `draft: true` and the post shows up in `npm start` but is not built, not
listed, and not in the feed or sitemap. Delete the line to publish.

### What the theme gives you

Ordinary Markdown gets the house styling for free: `##` headings in forest,
bullet lists with sage em-dashes, numbered lists with maple numerals, bold in
forest, code on a panel with a sage spine. Beyond that:

````markdown
> Een citaat dat groot en cursief uitkomt.
>
> <cite>Wie het zei</cite>

<p class="callout">Een kader op perkament met een sage lijn links.</p>

```python/2
# Regel 3 wordt gemarkeerd
```
````

The full class list is in [theme.md](theme.md).

## Adding a tag

Tags come from `src/_data/topics.js`, which is the only place they exist. Add an
entry:

```js
{
  slug: 'evaluatie',
  label: 'Evaluatie',
  description: 'Hoe we meten of iemand iets kan.',
},
```

The page at `/tags/evaluatie/` and the entry on `/tags/` appear on the next
build. Now use `evaluatie` in a post's `tags`.

**Use a slug that is not in `topics.js` and the post gets no tag page.** The
build says so rather than failing:

```
[tags] "evaluate" in ./src/blog/posts/… has no page.
       Add it to src/_data/topics.js or fix the spelling.
```

If you see that line, you have a typo or a missing entry.

> The file is called `topics.js`, not `tags.js`, because a global data file
> named `tags` shadows Eleventy's own `tags` front matter key and every page
> then reads the topic list as its own tags.

## Editing the static pages

`src/over-mij.md` and `src/over-deze-site.md`. They use the `page.njk` layout
and take `title`, `eyebrow`, `lead` and `permalink`.

To add another one, copy an existing file, change the `permalink`, and add it to
`nav` in `src/_data/site.js` if it belongs in the navigation.

## Publishing

Push to `main`. The workflow in `.github/workflows/deploy.yml` builds the site
and publishes it to <https://lars-derichter.github.io>.

**The first deploy needs Pages switched on**: Settings → Pages → Source → GitHub
Actions. Until you do, the workflow reports a skipped run rather than a red
build.

## Before you push

```bash
npm run build          # must exit clean, and mind any [tags] warning
npm run format         # prettier rewraps markdown at 80 characters
```

Optionally, against a running `npm start`:

```bash
npx pa11y --standard WCAG2AA http://localhost:8080/
```

## Where things live

| Path                  | What                                |
| --------------------- | ----------------------------------- |
| `src/blog/posts/`     | The posts                           |
| `src/_data/site.js`   | Title, description, URL, navigation |
| `src/_data/topics.js` | The tags                            |
| `src/_includes/`      | Layouts and partials                |
| `src/assets/css/`     | The two stylesheets                 |
| `eleventy.config.js`  | Filters, collections, plugins       |
| `docs/theme.md`       | The design system                   |

## Things you might want later

Neither is installed, both are one line away:

- **Images** — `@11ty/eleventy-img` resizes and converts at build time. Until
  then, put files in `src/assets/` and link them directly.
- **A menu that builds itself** — `@11ty/eleventy-navigation`. The current
  navigation is three fixed entries in `site.js`, which is simpler while it
  stays three.
