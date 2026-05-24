# Contributing to Gmail Labeler

Thanks for helping improve Gmail Labeler. This repo is the public source of truth;
personal mailbox data stays in git-ignored files on your machine.

## What to edit where

| Change | Edit in repo | Do not commit |
|---|---|---|
| Skill workflow, defaults | `SKILL.md`, `references/` | — |
| Starter rules for new users | `references/provider-rules.template.md` | Your `references/provider-rules.md` |
| Generator / validator | `scripts/` | Generated `gmail-filters.xml` |
| Your taxonomy / precedents | — | `MEMORY.md` |
| Run history | — | `LOG.md` |

## Local checks before a PR

From the repo root:

```bash
# Validate starter rules table
python3 scripts/validate_rules.py references/provider-rules.template.md

# Validate your personal rules (optional, local only)
python3 scripts/validate_rules.py references/provider-rules.md

# Preview filter generation
python3 scripts/generate_filters.py references/provider-rules.template.md --dry-run

# Run tests (stdlib unittest)
python3 -m unittest discover -s tests -p 'test_*.py' -v

# Rebuild install zip
bash scripts/build-skill.sh -o /tmp/email-labeler.skill
```

CI runs the same checks on push and pull requests.

## Pull request flow

1. Fork [github.com/rNLKJA/gmail-labeler](https://github.com/rNLKJA/gmail-labeler).
2. Create a branch from `main`.
3. Keep changes focused — one concern per PR when possible.
4. Update `CHANGELOG.md` under `[Unreleased]` or the next version section.
5. Keep `SKILL.md` frontmatter `version:` in sync with `VERSION.md`.
6. Open a PR with a short summary and how you tested.

## Release mirror (maintainers)

After tagging a release, sync the skill folder to the Life HQ mirror:

`Life HQ/Rin-OS/shared-skills/email-labeler/`

Rebuild `email-labeler.skill` with `scripts/build-skill.sh`.

## Licence

Contributions are accepted under [GPL-3.0](LICENSE). Derivative works must remain GPL-3.0.
