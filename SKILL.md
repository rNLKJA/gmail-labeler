---
name: email-labeler
description: Triage and label Gmail by sender/provider so the inbox shows only what matters, and generate importable Gmail filter rules (sender → label) to auto-categorise future mail. Use this skill whenever the user wants to label, sort, file, organize, tidy, or "triage" their Gmail; clean up or clear the inbox; auto-file newsletters, marketing, receipts, or subscription mail by provider; find which senders have no label yet; or build email "rules"/filters that automatically categorise incoming email. Trigger on phrases like "label my email", "sort my inbox", "file my subscriptions", "who don't I have a label for", "archive the junk", "run my email triage", or "draft email rules to auto-categorise" — even when the user doesn't name a specific provider.
---

# Email Labeler

Label the user's Gmail by the provider/company that sent each message, so that
everything routine (newsletters, marketing, receipts, account notices) ends up
filed under a provider label, and whatever is left unlabeled in the inbox is, by
definition, the mail that actually needs a human.

The guiding idea: **prefer the user's existing labels, file by provider, archive
the low-value stuff, keep the records, and never silently lose anything.**

**Two modes:** **First-time setup / backfill** labels mail within a **cutoff window**
once and generates Gmail filters. **Returning runs** only triage **incoming inbox
mail**. **Both modes skip threads where the expected label from
`provider-rules.md` is already applied** — never re-label satisfied mail.

## What this skill does, in one breath

For each message in scope: figure out who sent it → find (or create) the matching
provider label → apply it → archive it out of the inbox **if** it's
marketing/newsletter noise, but **keep** it in the inbox if it's a receipt or
account record → at the end, report what was labeled, what new labels were
created, and anything that was skipped for human review.

## Security & data access

This skill reads message metadata and body text for triage — that is genuinely
sensitive (receipts, 2FA prompts, personal correspondence). Treat every run as
handling private data.

**What the skill reads:**
- Sender address and display name
- Subject, snippet, and message body text
- Label IDs on each thread
- Attachment **filenames** (from message metadata — useful for context, e.g.
  "this thread has `Receipt-2026-05-24.pdf` attached")

**What the skill MUST NOT read:**
- Attachment **contents** — never download, open, decode, parse, OCR, or summarise
  PDFs, images, documents, or spreadsheets. Filename only; content never.
- If the substance of the email lives in an attachment, flag it to the user
  ("`<sender>` sent `<filename>` — want me to open it?") and **wait for explicit
  permission** before doing anything with the file.

**What the skill CAN modify:**
- Add labels to threads
- Remove the `INBOX` label (= archive)
- Create new labels

**What the skill MUST NOT modify:**
- Read state (`UNREAD`) — do not mark things read
- Star state (`STARRED`)
- Importance flags
- Message content, recipients, or headers
- Never send, forward, reply, or delete mail

**Skip-by-design senders (no label, no archive):**
- OTP / one-time-code mail ("Your … code is 123456")
- Login-verification mail
- Security alerts requiring no action
- Genuinely personal mail from individuals

**No outbound data egress:** this skill only calls the user's Gmail MCP connector
and writes to local files (`MEMORY.md`, `LOG.md`, `provider-rules.md`). Anything
beyond that boundary depends on the user's chosen MCP and agent runtime.

**Audit trail:** every run appends to `LOG.md` (scope, labels created, threads
filed, skips). Nothing happens invisibly.

## First-time setup

Use this workflow when the user has never run the skill, or wants to rebuild their
sender→label map from scratch.

1. **Scan sender addresses across the cutoff window.** Default scope:
   `newer_than:1y -in:sent -in:chats -in:draft`. Also useful:
   `has:nouserlabels -in:sent -in:chats -in:draft` to find mail still needing
   labels. Paginate through all results.
   - **Why a cutoff?** Full-mailbox scans are expensive and slow. Most signal
     lives in the last 12 months. The user can widen to `newer_than:2y` or
     `in:anywhere` once happy with the taxonomy.
