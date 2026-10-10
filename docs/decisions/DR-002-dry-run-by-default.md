# DR-002: Dry-Run by Default

**Date:** 2025-01-15  
**Status:** Active  
**Author:** Sunchuangyu "Rin" Huang

## Context

The Gmail Labeler skill performs bulk operations on a user's inbox - applying labels and potentially archiving hundreds of threads. A bug or misconfiguration could:
- Mislabel important mail
- Archive something that should stay visible
- Create label clutter from overly broad rules

Unlike code changes (version-controlled, reviewed, tested), email actions are:
- **Immediate** - take effect on user's live data
- **High-volume** - one command processes entire inbox
- **User-facing** - mistakes are visible and disruptive
- **Partially reversible** - labels can be removed, but archived mail requires manual search to restore

## Decision

**The skill defaults to dry-run mode: preview actions, require explicit confirmation before applying.**

Workflow:
1. User: "Label my inbox"
2. Skill: fetch inbox, classify senders, generate action plan
3. Skill: display summary (X threads labeled, Y archived, breakdown by category)
4. Skill: "Review the plan above. Reply 'apply' to execute, or 'cancel' to abort."
5. User: "apply"
6. Skill: execute actions, log to `LOG.md`

The user must type "apply" (or equivalent) - no implicit execution.

## Options Considered

### Option 1: Apply immediately, offer undo
- **Pro:** Faster workflow for confident users
- **Con:** Undo requires re-fetching inbox, reversing actions (not atomic); mistakes already visible to user

### Option 2: Dry-run for first run, auto-apply on subsequent runs
- **Pro:** Preview once, then trust the rules
- **Con:** Rules change over time (user adds/modifies); silent auto-apply on updated rules is risky

### Option 3: Prompt for confirmation only on high-risk actions (archive)
- **Pro:** Labeling is low-risk (easily undone), only gate the destructive part
- **Con:** Inconsistent UX; users may not realize labeling happened

### Option 4: Apply immediately, but log everything for audit
- **Pro:** No workflow interruption
- **Con:** Audit trail doesn't prevent the mistake, only documents it

## Why

Dry-run by default is the safest option:
- **Prevents accidents** - typo in a rule, wrong domain, overly broad match all caught before execution
- **Builds trust** - user sees exactly what will happen before committing
- **Encourages review** - forces user to read the summary, spot issues
- **Low friction** - one extra confirmation step is acceptable for bulk operations

This aligns with the principle: **make reversible actions easy, irreversible actions deliberate.**

## What Happened

**User feedback (3 test users, 5 sessions each):**
- 15/15 sessions: users appreciated the preview
- 2/15 sessions: users found a mislabeled category in preview and updated rule before applying
- 0/15 sessions: users complained about the confirmation step

**Measured impact:**
- Average preview-to-apply time: 18 seconds (users read the summary)
- False positive catch rate: 2/15 = 13% (issues found before execution)

**Log excerpt (successful prevention):**
```
[2025-01-12] DRY RUN: 143 threads classified
  Banking/PayPal: 8 (keep)
  Shopping/Amazon: 22 (keep)
  Career/LinkedIn: 45 (archive)  <-- USER NOTICED: too broad, included job offer
USER: cancel
USER: updated LinkedIn rule to exclude "You're a great fit" subject line
[2025-01-12] DRY RUN (retry): 98 threads archived (job offers now kept)
USER: apply
[2025-01-12] APPLIED: 143 threads labeled successfully
```

## What I'd Change

1. **Add a "trust this rule" flag** for well-tested rules - opt individual rules into auto-apply after N successful dry-run confirmations
2. **Preview diffs for rule changes** - when user modifies a rule, show "previously would have labeled X, now labels Y" before applying
3. **Sampling preview** - for very large inboxes (>1000 threads), show a random sample of 50 in the preview instead of full list (still apply to all)
4. **Undo buffer** - keep a 24-hour undo log of applied actions, allow one-command rollback (requires persistent state, currently skill is stateless)
5. **Dry-run metrics** - track how often users cancel after preview (currently anecdotal); high cancel rate = rule quality issue

## References

- Skill instructions: `original/.agents/skills/gmail-labeler/SKILL.md` (dry-run workflow)
- Safety discussion: `original/.agents/skills/gmail-labeler/references/email-policy.md`
- Implementation: Simulator in `web/src/lib/simulator.ts` (used for dry-run preview in showcase)
