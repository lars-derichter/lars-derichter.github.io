# Avonturen in AI-Land

Mijn blog over AI, (hoger) onderwijs en de combinatie daarvan.

A static site built with [Eleventy](https://www.11ty.dev), published to
<https://lars-derichter.github.io>. The content is in Dutch; the tooling and its
documentation are in English.

The look is the `ldr` visual identity, shared with my
[Slidev theme](https://github.com/lars-derichter/ldr-slidev-theme), so slides
and blog read as the same brand: Gentium Book Plus throughout, a warm parchment
and ink palette, forest green as the primary accent and maple red as a sparing
second.

## Quick start

```bash
npm install
npm start        # http://localhost:8080, rebuilds on save
```

Write a post by dropping a file in `src/blog/posts/`:

```markdown
---
title: Een titel
description: Eén of twee zinnen.
tags: [ai, onderwijs]
---
```

The date comes from the filename (`2026-09-10-een-titel.md`), so the post lands
at `/blog/een-titel/`. Push to `main` to publish.

Full workflow in [docs/getting-started.md](docs/getting-started.md).

## Documentation

| Document                                           | Covers                                   |
| -------------------------------------------------- | ---------------------------------------- |
| [docs/getting-started.md](docs/getting-started.md) | Writing, tagging, previewing, publishing |
| [docs/theme.md](docs/theme.md)                     | Tokens, components, the design system    |
| [AGENTS.md](AGENTS.md)                             | Rules for AI coding agents               |

## Structure

| Path                  | Purpose                                      |
| --------------------- | -------------------------------------------- |
| `src/blog/posts/`     | The posts, one Markdown file each            |
| `src/_data/site.js`   | Title, description, URL, navigation          |
| `src/_data/topics.js` | The tags, and the only source of tag pages   |
| `src/_includes/`      | Nunjucks layouts and partials                |
| `src/assets/css/`     | `ldr.css` (the theme) and `code.css` (Prism) |
| `eleventy.config.js`  | Filters, collections, plugins                |
| `docs/`               | This project's documentation                 |

## Tags

Three to start with, defined in `src/_data/topics.js`: **AI**, **Onderwijs** and
**AI+onderwijs**. Each gets a page under `/tags/`. Adding a fourth is one entry
in that file.

**A tag slug that is not in `topics.js` gets no page**, and the build warns
about it rather than failing.

## Commands

| Command                | Does                                       |
| ---------------------- | ------------------------------------------ |
| `npm start`            | Preview with live reload; drafts visible   |
| `npm run build`        | Build to `_site/`; drafts excluded         |
| `npm run format`       | Prettier over everything but the templates |
| `npm run format:check` | Check formatting without writing           |
| `npm run clean`        | Remove `_site/`                            |

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site
and publishes it to GitHub Pages. This is the user-pages repository, so the site
serves from the domain root and needs no path prefix.

**The first deploy needs Pages enabled**: Settings → Pages → Source → GitHub
Actions. Until then the workflow reports a skipped run instead of a red build.

## Accessibility

Every page passes [pa11y](https://pa11y.org) at WCAG 2.1 AA. Several palette
values were darkened from the slide theme to get there; the reasoning is in
[docs/theme.md](docs/theme.md#departures-from-the-slide-theme).

&copy; Lars De Richter
