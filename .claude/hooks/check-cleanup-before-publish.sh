#!/bin/sh
# Blocks `git push` while any PUBLISHED post still contains an unresolved
# <<link marker>>. Those markers are the one machine-checkable sign that
# /bh-cleanup has not been run on a post that is about to go live.
#
# Unpublished posts (published: false) are ignored on purpose -- markers are
# expected while a post is still being drafted.
#
# Exits 0 and stays silent when everything is clean, so ordinary pushes are
# unaffected. Fails open: if anything unexpected happens, the push proceeds.

set -u

root="${CLAUDE_PROJECT_DIR:-.}"
cd "$root" 2>/dev/null || exit 0
[ -d _posts ] || exit 0

# Published = the front matter does NOT carry `published: false`.
offenders=$(grep -L '^published: false' _posts/*.markdown 2>/dev/null \
            | tr '\n' '\0' \
            | xargs -0 grep -l '<<' 2>/dev/null \
            | sed 's|^_posts/||' \
            | tr '\n' ' ')

[ -z "$offenders" ] && exit 0

reason="Unresolved <<markers>> in published post(s): ${offenders}- run /bh-cleanup on each before pushing, or set published: false while still drafting."

if command -v jq >/dev/null 2>&1; then
  jq -nc --arg r "$reason" \
    '{hookSpecificOutput:{hookEventName:"PreToolUse",permissionDecision:"deny",permissionDecisionReason:$r}}'
else
  # jq missing: fall back to exit code 2, which blocks and feeds stderr back.
  echo "$reason" >&2
  exit 2
fi
exit 0
