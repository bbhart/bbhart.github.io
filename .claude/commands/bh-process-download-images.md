---
description: Process images and videos in the Downloads/proc directory for a blog post
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

We will process image and video files so they will fit nicely on a blog page.

If you can't determine the `prefix` argument, exit with an error.

For each image or video in the /Users/bhart/Downloads/proc folder:

1. **Resize the image or video file:**
   - Use local MacOS utilities (sips, exiftool, etc.)
   - Resize to maximum 1024 pixels wide while maintaining aspect ratio
   - If image is already 1024px or smaller, still process it but keep original dimensions
   - Convert to JPG format if image
   - Save with a temporary filename (e.g., temp_1.jpg, temp_2.jpg, etc.)
   - Do NOT send the original, unresized image to the server for analysis
   - If the media is a video, then strip the audio, resize it to save bandwidth, and enable web-faststart. We will eventually be embedding it in the target page with a <video> tag. 

2. **Analyze the resized media:**
   - Read the resized (temporary) media file to analyze visual content
   - Extract EXIF location data if available from the original file

3. **Rename with descriptive filename:**
   - Use this format: `{prefix}-{location}-{description}.{extension}`
   - `{prefix}`: The prefix argument (required)
   - `{location}`: Derived from EXIF GPS data if available, otherwise use visual cues
   - `{description}`: 1-3 descriptive words based on image content (e.g., "croissant-coffee", "library-interior")
   - Use lowercase with hyphens between words
   - Example: "20230618-reykjavik-black-house.jpg" or "20250507-roman-colisseum.mp4"

4. **Alert user if videos are too long or would consume too much bandwidth:**
   - If a movie file ends up being longer than 15 seconds or so, inform the user after processing and skip the clean up step that comes next. We will take manual action. 

5. **Clean up:**
   - After all images or images are successfully processed and renamed, delete the original files
   - Original files include all source images (HEIC, JPG, PNG, MOV, MP4, etc.) that were processed