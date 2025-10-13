---
description: Update a page or set of pages and add helpful metadata that will help with agent optimization
argument-hint: Glob
---

## Context

Parse $ARGUMENTS to get the following values:

- [glob]: File glob (e.g. 2025-08-*) or specific file to process

## Task

The user will pass either a single file name or a file glob. Inspect each jekyll markdown file located at `glob` 
and edit the file to include additional metadata entries that will provide an optimized experience for an MCP server. This might include hotels, venues, transport, days at location, activities, and so on. 

Further, if an image tag is missing alt text, analyse the image and provide alt text.
