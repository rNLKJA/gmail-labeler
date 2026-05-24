# First-time setup prompt

Copy and paste into Cursor or Claude:

```text
Run the gmail-labeler skill in first-time setup mode.

Scope: newer_than:1y -in:sent -in:chats -in:draft
Dry run: true

Goal: build my 1:1 sender→label map and report it before applying.

Steps:
1. Read MEMORY.md (or MEMORY.template.md if missing), references/email-policy.md,
   and references/provider-rules.md (or provider-rules.template.md if missing).
2. Scan all distinct sender domains in scope.
3. Ensure master category labels exist (Shopping, Subscriptions, News & Ads,
   Banking, Bills, Travel, Government, Health, Career, Education, Property).
   Create any missing masters before proposing child labels.
4. Propose provider labels grouped by parent (e.g. Shopping/Amazon,
   Subscriptions/Spotify). Note how many threads would be skipped because the
   expected label is already applied (rule-satisfied skip).
5. Report the full plan — do NOT apply labels until I confirm.
6. After confirmation, create masters (if still missing), apply labels only to
   gaps, persist to provider-rules.md, and generate gmail-filters.xml +
   email-receive-rules.md.
```

## Expected output

- Count of distinct senders found
- Master labels to create (or already present)
- Rule already satisfied (skipped) count
- Proposed label map grouped by parent category
- Keep vs archive recommendation per provider
- List of senders skipped (OTP, personal, ambiguous)
- Confirmation prompt before applying

## After first run

Import `gmail-filters.xml` in Gmail (Settings → Filters → Import) and tick
"Apply to existing conversations" to clear the backlog in one pass.
