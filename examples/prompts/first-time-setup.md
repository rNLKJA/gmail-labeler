# First-time setup prompt

Copy and paste into Cursor or Claude:

```text
Run the gmail-labeler skill in first-time setup mode.

Follow references/initial-setup-checklist.md in order.
Hard rule: Step 1 master categories BEFORE Step 2 mail analysis.

lookback_days: 90
max_threads: 50
Scope: newer_than:90d -in:sent -in:chats -in:draft
Dry run: true

Goal: checklist dry run — report Steps 1, 3, 4 before any Gmail mutations.

Steps:
0. Read config.yaml if present, MEMORY.md (or MEMORY.template.md if missing),
   references/email-policy.md, references/provider-rules.md (or template if missing).
   list_labels → build name→ID map.
1. Create master categories (full taxonomy table by default) — BEFORE scanning mail.
   Refresh list_labels. Report created vs already present.
2. Analyse mail — paginate search_threads; domain dedupe; classify each distinct
   domain; build sender→label plan grouped by parent. No create_label or label_thread.
3. Report planned Parent/Provider children (Step 3) and threads to file (Step 4).
   List rule-satisfied skip count and senders skipped (OTP, personal, ambiguous).
4. Do NOT run Steps 1, 3, or 4 live until I confirm.
5. After confirmation: create any missing children (Step 3), apply labels (Step 4),
   persist provider-rules.md, run:
   python scripts/generate_filters.py references/provider-rules.md --output-dir . --log-summary
   Remind me to import gmail-filters.xml in Gmail.
```

Adjust `lookback_days` and scope together (default 90). Widen to 365 only if needed.

## Expected output (checklist format)

```
## Initial setup — dry run

**Checklist**
- [x] Step 0 — Files loaded
- [ ] Step 1 — Masters: …
- [x] Step 2 — Analyse: N distinct domains, M threads in scope
- [ ] Step 3 — Children: …
- [ ] Step 4 — Apply: …

**Rule already satisfied (skipped):** …
**Skipped for review:** …
**Keep vs archive:** …

Confirm to run Steps 1, 3, 4 live?
```

Also include:

- Count of distinct domains (not raw thread count)
- **Step 1 — Masters** to create (or already present)
- **Step 3 — Provider children** to create (or already present)
- Proposed label map grouped by parent category
- Confirmation prompt before applying

## After first run

Import `gmail-filters.xml` in Gmail (Settings → Filters → Import) and tick
"Apply to existing conversations" to clear the backlog in one pass.
