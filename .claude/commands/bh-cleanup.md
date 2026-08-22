---
description: Grammar and spelling pass, plus resolve <<link markers>>
argument-hint: File name or post slug (optional; defaults to the open/most recent post)
---

## Execution Rules

**PRE-APPROVED** — run without asking:
- Read/inspect: ls, find, cat, head, grep, Glob, Grep, Read
- WebSearch / WebFetch to identify link targets
- Editing the target file for spelling corrections and link resolution

**NEVER without asking:**
- Rewriting sentences for grammar, style, tone, or flow. Brian's voice is the point.
  Grammar issues are *reported*, not fixed.
- Guessing at an ambiguous `<<marker>>`. Stop and ask.
- Touching front matter, image tags, or anything outside the prose body. The one exception is
  the `background:` key in pass 4, and only after Brian picks an image.

## Context

Parse $ARGUMENTS:

- `target` (optional): a path, a filename, or a partial post slug. Resolve it against `_posts/`.
  If omitted, use the file currently open in the IDE; if there is none, use the most recently
  modified file in `_posts/`. Print which file you resolved to before starting.
- If the argument matches more than one post, stop and list the candidates.

## Task

Make four passes over the post, in this order. Passes 1–3 cover the prose body; pass 4 checks
one front-matter key.

### 1. Spelling

Correct obvious spelling errors directly. "Obvious" means a real misspelling with one
unambiguous correction: `resturant` → `restaurant`, `Barcleona` → `Barcelona`.

Do **not** touch:
- Proper nouns you can't verify — look them up first (place names, restaurant names, hotel
  names, vessel names). Foreign place names are usually right as written; verify before
  "fixing" them. `Lisboa`, `Sevilla`, `København` are deliberate, not typos.
- Deliberate informalities, sentence fragments, and dashes-as-pauses. That's the voice.
- American vs. British spelling — leave whichever is there.
- Anything inside front matter, HTML tags, image filenames, alt text, or `{% %}` Liquid.

Keep a list of every spelling fix for the report.

### 2. Grammar — suggest, don't change

Read for grammar and clarity, but **make no edits**. Collect suggestions and report them in
chat at the end (see Report below). Worth flagging:

- Subject/verb disagreement, tense drift mid-paragraph
- Dangling or misplaced modifiers
- A sentence that genuinely can't be parsed on first read
- Repeated word (`the the`), missing word, doubled punctuation
- Wrong homophone in a way that changes meaning (`its`/`it's`, `their`/`there`)

Do **not** flag as "grammar":
- Sentence fragments, one-word sentences, starting with And/But/So
- Long run-on sentences that read as speech
- Passive voice, adverbs, word repetition for rhythm
- Comma placement that's a style choice rather than an error

If a paragraph is clean, say nothing about it. A short, high-signal list beats a long one.

### 3. Resolve `<<link markers>>`

Find every `<<...>>` in the body. Each one is Brian asking for a link. The text inside is
sometimes the anchor text he wants, and sometimes an instruction describing the target.

**Establish context first.** Before resolving anything, read the whole post plus its front
matter — `title`, `subtitle`, `date`, `categories`, `destination`, `rollup_key`, `transport`,
`venues`, `activities`. A `<<cathedral>>` in a Lisbon post means the Sé de Lisboa; the same
marker in a Seville post means a different building. The surrounding paragraph usually names
the city, the meal, or the mode of transport.

**Decide: internal or external.**

*Internal* — the marker refers to another post on this blog. Signals: "my trip to X",
"that cruise", "rollup post", "when I was last here", "I wrote about this".

- Trip recaps are posts with `rollup` in `categories` (also `trip_type: rollup`). Find them with
  `grep -rln "^categories:.*rollup" _posts`.
- Day posts of the same trip share a `rollup_key`. Use it to walk from a day post to its recap
  or vice versa.
- Link with a Jekyll `post_url` tag so the build validates it:

  ```
  [the Rome and Silversea trip]({% post_url 2026-05-16-Rome-and-Silversea-recap %})
  ```

  The argument is the `_posts/` filename minus the extension. Never hand-build the URL path —
  the permalink is `/:categories/:year/:title:output_ext` and is easy to get wrong.

*External* — the marker refers to a place, business, landmark, transit operator, or event.

