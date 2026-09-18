# Editorial redesign — design

Date: 2026-09-18
Branch: `redesign`

## Goal

Replace the Clean Blog (Bootstrap 4) remote theme with a self-owned, framework-free
"editorial travel journal" theme that builds on GitHub Pages' classic Jekyll pipeline.

## Architecture

- Remove `remote_theme`, Bootstrap, jQuery, Font Awesome, and `assets/custom-style.css`.
- Styles live in `_sass/` partials (`_tokens`, `_base`, `_layout`, `_post`, `_lists`),
  imported by `assets/main.scss`. Compiled by `jekyll-sass-converter` (bundled in `github-pages`).
- Only GitHub Pages whitelisted plugins. No front matter or post content changes.
- `head.html` metadata and JSON-LD stay byte-for-byte except stylesheet and font links.

## Visual system

- Palette "warm paper": bg `#FAF7F2`, ink `#1F1D1A`, muted `#6B645A`, accent `#B4532A`, rule `#E6DFD3`.
- Dark mode via `prefers-color-scheme`: bg `#1C1A17`, ink `#ECE6DC`, muted `#A69D90`, accent `#E07A4F`, rule `#35312B`.
- Type: Fraunces (headings), Source Serif 4 (body), Inter (small caps meta, nav, captions).
- ~680px text column; images and figures break out to ~960px on wide screens.

## Layouts

- Header: small-caps wordmark and a single nav row that scrolls horizontally on phones. No JS.
- Post: `background` renders as a full-width `<img>` (60vh, cover), then kicker (categories
  minus `travel`/`rollup`), title, italic subtitle, date and read time. "More from this trip"
  as a numbered list. Previous/next as titled text links.
- Page: same header; image only when `background` is set; `description` as subtitle.
- Home: newest post as a large feature, next 8 as thumbnail rows, then "All posts".
- Posts index: same rows plus Newer/Older links.
- Footer: inline SVG social icons and copyright.

## Fallbacks

Missing `background` → no image block. Missing `subtitle` → excerpt in lists, nothing on post.
No kicker categories → no kicker.

## Verification

Build to a scratchpad dir, serve on port 4001 from the worktree, screenshot key pages at desktop
and phone widths in light and dark, and diff JSON-LD against `main`.
