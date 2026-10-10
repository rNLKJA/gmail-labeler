# Gmail Labeler Skill (Original)

This directory contains the original Gmail Labeler skill files, preserved with full git history after being moved from the repository root.

## What's Inside

- `.agents/skills/gmail-labeler/` - The complete skill implementation
  - `SKILL.md` - Main skill definition and workflow documentation
  - `references/` - Provider rules templates, setup checklists, token efficiency guides
  - `scripts/` - Helper scripts for filter generation and rule validation
  - `templates/` - Provider taxonomy templates (AU, US, UK variants)

## Installation

### Prerequisites

1. **Gmail MCP Server** - Install a Gmail MCP connector:
   ```bash
   # Example using a community Gmail MCP server
   npm install -g @modelcontextprotocol/server-gmail
   ```

2. **Gmail API Credentials** - Create a Google Cloud project and enable Gmail API:
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project
   - Enable Gmail API
   - Create OAuth 2.0 credentials (Desktop app)
   - Download credentials JSON

3. **Claude Code or Cursor** - AI coding assistant with MCP support

### Setup Steps

1. **Copy the skill to your agents directory:**
   ```bash
   mkdir -p ~/.agents/skills
   cp -r .agents/skills/gmail-labeler ~/.agents/skills/
   ```

2. **Configure MCP server** in your Claude Code or Cursor settings:
   ```json
   {
     "mcpServers": {
       "gmail": {
         "command": "npx",
         "args": ["-y", "@modelcontextprotocol/server-gmail"],
         "env": {
           "GOOGLE_CREDENTIALS": "/path/to/credentials.json"
         }
       }
     }
   }
   ```

3. **First run - DRY RUN:**
   ```
   User: "Label my inbox (dry run mode)"
   ```
   
   The skill will:
   - Analyze your inbox
   - Show what labels it would create
   - Show which emails would be labeled
   - Wait for your confirmation before making changes

4. **Review the plan**, then run for real:
   ```
   User: "Apply those labels for real"
   ```

## How It Works

The Gmail Labeler skill follows a systematic workflow:

1. **Domain Analysis** - Scans your inbox and identifies distinct sender domains
2. **Classification** - Matches domains against provider rules (Banking, Shopping, etc.)
3. **Label Creation** - Creates master category labels (e.g., "Banking") and provider labels (e.g., "Banking/PayPal")
4. **Labeling** - Applies labels to threads, skipping any already correctly labeled
5. **Archiving** - Optionally archives marketing/newsletter mail while keeping receipts in inbox
6. **Filter Generation** - Creates Gmail filter XML you can import for automatic future labeling

## Provider Taxonomy

The skill includes 10+ categories with 100+ pre-defined rules:

- **Banking** - Banks, payment processors, crypto exchanges
- **Shopping** - E-commerce, retail, food delivery
- **Subscriptions** - Streaming services, SaaS tools
- **Bills** - Utilities, energy, telecom
- **Government** - Tax, immigration, public services
- **Health** - Insurance, pharmacies, medical
- **Travel** - Airlines, hotels, ride-sharing
- **Career** - Job boards, professional networks
- **News & Ads** - Newsletters, marketing, media
- **Education** - Universities, online learning

See `.agents/skills/gmail-labeler/references/` for full taxonomy templates.

## Safety Features

**What the skill DOES:**
- ✅ Reads sender, subject, and message body for classification
- ✅ Creates Gmail labels
- ✅ Applies labels to threads
- ✅ Archives messages (removes INBOX label) based on rules
- ✅ Logs all actions to `LOG.md`

**What the skill NEVER does:**
- ❌ Deletes mail
- ❌ Sends or forwards mail
- ❌ Marks mail as read
- ❌ Reads attachment contents (only filenames)
- ❌ Changes star state or importance flags

**Privacy considerations:**
- Email content is sent to your AI provider (Anthropic, OpenAI, etc.) for classification
- No data is sent to third parties beyond your chosen AI provider
- All processing happens through your local MCP server
- Dry-run mode shows exactly what will happen before making changes

## Run Modes

The skill supports four run modes:

1. **First-time setup** - Full inbox analysis and labeling
2. **Returning run** - Inbox-only, quick triage of new mail
3. **Backfill / gap-fill** - Process older mail (specify time range)
4. **Fix wrong labels** - Correct misclassified mail

See `.agents/skills/gmail-labeler/references/run-modes.md` for detailed workflows.

## Configuration

Optional `config.yaml` for customization:

```yaml
# Default action for each category
categories:
  Banking:
    defaultAction: keep
  Shopping:
    defaultAction: archive
  Subscriptions:
    defaultAction: archive

# Maximum threads to process per run
max_threads: 500

# Lookback period for initial setup
lookback_days: 90
```

## Troubleshooting

**"No MCP server found"**
- Check your MCP server configuration in Claude Code/Cursor settings
- Verify the Gmail MCP server is installed
- Restart Claude Code/Cursor after configuration changes

**"Authentication failed"**
- Ensure your Google Cloud credentials are valid
- Check that Gmail API is enabled in your project
- Re-download credentials if expired

**"Too many API calls"**
- The skill uses domain deduplication to minimize API calls
- For large inboxes (>10,000 threads), use `max_threads` limit
- See `.agents/skills/gmail-labeler/references/token-efficiency.md`

**"Labels not applying"**
- Check `LOG.md` for errors
- Verify label creation succeeded with `list_labels`
- Ensure threads don't already have the expected label (rule-satisfied skip)

## Filter Generation

After labeling your inbox, generate Gmail filters for automatic future labeling:

```
User: "Generate Gmail filters from my provider rules"
```

This creates `gmail-filters.xml` that you can import:
1. Open Gmail Settings → Filters and Blocked Addresses
2. Click "Import filters"
3. Upload the generated XML file
4. Review and confirm

Future mail from known providers will be labeled automatically.

## Contributing

See `.agents/skills/gmail-labeler/CONTRIBUTING.md` for guidelines.

Contributions welcome:
- Additional provider rules (especially non-US/non-AU providers)
- Content type classification improvements
- Documentation and examples

## Files Reference

- `SKILL.md` - Main skill definition and workflow
- `VERSION.md` - Current version and changelog reference
- `CHANGELOG.md` - Detailed version history
- `MEMORY.template.md` - Session state template
- `LOG.template.md` - Action log template
- `config.yaml.example` - Configuration template
- `references/provider-rules.template.md` - Full provider taxonomy
- `references/initial-setup-checklist.md` - First-run workflow
- `references/run-modes.md` - Run mode documentation
- `references/token-efficiency.md` - Optimization strategies
- `scripts/generate_filters.py` - Gmail filter XML generator
- `scripts/validate_rules.py` - Provider rule validator

## License

GPL-3.0 - See LICENSE file in repository root

## Support

For issues, questions, or feature requests:
- Open an issue on [GitHub](https://github.com/rNLKJA/gmail-labeler)
- Read the interactive showcase at the deployed web app (see root README.md)
