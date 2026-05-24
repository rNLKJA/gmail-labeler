# Weekly triage prompt

Copy and paste into Cursor or Claude:

```text
Run the gmail-labeler skill in returning-run mode.

Scope: newer_than:7d
Dry run: false

Apply existing rules from references/provider-rules.md and precedents from
MEMORY.md. Only reason from scratch for senders not in the rules table.

At the end:
- Append a summary to LOG.md
- Add any new domains to provider-rules.md
- Regenerate gmail-filters.xml if rules changed
```

## Expected output

- Threads filed under existing labels
- Any new labels created (with report)
- Skipped items for review
- Kept vs archived counts
