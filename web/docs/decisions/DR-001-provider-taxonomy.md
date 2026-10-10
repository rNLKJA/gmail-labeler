# DR-001: Provider Taxonomy Design

**Date:** 2025-01-15  
**Status:** Active  
**Author:** Sunchuangyu "Rin" Huang

## Context

The Gmail Labeler skill needs a classification system to organize email by sender and purpose. The system must balance:

1. **Granularity** - enough detail to be useful for filing
2. **Simplicity** - not so many categories that rules become unmaintainable
3. **Coverage** - handle the majority of routine email (transactional, subscription, government, etc.)
4. **Extensibility** - allow users to add their own provider rules

The taxonomy drives both the automatic labeling logic and the Gmail filter generation.

## Decision

**Use a two-tier hierarchical taxonomy with 10 top-level categories and ~100 specific provider rules.**

Categories chosen:
- **Banking** - financial institutions, payment processors, crypto
- **Shopping** - e-commerce, retail, food delivery
- **Subscriptions** - streaming, SaaS, creator support
- **Bills** - utilities, energy, telecom
- **Government** - tax, immigration, public services
- **Health** - insurance, pharmacies, medical
- **Travel** - airlines, hotels, ride-sharing
- **Career** - job boards, professional networks
- **News & Ads** - newsletters, marketing, media
- **Education** - universities, online learning

Label format: `Category/Provider` (e.g., `Banking/PayPal`, `Shopping/Amazon`).

## Options Considered

### Option 1: Flat taxonomy (20-30 categories, no hierarchy)
- **Pro:** Simpler mental model, no nesting
- **Con:** Gmail label UI becomes cluttered; no natural grouping for filters

### Option 2: Three-tier taxonomy (Type > Category > Provider)
- **Pro:** Maximum granularity (e.g., Banking > Payment Processor > PayPal vs Banking > Traditional Bank > Chase)
- **Con:** Overkill for most users; triple the label depth in Gmail UI

### Option 3: Content-type-driven taxonomy (Receipt, Marketing, Account, Security, etc.)
- **Pro:** Action-oriented (keep receipts, archive marketing)
- **Con:** Same provider sends multiple content types; conflicts abound

### Option 4: ML-based clustering (no predefined taxonomy)
- **Pro:** Adapts to user's actual inbox
- **Con:** Requires training data, not portable across users, defeats the "reusable skill" goal

## Why

Two-tier strikes the best balance:
- Top-level categories group related providers for filter management (e.g., archive all News & Ads)
- Provider-level labels preserve detail for search (find all PayPal receipts)
- 10 categories covers ~95% of routine email in AU/US inboxes (validated on 3 personal inboxes, n=500 threads each)
- Extensible: users add new `Category/Provider` entries without restructuring

Content type is encoded as metadata (`contentType: 'receipt' | 'marketing' | ...`) for action hints (keep vs archive), not as a primary label - this avoids conflicts.

## What Happened

**Coverage (synthetic inbox, n=100):**
- Classified: 82/100 (82%, Wilson CI [73.5%, 88.5%])
- Unlabelled: 18/100 (18%)
- Provider type distribution:
  - Shopping: 28%
  - Banking: 18%
  - Subscriptions: 16%
  - Career: 10%
  - News & Ads: 10%

**Label entropy:** 2.89 bits (healthy spread - not overly concentrated)

**Top unlabelled domains:**
- `example-startup.com` (3 threads) - niche SaaS not in rules
- `local-restaurant.com.au` (2 threads) - small business
- `alumni.university.edu` (2 threads) - educational mailing list

## What I'd Change

1. **Add a "Community" category** for forums, Reddit, Discord, Slack workspaces - currently falls through to unlabelled
2. **Split Education into Education/Academic and Education/Online Learning** - online course providers (Coursera, Udemy) have different action patterns than university registrar mail
3. **Expand non-US/AU coverage** - current rules are English-speaking-world-centric; would add EU (SEPA banks, local retailers), APAC (Alipay, Grab), LATAM providers
4. **Add subdomain inheritance logic** - `noreply.amazon.com` should inherit from `amazon.com` rule; currently requires explicit rule or falls through
5. **Content type confidence scoring** - some providers send mixed content (Amazon: receipts + marketing + account notices); could use subject/body signals to refine action (keep receipt, archive promo from same sender)

## References

- Original taxonomy: `original/.agents/skills/gmail-labeler/references/provider-rules.template.md`
- Implementation: `web/src/lib/providers.ts`
- Coverage analysis: `web/src/lib/governance/coverage-analysis.ts`
