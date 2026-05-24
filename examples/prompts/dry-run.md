# Dry-run prompt

Copy and paste to preview a run without Gmail mutations:

```text
Run the gmail-labeler skill in dry-run mode.

lookback_days: 30
Scope: newer_than:30d -in:sent -in:chats -in:draft
Dry run: true

Report the full labelling plan. Do NOT call create_label, label_thread, or
unlabel_thread.
Show: proposed masters (on demand), labels, keep/archive decisions, rule-satisfied
skips, and anything that would be skipped for review.
```

For **returning runs**, use `in:inbox` scope. For **backfill**, use
`has:nouserlabels newer_than:{lookback_days}d` (see `backfill-gap-fill.md`).
