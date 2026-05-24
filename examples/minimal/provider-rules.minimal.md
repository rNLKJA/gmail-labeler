# Minimal provider rules — try in 10 minutes

Copy to `references/provider-rules.md` for a small dry-run walkthrough.
See `examples/prompts/dry-run.md` with `lookback_days: 30` and `max_threads: 50`.

| Domain | Match | Label | Default | Notes |
|---|---|---|---|---|
| github.com | | Subscriptions/GitHub | keep | SaaS billing |
| google.com | | Subscriptions/Google One | keep | account notices |
| amazon.com | | Shopping/Amazon | keep | orders |
| chase.com | | Banking/Chase | keep | bank alerts |
| tldrnewsletter.com | | News & Ads/TLDR | archive | newsletter |
| coursera.org | | Education/Coursera | archive | course mail |
| ato.gov.au | | Government/ATO | keep | tax (AU example) |
| irs.gov | | Government/IRS | keep | tax (US example) |
| openai.com | | Subscriptions/OpenAI | keep | SaaS receipt |
| spotify.com | | Subscriptions/Spotify | archive | promos; receipts → keep |

## Always skip (no label)

- OTP / verification codes
- Personal mail from individuals
