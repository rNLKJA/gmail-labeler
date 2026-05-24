# Changelog

All notable changes to Gmail Labeler are documented here.

Format based on [Keep a Changelog](https://keepachangelog.com/). Versioning follows [SemVer](https://semver.org/).

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

[1.1.1]: https://github.com/rNLKJA/gmail-labeler/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/rNLKJA/gmail-labeler/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/rNLKJA/gmail-labeler/releases/tag/v1.0.0
