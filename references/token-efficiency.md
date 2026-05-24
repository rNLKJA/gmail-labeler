# Token efficiency

Every run should minimise tokens spent on mail the system already handles.

## Scope (biggest lever)

- Default **`lookback_days: 90`** — three months, not a full year.
- **Returning runs:** `in:inbox` only; zero threads processed is OK when filters work.
- **Backfill:** prefer `has:nouserlabels newer_than:{N}d` over scanning all mail in range.
- Widen lookback only when the user explicitly asks (e.g. "go back 12 months").

## Domain dedupe pass (mandatory for first-time and backfill)

Do **not** classify every thread independently when many share the same sender domain.

1. Paginate `search_threads` within scope.
2. Collect **distinct sender domains** (after stripping mail-vendor prefixes).
3. For each domain: match `provider-rules.md`, classify content type once.
4. Apply the label decision to all threads from that domain.
5. Per thread: still apply **rule-satisfied skip** before mutating Gmail.

This cuts repeated reasoning and snippet reads for high-volume senders (newsletters,
receipts from the same store).

## max_threads cap

Optional parameter **`max_threads`** limits how many threads to fetch/process in one
pass (especially dry runs).

- Default: unlimited.
- Suggested dry-run default in prompts: **50**.
- Report: `Processed N of M in scope (cap applied)` when the cap stops pagination early.

## Read less per thread

- Classify from **sender + subject + snippet** from `search_threads`. Do not call
  `get_thread` unless genuinely ambiguous.
- Do not open attachment contents (policy + token savings).

## Skip work already done

- **Rule-satisfied skip** before any label/archive action.
- After first setup, **import `gmail-filters.xml`** with "Apply to existing conversations"
  so Gmail labels historical backlog without the agent re-reading every old thread.

## Efficient first-time setup sequence

1. **Dry run:** domain dedupe pass → build `provider-rules.md` + filter plan.
2. **Confirm** with user.
3. **Apply** labels only to gaps (unlabeled threads), not every thread.
4. **Generate + import filters** — one Gmail import clears most remaining backlog.

## Reporting

- End with **aggregate counts**, not a per-email list (see SKILL.md report structure).
- When filters change, log rule count from generator `--log-summary` in `LOG.md`.

## Persist rules

Write decisions to `provider-rules.md` and `MEMORY.md` so later runs need less
reasoning from scratch.
