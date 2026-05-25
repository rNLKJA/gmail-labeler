# Dry-run prompt

Copy and paste to preview a run without Gmail mutations:

```text
Run the gmail-labeler skill in dry-run mode.

lookback_days: 30
max_threads: 50
Scope: newer_than:30d -in:sent -in:chats -in:draft
Dry run: true

For first-time setup, follow references/initial-setup-checklist.md:
Step 1 masters before Step 2 analysis. Report Steps 1, 3, 4 separately.
Do NOT call create_label, label_thread, or unlabel_thread until confirmed.
Show: checklist status, keep/archive decisions, rule-satisfied skips, and items
for review.
```

For **returning runs**, use `in:inbox` scope. For **backfill**, use
`has:nouserlabels newer_than:{lookback_days}d` (see `backfill-gap-fill.md`).
