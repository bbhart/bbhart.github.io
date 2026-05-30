---
description: Update a page or set of pages and add helpful metadata that will help with agent optimization
argument-hint: Glob
---

## Context

Parse $ARGUMENTS to get the following values:

- [glob]: File glob (e.g. 2025-08-*) or specific file to process

Posts live in `_posts/`, and filenames use hyphenated dates (`YYYY-MM-DD-...markdown`).
Normalize the argument before resolving: a compact date like `20260512` becomes
`2026-05-12`, so the lookup is `_posts/2026-05-12*`. A bare `2025-08-*` resolves to
`_posts/2025-08-*`.

## How the metadata is used

The metadata you add goes in the **post's YAML front matter**. It is consumed by the
Jekyll plugin `_plugins/travel_data_generator.rb`, which generates the structured data
file at `api/travel-data.json` (a build artifact — never edit it directly). You can
refresh it manually with `ruby scripts/regen-travel-data.rb`.

**The schema is the allow-list in `_plugins/travel_data_generator.rb` (the array of
field names passed to `post_entry`). Read that file first.** Only emit front-matter
keys that appear in that allow-list — any other key is silently dropped by the
generator. Do NOT reverse-engineer the schema from `api/travel-data.json` or from other
posts; the allow-list is authoritative.

## Task

The user will pass either a single file name or a file glob. For each Jekyll markdown
file matching `glob`:

1. **Skip if already done.** If the front matter already contains a `locations:` block,
   skip the file unless it is clearly missing fields the post content supports. Report
   skipped files at the end. This keeps multi-file globs cheap.

2. **Add metadata.** Read the post body and add the relevant fields from the
   `travel_data_generator.rb` allow-list — e.g. `locations`, `accommodations`, `venues`,
   `transport`, `activities`, `dining`, `day_type`, `trip_stage`, `companions`,
   `weather`, `notable_experiences`, and so on. Use only what the post content
   factually supports; do not invent specifics (names, distances) that aren't in the
   text or images. Match the structure used by recent sibling posts in the same trip
   (same `rollup_key`) for consistency.

3. **Validate the YAML** after editing. Use this one command (handles the `date:`
   field, which trips up `safe_load`):

   ```
   awk 'BEGIN{c=0} /^---[[:space:]]*$/{c++; if(c==2){exit} next} c==1{print}' <file> \
     | ruby -rdate -ryaml -e "YAML.safe_load(STDIN.read, permitted_classes:[Date]); puts 'YAML OK'"
   ```

## Images

Most posts arrive already alt-texted by the upstream image skill. To avoid unnecessary
analysis, only inspect images that need work:

- **Missing alt text:** if an `<img>` tag has no `alt=`, analyze the image and add
  factual, verbose alt text. (Videos do not take alt text.)
- **webp/avif:** if an `<img>` references a `.webp` or `.avif` file, convert it to `.jpg`
  or `.png` with a standard macOS CLI (`sips`), retaining the same resolution and
  quality. Update the `src` and delete the replaced file from `assets/`.
- **Too large for recognition:** if an image is too large to analyze, use a standard
  macOS CLI (`sips`) to make a temporary resized copy for analysis only — do not alter
  the published asset.

Grep the file once for `<img` / `.webp` / `.avif` and tags missing `alt=` rather than
opening every image.