- Use WebSearch to identify it, then WebFetch to confirm the URL actually resolves and is
  about the right thing.
- Prefer, in order: the official site → the official tourism board or national park/heritage
  page → Wikipedia. Avoid TripAdvisor, aggregators, SEO listicles, and anything with a
  tracking query string. Strip `?utm_*` and similar params.
- Prefer a page in English when the site offers one.
- Match the *specific* thing: the actual restaurant branch, the actual museum, the actual
  ferry operator — not a generic city page.

**Anchor text.** Once you know the target, the anchor should *name* it. A bare generic noun —
`<<cathedral>>`, `<<the castle>>`, `<<museum>>`, `<<open-air flea market>>` — is Brian pointing
at a thing, not choosing the words. Expand it to the proper name and link that:

```
We toured the <<cathedral>>.
→ We toured the [Sé de Lisboa](https://www.sedelisboa.pt/).

we continued on to an <<open-air flea market>> that runs Tuesdays and Saturdays
→ we continued on to the [Feira da Ladra](https://www.visitlisboa.com/en/places/feira-da-ladra-flea-market),
  an open-air flea market that runs Tuesdays and Saturdays
```

Rules for expanding:

- Fix the surrounding articles and agreement so the sentence still reads: `an <<market>>` →
  `the [Feira da Ladra]`, not `an [Feira da Ladra]`.
- Use the name a traveler would recognize. Local-language names are good when they're what the
  place is actually called (Sé de Lisboa, Feira da Ladra); use the English name when that's the
  common one (Lisbon Cathedral, National Pantheon). Don't stack both unless the post does it
  elsewhere.
