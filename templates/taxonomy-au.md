# Optional regional taxonomy — Australia

Copy sections into `MEMORY.md` or extend `references/provider-rules.md`.
Not loaded automatically — opt in when your mailbox is AU-centric.

## Suggested master labels

| Master | Example children |
|---|---|
| `Australia Living` | `Australia Living/Medicare`, `Australia Living/myGov` |
| `Government` | `Government/ATO`, `Government/ImmiAccount`, `Government/Services NSW` |
| `Bills` | `Bills/AGL`, `Bills/Origin`, `Bills/Telstra` |
| `Health` | `Health/Medicare`, `Health/Bupa`, `Health/Medibank` |

## Domain patterns

| Pattern | Label parent | Notes |
|---|---|---|
| `*.gov.au` | `Government/<agency>` | Official mail → keep |
| `*.edu.au` | `Education/<institution>` | University mail |
| `mygov.com.au` | `Government/myGov` | Account notices → keep |
| `ato.gov.au` | `Government/ATO` | Tax → keep |
| `immi.gov.au` | `Government/ImmiAccount` | Visa / immigration → keep |
| `medicare.gov.au` | `Health/Medicare` | Keep records |
| `servicesaustralia.gov.au` | `Government/Services Australia` | Centrelink etc. |

## Example provider rows

| Domain | Match | Label | Default | Content type | Notes |
|---|---|---|---|---|---|
| ato.gov.au | | Government/ATO | keep | account | notices of assessment |
| mygov.com.au | | Government/myGov | keep | security | login alerts → keep |
| immi.gov.au | | Government/ImmiAccount | keep | account | visa updates |
| agl.com.au | | Bills/AGL | keep | receipt | energy bills |
| woolworths.com.au | | Shopping/Woolworths | archive | marketing | promos; receipts → keep |

## MEMORY.md snippet

```markdown
## Taxonomy overrides

- Use `Australia Living/` for day-to-day AU services (Medicare, myGov shortcuts).
- `.edu.au` senders → `Education/<institution>` unless MEMORY says otherwise.
```
