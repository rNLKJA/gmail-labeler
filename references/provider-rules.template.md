# Provider rules template (sender-domain → label lookup)

Starter table for new users. Copy to `references/provider-rules.md` and customise
for your mailbox. The skill still creates labels on the fly for senders not listed.

**Fresh start:** follow `references/initial-setup-checklist.md` — **Step 1 master
categories first**, Step 2 analyse mail, Step 3 provider children, Step 4 apply.
Never create nested labels before masters.

**Schema:**
- **Domain** — canonical brand domain (for lookup and documentation).
- **Match** — optional Gmail `from` filter value. When empty, `Domain` is used.
  Set for sub-address or subdomain rules (multi-type brands).
- **Label** — full nested path. Create if missing.
- **Default** — `keep` (leave in inbox) or `archive` (remove INBOX after labelling).
  Actual content wins over default (a real receipt is always `keep`).
- **Content type** — optional agent-side hint: `receipt`, `marketing`, `security`,
  `newsletter`, `account`, `other`. **Gmail filters ignore this column** (from-only
  matching). The agent uses it when one domain sends mixed mail (PayPal, Apple, Stripe).
- **Notes** — optional context.

**Multi-type brands:** use multiple rows with different `Match` values — filters
match on **from** only, not subject. See `## Multi-type brands` below.

**Universities:** any `.edu` or `.edu.au` sender → `Education/<institution>`.

---

## Banking & payments

| Domain | Match | Label | Default | Notes |
|---|---|---|---|---|
| chase.com | | Banking/Chase | keep | statements, alerts |
| wellsfargo.com | | Banking/Wells Fargo | keep |  |
| bankofamerica.com | | Banking/Bank of America | keep |  |
| jpmorgan.com | | Banking/JPMorgan | keep |  |
| citi.com | | Banking/Citi | keep |  |
| hsbc.com | | Banking/HSBC | keep |  |
| barclays.co.uk | | Banking/Barclays | keep |  |
| lloydsbank.com | | Banking/Lloyds | keep |  |
| monzo.com | | Banking/Monzo | keep |  |
| revolut.com | | Banking/Revolut | keep |  |
| cba.com.au | | Banking/CommBank | keep |  |
| anz.com | | Banking/ANZ | keep |  |
| nab.com.au | | Banking/NAB | keep |  |
| westpac.com.au | | Banking/Westpac | keep |  |
| vanguard.com | | Banking/Vanguard | keep | broker |
| fidelity.com | | Banking/Fidelity | keep | broker |
| schwab.com | | Banking/Schwab | keep | broker |
| robinhood.com | | Banking/Robinhood | keep |  |
| etoro.com | | Banking/eToro | keep |  |
| interactivebrokers.com | | Banking/Interactive Brokers | keep |  |
| coinbase.com | | Banking/Coinbase | keep | crypto |
| kraken.com | | Banking/Kraken | keep | crypto |
| gemini.com | | Banking/Gemini | keep | crypto |
| crypto.com | | Banking/Crypto.com | keep | crypto |
| wise.com | | Banking/Wise | keep |  |
| klarna.com | | Banking/Klarna | keep |  |
| afterpay.com | | Banking/Afterpay | keep |  |
| americanexpress.com | | Banking/Amex | keep |  |
| capitalone.com | | Banking/Capital One | keep |  |

## Payment processors (agent disambiguation)

Filters match **from** only. Use **Content type** + subject/snippet to route
merchant-specific receipts when everything arrives via one processor domain.

| Domain | Match | Label | Default | Content type | Notes |
|---|---|---|---|---|---|
| paypal.com | | Banking/PayPal | keep | receipt | default PayPal receipts; merchant in subject |
| stripe.com | | Banking/Stripe | keep | receipt | merchant name in subject |
| stripe.com | billing@stripe.com | Subscriptions/Stripe | keep | account | Stripe billing for SaaS |

## Grocery & food delivery

