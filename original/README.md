# Gmail Labeler Skill

This directory contains the original Gmail Labeler skill — an AI agent skill for triaging Gmail by provider domain.

## What is this?

Gmail Labeler is a skill for Claude Code, Cursor, and similar AI coding agents that automatically:
- Searches your Gmail threads
- Classifies senders by provider type (Social, Commerce, Government, Finance, Marketing, etc.)
- Applies nested labels like `Shopping/Amazon`, `Finance/PayPal`, `Government/ATO`
- Archives marketing/newsletters while keeping receipts and bills in the inbox

The skill uses a Gmail MCP (Model Context Protocol) connector to interact with your mailbox.

## Structure

```
.agents/skills/gmail-labeler/
├── SKILL.md                    Main skill definition (what the agent reads)
├── references/
│   ├── provider-rules.template.md    Starter sender→label mapping (~200 rules)
│   ├── email-policy.md              Category actions (keep/archive/skip)
│   ├── initial-setup-checklist.md   First-time setup workflow
│   ├── run-modes.md                 Run modes and parameters
│   └── token-efficiency.md          Optimization strategies
├── examples/
│   ├── prompts/                     Copy-paste prompts for various scenarios
│   ├── minimal/                     Quickstart with 10 brands
│   └── scheduling/                  Cron, launchd, GitHub Actions templates
├── templates/
│   ├── taxonomy-au.md               Australian provider taxonomy
│   └── taxonomy-us.md               US provider taxonomy
├── scripts/
│   ├── generate_filters.py          Rules → gmail-filters.xml converter
│   ├── validate_rules.py            Lint provider-rules.md
│   └── build-skill.sh               Package skill as .skill zip
└── tests/                           Validation tests
```

## Installation (for using the skill)

### Claude Code / Claude Desktop

```bash
# User-wide installation
git clone https://github.com/rNLKJA/gmail-labeler.git ~/.claude/skills/gmail-labeler
```

### Cursor

```bash
# User-wide installation  
git clone https://github.com/rNLKJA/gmail-labeler.git ~/.cursor/skills/gmail-labeler
```

### Initialize working files

These files hold your personal data and are git-ignored:

```bash
cd ~/.claude/skills/gmail-labeler  # or ~/.cursor/skills/gmail-labeler
cp MEMORY.template.md MEMORY.md
cp LOG.template.md LOG.md
cp references/provider-rules.template.md references/provider-rules.md
```

## Gmail MCP Setup (required)

The skill requires a Gmail MCP connector:

1. **Create Google Cloud OAuth client** (Desktop app), download JSON keys
2. **Save keys** to `~/.gmail-mcp/gcp-oauth.keys.json`
3. **Add MCP server** to your agent config:
   - **Cursor:** `~/.cursor/mcp.json` — package `@gongrzhe/server-gmail-autoauth-mcp`
   - **Claude Code:** `~/.claude/mcp.json` (same package)
4. **Authenticate:** `npx @gongrzhe/server-gmail-autoauth-mcp auth`
5. **Reload MCP** in your agent and verify with `list_labels`

## Usage

First run (dry run):

```text
Run the gmail-labeler skill in first-time setup mode.
Follow references/initial-setup-checklist.md in order (masters before analysis).
lookback_days: 90
Scope: newer_than:90d -in:sent -in:chats -in:draft
Dry run: true
Goal: Step 1 masters, Step 2 analyse, report Steps 3–4 before applying.
```

Weekly triage:

```text
Run the gmail-labeler skill in returning-run mode.
Scope: in:inbox -in:sent -in:chats -in:draft
Dry run: false
Skip rule-satisfied threads. Only label gaps.
```

See `examples/prompts/` for more scenarios.

## How It Works

1. **Load rules** from `provider-rules.md` (sender domain → label mapping)
2. **Search Gmail** via MCP connector (respects lookback_days parameter)
3. **Classify each thread** by sender domain against provider taxonomy
4. **Apply labels** and optionally archive based on category policy
5. **Generate Gmail filters** (`gmail-filters.xml`) for future automation
6. **Log results** to `LOG.md`

## Key Features

- **Provider taxonomy**: 20+ provider types covering social, commerce, government, finance, health, utilities, travel, and more
- **Rule conflict detection**: Validates provider-rules.md for duplicates and conflicts
- **Dry-run mode**: Preview actions without mutating Gmail
- **Token-efficient**: Domain deduplication, snippet-only reads, rule-satisfied skip
- **Filter generation**: Generates importable Gmail filters from rules
- **Privacy-focused**: No hosted backend, rules live locally, MCP connector handles auth

## Privacy & Security

**What the skill reads:**
- Sender, subject, snippet, message body
- Label IDs
- Attachment filenames (NOT contents)

**What it modifies:**
- Adds labels
- Removes INBOX label (archives)
- Creates new labels

**What it NEVER does:**
- Mark messages read/unread
- Star/unstar messages
- Delete, send, or forward mail
- Read attachment contents

All mail content is accessed through your MCP connector and may be sent to your LLM provider. This repository does not host, see, or store your mail.

## License

GPL-3.0 — Copyright (C) 2026 rNLKJA

See `../LICENSE` for full text. Derivative works must also be GPL-3.0.

## Full Documentation

See `SKILL-README.md` in this directory for the original comprehensive README.
