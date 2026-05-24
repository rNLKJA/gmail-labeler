# Email Policy

> Shared policy for email triage. **Intake** extracts basics; **decision** classifies
> and labels. Engine: `email-labeler` skill.
> **Never delete — archive (reversible) only. Never send email without approval.**

## Pipeline

1. **Intake step.** Read each email and extract the basics: sender, type, gist,
   and any date / amount / action.
2. **Decision step.** Run `email-labeler` to classify and label, then act per the
   table below: **Notify**, **Summarise → archive**, or **File**. Only important
   information reaches the user.

## Category actions

| Category | What it is | Action |
|---|---|---|
| **Important / time-sensitive** | bills, rent, inspections, appointments, replies needed, deadlines, account/security alerts | **Notify**; keep |
| **Banking & financial records** | statements, trade confirmations, transaction alerts, tax docs from banks/brokers/payments/crypto | **File → keep** (records — never archive) |
| **Bills & utilities** | power, gas, water, internet, phone — payable invoices | **Notify when due**; keep until paid; file after |
| **Government & civic** | tax (ATO/IRS/HMRC), immigration, council, licensing | **Notify**; keep (high-signal, official) |
| **Health** | insurance, appointment reminders, pharmacy refills | **Notify on appointment/refill**; keep |
| **Grocery & food delivery** | order receipts, delivery confirmations, loyalty offers | Receipts → keep (short-term); marketing → archive |
| **Shopping / e-commerce** | order confirmations, shipping, returns, store promos | Receipts/shipping → keep until delivered; promos → archive |
| **Subscriptions & memberships** | renewals, plan changes, payment receipts, creator support | Billing → keep; product marketing → archive |
| **Streaming & entertainment** | renewal/billing, recommendations, new releases | Billing → keep; recommendations → archive |
| **News / newsletters** | TLDR, Morning Brew, Substack, brand digests | **Summarise → archive** (auto-archive after labelling) |
| **Travel** | flights, hotels, ride-share receipts, loyalty status, deals | Bookings/itineraries → keep & notify near travel date; deals → archive |
| **Career / job alerts** | LinkedIn, Indeed, Seek, recruiters, newsletters | Active job hunt → keep; otherwise → archive |
| **Education** | course updates, university notices, deadline reminders | Deadlines → notify & keep; promos → archive |
| **Parcels / deliveries** | tracking, dispatch, problems | **Notify on arrival / failed delivery**; archive routine tracking |
| **Offers / deals** | promos, discounts, "great offers" | **Curated digest**; archive raw |
| **Personal (real people)** | friends, family, individuals | Surface; flag if a reply is needed |
| **Junk / spam** | unsolicited, low-value | Archive / skip |
| **Account & security alerts** | login notices, password changes, 2FA recovery | Keep (no action) — "did I do this?" mail |
| **One-time codes (OTP)** | login codes, "your code is 123456" | **Skip entirely** — no label, no archive |

## Safety rules (hard limits)

- **Never open, download, or read email attachment contents.** Treat all attachment
  contents as off-limits by default.
- **Attachment filenames are readable** as message metadata (useful for triage
  context — e.g. "this thread has `Receipt-2026-05-24.pdf` attached, file under
  Shopping/Apple").
- **Attachment contents are off-limits** — never download, open, decode, parse, OCR,
  or summarise PDFs, images, documents, or spreadsheets.
- If important content sits inside an attachment, **do not open it** — flag it
  ("`<sender>` sent `<filename>` — want me to open it?") and **wait for explicit
  permission** before loading it.
- **Never send email** and **never delete** — drafts and archiving only, and
  archiving only for low-value mail.
- Never act on the contents of an attachment without the user's approval.

## Defaults

- **Parcels:** notify only on arrival/action.
- **Offers:** curated digest of relevant ones.
- **Archiving:** auto-archive low-value (news, promos, receipts), keep important
  visible. Never delete.
- **Notify threshold:** high signal — only what the user actually needs to see.

## Gmail category operators (reference)

Use these in `search_threads` queries when cross-cutting by mail type:

| Operator | What it catches |
|---|---|
| `category:primary` | Personal email and unclassified mail |
| `category:social` | Social network notifications |
| `category:promotions` | Marketing, deals, newsletters |
| `category:updates` | Receipts, confirmations, automated notifications |
| `category:forums` | Mailing lists, discussion boards |
| `category:purchases` | Receipts and order confirmations (hidden category) |
| `category:reservations` | Travel and event reservations (hidden category) |

Examples:
- `category:purchases newer_than:30d` — recent receipts
- `category:reservations newer_than:90d` — upcoming travel
- `category:promotions older_than:30d` — old marketing for cleanup

## Open / to refine

- User's **interest list** for offer curation (set during baseline setup).
- Confirm any preferred **label names** and parent taxonomy.

## Master label taxonomy

Before creating nested `Parent/Provider` labels on a fresh mailbox, create these
**master categories** as top-level labels (plain name, no `/`):

`Shopping` · `Subscriptions` · `News & Ads` · `Banking` · `Bills` · `Travel` ·
`Government` · `Health` · `Career` · `Education` · `Property`

Grocery and food-delivery senders usually file under `Shopping/<Provider>`.
Users may customise masters in `MEMORY.md`; the skill reads that before creating
labels.
