---
description: Update a page and add alt text to images
argument-hint: File name
---

## Context

Parse $ARGUMENTS to get the following values:

- [filename]: Name of file we will make edits to

## Task

Inspect the jekyll markdown file located at `filename` and look for img tags that don't have alt text. Inspect the 
referenced image and add descriptive and tone neutral alt text in accordance with applicable best practices and RFCs. 