| Domain | Match | Label | Default | Notes |
|---|---|---|---|---|
| woolworths.com.au | | Shopping/Woolworths | archive | promos; receipts → keep |
| coles.com.au | | Shopping/Coles | archive |  |
| aldi.com.au | | Shopping/Aldi | archive |  |
| iga.com.au | | Shopping/IGA | archive |  |
| walmart.com | | Shopping/Walmart | archive |  |
| kroger.com | | Shopping/Kroger | archive |  |
| wholefoodsmarket.com | | Shopping/Whole Foods | archive |  |
| costco.com | | Shopping/Costco | archive |  |
| traderjoes.com | | Shopping/Trader Joe's | archive |  |
| target.com | | Shopping/Target | archive |  |
| tesco.com | | Shopping/Tesco | archive |  |
| sainsburys.co.uk | | Shopping/Sainsbury's | archive |  |
| ocado.com | | Shopping/Ocado | archive |  |
| ubereats.com | | Shopping/Uber Eats | keep | order receipts |
| doordash.com | | Shopping/DoorDash | keep |  |
| grubhub.com | | Shopping/Grubhub | keep |  |
| deliveroo.co.uk | | Shopping/Deliveroo | keep |  |
| justeat.com | | Shopping/Just Eat | keep |  |
| menulog.com.au | | Shopping/Menulog | keep |  |
| hellofresh.com | | Subscriptions/HelloFresh | keep | meal kit billing |
| marleyspoon.com.au | | Subscriptions/Marley Spoon | keep |  |
| blueapron.com | | Subscriptions/Blue Apron | keep |  |

## Subscriptions — streaming

| Domain | Match | Label | Default | Notes |
|---|---|---|---|---|
| netflix.com | | Subscriptions/Netflix | archive | billing → keep |
| spotify.com | | Subscriptions/Spotify | archive |  |
| disneyplus.com | | Subscriptions/Disney+ | archive |  |
| max.com | | Subscriptions/Max | archive | HBO |
| primevideo.com | | Subscriptions/Prime Video | archive |  |
| hulu.com | | Subscriptions/Hulu | archive |  |
| paramount.com | | Subscriptions/Paramount+ | archive |  |
| stan.com.au | | Subscriptions/Stan | archive |  |
| binge.com.au | | Subscriptions/Binge | archive |  |
| kayosports.com.au | | Subscriptions/Kayo | archive |  |
| twitch.tv | | Subscriptions/Twitch | archive |  |
| tidal.com | | Subscriptions/Tidal | archive |  |

## Subscriptions — SaaS & AI

| Domain | Match | Label | Default | Notes |
|---|---|---|---|---|
| notion.so | | Subscriptions/Notion | keep | billing notices |
| figma.com | | Subscriptions/Figma | keep |  |
| slack.com | | Subscriptions/Slack | keep |  |
| linear.app | | Subscriptions/Linear | keep |  |
| dropbox.com | | Subscriptions/Dropbox | keep |  |
| github.com | | Subscriptions/GitHub | keep |  |
| gitlab.com | | Subscriptions/GitLab | keep |  |
| atlassian.com | | Subscriptions/Atlassian | keep |  |
| asana.com | | Subscriptions/Asana | keep |  |
| zoom.us | | Subscriptions/Zoom | keep |  |
| canva.com | | Subscriptions/Canva | archive |  |
| adobe.com | | Subscriptions/Adobe | keep |  |
| microsoft.com | | Subscriptions/Microsoft 365 | keep | billing |
| openai.com | | Subscriptions/OpenAI | keep |  |
| anthropic.com | | Subscriptions/Anthropic | keep |  |
| cursor.com | | Subscriptions/Cursor | archive |  |
| perplexity.ai | | Subscriptions/Perplexity | archive |  |
| midjourney.com | | Subscriptions/Midjourney | archive |  |
| vercel.com | | Subscriptions/Vercel | keep |  |
| netlify.com | | Subscriptions/Netlify | keep |  |
| cloudflare.com | | Subscriptions/Cloudflare | keep |  |
| digitalocean.com | | Subscriptions/DigitalOcean | keep |  |

## Subscriptions — creator support

| Domain | Match | Label | Default | Notes |
|---|---|---|---|---|
| patreon.com | | Subscriptions/Patreon | keep |  |
| buymeacoffee.com | | News & Ads/Buy Me a Coffee | archive |  |
| ko-fi.com | | Subscriptions/Ko-fi | keep |  |
| substack.com | | News & Ads/Substack | archive | newsletters |

## Shopping

