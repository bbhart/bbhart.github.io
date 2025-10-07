#!/bin/sh

# 2025-Oct-07 This is the new command to avoid ruby CRL fuckery; I spent like an hour on this :| 
bundle exec ruby -ropenssl -e 'OpenSSL::SSL::VERIFY_PEER = OpenSSL::SSL::VERIFY_NONE; load Gem.bin_path("jekyll","jekyll")' serve

# The previous command
# bundle exec jekyll serve --baseurl=""
