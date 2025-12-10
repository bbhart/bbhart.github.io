---
description: Create html img tags for a day's images in the assets folder
argument-hint: Prefix
---

## Context

 You will receive the following parameters:

  - prefix (string): Filename prefix for the images to process

  Access these via:
  - prefix: First argument from $ARGUMENTS (string)

## Task

- This will be performed on the file currently open in the editor.
- Clear previous context. You don't need previous context for this, and it sometimes causes you problems.
- Look in the 'assets' subdirectory for filenames starting with `prefix`.
- For each of those files, create an html img tag in the currently open file:
    - If there's already an html img tag referencing that image, then skip that file. 
    - Append an html img tag to the bottom of `markdown_file` referencing that image 
    in the '/assets/' subdirectory
    - Specify the width to be 100%, using the width attribute of the img tag.
    - Add suitable alt text based on the content of the image.
- Try to order the tags by the timestamp of the media, ascending. 
