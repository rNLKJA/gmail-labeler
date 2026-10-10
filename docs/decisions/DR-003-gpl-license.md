# DR-003: GPL-3.0 License Choice

**Date:** 2025-01-15  
**Status:** Active  
**Author:** Sunchuangyu "Rin" Huang

## Context

As a publicly released personal productivity tool, Gmail Labeler needs a license. The choice affects:
- **Derivative works** - can others build commercial products on this codebase?
- **Contribution model** - what terms do contributors agree to?
- **Philosophical alignment** - what values does the license signal?

This is a personal project, not commercial software. The goal is to share a useful tool and demonstrate AI agent skill design, not to monetize or restrict use.

## Decision

**Use GPL-3.0 (GNU General Public License v3.0) - strong copyleft.**

Key implications:
- **Users can:** use, modify, distribute (including commercially)
- **Users must:** keep the same GPL-3.0 license on derivative works, provide source code, state changes
- **Patent grant:** explicit patent license from contributors
- **Anti-tivoization:** modifications must remain user-installable (no locked-down hardware)

## Options Considered

### Option 1: MIT / Apache 2.0 (permissive)
- **Pro:** Maximum freedom - anyone can do anything, including proprietary forks
- **Con:** Someone could take the code, improve it, and close the improvements; community doesn't benefit from derivatives

### Option 2: AGPL-3.0 (network copyleft)
- **Pro:** Even stronger copyleft - SaaS deployments must share source
- **Con:** Overkill for a personal productivity script; most users run locally, not as a service

### Option 3: Creative Commons (e.g., CC BY-SA 4.0)
- **Pro:** Familiar license, share-alike preserved
- **Con:** CC licenses are for creative works, not software; no patent grant, no warranty disclaimer

### Option 4: Custom license / all rights reserved
- **Pro:** Maximum control
- **Con:** No one will contribute; unclear legal terms; not OSI-approved

### Option 5: Public domain / CC0
- **Pro:** Absolute freedom, no restrictions
- **Con:** No protections; can be incorporated into proprietary software with no attribution

## Why

GPL-3.0 aligns with the project's values:

1. **Share-alike principle:** If you improve this tool, others should benefit. The classification rules, the skill design, the provider taxonomy - these are useful beyond one person's inbox. GPL ensures derivatives stay open.

2. **Not a commercial product:** This is a personal project shared publicly. I'm not selling it, so I have no reason to allow proprietary forks. If someone wants to commercialize it, GPL requires they also open-source their version.

3. **Contribution clarity:** GPL is well-understood. Contributors know the terms upfront. No CLA (Contributor License Agreement) needed.

4. **Patent protection:** Explicit patent grant protects users from contributor patent claims.

5. **Philosophical fit:** Gmail Labeler is built on open-source AI models, open-source MCP servers, open-source libraries. Giving back to the commons via copyleft is consistent with that foundation.

Why not AGPL? The skill runs locally via Claude Code / Cursor, not as a hosted service. Network copyleft adds complexity without benefit.

## What Happened

**Since release (2 months):**
- 0 requests to relicense (as expected for a small personal project)
- 0 GPL violations detected (also expected - not widely used yet)
- 1 contribution (via PR) - contributor accepted GPL-3.0 terms implicitly by submitting

**Community feedback:**
- No complaints
- One user asked "can I use this at work?" - answer: yes, GPL allows commercial use; your employer must comply if they distribute a modified version (internal use only = no obligation)

## What I'd change

1. **Add a FAQ section in README** covering:
   - "Can I use this commercially?" (yes)
   - "Can I fork and modify?" (yes, must stay GPL)
   - "Do I need to share if I add personal rules?" (only if you distribute; private use has no obligation)

2. **Contributor guidelines** - formalize a `CONTRIBUTING.md` stating:
   - By submitting a PR, you agree to GPL-3.0
   - Sign-off line in commits (DCO-style) for extra clarity

3. **License header in source files** - currently only `LICENSE` file exists; should add SPDX header to `.py` scripts:
   ```python
   # SPDX-License-Identifier: GPL-3.0-or-later
   ```

4. **Clarify web showcase license** - the Next.js showcase (`web/`) is also GPL-3.0, but could be MIT separately if that encourages reuse. Current GPL applies to entire repo - consider dual-licensing just the web component.

5. **No CLA for now** - but if the project grows, a Contributor License Agreement (allowing relicensing) might be useful for flexibility. For now, pure GPL is fine.

## References

- License file: `LICENSE` (root of repo)
- GPL-3.0 text: https://www.gnu.org/licenses/gpl-3.0.en.html
- Copyleft rationale: https://www.gnu.org/licenses/copyleft.en.html
- Original skill: `original/.agents/skills/gmail-labeler/` (also GPL-3.0)
