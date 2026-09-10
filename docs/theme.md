# Theme

The site's look is the `ldr` visual identity, the same one as my
[Slidev theme](https://github.com/lars-derichter/ldr-slidev-theme), carried to
long-form web pages.

**The source of truth is
[`docs/ldr-style-guide.md`](https://github.com/lars-derichter/ldr-slidev-theme/blob/main/docs/ldr-style-guide.md)
in that repository.** It is written to generalise across media and has a section
on the web. This file does not repeat it: it records what the guide leaves open,
and every point where this site deliberately departs from it.

Two plain stylesheets carry everything, in the same spirit as the slide theme
("plain CSS on purpose so it stays easy to edit"):

| File                      | Holds                                       |
| ------------------------- | ------------------------------------------- |
| `src/assets/css/ldr.css`  | Tokens, typography, layout, every component |
| `src/assets/css/code.css` | The PrismJS colour theme                    |

There is no build step, no framework and no `@apply`. Edit the file and reload.

## Tokens

Declared at the top of `ldr.css` under the same `--ldr-*` names the slide theme
uses, so both codebases share one vocabulary.

| Token               | Value     | Role                              |
| ------------------- | --------- | --------------------------------- |
| `--ldr-paper`       | `#f4eddc` | Parchment: masthead, footer, hero |
| `--ldr-paper-deep`  | `#efe7d2` | Deeper parchment: the hero band   |
| `--ldr-panel`       | `#ede4ce` | Code panels, inset surfaces       |
| `--ldr-paper-white` | `#fbf8f0` | The reading surface               |
| `--ldr-ink`         | `#2a2925` | Body text                         |
| `--ldr-ink-soft`    | `#5e584c` | Subtitles, captions, meta         |
| `--ldr-ink-faint`   | `#8a8270` | Decoration only, never text       |
| `--ldr-forest`      | `#38543e` | Primary accent, links, labels     |
| `--ldr-forest-deep` | `#2c4632` | Link hover, inline code           |
| `--ldr-sage`        | `#7e9a7c` | Rules, markers, spines            |
| `--ldr-maple`       | `#9e3b2d` | The spark: one per view           |
| `--ldr-ochre`       | `#b07d2b` | Numbers, data                     |
| `--ldr-rule`        | `#d8cdb3` | Hairlines                         |
| `--ldr-measure`     | `65ch`    | Text column width                 |

`--ldr-paper-white` and `--ldr-measure` are web-only; the rest come straight
from the slide theme.

### Which colour, when

Green leads and red is the spark. If a page has more red marks than green ones,
something is wrong. Concretely:

- **Forest** — links, bold text, eyebrows, the rule under a heading, post titles
  in a listing, anything small that carries meaning.
- **Sage** — list markers, hairlines, left spines, the quote mark. Structure you
  should feel rather than read.
- **Maple** — one mark per view. In practice: the page's `h1`, the current nav
  item, ordered-list numerals, a quote attribution, a hover state.
- **Ochre** — numbers in prose. Never body text.

## Grounds

Style guide §6 gives two modes, and answers which one this site uses: anything
read for more than a screen takes **Mode B**. So warm white is the reading
surface, and parchment is reserved for the masthead, the footer, the home page's
hero band and callouts. Body text never sits on parchment darker than `#efe7d2`.

## Type

Gentium Book Plus for everything, IBM Plex Mono for code, weights 400 and 700
only. Both load from Google Fonts via `<link>` in
`src/_includes/partials/head.njk`.

Headings are coloured by level, not by page type: `h1` maple, `h2` forest, `h3`
maple, `h4` and below ink. Components override this where repetition would break
the one-spark rule — see the departures below.

## Components

Classes you can use in a template or, with inline HTML, in a post.

| Class                                                                              | What it does                                              |
| ---------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `.wrap`                                                                            | Centres content and adds the side gutter                  |
| `.page`                                                                            | The vertical padding for a page's main block              |
| `.prose`                                                                           | Constrains a block to the reading measure                 |
| `.eyebrow`                                                                         | Letter-spaced uppercase label above a heading             |
| `.ruled`                                                                           | Adds the 40×2px forest rule under a heading               |
| `.ruled--maple`                                                                    | The same rule in maple, for a section break               |
| `.lead`                                                                            | Italic ink-soft standfirst                                |
| `.caption`                                                                         | Italic ink-soft, smaller                                  |
| `.meta`                                                                            | Small-caps meta line                                      |
| `.meta__item`                                                                      | One item in a meta line; CSS draws the `·` between        |
| `.callout`                                                                         | Parchment block with a sage left spine                    |
| `.band`                                                                            | Full-width parchment band with hairlines                  |
| `.tag` / `.taglist`                                                                | A topic label and a row of them                           |
| `.tag-cards`                                                                       | The topic list with sage left spines                      |
| `.post-list`                                                                       | The flat post listing                                     |
| `.table-scroll`                                                                    | Wrap a wide table so it scrolls instead of breaking       |
| `.forest` `.sage` `.maple` `.ochre` `.ink` `.ink-soft` `.ink-faint` `.forest-deep` | Colour utilities, mirroring the slide theme's MDC helpers |

**`.ink-faint` and `.sage` fail contrast on text.** They exist for decoration
and for parity with the slide theme. Do not set body copy, captions or labels in
them.

The house mark is `src/_includes/partials/mark.njk`. It takes a `size` in pixels
and inherits `currentColor` for the petals, so put the colour on the parent:

```njk
<span class="forest">{% set size = 60 %}{% include "partials/mark.njk" %}</span>
```

## Code

`code.css` is a PrismJS theme built from the same values as the slide theme's
Shiki theme (`setup/shiki.ts`): forest keywords, maple strings, muted italic
comments, on the panel ground with a sage left spine.

Highlight lines with Eleventy's syntax-highlight plugin syntax:

````md
```js/1,3-5
```
````

## Departures from the slide theme

Each of these is a deliberate change, not drift. All of them come from the same
place: a slide is read for seconds at projector size, a blog post is read for
minutes at 18px, and the style guide's own caveat that "sage, ochre and
ink-faint are low-contrast" bites much harder in the second case.

1. **Links are forest, not sage.** The guide's web section already says so.
2. **Italic body text stays ink.** The guide colours italic emphasis sage. That
   works for a short line on a slide; in an article an italic book title sits
   inside a paragraph, and sage on warm white is 2.9:1. Sage italics survive on
   `.lead`, `.caption` and blockquotes, where the type is large.
3. **Meta text is ink-soft, not ink-faint or sage.** Ink-faint is 3.6:1.
4. **There is no sage eyebrow.** The slide theme has one for labelling content
   rather than opening a section. At 0.8rem the eyebrow is not large text, so
   4.5:1 applies, and on a post the eyebrow carries the date.
5. **The code palette is darkened.** Against the panel the Shiki values give
   2.5:1 for comments, 2.9:1 for numbers, 4.3:1 for types and 4.4:1 for
   punctuation. Same hues, darkened until each clears 4.5:1; the measured ratio
   is recorded beside every line in `code.css`.
6. **Listings ignore the by-level heading colour.** Post titles and tag-card
   headings are forest. The by-level rule assumes a document with one `h1` and a
   few `h2`s; a listing repeats one level many times, and colouring each entry
   maple turns one spark into a wall of red.
7. **Fonts load from `<link>`, not a CSS `@import`.** An `@import` inside a
   stylesheet chains two blocking requests.

Every page is checked with [pa11y](https://pa11y.org) at WCAG 2.1 AA. Run it
against a local preview:

```bash
npm start
npx pa11y --standard WCAG2AA http://localhost:8080/
```

## Self-hosting the fonts

Google Fonts serves the two families from Google's servers, which means a
visitor's IP reaches Google. If you would rather it did not, self-host:

```bash
npm install @fontsource/gentium-book-plus @fontsource/ibm-plex-mono
```

Then drop the `preconnect` and stylesheet links from
`src/_includes/partials/head.njk`, copy the packages' `files/` directories
through with `addPassthroughCopy` in `eleventy.config.js`, and `@import` the
weights you need (400, 700, 400 italic, 700 italic) at the top of `ldr.css`.

## Changing the theme

- **A colour** — change the token in `:root` at the top of `ldr.css`. Check the
  result with pa11y before committing; several tokens sit close to the contrast
  floor.
- **A new component** — add it at the bottom of `ldr.css` under its own comment
  heading, and add a row to the table above. Keep it flat: no shadows, no
  gradients, no radius other than the theme's `4px` and `3px`.
- **A new page type** — add a layout in `src/_includes/`, put the front matter
  at the very top of the file, and have the template bring its own
  `<div class="wrap page">`.
