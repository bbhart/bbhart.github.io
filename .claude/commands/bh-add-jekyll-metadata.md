---
description: Update a page or set of pages and add helpful metadata that will help with agent optimization
argument-hint: Glob
---

## Context

Parse $ARGUMENTS to get the following values:

- [glob]: File glob (e.g. 2025-08-*) or specific file to process

## Task

The user will pass either a single file name or a file glob. Inspect each jekyll markdown file located at `glob` 
and edit the file to include additional metadata entries that will provide an optimized experience for our structured data file @travel-data.json. This might include hotels, venues, transport, days at location, activities, and so on. 

Some referenced images may be too large to do recognition on. In that case, use a standard macos CLI to convert and resize the image temporarily for analysis. 

If you come across img tags referencing images in webp or avif format, convert them using standard macos clis to either jpg or png, ensuring to retain the same resolution and quality. Update the img tag src accordingly and delete the replaced image from the assets folder.

Further, if an image tag is missing alt text, analyse the image and provide alt text.
