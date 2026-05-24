# Backfill / gap-fill prompt

Use when old mail still needs labels. **Not** for weekly returning runs.

```text
Run the gmail-labeler skill in backfill / gap-fill mode (first-time-setup workflow).

Scope: has:nouserlabels -in:sent -in:chats -in:draft
Dry run: true

Find mail without the expected provider label. Skip threads where
provider-rules.md is already satisfied (correct label on thread). Report the
plan before applying.

After confirmation: apply labels, update provider-rules.md, regenerate
gmail-filters.xml if rules changed.
```