2. **Build a 1:1 sender → label map.** For every distinct sender domain, map to
   a provider label. Strip mail-vendor prefixes (`mail.`, `email.`, `e.`,
   `info.`, `comms.`, `notify.`, `news.`, `updates.`, `txn.`) to find the real
   brand.
3. **Create master category labels first.** Call `list_labels`, then `create_label`
   for each missing master from the taxonomy table below (plain name, no `/`).
   Skip masters the user has customised in `MEMORY.md`. Report created vs
   already-present masters before creating any `Parent/Provider` child labels.
4. **Categorise and create provider labels in bulk.** Group providers under the
   right parent. Create missing child labels with `create_label` using the full
   `Parent/Provider` display name. Add new master parents only when no existing
   parent fits (record the decision in `MEMORY.md`). When applying labels within
   the cutoff window, **skip threads that already carry the expected label** for
   that sender and content type (see "Rule-satisfied skip").
5. **Persist the map.** Write every domain → label → keep/archive decision to
   `references/provider-rules.md`. This becomes the seed list for every later run.
   Start from `references/provider-rules.template.md` if the file doesn't exist.
6. **Generate Gmail filters.** Produce `gmail-filters.xml` and
   `email-receive-rules.md` so future mail auto-categorises without another scan
   (see "Generating Gmail receive rules" below). After the user imports filters,
   **returning runs should not re-scan historical mail** — only the inbox.

Default to a **dry run** on first use: report the full sender→label plan (including
which master labels would be created) and ask for confirmation before applying
labels.

## Returning runs (inbox only — never re-label)

Use this workflow after first-time setup (and after `gmail-filters.xml` is imported
if possible). The goal is **incoming mail in the inbox**, not a repeat pass over
mail that was already filed.

Every subsequent run follows this lookup order **before** touching any mail:

1. Read `MEMORY.md` — account-specific precedents override general defaults.
2. Read `references/email-policy.md` — category actions and safety rules.
3. Read `references/provider-rules.md` — the sender-domain → label lookup table.
4. Call `list_labels` and build the set of **provider label IDs** (all nested
   `Parent/Provider` labels plus any label path listed in `provider-rules.md`).
5. Call `search_threads` with the returning-run scope (default below). **Only**
   process **inbox** threads that do **not** already satisfy their provider rule
   (see "Rule-satisfied skip"). Reason from scratch only for senders the rules
   table doesn't cover.

**Default scope:** `in:inbox -in:sent -in:chats -in:draft`

Optional narrowing: `newer_than:7d in:inbox -in:sent -in:chats -in:draft` if the
user wants a time window on top of inbox-only.

**Never re-run on rule-satisfied mail:** once a thread carries the **expected**
label for its sender and content type, **skip it entirely** — do not re-label,
re-archive, re-read, or change keep/archive. Gmail filters handle most future mail
automatically; the agent catches unlabeled inbox mail (new senders, filter gaps).

**Explicit backfill only:** to label old mail or fix gaps (`has:nouserlabels`,
`newer_than:1y`, a date range, or "re-scan my mailbox"), the user must ask for
**backfill / gap-fill mode** — that is first-time-setup behaviour, not a returning
run. Do not widen scope silently on scheduled or weekly runs.

The user may override scope, but default to inbox-only unless they explicitly
request backfill.

## Rule-satisfied skip (all runs)

Before applying any label, resolve the **expected label** for the thread:

1. Match sender domain to `references/provider-rules.md` (after stripping
   mail-vendor prefixes).
2. For multi-type brands, use content classification (receipt vs newsletter vs
   membership) to pick the correct `Parent/Provider` path — same logic as label
   selection below.
3. Map the expected label **name** to its ID via `list_labels`.

**If the thread's `labelIds` already include that expected label ID, skip the
thread entirely** — no `label_thread`, no `unlabel_thread`, no body fetch. This
applies to:

- **Returning runs** (inbox-only scope)
- **First-time setup / backfill** within the cutoff window (`newer_than:1y`, etc.)

