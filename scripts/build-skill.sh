#!/usr/bin/env bash
# Build email-labeler.skill zip from the public skill folder.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SKILL_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
DEFAULT_OUTPUT="$(cd "$SKILL_ROOT/.." && pwd)/email-labeler.skill"

OUTPUT="$DEFAULT_OUTPUT"
while [[ $# -gt 0 ]]; do
  case "$1" in
    -o|--output)
      OUTPUT="$2"
      shift 2
      ;;
    -h|--help)
      echo "Usage: $0 [--output PATH]"
      echo "Default output: $DEFAULT_OUTPUT"
      exit 0
      ;;
    *)
      echo "Unknown option: $1" >&2
      exit 1
      ;;
  esac
done

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

rsync -a \
  --exclude '.git' \
  --exclude 'MEMORY.md' \
  --exclude 'LOG.md' \
  --exclude 'references/provider-rules.md' \
  --exclude 'gmail-filters.xml' \
  --exclude 'email-receive-rules.md' \
  --exclude '.DS_Store' \
  "$SKILL_ROOT/" "$TMP/email-labeler/"

(
  cd "$TMP"
  zip -rq "$OUTPUT" email-labeler
)

echo "Built $OUTPUT ($(du -h "$OUTPUT" | cut -f1))"
