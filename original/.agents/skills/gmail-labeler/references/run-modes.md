# Run modes and parameters

Read this reference when choosing scope, parameters, or remediation workflows.
Prompt frontmatter and `config.yaml` override these defaults.

## Run modes

| Mode                    | When                                                | Default scope                                              |
| ----------------------- | --------------------------------------------------- | ---------------------------------------------------------- |
| **First-time setup**    | Never run before, or rebuild sender map             | `newer_than:{lookback_days}d -in:sent -in:chats -in:draft` |
| **Returning run**       | After setup + filter import                         | `in:inbox -in:sent -in:chats -in:draft`                    |
| **Backfill / gap-fill** | User explicitly asks to label old or unlabeled mail | `has:nouserlabels newer_than:{lookback_days}d …` preferred |
| **Fix wrong labels**    | Mail has a provider label but not the expected one  | `newer_than:{lookback_days}d …` or label-scoped search     |

All modes apply **rule-satisfied skip** unless fix-wrong-labels explicitly hunts mismatches.

## First-time setup

Follow `references/initial-setup-checklist.md`. Order is fixed — **masters before
analysis**.

1. **Step 0 — Load:** `MEMORY.md`, `references/email-policy.md`,
   `references/provider-rules.md` (or templates), `list_labels`.
2. **Step 1 — Create master categories (always first):** all taxonomy masters by
   default (see checklist § Step 1). Refresh `list_labels`. **No mail scan yet.**
3. **Step 2 — Analyse mail:** domain dedupe pass — paginate `search_threads`,
   classify each distinct sender domain, build sender→label plan. Read only.
4. **Step 3 — Create provider children:** all planned `Parent/Provider` labels in
   one batch; refresh `list_labels`.
5. **Step 4 — Apply labels** to **gaps** only; skip rule-satisfied threads.
6. **Steps 5–6 — Persist** to `references/provider-rules.md`; run
   `python scripts/generate_filters.py … --log-summary`; remind user to re-import
   `gmail-filters.xml`.

Never create a nested child before its master exists; never interleave
`create_label` with `label_thread`.

Default **`lookback_days: 90`**. Default **`dry_run: true`** until user confirms
Steps 1, 3, and 4 live.

## Returning runs (inbox only)

After first-time setup:

1. Read `MEMORY.md`, `references/email-policy.md`, `references/provider-rules.md`.
2. `list_labels` → provider label ID set.
3. `search_threads` with `in:inbox -in:sent -in:chats -in:draft`.
4. Process only threads that do **not** satisfy their expected label.

Never widen to backfill or full mailbox scan on scheduled runs unless configured.

## Inbox-zero mailboxes

Zero inbox threads on returning runs is **normal** when filters pre-archive mail.

**Catch-up (opt-in only):**

`has:nouserlabels newer_than:{catch_up_days}d -in:sent -in:chats -in:draft`

Default `catch_up_days: 7`. Still apply rule-satisfied skip.

## Backfill / gap-fill

User must explicitly request backfill. Prefer `has:nouserlabels` over scanning
every thread in a date range. Use the same **domain dedupe** workflow as first-time setup.

## Fix wrong labels

Use when threads carry a provider label that does **not** match the expected label
from `provider-rules.md` + content classification.

Parameters:

| Parameter       | Required     | Notes                                           |
| --------------- | ------------ | ----------------------------------------------- |
| `wrong_label`   | optional     | Narrow search to threads with this label        |
| `correct_label` | optional     | Target label after reclassification             |
| `lookback_days` | default 30   | Search window                                   |
| `dry_run`       | default true | Report before `unlabel_thread` / `label_thread` |

Workflow:

1. Load memory, policy, rules, labels.
2. Find threads with wrong or partial labels (do **not** skip rule-satisfied correct labels).
3. Reclassify from sender + subject + snippet; use `content_type` column when domain is ambiguous.
4. Dry run: report current → expected per thread.
5. After confirmation: `unlabel_thread` wrong label, `label_thread` expected label; update rules if needed; regenerate filters.

See `examples/prompts/fix-wrong-labels.md`.

## Parameters

| Parameter       | Default             | Maps to                            | Used in                                |
| --------------- | ------------------- | ---------------------------------- | -------------------------------------- |
| `lookback_days` | **90**              | `newer_than:{N}d`                  | First-time, backfill, fix-wrong-labels |
| `catch_up_days` | **7**               | `has:nouserlabels newer_than:{N}d` | Catch-up (opt-in)                      |
| `max_threads`   | unlimited           | Stop pagination after N threads    | Dry run, first pass                    |
| `dry_run`       | true on first scope | —                                  | All modes                              |

**Scope overrides:** natural language maps to parameters — "last 3 months" → `lookback_days: 90`.

**Dry run:** allowed: `search_threads`, `list_labels`, `get_thread`. Forbidden:
`create_label`, `label_thread`, `unlabel_thread`.

## Optional config.yaml

If `config.yaml` exists in the skill folder, read it at run start. Prompt parameters
and explicit user instructions override file values. See `config.yaml.example`.