The cutoff defines *which mail to consider*; rule-satisfied skip defines *which
threads within that window still need work*. A thread labeled correctly last week
inside a `newer_than:1y` scan is skipped, not re-processed.

**Wrong or partial labels:** if the thread has a different provider label but not
the expected one, do **not** skip — file under the expected label (and report the
change). If unsure, add to "needs review".

Count skipped threads as **Rule already satisfied** in the run report.

## Master label taxonomy

On a **fresh start** the user often has no nested labels yet. Before creating any
`Parent/Provider` label, ensure these **master categories** exist as top-level
labels (one `create_label` call each, no slash in the name):

| Master label | Typical children |
|---|---|
| `Shopping` | `Shopping/Amazon`, `Shopping/eBay` |
| `Subscriptions` | `Subscriptions/Spotify`, `Subscriptions/Notion` |
| `News & Ads` | `News & Ads/TLDR`, `News & Ads/Apple` |
| `Banking` | `Banking/PayPal`, `Banking/Chase` |
| `Bills` | `Bills/Origin`, `Bills/Telstra` |
| `Travel` | `Travel/Qantas`, `Travel/Uber` |
| `Government` | `Government/ATO`, `Government/USCIS` |
| `Health` | `Health/Bupa`, `Health/Medicare` |
| `Career` | `Career/LinkedIn`, `Career/Indeed` |
| `Education` | `Education/Coursera`, `Education/MIT` |
| `Property` | `Property/Domain`, `Property/Realestate.com.au` |

**Why masters first:** child-only creation can leave the sidebar looking flat or
out of order. Masters give a collapsible tree before provider labels are added.

**Every run:** after `list_labels`, if you need to create `Parent/Child` and
`Parent` is missing, create the master first, refresh the label map, then create
the child.

Users may rename or extend masters in `MEMORY.md` (e.g. regional groupings). Read
`MEMORY.md` before creating masters; never duplicate a master the user already
uses under a different name.

## Gmail tools you'll use

This skill runs against a connected Gmail MCP. Tool names may be prefixed with a
connection-specific hash, so identify them by capability:

- **search_threads** — find threads with a Gmail query (e.g. `newer_than:1y`).
  Returns sender, subject, snippet, and `labelIds` per message. This is your
  main input; the snippet + subject + sender is usually enough to classify without
  opening the message.
- **list_labels** — list the user's labels with their IDs. Run this once up front
  and build a name→ID map. System labels (`INBOX`, `UNREAD`, `STARRED`,
  `IMPORTANT`, `SPAM`, `TRASH`, `SENT`, `DRAFT`) are not returned but are usable
  by those literal IDs.
- **get_thread** — fetch a thread's full body. Only use this when the
  sender/subject/snippet is genuinely ambiguous; it's slower and rarely needed.
- **label_thread** — add label(s) to a whole thread. This is how you file mail.
- **unlabel_thread** — remove label(s) from a thread. **Archiving = removing the
  `INBOX` label.** There is no separate "archive" tool.
- **create_label** — create a new label. Gmail treats `/` in the display name as
  nesting (`Shopping/Amazon` nests under `Shopping`). On a **fresh mailbox**, Gmail
  may infer a parent when you create a nested name, but the sidebar stays flat and
  messy until the master categories exist. **Always create master labels first**
  (see "Master label taxonomy" below), then create `Parent/Provider` children.

There is no "send" capability and labels are applied at the thread level.

**Connector limitation (important):** this Gmail connector can create labels and
add/remove labels on threads, but it **cannot rename, merge, delete, or recolour
labels** (`update_label`/`delete_label` → permission denied). So: never promise a
rename/merge/recolour — those are manual steps for the user in Gmail. When a label
needs moving, create the new one + re-file mail, and tell the user to delete the
empty leftover and set colours themselves.

## Parameters (ask or infer)

