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
- For each of those files, create an html img tag:
    - If there's already an html img tag referencing that image, then skip that file. 
    - Append an html img tag to the bottom of `markdownfile` referencing that image 
    in the 'assets/' subdirectory
    - Specify the width to be 100%, using the width attribute of the img tag.
    - Add suitable alt text based on the content of the image.

