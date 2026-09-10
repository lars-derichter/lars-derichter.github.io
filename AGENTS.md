# AGENTS.md

Guidance for AI coding agents working in this repository.

This is Lars De Richter's personal site and blog, "Avonturen in AI-Land": a
static site built with [Eleventy](https://www.11ty.dev) 3, published to GitHub
Pages. The visual identity is shared with his
[Slidev theme](https://github.com/lars-derichter/ldr-slidev-theme).

Read [`docs/getting-started.md`](docs/getting-started.md) for the writing
workflow and [`docs/theme.md`](docs/theme.md) for the design system. Do not
restate either here; fix them instead if they are wrong.

## Language

**Site content is Flemish Dutch. Tooling and documentation are English.**

| Where                                                   | Language      |
| ------------------------------------------------------- | ------------- |
| `src/**/*.md`, page copy, UI strings in templates       | Dutch (nl-BE) |
| `README.md`, `docs/`, this file, code comments, commits | English       |

When writing Dutch:

- Flemish, not Dutch from the Netherlands. Avoid filler "even", "hoor", "lekker"
  as an adverb, "tof", "gewoon" for emphasis, overused "leuk". Prefer
  _proficiat_, _kot_, _nu en dan_, _wel eens_.
- Technical terms stay English and take Dutch articles and plurals: _de
  selector_, _selectors_, _markup_, _whitespace_, _deploy_, _framework_.
- Headings in sentence case.
- Avoid the usual AI tells: no "Laten we erin duiken", no meta-introductions, no
  false-contrast pivots ("het is niet X, het is Y"), no em-dashes, no decorative
  tricolons, no bold scattered through prose, no summary wrap-up paragraph that
  restates what was just said. Vary sentence length.

## Formatting

- **Prettier owns formatting.** Run `npm run format` before handing work back.
  Markdown wraps at 80 characters; never wrap it by hand.
- `.njk` templates are prettier-ignored: its HTML parser rewraps template tags
  into invalid syntax. Format them by hand, two-space indent.

## Working in this repo

- **Front matter must be the first thing in a file.** A comment above the `---`
  block stops Eleventy parsing it, and the layout is then silently never
  applied. This has already broken every post once.
- **Tags live in `src/_data/topics.js`.** That file is the only source of tag
  pages. It cannot be renamed to `tags.js`: a global data file named `tags`
  shadows Eleventy's own `tags` front matter key.
- **A page brings its own `<div class="wrap page">`.** The base layout emits
  content bare so a full-width band can sit outside the wrapper. Eleventy chains
  layouts by passing rendered output as `content`, so Nunjucks `{% block %}`
  inheritance does not work across a layout chain — do not reach for it.
- **Do not read `templateContent` off a collection item** while another template
  is building; Eleventy throws. Compute what you need in `eleventyComputed` from
  `page.rawInput` instead, as the reading time does.
- Keep the dependency list short. Four runtime dependencies is the point, not an
  accident.

## Brand rules that are not negotiable

These come from the style guide in the Slidev theme repo. Breaking one is a
visible regression, not a matter of taste.

- **No shadows, no gradients, no glows.** Separate things with whitespace and
  hairlines. The only border radii in the theme are `4px` and `3px`.
- **Green leads, red is the spark.** Roughly one maple mark per view, and green
  marks should outnumber red several to one. If a page has more red than green,
  rebalance.
- **Never set text in sage, ochre or ink-faint.** They fail contrast. They are
  for rules, markers and decoration.
- **Two typefaces, two weights.** Gentium Book Plus and IBM Plex Mono, 400
  and 700. No third family.
- **Sentence case headings.** Never Title Case, never all caps except the
  letter-spaced label style.

Before changing a colour, read the departures section of
[`docs/theme.md`](docs/theme.md): several tokens already sit close to the
contrast floor, and four were darkened deliberately.

## Before handing work back

```bash
npm run build     # must exit clean; a [tags] warning means a bad tag slug
npm run format
```

If you touched anything visual, also check contrast against a running
`npm start`:

```bash
npx pa11y --standard WCAG2AA http://localhost:8080/
```

All pages pass WCAG 2.1 AA today. Keep it that way.

## Commits

- Imperative subject, max ~72 characters, no trailing period.
- One concern per commit, describable without "and".
- Add a body when the reason is not obvious from the diff.
- Commit on `main`.
