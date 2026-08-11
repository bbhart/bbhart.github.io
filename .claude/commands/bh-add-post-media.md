---
description: Process staged media and add it to a blog post
argument-hint: Filename prefix (YYYYMMDD)
---

## Execution Rules

**PRE-APPROVED** - run immediately, never ask:
- Read/inspect: ls, find, stat, cat, head, tail, grep, file, exiftool, ffprobe, Glob, Grep, Read
- Create new files: sips, ffmpeg (writing temp_* files only)
- Navigation: cd, pwd

**REQUIRE CONFIRMATION** - ask first:
- The rename + move batch (present the full naming table, then ask)
- Deleting originals from the staging folder

Everything before the rename batch is read-only or writes new temp files, so run it unattended.

## Context

Parse $ARGUMENTS:

- `prefix` (required): filename prefix, `YYYYMMDD`. If you can't determine it, exit with an error.

Staging root: `/Users/bhart/Downloads/proc`

Media may be staged two ways:

- **Per-day subdirectory** — `proc/YYYYMMDD/` holding that day's files. Lets several days sit staged
  at once without mixing.
- **Loose in the root** — `proc/*.HEIC` etc. The older layout, still supported.

## Task

Take the media staged in the staging folder, size it for the web, name it descriptively,
move it into `assets/`, and append the HTML tags to the matching blog post.

### 1. Resolve

**Source folder.** Pick exactly one, in this order:

1. `proc/{prefix}/` exists → that directory is the source. Only its files are processed.
   Loose files in the staging root are none of this run's business — mention them as untouched
   and leave them alone.
2. Otherwise → the staging root, `proc/*`, ignoring any `YYYYMMDD` subdirectories.

State which source you picked before processing anything.

If the root has no loose media *and* `proc/{prefix}/` doesn't exist, list any `YYYYMMDD`
directories that *do* exist and stop — the prefix is almost certainly a typo, or the day hasn't
been staged yet. Nothing to process is a normal outcome, not an error: report and exit cleanly.

**Target post.** Glob `_posts/` for a post whose date matches `prefix`
(`20260730` → `_posts/2026-07-30-*.markdown`). Exactly one match: state which post and continue.
Zero or multiple: stop and ask. Do not rely on which file is open in the editor — that signal is
often absent.

**Prior assets.** Glob `assets/{prefix}-*` and note what already exists. A re-run must not
duplicate work.

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

Present the full naming table and **confirm**. Then move the renamed files into `assets/`.
On a name collision, skip that file and report it — never overwrite.

### 5. Tag

Append to the resolved post, ordered by capture time ascending (using the corrected video times):

    <img src="/assets/NAME.jpg" alt="..." width="100%" />
    <video src="/assets/NAME.mp4" width="100%" controls playsinline muted></video>

- Skip any asset already referenced in the post.
- Alt text: factual and verbose — signage text, clothing, architecture, weather, what people are doing.
  Match the style already used in the Day 1 post. Video tags take no alt attribute.

### 6. Clean up

Confirm, then delete the processed originals from the source folder.

If the source was a `proc/{prefix}/` subdirectory and it's now empty apart from `.DS_Store`, remove
the directory too. Leave it in place if any original survived — see the exception below.

**Exception:** if any video ran longer than ~15 seconds, keep its original, skip cleanup for it, and
tell the user so they can trim it manually. Process and tag it normally regardless.

### Reporting

Close with what changed: files processed, size before/after, the post written to, anything skipped
or flagged. Report per-file failures and continue the batch rather than aborting.
