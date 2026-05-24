# Dry-run prompt

Preview what the skill would do without changing anything:

```text
Run the gmail-labeler skill in dry-run mode.

Scope: newer_than:30d
Dry run: true

Report the full labelling plan but do NOT call label_thread or unlabel_thread.
Show: proposed labels, keep/archive decisions, and anything that would be skipped.
```

Use this to test a new scope or validate label placements before applying.
