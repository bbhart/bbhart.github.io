#!/usr/bin/env bash
# pre-push hook: enrich new/changed post metadata (via Claude) and regenerate
# api/travel-data.json before changes leave the machine. If the hook modifies
# anything, it auto-commits and aborts the push so you can push once more to
# send the combined batch.
#
# Bypass with: git push --no-verify

set -euo pipefail

REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT"

ZERO_SHA="0000000000000000000000000000000000000000"

# Collect changed _posts files across every ref being pushed.
# Git feeds pre-push one line per ref on stdin: <local_ref> <local_sha> <remote_ref> <remote_sha>
changed_posts=()
while read -r local_ref local_sha remote_ref remote_sha; do
  [ -z "${local_sha:-}" ] && continue
  # Deleted refs: local_sha is zero. Nothing to analyze.
  [ "$local_sha" = "$ZERO_SHA" ] && continue

  if [ "$remote_sha" = "$ZERO_SHA" ]; then
    # New branch on remote; fall back to range against origin/main if we have it.
    if git rev-parse --verify --quiet origin/main >/dev/null; then
      range="origin/main..$local_sha"
    else
      range="$local_sha"
    fi
  else
    range="$remote_sha..$local_sha"
  fi

  while IFS= read -r f; do
    [ -n "$f" ] && changed_posts+=("$f")
  done < <(git diff --name-only --diff-filter=AM "$range" -- '_posts/*.markdown' 2>/dev/null || true)
done

# De-duplicate.
if [ ${#changed_posts[@]} -gt 0 ]; then
  mapfile -t changed_posts < <(printf '%s\n' "${changed_posts[@]}" | sort -u)
fi

if [ ${#changed_posts[@]} -gt 0 ]; then
  echo "pre-push: enriching metadata for ${#changed_posts[@]} post file(s)..." >&2
  printf '  - %s\n' "${changed_posts[@]}" >&2

  if ! command -v claude >/dev/null 2>&1; then
    echo "pre-push: 'claude' CLI not found on PATH. Bypass with --no-verify if needed." >&2
    exit 1
  fi

  # Invoke the slash command non-interactively. --dangerously-skip-permissions
  # is required so the skill's Bash/Edit/Write calls don't hang on prompts.
  if ! claude -p "/bh-add-jekyll-metadata ${changed_posts[*]}" --dangerously-skip-permissions; then
    echo "pre-push: bh-add-jekyll-metadata failed. Aborting push." >&2
    exit 1
  fi
else
  echo "pre-push: no _posts changes in this push; skipping metadata skill." >&2
fi

echo "pre-push: regenerating api/travel-data.json..." >&2
if ! ruby scripts/regen-travel-data.rb; then
  echo "pre-push: regen-travel-data.rb failed. Aborting push." >&2
  exit 1
fi

# If anything is dirty (skill edits, regenerated JSON, converted images),
# bundle it into an auto-commit and ask the user to re-push.
if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "pre-push: hook produced changes; staging and committing them..." >&2
  git add -A
  git commit -m "auto: regenerate travel metadata and travel-data.json"
  cat >&2 <<'MSG'

pre-push: created an auto-commit with the regenerated data.
          Re-run 'git push' to send it.

MSG
  exit 1
fi

echo "pre-push: clean; push proceeding." >&2
exit 0