- If the marker already carries descriptive detail worth keeping ("that runs Tuesdays and
  Saturdays", "open-air"), keep it as apposition after the link rather than deleting it.
- If the marker is *already* a specific name (`<<Feira da Ladra>>`, `<<Kviknes Hotel>>`), leave
  it exactly as written and just wrap it. Nothing to expand.
- If front matter already names the thing (`venues`, `dining`, `locations`), use that spelling.
  It's Brian's own, and it keeps the prose consistent with the metadata.

If the marker is an instruction to you rather than prose, rewrite it into the minimum natural
phrase and link that. Keep the surrounding sentence intact:

```
you can read about that cruise <<in this link to Rome and Silversea rollup post>>.
→ you can read about that cruise [in my Rome and Silversea recap]({% post_url 2026-05-16-Rome-and-Silversea-recap %}).
```

Match the sentence's existing capitalization and tense. Don't add words beyond what the link
needs.

**Affiliate links.** Brian's affiliate programs live in `_data/affiliates.yml`, keyed by merchant
name. Use one **only when the marker asks for it** — "my affiliate link", "use my affiliate",
"affiliate link for X". Never quietly swap a plain link for an affiliate one; a marker that just
names a merchant gets an ordinary link.

When a marker does ask:

1. Look the merchant up in `_data/affiliates.yml`. If it's there and `active` is not `false`, use it.
   - Linking the brand itself → use the `home` value verbatim.
   - Linking a specific page (a city page, a particular tour) → take that page's URL and append the
     `params` from the file, per `deep_link_note`. `?` if the URL has no query string, `&` if it does.
   - These params are attribution, not tracking junk — the "strip `?utm_*`" rule above does **not**
     apply to them. Keep them exactly as recorded.
2. If the marker supplies a link that isn't in the file yet, use it, then **add it to
   `_data/affiliates.yml`** following the existing shape (domain, program, home, params, signed_up,
   active, first_used). Say in the report that you added it.
3. If the merchant isn't in the file and the marker doesn't supply a URL, stop and ask — don't
   invent a partner ID.

**Disclosure is required.** Any post containing an affiliate link must carry the disclosure at the
bottom of the body, after the last paragraph and any media:

    {% include affiliate-disclosure.html %}

Add it the first time an affiliate link lands in a post; never add a second copy. If a post already
has the include, leave it. Edit the wording in `_includes/affiliate-disclosure.html` only, so every
post stays consistent.

One caveat worth repeating to Brian when it comes up: the FTC asks for disclosures that are "clear
and conspicuous," which usually means *near* the link rather than at the foot of a long post. The
bottom placement is his call and this command follows it — but if a post is long and the link sits
near the top, mention that a line next to the link would be the safer read.

**When ambiguous, stop and ask.** If you can't pin down the target with confidence — two
plausible cathedrals, a restaurant name that returns nothing, a trip reference that matches
two rollups — pause the pass and ask Brian which one he means. Present the candidates with
their URLs. Do not guess, and do not silently skip. Resume the pass with his answer.

### 4. Background image

Every post should carry a `background:` key in its front matter — it's the hero image behind the
title on the post page and in listings. Check for one:

```
grep -n "^background:" <post>
```

**If it's present**, confirm the file it points at actually exists in `assets/`. A `background:`
pointing at a missing file renders as a blank header and the build won't catch it. Report the
result and move on — don't change a background Brian already chose.

**If it's missing**, propose one. Don't add it silently; front matter is his.

- Candidates are the images already in the post body — `<img src="/assets/...">` tags, in the
  order they appear. Read their `alt` text; that's the fastest way to judge what each one shows.
- Backgrounds are wide and heavily overlaid with title text, so prefer, in this order:
  1. A landscape shot with open sky, water, or an uncluttered field where the title will sit.
  2. A wide establishing view of the day's main place — the one a reader would recognize.
  3. Any image over a video; `background:` takes a still, never an `.mp4`.
  Avoid images whose subject is dead-center and small, tight interior shots, and anything where
  the interesting detail sits where the title text lands.
- Judge the *subject*, not the file. Don't rule a photo out for being portrait or 4:3 — nearly
  every body image is, and it gets cropped anyway. What matters is whether a 16:9 slice of it
  makes a good header.
- If the post body has no images at all, say so and stop — don't go looking through `assets/`
  for something that was never in the post.

Present the top candidate plus one alternate, each with its filename and a one-line description
from the alt text, and ask which he wants.

**Never point `background:` at a body image.** The header is a wide 16:9 band; body images are
4:3 or portrait and will be squashed or badly cropped by the theme. The background is always a
separate, purpose-made derivative. Once Brian picks an image, build one:

1. Crop and resize to **1024×576** — the house size every recent `-bg.jpg` uses. From a body
   image that's already 1024 wide, a centered crop is usually right:

   ```
   sips -c 576 1024 assets/<name>.jpg --out assets/<name>-bg.jpg
   ```

   `sips -c <height> <width>` crops from the center. If the subject sits high or low in the frame
   and a centered crop would decapitate it, say so and ask before cropping — a bad crop is worse
   than no background.
2. Name it the source basename plus `-bg`: `20260804-lisbon-cathedral-tomb-effigy.jpg` →
   `20260804-lisbon-cathedral-tomb-effigy-bg.jpg`. Never overwrite the body image.
3. Confirm the result with `sips -g pixelWidth -g pixelHeight` before writing the front matter.

Then add the key in the house position — directly after `tags:`, single-quoted, site-absolute,
pointing at the `-bg` file:

```
tags: [july2026]
background: '/assets/20260805-strait-of-gibraltar-sun-deck-morocco-bg.jpg'
```

The body keeps its own copy of the photo; that's expected and needs no comment. The two files are
independent from here on.

## Report

When done, print in chat:

1. **File** — the resolved path.
2. **Spelling fixes** — a table: line, before, after. Say "none" if none.
3. **Links resolved** — a table: line, marker text, final anchor text, target URL or
   `post_url`. Note whether internal or external.
4. **Markers still open** — any that needed a decision Brian hasn't given yet.
   Also note any affiliate link used, whether `_data/affiliates.yml` gained an entry, and whether
   the disclosure include was added or was already present.
5. **Background image** — one of: already present and the file verified; already present but the
   file is missing from `assets/` (flag it); added, naming both the source image Brian picked and
   the `-bg.jpg` derivative created for it, with its dimensions; or proposed and awaiting his
   choice. Say "post has no images to draw from" when that's the case.
6. **Grammar suggestions** — numbered, each with line number, the quoted original, and the
   proposed rewrite. State the issue in a few words. These are **not** applied. If there are
   none, say so — don't manufacture them.

Then remind him that grammar suggestions are unapplied, and he can name the numbers he wants
taken.

## Verify

If spelling, links, or the `background:` key changed, confirm the post still builds — a bad `post_url` fails the
Jekyll build. Run `bundle exec jekyll build` if it's quick, and report the result. If the
build isn't available, say so plainly rather than implying it passed.