- **Scope** — which mail to process.
  - **First-time setup / backfill:** default `newer_than:1y -in:sent -in:chats
    -in:draft`, or `has:nouserlabels -in:sent -in:chats -in:draft` for gap-fill.
    Use only when the user asks for initial setup or explicit backfill.
  - **Returning runs:** default `in:inbox -in:sent -in:chats -in:draft`. Process
    only inbox threads whose provider rule is not yet satisfied.
  - Other overrides (user must ask): `is:unread`, a specific label, or a custom
    date range for one-off backfill.
- **Dry run** — if the user wants to preview, do everything except `label_thread`
  / `unlabel_thread`, and just report the plan. Default to a dry run on the very
  first use of a new scope, then act once the user confirms the plan looks right.

## Persistent files (read/write these every run)

- `MEMORY.md` — durable, account-specific decisions and precedents. **Read it
  first, every run.** It overrides general defaults when they conflict. Append a
  new precedent whenever you decide a novel case. Start from `MEMORY.template.md`
  if missing.
- `references/email-policy.md` — category actions, safety rules, and attachment
  boundaries. Read on every returning run.
- `references/provider-rules.md` — the sender-domain → label lookup table. Start
  from `references/provider-rules.template.md` if missing.
- `LOG.md` — dated history of what each run did. **Append an entry at the end of
  every run.** Start from `LOG.template.md` if missing.

## Workflow (per-message logic)

1. **Load memory, policy, rules, and labels.** Read `MEMORY.md`,
   `references/email-policy.md`, and `references/provider-rules.md`. Call
   `list_labels` and build a map of full display name → label ID. On first-time
   setup (or when the map has no user nested labels yet), create missing **master
   category** labels before processing mail (see "Master label taxonomy").

2. **Fetch mail in scope** with `search_threads`. Paginate via `pageToken` until
   no more results. Process newest-first.

3. **For each thread, identify the provider.** Use the sender address and display
   name first (the domain is the strongest signal — `dan@tldrnewsletter.com` →
   TLDR; `service@paypal.com` → PayPal; `invoice+statements@mail.anthropic.com`
   → Anthropic). Strip subdomains and mail-vendor prefixes (`mail.`, `email.`,
   `e.`, `info.`, `comms.`, `notify.`, `news.`) to find the real brand. If the
   brand isn't obvious from the domain, the subject/snippet usually names it. If
   it's still unclear, you may look the domain up on the web to identify the
   company before deciding.

