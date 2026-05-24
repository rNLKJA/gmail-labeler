# Changelog

All notable changes to Gmail Labeler are documented here.

Format based on [Keep a Changelog](https://keepachangelog.com/). Versioning follows [SemVer](https://semver.org/).

## [1.3.0] - 2026-05-24

### Added

- `references/run-modes.md` — mode matrix, parameters, fix-wrong-labels workflow
- `references/token-efficiency.md` — domain dedupe, `max_threads`, filter backlog strategy
- `config.yaml.example` — optional run defaults
- `templates/taxonomy-au.md` and `templates/taxonomy-us.md` — optional regional packs
- **Content type** column in provider rules schema (agent-side; filters ignore)
- `## Payment processors` section in template (PayPal, Stripe examples)
- **`max_threads`** parameter for dry-run and first-pass caps
- Formal **fix-wrong-labels** mode in SKILL frontmatter `modes`

### Changed

- **Mandatory domain dedupe** on first-time setup and backfill
- SKILL.md trimmed — long mode/token sections moved to references
- Prompts updated with domain dedupe and `--log-summary`
- README: regional packs, scheduling details, troubleshooting (extended)

## [1.2.0] - 2026-05-24

### Added

- `scripts/validate_rules.py` — lint `provider-rules.md` tables
- `tests/` — unittest coverage for generator and validator
- `.github/workflows/ci.yml` — validate, test, build-skill smoke job
- `CONTRIBUTING.md` and GitHub issue templates
- `examples/minimal/provider-rules.minimal.md` — 10-brand quickstart
- Generator `--log-summary` flag for LOG.md rule counts
- README troubleshooting section

### Changed

- Run report and LOG template include filter rule count / re-import hint

## [1.1.1] - 2026-05-24

### Changed

- Default `lookback_days` reduced from 365 to **90** (three months) to save tokens
- Added **Token efficiency** section to SKILL.md (filters for bulk backlog, snippet-only reads, gap-only apply)

## [1.1.0] - 2026-05-24

### Added

- `scripts/generate_filters.py` — generates `gmail-filters.xml` and `email-receive-rules.md` from `provider-rules.md`
- `scripts/build-skill.sh` — rebuilds `email-labeler.skill` install package
- Parameters: `lookback_days` (default 90), `catch_up_days` (default 7)
- `Match` column in `provider-rules.template.md` for multi-type brand filters
- `## Multi-type brands` section in provider rules template (Apple, Google, YouTube, Amazon)
- Inbox-zero documentation and opt-in catch-up scope
- `examples/prompts/fix-wrong-labels.md`
- Gmail MCP setup guide in README
- `VERSION.md` feature matrix and this changelog
- Filter re-import reminder in run reports when rules change

### Changed

- Strict dry-run: no `create_label`, `label_thread`, or `unlabel_thread` when `dry_run: true`
- Master labels created **on demand** (first child under a parent), not all 11 upfront
- Agent must use filter generator script instead of hand-written XML
- README mermaid diagram reflects two modes, skip gate, and generator

## [1.0.0] - 2026-05-24

### Added

- Initial public release: SKILL.md workflow, security section, templates
- Master label taxonomy and first-time / returning run split
- Rule-satisfied skip and inbox-only returning runs
- Starter provider rules (~100 brands), example prompts, scheduling stubs
- GPL-3.0 licence, README, Buy Me a Coffee / GitHub Sponsors

[1.3.0]: https://github.com/rNLKJA/gmail-labeler/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/rNLKJA/gmail-labeler/compare/v1.1.1...v1.2.0
[1.1.1]: https://github.com/rNLKJA/gmail-labeler/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/rNLKJA/gmail-labeler/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/rNLKJA/gmail-labeler/releases/tag/v1.0.0
