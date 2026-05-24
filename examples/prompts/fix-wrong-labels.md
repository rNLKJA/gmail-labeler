# Fix wrong labels prompt

Use when mail has a provider label but the **wrong** one (not rule-satisfied).

```text
Run the gmail-labeler skill in fix-wrong-labels mode.

lookback_days: 30
Scope: newer_than:30d -in:sent -in:chats -in:draft
Dry run: true

Goal: find threads with a provider label that does NOT match the expected label
from provider-rules.md + content type. Do NOT skip rule-satisfied threads.

Steps:
1. Read MEMORY.md, references/email-policy.md, references/provider-rules.md.
2. Scan threads in scope.
3. Report wrong-label cases: current label → expected label, with sender/subject.
4. Do NOT mutate Gmail until I confirm.
5. After confirmation: re-file threads, update provider-rules.md if needed, run
   python scripts/generate_filters.py references/provider-rules.md --output-dir .
   and remind me to re-import gmail-filters.xml.
```

## Expected output

- Count of wrong-label threads found
- Before/after label path per provider
- Rule-satisfied threads skipped
- Filter re-import reminder if rules changed
