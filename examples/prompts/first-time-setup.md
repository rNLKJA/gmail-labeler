# First-time setup prompt

Copy and paste into Cursor or Claude:

```text
Run the gmail-labeler skill in first-time setup mode.

lookback_days: 365
Scope: newer_than:365d -in:sent -in:chats -in:draft
Dry run: true

Goal: build my 1:1 sender→label map and report it before applying.

Steps:
1. Read MEMORY.md (or MEMORY.template.md if missing), references/email-policy.md,
   and references/provider-rules.md (or provider-rules.template.md if missing).
2. Scan all distinct sender domains in scope.
3. Derive master labels on demand from planned children (create when first child
   under a parent is needed).
4. Propose provider labels grouped by parent. Note rule-satisfied skip count.
5. Report the full plan — do NOT call create_label, label_thread, or
   unlabel_thread until I confirm.
6. After confirmation, apply labels to gaps only, persist to provider-rules.md,
   run: python scripts/generate_filters.py references/provider-rules.md --output-dir .
   Remind me to import gmail-filters.xml in Gmail.
```

Adjust `lookback_days` and scope together (e.g. `lookback_days: 90` →
`newer_than:90d`).

## Expected output

- Count of distinct senders found
- Masters to create on demand (or already present)
- Rule already satisfied (skipped) count
- Proposed label map grouped by parent category
- Keep vs archive recommendation per provider
- List of senders skipped (OTP, personal, ambiguous)
- Confirmation prompt before applying

## After first run

Import `gmail-filters.xml` in Gmail (Settings → Filters → Import) and tick
"Apply to existing conversations" to clear the backlog in one pass.
