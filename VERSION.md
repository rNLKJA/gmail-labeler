# Version & feature matrix

**Current version:** 1.3.0

See [CHANGELOG.md](CHANGELOG.md) for release notes.

## Feature matrix

| Feature | Version | Status | Notes |
|---|---|---|---|
| First-time cutoff labelling | 1.0.0 | shipped | Default `lookback_days: 90` (from 1.1.1) |
| Token efficiency guide | 1.1.1 | shipped | `references/token-efficiency.md` (from 1.3.0) |
| Master label taxonomy | 1.0.0 | shipped | On-demand from 1.1.0 |
| Rule-satisfied skip | 1.0.0 | shipped | Skip when expected label applied |
| Inbox-only returning runs | 1.0.0 | shipped | Default `in:inbox` scope |
| Filter generator script | 1.1.0 | shipped | `scripts/generate_filters.py` |
| Parameterised lookback days | 1.1.0 | shipped | `lookback_days`, `catch_up_days` |
| Strict dry-run | 1.1.0 | shipped | No Gmail mutations when dry |
| Inbox-zero catch-up docs | 1.1.0 | shipped | Opt-in `has:nouserlabels` |
| Multi-type filter Match column | 1.1.0 | shipped | `provider-rules.template.md` |
| Masters on demand | 1.1.0 | shipped | Optional `create_all_masters` |
| Wrong-label remediation prompt | 1.1.0 | shipped | `fix-wrong-labels.md` |
| MCP setup guide | 1.1.0 | shipped | README |
| Filter re-import reminder | 1.1.0 | shipped | Run report |
| Skill rebuild script | 1.1.0 | shipped | `scripts/build-skill.sh` |
| Rules validator | 1.2.0 | shipped | `scripts/validate_rules.py` |
| CI tests + GitHub Actions | 1.2.0 | shipped | `.github/workflows/ci.yml` |
| CONTRIBUTING + issue templates | 1.2.0 | shipped | Adopter docs |
| Generator `--log-summary` | 1.2.0 | shipped | Rule count for LOG.md |
| Minimal quickstart rules | 1.2.0 | shipped | `examples/minimal/` |
| Run modes reference | 1.3.0 | shipped | `references/run-modes.md` |
| Mandatory domain dedupe | 1.3.0 | shipped | First-time + backfill |
| `max_threads` cap | 1.3.0 | shipped | Token savings |
| `content_type` column | 1.3.0 | shipped | Agent-side; filters ignore |
| AU / US taxonomy packs | 1.3.0 | shipped | `templates/taxonomy-*.md` |
| `config.yaml` example | 1.3.0 | shipped | Optional run defaults |
| Fix-wrong-labels run mode | 1.3.0 | shipped | SKILL frontmatter `modes` |
