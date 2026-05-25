# Initial setup checklist

Use this checklist on **every first-time setup** run. Follow steps in order — do
not skip ahead, interleave steps, or create nested labels before masters exist.

**Hard rule:** master categories are created **first**; mail analysis happens
**after** masters exist. Provider children come **after** analysis; applying labels
comes **last**.

Prompt frontmatter, `config.yaml`, and explicit user instructions override defaults
where noted.

---

## Checklist

| Step | Action | Gmail writes? | Dry run |
|---|---|---|---|
| **0** | Load `config.yaml` (if present), `MEMORY.md`, `references/email-policy.md`, `references/provider-rules.md` (or templates if missing). Call `list_labels` and build name→ID map. | No | Yes |
| **1** | **Create master categories** — plain names, no `/`. See [Step 1](#step-1--create-master-categories-always-first) below. Refresh `list_labels`. | Yes (unless dry run) | Report only |
| **2** | **Analyse mail** — `search_threads` in scope (`lookback_days`, default 90). Domain dedupe: classify each distinct sender domain once. Build sender→label plan and draft `provider-rules.md`. | No (read only) | Yes |
| **3** | **Create provider children** — every planned `Parent/Provider` label in one batch. Masters from Step 1 must already exist. Refresh `list_labels`. | Yes (unless dry run) | Report only |
| **4** | **Apply labels** — `label_thread` / archive on gaps only. Rule-satisfied skip. Never touch `UNREAD` or `STARRED`. | Yes (unless dry run) | Report only |
| **5** | **Persist** — write `provider-rules.md`, append `LOG.md`, record precedents in `MEMORY.md`. | Local files | Yes |
| **6** | **Generate filters** — `python scripts/generate_filters.py references/provider-rules.md --output-dir <dir> --log-summary`. Remind user to import `gmail-filters.xml` (Settings → Filters → Import → Apply to existing conversations). | Local files | Yes |

Default **`dry_run: true`** on first scope: complete Steps 0–2 and report Steps 1,
3, and 4 plans; no Gmail mutations until the user confirms.

---

## Step 1 — Create master categories (always first)

Run **before** any mail scan used for classification (Step 2).

**Which masters to create:**

| Setting | Masters created in Step 1 |
|---|---|
| **First-time default** | All masters from the taxonomy table in `SKILL.md` → Master label taxonomy |
| `create_all_masters: true` in `MEMORY.md` or `config.yaml` | Same — full taxonomy table |
| `create_all_masters: false` | Masters listed in `MEMORY.md` under standing decisions, **plus** any custom regional masters from `templates/taxonomy-*.md` the user copied in. If none listed, fall back to **full taxonomy** on first-time setup |

**Rules:**

- Create each master with `create_label` using the **plain** display name (`Shopping`, not `Shopping/Amazon`).
- Skip masters that already exist (report as already present).
- Never duplicate a master the user renamed or customised in `MEMORY.md`.
- Report: created vs already present.

**Why first:** Gmail nesting stays clean in the sidebar; nested `Parent/Provider`
labels always have a real parent. Analysis in Step 2 only decides **children** and
keep/archive — not whether masters exist.

---

## Step 2 — Analyse mail (after masters)

Only after Step 1 completes (or dry-run reports Step 1 plan):

1. Paginate `search_threads` with scope `newer_than:{lookback_days}d -in:sent -in:chats -in:draft` (or user override).
2. Collect **distinct sender domains** (mandatory domain dedupe — see `token-efficiency.md`).
3. Classify each domain once: provider, parent category, keep vs archive, skip (OTP/personal).
4. Build the full `Parent/Provider` plan grouped by master.
5. Count rule-satisfied threads (already carry expected label).

Do **not** call `create_label` or `label_thread` during Step 2.

---

## Dry-run report format

End the dry run with checklist status:

```
## Initial setup — dry run

**Checklist**
- [x] Step 0 — Files loaded
- [ ] Step 1 — Masters: create Shopping, Subscriptions, … (3 already present)
- [x] Step 2 — Analyse: 47 distinct domains, 312 threads in scope
- [ ] Step 3 — Children: 38 Parent/Provider labels to create
- [ ] Step 4 — Apply: 89 threads to file (41 rule-satisfied skipped)

**Rule already satisfied (skipped):** 41
**Skipped for review:** 2 (OTP, personal)
**Keep vs archive:** …

Confirm to run Steps 1, 3, 4 live?
```

---

## After first live run

1. Import `gmail-filters.xml` in Gmail.
2. Tick **Apply to existing conversations** to label backlog without another agent pass.
3. Switch to **returning-run** mode for weekly triage (`in:inbox` only).

See `examples/prompts/first-time-setup.md` for a copy-paste prompt.
