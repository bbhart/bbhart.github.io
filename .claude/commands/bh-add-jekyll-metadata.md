---
description: Update a page and add helpful metadata that will help with agent optimization
argument-hint: File name
---

## Context

Parse $ARGUMENTS to get the following values:

- [filename]: Name of file we will make edits to

## Task

Inspect the jekyll markdown file located at `filename` and edit the file to include additional metadata entries
that will provide an optimized experience for an MCP server. This might include hotels, venues, transport, days at 
location, activities, and so on. 

Further, if an image tag is missing alt text, analyse the image and provide alt text.