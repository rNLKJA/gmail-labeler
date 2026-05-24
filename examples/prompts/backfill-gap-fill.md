# Backfill / gap-fill prompt

Use when old mail still needs labels. **Not** for weekly returning runs.

```text
Run the gmail-labeler skill in backfill / gap-fill mode (first-time-setup workflow).

lookback_days: 90
Scope: has:nouserlabels newer_than:90d -in:sent -in:chats -in:draft
Dry run: true

Find mail without the expected provider label. Skip threads where
provider-rules.md is already satisfied (correct label on thread). Report the
plan before applying — no Gmail mutations while dry_run is true.

After confirmation: apply labels, update provider-rules.md, run:
python scripts/generate_filters.py references/provider-rules.md --output-dir .
Remind me to re-import gmail-filters.xml if rules changed.
```
