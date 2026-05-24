# Optional regional taxonomy — United States

Copy sections into `MEMORY.md` or extend `references/provider-rules.md`.
Not loaded automatically — opt in when your mailbox is US-centric.

## Suggested master labels

| Master | Example children |
|---|---|
| `Government` | `Government/IRS`, `Government/SSA`, `Government/USCIS` |
| `Bills` | `Bills/AT&T`, `Bills/Verizon`, `Bills/Xfinity` |
| `Health` | `Health/Blue Cross`, `Health/Kaiser`, `Health/Aetna` |
| `Banking` | `Banking/Chase`, `Banking/Wells Fargo`, `Banking/Capital One` |

## Domain patterns

| Pattern | Label parent | Notes |
|---|---|---|
| `*.gov` | `Government/<agency>` | Official mail → keep |
| `*.edu` | `Education/<institution>` | University mail |
| `irs.gov` | `Government/IRS` | Tax → keep |
| `ssa.gov` | `Government/SSA` | Social Security → keep |
| `uscis.gov` | `Government/USCIS` | Immigration → keep |

## Example provider rows

| Domain | Match | Label | Default | Content type | Notes |
|---|---|---|---|---|---|
| irs.gov | | Government/IRS | keep | account | tax notices |
| ssa.gov | | Government/SSA | keep | account | benefits mail |
| uscis.gov | | Government/USCIS | keep | account | immigration |
| chase.com | | Banking/Chase | keep | receipt | statements |
| att.com | | Bills/AT&T | keep | receipt | phone bill |

## MEMORY.md snippet

```markdown
## Taxonomy overrides

- `.edu` senders → `Education/<institution>`.
- Payment processors (PayPal, Stripe): use `content_type` + subject to split merchant receipts vs marketing.
```
