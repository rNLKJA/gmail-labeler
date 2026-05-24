# First-time setup prompt

Copy and paste into Cursor or Claude:

```text
Run the gmail-labeler skill in first-time setup mode.

lookback_days: 90
max_threads: 50
Scope: newer_than:90d -in:sent -in:chats -in:draft
Dry run: true

Goal: domain dedupe pass — build sender→label map and report before applying.

Steps:
1. Read config.yaml if present, MEMORY.md (or MEMORY.template.md if missing),
   references/email-policy.md, and references/provider-rules.md (or template if missing).
2. Paginate search_threads; collect distinct sender domains (mandatory dedupe).
3. Classify each domain once; derive masters on demand.
4. Propose provider labels grouped by parent. Note rule-satisfied skip count.
5. Report the full plan — do NOT call create_label, label_thread, or
   unlabel_thread until I confirm.
6. After confirmation, apply labels to gaps only, persist to provider-rules.md,
   run: python scripts/generate_filters.py references/provider-rules.md --output-dir . --log-summary
   Remind me to import gmail-filters.xml in Gmail.
```

Adjust `lookback_days` and scope together (default 90). Widen to 365 only if needed.

## Expected output

- Count of distinct domains (not raw thread count)
- Masters to create on demand (or already present)
- Rule already satisfied (skipped) count
- Proposed label map grouped by parent category
- Keep vs archive recommendation per provider
- List of senders skipped (OTP, personal, ambiguous)
- Confirmation prompt before applying

## After first run

Import `gmail-filters.xml` in Gmail (Settings → Filters → Import) and tick
"Apply to existing conversations" to clear the backlog in one pass.
