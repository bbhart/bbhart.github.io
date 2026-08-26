#!/bin/sh
# Blocks `git push` while any PUBLISHED post still carries a sign that
# /bh-cleanup has not been run on it. Two checks, both machine-checkable:
#
#   1. An unresolved <<link marker>> anywhere in the file.
#   2. A placeholder value in the YAML FRONT MATTER (TODO and friends) --
#      e.g. `activities:` whose only entry is `- TODO`.
#
# Check 2 deliberately looks at the front matter ONLY, not the body. "TODO"
# in prose is legitimate -- a packing list, a quoted sign, Brian writing about
# his own to-do list -- and blocking on it would be wrong. In front matter it
# is always a placeholder the metadata pass was supposed to resolve.
#
# Unpublished posts (published: false) are ignored on purpose -- markers and
# placeholders are expected while a post is still being drafted.
#
# Exits 0 and stays silent when everything is clean, so ordinary pushes are
# unaffected. Fails open: if anything unexpected happens, the push proceeds.

set -u

# Placeholder tokens that block when found in front matter. Word-bounded and
# case-sensitive, so `todo` in a lowercase value and words like "Todos" are
# left alone. Add tokens here (e.g. |FIXME) if they start showing up.
placeholder_re='(^|[^[:alnum:]_])(TODO|TBD)([^[:alnum:]_]|$)'

root="${CLAUDE_PROJECT_DIR:-.}"
cd "$root" 2>/dev/null || exit 0
[ -d _posts ] || exit 0

# Published = the front matter does NOT carry `published: false`.
published=$(grep -L '^published: false' _posts/*.markdown 2>/dev/null)
[ -z "$published" ] && exit 0

marker_offenders=$(printf '%s\n' "$published" \
                   | tr '\n' '\0' \
                   | xargs -0 grep -l '<<' 2>/dev/null \
                   | sed 's|^_posts/||' \
                   | tr '\n' ' ')

# Front-matter-only placeholder scan. awk prints just the lines between the
# opening and closing `---`, so body text never reaches the grep. YAML comment
# lines are skipped too: `# background: TBD -- awaiting media` is a note to
# self, not a live placeholder, and several 2007 posts carry one.
meta_offenders=$(printf '%s\n' "$published" | while IFS= read -r post; do
  [ -n "$post" ] || continue
  if awk 'BEGIN{c=0}
          /^---[[:space:]]*$/{c++; if(c==2){exit} next}
          c==1 && $0 !~ /^[[:space:]]*#/{print}' "$post" 2>/dev/null \
     | grep -Eq "$placeholder_re"; then
    printf '%s\n' "${post#_posts/}"
  fi
done | tr '\n' ' ')

[ -z "$marker_offenders" ] && [ -z "$meta_offenders" ] && exit 0

reason=''
if [ -n "$marker_offenders" ]; then
  reason="Unresolved <<markers>> in published post(s): ${marker_offenders% }. "
fi
if [ -n "$meta_offenders" ]; then
  reason="${reason}Placeholder (TODO/TBD) left in the front matter of published post(s): ${meta_offenders% }. "
fi
reason="${reason}Run /bh-cleanup on each before pushing, or set published: false while still drafting."

if command -v jq >/dev/null 2>&1; then
  jq -nc --arg r "$reason" \
    '{hookSpecificOutput:{hookEventName:"PreToolUse",permissionDecision:"deny",permissionDecisionReason:$r}}'
else
  # jq missing: fall back to exit code 2, which blocks and feeds stderr back.
  echo "$reason" >&2
  exit 2
fi
exit 0
