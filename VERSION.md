# Version & feature matrix

**Current version:** 1.1.0

See [CHANGELOG.md](CHANGELOG.md) for release notes.

## Feature matrix

| Feature | Version | Status | Notes |
|---|---|---|---|
| First-time cutoff labelling | 1.0.0 | shipped | Default `lookback_days: 365` |
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