| Domain | Match | Label | Default | Notes |
|---|---|---|---|---|
| ebay.com | | Shopping/eBay | archive |  |
| etsy.com | | Shopping/Etsy | keep |  |
| aliexpress.com | | Shopping/AliExpress | keep |  |
| bestbuy.com | | Shopping/Best Buy | archive |  |
| asos.com | | Shopping/ASOS | archive |  |
| zara.com | | Shopping/Zara | archive |  |
| hm.com | | Shopping/H&M | archive |  |
| uniqlo.com | | Shopping/Uniqlo | archive |  |
| nike.com | | Shopping/Nike | archive |  |
| adidas.com | | Shopping/Adidas | archive |  |
| sephora.com | | Shopping/Sephora | archive |  |
| mecca.com.au | | Shopping/Mecca | archive |  |
| ikea.com | | Shopping/IKEA | keep |  |
| wayfair.com | | Shopping/Wayfair | archive |  |
| kmart.com.au | | Shopping/Kmart | archive |  |
| bigw.com.au | | Shopping/Big W | archive |  |
| thegoodguys.com.au | | Shopping/The Good Guys | archive |  |

## News & Ads

| Domain | Match | Label | Default | Notes |
|---|---|---|---|---|
| tldrnewsletter.com | | News & Ads/TLDR | archive |  |
| morningbrew.com | | News & Ads/Morning Brew | archive |  |
| thehustle.co | | News & Ads/The Hustle | archive |  |
| alphasignal.ai | | News & Ads/AlphaSignal | archive |  |
| deeplearning.ai | | News & Ads/DeepLearning.ai | archive |  |
| mckinsey.com | | News & Ads/McKinsey | archive |  |
| beehiiv.com | | News & Ads/Beehiiv | archive | parent for Beehiiv newsletters |
| nytimes.com | | News & Ads/New York Times | archive |  |
| ft.com | | News & Ads/Financial Times | archive |  |
| theguardian.com | | News & Ads/The Guardian | archive |  |
| theatlantic.com | | News & Ads/The Atlantic | archive |  |
| theaustralian.com.au | | News & Ads/The Australian | archive |  |

## Multi-type brands

One row per distinct **from** pattern. Agent triage uses subject/snippet; filters
use `Match` only.

| Domain | Match | Label | Default | Content type | Notes |
|---|---|---|---|---|---|
| apple.com | | Shopping/Apple | keep | receipt | Store orders, receipts |
| apple.com | email.apple.com | Subscriptions/Apple | keep | account | iCloud/Apple One billing |
| apple.com | insideapple.apple.com | News & Ads/Apple | archive | marketing | dev/marketing |
| google.com | | Subscriptions/Google One | keep | account | One/Payment billing |
| google.com | googlestore-noreply@google.com | Shopping/Google | keep | receipt | Play/Store purchases |
| youtube.com | | Subscriptions/YouTube | keep | account | Premium membership billing |
| youtube.com | noreply-purchases@youtube.com | Subscriptions/YouTube | keep | receipt | membership notices |
| amazon.com | | Shopping/Amazon | keep | receipt | orders, shipping |

## Travel

| Domain | Match | Label | Default | Notes |
|---|---|---|---|---|
| qantas.com.au | | Travel/Qantas | keep | bookings |
| virginaustralia.com | | Travel/Virgin Australia | keep |  |
| singaporeair.com | | Travel/Singapore Airlines | keep |  |
| delta.com | | Travel/Delta | keep |  |
| united.com | | Travel/United | keep |  |
| britishairways.com | | Travel/British Airways | keep |  |
| emirates.com | | Travel/Emirates | keep |  |
| jetstar.com | | Travel/Jetstar | keep |  |
| ryanair.com | | Travel/Ryanair | keep |  |
| booking.com | | Travel/Booking.com | keep |  |
| airbnb.com | | Travel/Airbnb | keep |  |
| expedia.com | | Travel/Expedia | keep |  |
| marriott.com | | Travel/Marriott | archive | promos |
| hilton.com | | Travel/Hilton | archive |  |
| accor.com | | Travel/Accor | archive |  |
| agoda.com | | Travel/Agoda | keep |  |
| trip.com | | Travel/Trip.com | keep |  |
| uber.com | | Travel/Uber | keep | ride receipts |
| lyft.com | | Travel/Lyft | keep |  |
| didiglobal.com | | Travel/DiDi | archive |  |
| velocityfrequentflyer.com | | News & Ads/Velocity | archive | loyalty marketing |
| qantasfrequentflyer.com.au | | News & Ads/Qantas Frequent Flyer | archive |  |
| skywards.com | | News & Ads/Emirates Skywards | archive |  |

