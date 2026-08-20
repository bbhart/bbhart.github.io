---
description: Process staged media and add it to a blog post
argument-hint: Filename prefix (YYYYMMDD) — omit to process everything staged
---

## Execution Rules

**PRE-APPROVED** - run the entire workflow end to end, never ask:
- Read/inspect: ls, find, stat, cat, head, tail, grep, file, exiftool, ffprobe, Glob, Grep, Read
- Create new files: sips, ffmpeg (writing temp_* files only)
- Navigation: cd, pwd
- The rename + move batch into `assets/`
- Appending tags to the resolved post
- Deleting the processed originals from the staging folder, and removing an emptied `proc/{prefix}/`

Still print the naming table before moving, so the run is auditable — but print it and continue,
don't stop for approval. The only reason to stop is the one genuine ambiguity called out below:
a prefix that matches zero or multiple posts.

**Staged media is work to do, not a state to report.** If files are sitting in staging, process
them. Never end a run having only described what's there — the point of the folder is that its
contents get processed and removed. Two specific non-reasons to stop:

- **No `assets/{prefix}-*` exist yet.** That's the normal condition for a day nobody has processed.
  It's the trigger to process, not a reason to hold back.
- **Nothing obviously matches.** Unfamiliar or unexpected staged content still gets processed;
  describe it in the report rather than leaving it staged.

The same applies when you arrive here sideways — asked whether staging is clean, or which files
are already published. Answer the question, then process whatever turned out to be unprocessed
in the same run.

## Context

Parse $ARGUMENTS:

- `prefix` (optional): filename prefix, `YYYYMMDD`. Limits the run to that one day.
- **No argument → process everything staged**, one prefix at a time. This is the normal way to
  run it; a bare `/bh-add-post-media` should drain the staging folder completely.

Staging root: `/Users/bhart/Downloads/proc`

Media may be staged two ways:

- **Per-day subdirectory** — `proc/YYYYMMDD/` holding that day's files. Lets several days sit staged
  at once without mixing.
- **Loose in the root** — `proc/*.HEIC` etc. The older layout, still supported.

## Task

Take the media staged in the staging folder, size it for the web, name it descriptively,
move it into `assets/`, and append the HTML tags to the matching blog post.

### 0. Build the work list

Inventory the staging root first:

    find /Users/bhart/Downloads/proc -mindepth 1 -not -name '.DS_Store' | sort

- **Prefix given** → the work list is that one prefix.
- **No prefix** → the work list is every `YYYYMMDD` subdirectory holding at least one media file,
  in ascending date order, plus one final entry for any loose media in the root.

Print the work list, then run steps 1–6 for each entry in turn. A failure on one prefix doesn't
abort the rest — record it and continue to the next.

Empty `YYYYMMDD` directories are not work. Remove them as you go and note it in one line; they're
usually a staging folder made ahead of the photos.

If the work list comes out empty, say so and exit cleanly. Nothing staged is a normal outcome.

### 1. Resolve

**Source folder.** For the prefix currently being processed:

1. `proc/{prefix}/` exists → that directory is the source. Only its files are processed.
2. Otherwise → the staging root, `proc/*`, ignoring any `YYYYMMDD` subdirectories.

State which source you picked before processing anything.

If a prefix was given explicitly and neither source has media for it, list the `YYYYMMDD`
directories that *do* exist and stop — the prefix is almost certainly a typo.

**Target post.** Glob `_posts/` for a post whose date matches `prefix`
(`20260730` → `_posts/2026-07-30-*.markdown`). Exactly one match: state which post and continue.
Zero or multiple: stop and ask. Do not rely on which file is open in the editor — that signal is
often absent.

**Prior assets.** Glob `assets/{prefix}-*` and note what already exists, so a re-run doesn't
duplicate work. Zero matches is the ordinary case for a fresh day — these will simply be the
first assets for that post. Proceed.

### 2. Process

Write every output to a temp name (`temp_1.jpg`, `temp_2.jpg`, `temp_video.mp4`) alongside the
originals in the source folder, so originals stay intact until step 6. Never send an original,
full-size file for analysis.