4. **Decide whether to act or skip (non-provider mail).** Skip (leave untouched,
   no label) anything that isn't really provider/subscription mail:
   - One-time security codes / OTP / login verification (e.g. "Your … code is
     123456") — ephemeral, labeling them is noise.
   - Genuinely personal mail from an individual person.
   - Calendar invites/notifications from a real person (vs. an automated system).
   - Anything you're unsure is from a company — collect it for the "needs review"
     report instead of guessing.

5. **Classify content type → archive decision.** This is the key split:
   - **Keep in inbox (do NOT archive)** — financial and account *records*:
     receipts, invoices, payment confirmations, order/booking/shipping
     confirmations, statements, tax documents, membership/renewal status,
     password-changed and security-alert notices. Signals: words like *receipt,
     invoice, payment, order confirmation, your order, statement, booking,
     itinerary, has shipped, renewal, your subscription*; senders like
     `invoice@`, `billing@`, `orders@`, `receipts@`, `service@paypal`.
   - **Archive after labeling** — marketing and reading-pile noise: promotions,
     sales, "% off", newsletters, digests, product announcements, win-back ("sorry
     to see you go"), referral nudges, job-alert blasts, advocacy/petition emails.
   - When a message could be read either way, prefer to **keep** it. Wrongly
     keeping a newsletter is a minor annoyance; wrongly archiving a receipt the
     user needed is the failure mode to avoid.

6. **Select the expected label.**
   - **Always prefer an existing label.** If any label's leaf name matches the
     provider (case-insensitive, ignoring punctuation/spacing — `Youtube` ==
     `YouTube`, `Paypal` == `PayPal`), use it, wherever it lives in the tree.
   - **If no label exists, create one** under the parent that fits the content
     type. File by what the mail *is*, not just who sent it:
     - **`Shopping/<Provider>`** — retail/e-commerce purchases and store marketing
       from shops the user buys from (orders, receipts, sale emails). NOT
       memberships or recurring subscriptions.
     - **`Subscriptions/<Provider>`** — paid memberships, streaming, SaaS/apps,
       and recurring billing. Examples: Spotify, Notion, Anthropic, GitHub, Netflix.
     - **`News & Ads/<Provider>`** — newsletters, digests, advocacy, product
       announcements, event/venue promos, dev/marketing mail.
     - **`Banking/<Provider>`** — banks, brokers, payment processors, crypto.
     - **`Bills/<Provider>`** — power, gas, water, internet, phone.
     - **`Travel/<Provider>`** — airlines, hotels, ride-share, bookings.
     - **`Government/<Provider>`** — tax, immigration, council, civic.
     - **`Health/<Provider>`** — insurance, appointments, pharmacy.
     - **`Career/<Provider>`** — job alerts, recruiters.
     - **`Education/<Provider>`** — universities, courses, learning platforms.
     - **`Property/<Provider>`** — agents, listings, rental management (optional).
     - A single brand can span parents by content type: e.g. a YouTube *purchase*
       → `Shopping/YouTube`, a YouTube *membership* → `Subscriptions/YouTube`;
       an Apple Store *order* → `Shopping/Apple`, Apple *marketing* →
       `News & Ads/Apple`.
   - **Ensure the master parent exists** (create `Parent` alone if missing), then
     create the child with `create_label` using the full `Parent/Provider` display
     name so it nests correctly.
   - Treat every created label as provisional: list it in the report so the user
     can rename or move it.

7. **Rule-satisfied skip.** If the thread's `labelIds` already include the
   expected label ID from step 6, **skip** — count as rule already satisfied (see
   "Rule-satisfied skip"). Do not re-archive mail that was intentionally kept in
   the inbox as a record.

8. **Apply.** `label_thread` with the chosen label ID. Then, if step 5 said
   archive *and* the thread still carries `INBOX`, `unlabel_thread` the `INBOX`
   label. Never touch `UNREAD` (don't mark things read) or `STARRED`.

9. **Report** (see format below).

10. **Persist.** Append a dated entry to `LOG.md` (scope, labels created, threads
   filed, skips, coverage). If you created any new labels or decided a novel case,
   add the new domains to `references/provider-rules.md` and record the precedent
   in `MEMORY.md`.

11. **Refresh the Gmail receive rules.** On **returning runs**, regenerate
    `gmail-filters.xml` and `email-receive-rules.md` **only when** provider rules
    changed (new sender added). Skip regeneration if nothing new was filed.

## Generating Gmail receive rules (auto-categorisation)

Manual labelling doesn't scale; Gmail **filters** do. From the same
sender→label→keep/archive mapping in `references/provider-rules.md`, produce two
deliverables the user can apply once:

- **`gmail-filters.xml`** — an importable Gmail filters file. Each rule is one
  `<entry>` with `from` (sender domain), `label` (full nested label name), and
  `shouldArchive=true` for marketing/newsletters (omit it to keep records in the
  inbox). Gmail import: Settings → Filters and Blocked Addresses → Import filters
  → tick "Apply to existing conversations" to also clear the backlog.
- **`email-receive-rules.md`** — the same rules in a human-readable table, grouped
  by archive vs keep, with the import steps and caveats.

**Output location:** write both deliverables to the **Inbox Automation project
root** — `Project Desk/Inbox Automation/gmail-filters.xml` and
`Project Desk/Inbox Automation/email-receive-rules.md` — regardless of whether
the skill is invoked from the Rin-OS mirror or the project folder.

Key points: filters reference labels by **name** (not ID). Match by sender domain;
for multi-type brands add specific sub-address rules (e.g.
`insideapple.apple.com` → News & Ads/Apple). Never add rules for OTP/login/
verification senders or personal mail. A small Python generator over the
mapping is the reliable way to emit both files (keeps XML escaping correct).

## Report structure

End every run with a concise summary, not a per-email wall of text:

```
## Email triage — <scope>, <N> threads in scope, <M> processed

**Rule already satisfied (skipped):** <count>

**Filed under existing labels:** <count>
- <Provider> → <Label>  (×<n>)  [kept | archived]
- ...

**Master labels ensured:** <list — created vs already existed>

**New labels created:** <count>
- <Parent/Provider>  — created for <Provider>, applied to <n> thread(s)
- ...

**Skipped for your review:** <count>
- <sender> — "<subject>" — why skipped (e.g. couldn't identify provider / looks personal / OTP)
- ...

**Kept in inbox (records):** <count>   **Archived (noise):** <count>
```

Then ask whether the new label placements look right. On returning runs, do **not**
suggest widening scope unless the user asks for backfill.

## Worked examples

**Example 1 — receipt, existing provider, keep**
Input: from `service@paypal.com`, subject "Receipt for Your Payment to Spotify…"
Action: label `Shopping/PayPal` (exists). It's a receipt → keep in inbox. No archive.

**Example 2 — marketing, existing provider, archive**
Input: from `newsletter@spotify.com`, subject "Your Weekly Discover…"
Action: label `Subscriptions/Spotify` (exists). Marketing → archive (remove INBOX).

**Example 3 — unlabeled provider, create + report**
Input: from `invoice+statements@mail.anthropic.com`, subject "Your receipt from Anthropic…"
Action: no Anthropic label exists → ensure master `Subscriptions` exists (create if
missing), then create `Subscriptions/Anthropic`, apply it. Receipt → keep in inbox.
Report both master and child if newly created.

**Example 4 — gap fill (backfill mode only, not returning runs)**
Input: from `noreply-purchases@youtube.com`, subject "Your Premium membership will end…"
Scope: `has:nouserlabels` or first-time setup — thread is unlabeled.
Action: `Subscriptions/YouTube` exists but wasn't applied → apply it. Membership
status is a record → keep in inbox.
If the thread already has `Subscriptions/YouTube`, skip (rule satisfied).

**Example 5 — cutoff scan, rule already satisfied**
Input: from `newsletter@spotify.com`, scope `newer_than:1y`, thread already has
`Subscriptions/Spotify` (matches rule + content type).
Action: skip entirely — do not re-label or re-archive.

**Example 6 — returning run, rule already satisfied**
Input: from `newsletter@spotify.com` in inbox, thread already has `Subscriptions/Spotify`.
Action: skip entirely.

**Example 7 — skip (OTP)**
Input: from `no-reply@account.example.com`, subject "Your verification code"
Action: one-time verification code → skip entirely (no label, no archive).

**Example 8 — attachment filename only**
Input: from `receipts@apple.com`, subject "Your receipt", attachment
`Order-W123456789.pdf`
Action: note the filename for context; do NOT open the PDF. Label
`Shopping/Apple`, keep in inbox.

## Why it's built this way

The goal is an inbox where only mail that genuinely needs a human stays visible.
After first-time setup, **Gmail filters plus inbox-only returning runs** handle
new mail. Within any cutoff window, **rule-satisfied skip** avoids re-touching
mail that already matches `provider-rules.md`. The worst outcomes are
(a) creating duplicate/oddly-placed labels that clutter the taxonomy, (b) archiving
something the user needed to see, and (c) re-touching labeled mail on every sweep.
That's why the skill leans hard on *existing* labels, skips already-filed threads,
files new ones under sensible parents, keeps financial records in the inbox by
default, and reports every new label and every skip so nothing happens invisibly. The starter rules file is a convenience, not a
crutch — the classification reasoning is the real engine and stands on its own if
the rules are removed.
