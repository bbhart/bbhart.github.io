---
description: Process images in the Downloads/proc directory for a blog post
argument-hint: Filename prefix
---

## Execution Rules

**PRE-APPROVED COMMANDS** - Execute immediately without asking:
- Read operations: ls, find, cat, head, tail, grep, exiftool
- Image analysis: sips (when creating new files), file, identify
- File system navigation: cd, pwd
- Any operation that only reads/analyzes files without modifying them

**REQUIRE CONFIRMATION** - Ask before executing:
- File modifications: mv, rm, cp (when overwriting)
- Any destructive operations

## Context

Parse $ARGUMENTS to get the following values:

- [prefix]: Filename prefix the images will be exported to

## Task

If you can't determine the `prefix` argument, exit with an error.

For each image in the /Users/bhart/Downloads/proc folder:

1. **Resize the image:**
   - Use local MacOS utilities (sips, exiftool, etc.)
   - Resize to maximum 1024 pixels wide while maintaining aspect ratio
   - If image is already 1024px or smaller, still process it but keep original dimensions
   - Convert to JPG format
   - Save with a temporary filename (e.g., temp_1.jpg, temp_2.jpg, etc.)
   - Do NOT send the original, unresized image to the server for analysis

2. **Analyze the resized image:**
   - Read the resized (temporary) JPG file to analyze visual content
   - Extract EXIF location data if available from the original file

3. **Rename with descriptive filename:**
   - Use this format: `{prefix}-{location}-{description}.jpg`
   - `{prefix}`: The prefix argument (required)
   - `{location}`: Derived from EXIF GPS data if available, otherwise use visual cues
   - `{description}`: 1-3 descriptive words based on image content (e.g., "croissant-coffee", "library-interior")
   - Use lowercase with hyphens between words
   - Example: "20230618-reykjavik-black-house.jpg"

4. **Clean up:**
   - After all images are successfully processed and renamed, delete the original files
   - Original files include all source images (HEIC, JPG, PNG, etc.) that were processed