Images — convert to JPG at **1024px wide**, preserving aspect ratio:

    sips -s format jpeg --resampleWidth 1024 "$src" --out "temp_N.jpg"

Use `--resampleWidth`, not `-Z`. `-Z` caps the *longest* edge, which silently yields 768px-wide
portrait images that don't match the existing assets. Portrait shots should come out 1024×1365,
landscape 1024×768. Images already narrower than 1024px still get converted, at their original width.

**Check EXIF Orientation first.** Some files (notably 3840×2160 iPhone stills) are stored landscape
with a `Rotate 90 CW` flag, so they *display* portrait. `--resampleWidth` sizes the stored buffer, so
those come out only 576px wide on screen. Don't try to compensate with `--resampleHeight` — sips
stops honoring the flag and the image lands sideways. Bake the rotation in, clear the flag, then
resize:

    exiftool -T -Orientation "$src"          # anything other than "Horizontal (normal)"
    sips -s format jpeg --rotate 90 "$src" --out rot.jpg
    exiftool -Orientation=1 -n -overwrite_original rot.jpg
    sips --resampleWidth 1024 rot.jpg --out "temp_N.jpg"
    rm rot.jpg

Verify the result: every finished image should report `pixelWidth: 1024`.

Video — strip audio, scale to 1024 wide, enable faststart for web embedding:

    ffmpeg -y -i "$src" -an -vf "scale=1024:-2" -c:v libx264 -crf 24 -preset medium \
      -movflags +faststart temp_video.mp4

If `ffmpeg` is missing, process the images anyway, report the video as skipped, and leave its original
in place.

### 3. Analyze

- Read the **resized temp** files to describe visual content. For video, extract a couple of frames
  with ffmpeg and read those (delete the frames afterward).
- Pull `DateTimeOriginal`, `CreateDate`, and GPS from the **originals** via exiftool.

**Video timestamps are UTC.** QuickTime stores `CreateDate` in UTC while photo `DateTimeOriginal` is
local. Sorting them together places videos an hour early during British Summer Time. Convert video
timestamps to local time using the GPS-derived timezone before sorting, and say so in the report.

### 4. Name and move

Rename to `{prefix}-{location}-{description}.{ext}`, lowercase, hyphen-separated:

- `{location}`: resolved from EXIF GPS to a specific place (`heathrow`, `bankside`, `waterloo`,
  `buckingham`), falling back to visual cues when GPS is absent.
- `{description}`: 1-3 words describing the content (`hotel-pool`, `departure-board`).

Examples: `20260730-bankside-shakespeares-globe.jpg`, `20260730-south-bank-riverside-walk.mp4`

Present the full naming table, then move the renamed files into `assets/` without waiting for approval.
On a name collision, skip that file and report it — never overwrite.

### 5. Tag

Append to the resolved post, ordered by capture time ascending (using the corrected video times):

    <img src="/assets/NAME.jpg" alt="..." width="100%" />
    <video src="/assets/NAME.mp4" width="100%" controls playsinline muted></video>

- Skip any asset already referenced in the post.
- Alt text: factual and verbose — signage text, clothing, architecture, weather, what people are doing.
  Match the style already used in the Day 1 post. Video tags take no alt attribute.

### 6. Clean up

Delete the processed originals from the source folder.

If the source was a `proc/{prefix}/` subdirectory and it's now empty apart from `.DS_Store`, remove
the directory too. Leave it in place if any original survived — see the exception below.

**Exception:** if any video ran longer than ~15 seconds, keep its original, skip cleanup for it, and
tell the user so they can trim it manually. Process and tag it normally regardless.

### Reporting

Close with what changed, grouped by prefix: files processed, size before/after, the post written
to, anything skipped or flagged. Report per-file failures and continue the batch rather than
aborting.

End with the staging folder's final state — it should be empty apart from `.DS_Store`. Anything
still sitting there needs a stated reason (an over-length video kept for trimming, a name
collision, a missing post). "I didn't get to it" is not a reason; go process it.
