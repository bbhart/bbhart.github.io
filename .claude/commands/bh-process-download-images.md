---
description: Process images in the Downloads/proc directory for a blog post
argument-hint: Filename prefix
---

## Context

Parse $ARGUMENTS to get the following values:

- [prefix]: Filename prefix the images will be exported to

## Task

If you can't determine the `prefix` argument, exit with an error.

For each image in the /Users/bhart/Downloads/proc folder:
- Proportionally resize the image to be no more than 1024 pixels wide.
- Save the resized image as a jpg in the same directory. 
- Rename the processed files in the same directory using the following rules:
    - Prefix the filename with `prefix`. If no prefix is passed, exit with an error.
    - Create a filename slug with a few descriptive words based on the image itself. Ideally you would use EXIF location data 
        and name the image based on location, plus using information within the image to further describe it. 
        For example, if the image is in Zermatt and has a chair in it, the filename might be "`prefix`-zermatt-chair.jpg". 

