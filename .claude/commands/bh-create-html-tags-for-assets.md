---
description: Create html img tags for a day's images in the assets folder
argument-hint: Prefix | Markdown file
---

## Context

 You will receive the following parameters:

  - prefix (string): Filename prefix for the images to process
  - markdown_file (file): Markdown file we'll add the html tags to the bottom of

  Access these via:
  - prefix: First argument from $ARGUMENTS (string)
  - markdown_file: Will be available as a file mention/reference

## Task

If you can't determine the `prefix` or `markdown_file` arguments, exit with an error.
If you can't directly read the specific `markdown_file` passed in arguments, exit with an error.

- Look in the 'assets' subdirectory for filenames starting with `prefix`.
- For each of those files, create an html img tag:
    - If there's already an html img tag referencing that image, then skip that file. 
    - Append an html img tag to the bottom of `markdown_file` referencing that image 
    in the '/assets/' subdirectory
    - Specify the width to be 100%, using the width attribute of the img tag.
    - Add suitable alt text based on the content of the image.

