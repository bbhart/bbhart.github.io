---
description: Create html img tags for a day's images in the assets folder
argument-hint: Prefix | Markdown file
---

## Context

Parse $ARGUMENTS to get the following values:

- [prefix]: Filename prefix for the images to process
- [markdownfile]: Markdown file we'll add the html tags to the bottom of

## Task

If you can't determine the `prefix` or `markdownfile` arguments, exit with an error.

- Look in the 'assets' subdirectory for filenames starting with `prefix`.
- For each of those files, append an html img tag to the bottom of `markdownfile` referencing that image 
    in the 'assets/' subdirectory, with a width of 100%, and suitable alt text based on the content of the image.