## Bills & utilities

| Domain | Match | Label | Default | Notes |
|---|---|---|---|---|
| agl.com.au | | Bills/AGL | keep | energy |
| originenergy.com.au | | Bills/Origin | keep |  |
| energyaustralia.com.au | | Bills/Energy Australia | keep |  |
| telstra.com | | Bills/Telstra | keep |  |
| optus.com.au | | Bills/Optus | keep |  |
| vodafone.com.au | | Bills/Vodafone | keep |  |
| tpg.com.au | | Bills/TPG | keep |  |
| att.com | | Bills/AT&T | keep |  |
| verizon.com | | Bills/Verizon | keep |  |
| xfinity.com | | Bills/Xfinity | keep |  |
| t-mobile.com | | Bills/T-Mobile | keep |  |
| bt.com | | Bills/BT | keep |  |
| virginmedia.com | | Bills/Virgin Media | keep |  |
| sky.com | | Bills/Sky | keep |  |

## Government

| Domain | Match | Label | Default | Notes |
|---|---|---|---|---|
| ato.gov.au | | Government/ATO | keep | tax |
| mygov.com.au | | Government/myGov | keep |  |
| immi.gov.au | | Government/ImmiAccount | keep | immigration |
| services.nsw.gov.au | | Government/Services NSW | keep |  |
| irs.gov | | Government/IRS | keep |  |
| ssa.gov | | Government/SSA | keep |  |
| gov.uk | | Government/GOV.UK | keep |  |
| hmrc.gov.uk | | Government/HMRC | keep |  |

## Health

| Domain | Match | Label | Default | Notes |
|---|---|---|---|---|
| bupa.com.au | | Health/Bupa | keep |  |
| medibank.com.au | | Health/Medibank | keep |  |
| hcf.com.au | | Health/HCF | keep |  |
| nib.com.au | | Health/nib | keep |  |
| bcbs.com | | Health/Blue Cross | keep |  |
| kaiserpermanente.org | | Health/Kaiser | keep |  |
| aetna.com | | Health/Aetna | keep |  |
| cigna.com | | Health/Cigna | keep |  |
| chemistwarehouse.com.au | | Health/Chemist Warehouse | keep |  |
| walgreens.com | | Health/Walgreens | keep |  |
| cvs.com | | Health/CVS | keep |  |
| boots.com | | Health/Boots | archive |  |

## Career

| Domain | Match | Label | Default | Notes |
|---|---|---|---|---|
| linkedin.com | | Career/LinkedIn | archive | job alerts |
| indeed.com | | Career/Indeed | archive |  |
| seek.com.au | | Career/Seek | archive |  |
| glassdoor.com | | Career/Glassdoor | archive |  |
| ziprecruiter.com | | Career/ZipRecruiter | archive |  |
| hatch.team | | Career/Hatch | archive |  |

## Education

| Domain | Match | Label | Default | Notes |
|---|---|---|---|---|
| coursera.org | | Education/Coursera | archive |  |
| udemy.com | | Education/Udemy | archive |  |
| edx.org | | Education/edX | archive |  |
| datacamp.com | | Education/DataCamp | archive |  |
| pluralsight.com | | Education/Pluralsight | archive |  |
| brilliant.org | | Education/Brilliant | archive |  |
| khanacademy.org | | Education/Khan Academy | archive |  |

## Property (optional)

| Domain | Match | Label | Default | Notes |
|---|---|---|---|---|
| realestate.com.au | | Property/realestate.com.au | archive |  |
| domain.com.au | | Property/Domain | archive |  |
| zillow.com | | Property/Zillow | archive |  |
| rightmove.co.uk | | Property/Rightmove | archive |  |
| propertyme.com | | Property/PropertyMe | keep | rental management |

## Always skip (no label)

- Verification codes / OTP / login-confirmation.
- Security login alerts requiring no action.
- Personal mail from individuals.
