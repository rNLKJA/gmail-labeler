# Weekly triage prompt

Copy and paste into Cursor or Claude:

```text
Run the gmail-labeler skill in returning-run mode.

Scope: in:inbox -in:sent -in:chats -in:draft
Dry run: false

Inbox only. Skip threads where the expected label from provider-rules.md is
already applied (rule-satisfied skip). Reason from scratch only for senders not
in the rules table or with wrong/missing labels.

At the end:
- Append a summary to LOG.md
- Add any new domains to provider-rules.md
- Regenerate gmail-filters.xml only if rules changed
```

## Expected output

- Rule-satisfied threads skipped (count)
- Unlabeled inbox threads filed under existing labels
- Any new labels created (with report)
- Skipped items for review
- Kept vs archived counts

## Backfill (explicit only)

To label old mail or fix gaps, use first-time setup or ask for backfill with
`has:nouserlabels` — not the weekly returning-run scope.
