# Provider rules template (sender-domain → label lookup)

Starter table for new users. Copy to `references/provider-rules.md` and customise
for your mailbox. The skill still creates labels on the fly for senders not listed.

**Schema:**
- **Domain** — match sender after stripping `mail.`/`email.`/`e.`/`info.`/`comms.`
  `/notify.`/`news.`/`updates.`/`txn.` prefixes.
- **Label** — full nested path. Create if missing.
- **Default** — `keep` (leave in inbox) or `archive` (remove INBOX after labelling).
  Actual content wins over default (a real receipt is always `keep`).
- **Notes** — optional context.

**Multi-type brands:** split by content type when one brand sends multiple mail
types (e.g. Apple Store order → `Shopping/Apple`; iCloud billing →
`Subscriptions/Apple`; WWDC mail → `News & Ads/Apple`).

**Universities:** any `.edu` or `.edu.au` sender → `Education/<institution>`.

---

## Banking & payments

| Domain | Label | Default | Notes |
|---|---|---|---|
| chase.com | Banking/Chase | keep | statements, alerts |
| wellsfargo.com | Banking/Wells Fargo | keep | |
| bankofamerica.com | Banking/Bank of America | keep | |
| jpmorgan.com | Banking/JPMorgan | keep | |
| citi.com | Banking/Citi | keep | |
| hsbc.com | Banking/HSBC | keep | |
| barclays.co.uk | Banking/Barclays | keep | |
| lloydsbank.com | Banking/Lloyds | keep | |
| monzo.com | Banking/Monzo | keep | |
| revolut.com | Banking/Revolut | keep | |
| cba.com.au | Banking/CommBank | keep | |
| anz.com | Banking/ANZ | keep | |
| nab.com.au | Banking/NAB | keep | |
| westpac.com.au | Banking/Westpac | keep | |
| vanguard.com | Banking/Vanguard | keep | broker |
| fidelity.com | Banking/Fidelity | keep | broker |
| schwab.com | Banking/Schwab | keep | broker |
| robinhood.com | Banking/Robinhood | keep | |
| etoro.com | Banking/eToro | keep | |
| interactivebrokers.com | Banking/Interactive Brokers | keep | |
| coinbase.com | Banking/Coinbase | keep | crypto |
| kraken.com | Banking/Kraken | keep | crypto |
| gemini.com | Banking/Gemini | keep | crypto |
| crypto.com | Banking/Crypto.com | keep | crypto |
| paypal.com | Banking/PayPal | keep | payments |
| wise.com | Banking/Wise | keep | |
| stripe.com | Banking/Stripe | keep | merchant receipts |
| klarna.com | Banking/Klarna | keep | |
| afterpay.com | Banking/Afterpay | keep | |
| americanexpress.com | Banking/Amex | keep | |
| capitalone.com | Banking/Capital One | keep | |

## Grocery & food delivery

| Domain | Label | Default | Notes |
|---|---|---|---|
| woolworths.com.au | Shopping/Woolworths | archive | promos; receipts → keep |
| coles.com.au | Shopping/Coles | archive | |
| aldi.com.au | Shopping/Aldi | archive | |
| iga.com.au | Shopping/IGA | archive | |
| walmart.com | Shopping/Walmart | archive | |
| kroger.com | Shopping/Kroger | archive | |
| wholefoodsmarket.com | Shopping/Whole Foods | archive | |
| costco.com | Shopping/Costco | archive | |
| traderjoes.com | Shopping/Trader Joe's | archive | |
| target.com | Shopping/Target | archive | |
| tesco.com | Shopping/Tesco | archive | |
| sainsburys.co.uk | Shopping/Sainsbury's | archive | |
| ocado.com | Shopping/Ocado | archive | |
| ubereats.com | Shopping/Uber Eats | keep | order receipts |
| doordash.com | Shopping/DoorDash | keep | |
| grubhub.com | Shopping/Grubhub | keep | |
| deliveroo.co.uk | Shopping/Deliveroo | keep | |
| justeat.com | Shopping/Just Eat | keep | |
| menulog.com.au | Shopping/Menulog | keep | |
| hellofresh.com | Subscriptions/HelloFresh | keep | meal kit billing |
| marleyspoon.com.au | Subscriptions/Marley Spoon | keep | |
| blueapron.com | Subscriptions/Blue Apron | keep | |

## Subscriptions — streaming

| Domain | Label | Default | Notes |
|---|---|---|---|
| netflix.com | Subscriptions/Netflix | archive | billing → keep |
| spotify.com | Subscriptions/Spotify | archive | |
| disneyplus.com | Subscriptions/Disney+ | archive | |
| max.com | Subscriptions/Max | archive | HBO |
| primevideo.com | Subscriptions/Prime Video | archive | |
| hulu.com | Subscriptions/Hulu | archive | |
| youtube.com | Subscriptions/YouTube | keep | membership billing |
| paramount.com | Subscriptions/Paramount+ | archive | |
| stan.com.au | Subscriptions/Stan | archive | |
| binge.com.au | Subscriptions/Binge | archive | |
| kayosports.com.au | Subscriptions/Kayo | archive | |
| twitch.tv | Subscriptions/Twitch | archive | |
| tidal.com | Subscriptions/Tidal | archive | |

## Subscriptions — SaaS & AI

| Domain | Label | Default | Notes |
|---|---|---|---|
| notion.so | Subscriptions/Notion | keep | billing notices |
| figma.com | Subscriptions/Figma | keep | |
| slack.com | Subscriptions/Slack | keep | |
| linear.app | Subscriptions/Linear | keep | |
| dropbox.com | Subscriptions/Dropbox | keep | |
| github.com | Subscriptions/GitHub | keep | |
| gitlab.com | Subscriptions/GitLab | keep | |
| atlassian.com | Subscriptions/Atlassian | keep | |
| asana.com | Subscriptions/Asana | keep | |
| zoom.us | Subscriptions/Zoom | keep | |
| canva.com | Subscriptions/Canva | archive | |
| adobe.com | Subscriptions/Adobe | keep | |
| microsoft.com | Subscriptions/Microsoft 365 | keep | billing |
| google.com | Subscriptions/Google One | keep | One/Payment billing |
| openai.com | Subscriptions/OpenAI | keep | |
| anthropic.com | Subscriptions/Anthropic | keep | |
| cursor.com | Subscriptions/Cursor | archive | |
| perplexity.ai | Subscriptions/Perplexity | archive | |
| midjourney.com | Subscriptions/Midjourney | archive | |
| vercel.com | Subscriptions/Vercel | keep | |
| netlify.com | Subscriptions/Netlify | keep | |
| cloudflare.com | Subscriptions/Cloudflare | keep | |
| digitalocean.com | Subscriptions/DigitalOcean | keep | |

## Subscriptions — creator support

| Domain | Label | Default | Notes |
|---|---|---|---|
| patreon.com | Subscriptions/Patreon | keep | |
| buymeacoffee.com | News & Ads/Buy Me a Coffee | archive | |
| ko-fi.com | Subscriptions/Ko-fi | keep | |
| substack.com | News & Ads/Substack | archive | newsletters |

## Shopping

| Domain | Label | Default | Notes |
|---|---|---|---|
| amazon.com | Shopping/Amazon | keep | orders; marketing → archive |
| ebay.com | Shopping/eBay | archive | |
| etsy.com | Shopping/Etsy | keep | |
| aliexpress.com | Shopping/AliExpress | keep | |
| apple.com | Shopping/Apple | keep | Store orders |
| bestbuy.com | Shopping/Best Buy | archive | |
| asos.com | Shopping/ASOS | archive | |
| zara.com | Shopping/Zara | archive | |
| hm.com | Shopping/H&M | archive | |
| uniqlo.com | Shopping/Uniqlo | archive | |
| nike.com | Shopping/Nike | archive | |
| adidas.com | Shopping/Adidas | archive | |
| sephora.com | Shopping/Sephora | archive | |
| mecca.com.au | Shopping/Mecca | archive | |
| ikea.com | Shopping/IKEA | keep | |
| wayfair.com | Shopping/Wayfair | archive | |
| kmart.com.au | Shopping/Kmart | archive | |
| bigw.com.au | Shopping/Big W | archive | |
| thegoodguys.com.au | Shopping/The Good Guys | archive | |

## News & Ads

| Domain | Label | Default | Notes |
|---|---|---|---|
| tldrnewsletter.com | News & Ads/TLDR | archive | |
| morningbrew.com | News & Ads/Morning Brew | archive | |
| thehustle.co | News & Ads/The Hustle | archive | |
| alphasignal.ai | News & Ads/AlphaSignal | archive | |
| deeplearning.ai | News & Ads/DeepLearning.ai | archive | |
| mckinsey.com | News & Ads/McKinsey | archive | |
| beehiiv.com | News & Ads/Beehiiv | archive | parent for Beehiiv newsletters |
| nytimes.com | News & Ads/New York Times | archive | |
| ft.com | News & Ads/Financial Times | archive | |
| theguardian.com | News & Ads/The Guardian | archive | |
| theatlantic.com | News & Ads/The Atlantic | archive | |
| theaustralian.com.au | News & Ads/The Australian | archive | |
| insideapple.apple.com | News & Ads/Apple | archive | dev/marketing |

## Travel

| Domain | Label | Default | Notes |
|---|---|---|---|
| qantas.com.au | Travel/Qantas | keep | bookings |
| virginaustralia.com | Travel/Virgin Australia | keep | |
| singaporeair.com | Travel/Singapore Airlines | keep | |
| delta.com | Travel/Delta | keep | |
| united.com | Travel/United | keep | |
| britishairways.com | Travel/British Airways | keep | |
| emirates.com | Travel/Emirates | keep | |
| jetstar.com | Travel/Jetstar | keep | |
| ryanair.com | Travel/Ryanair | keep | |
| booking.com | Travel/Booking.com | keep | |
| airbnb.com | Travel/Airbnb | keep | |
| expedia.com | Travel/Expedia | keep | |
| marriott.com | Travel/Marriott | archive | promos |
| hilton.com | Travel/Hilton | archive | |
| accor.com | Travel/Accor | archive | |
| agoda.com | Travel/Agoda | keep | |
| trip.com | Travel/Trip.com | keep | |
| uber.com | Travel/Uber | keep | ride receipts |
| lyft.com | Travel/Lyft | keep | |
| didiglobal.com | Travel/DiDi | archive | |
| velocityfrequentflyer.com | News & Ads/Velocity | archive | loyalty marketing |
| qantasfrequentflyer.com.au | News & Ads/Qantas Frequent Flyer | archive | |
| skywards.com | News & Ads/Emirates Skywards | archive | |

## Bills & utilities

| Domain | Label | Default | Notes |
|---|---|---|---|
| agl.com.au | Bills/AGL | keep | energy |
| originenergy.com.au | Bills/Origin | keep | |
| energyaustralia.com.au | Bills/Energy Australia | keep | |
| telstra.com | Bills/Telstra | keep | |
| optus.com.au | Bills/Optus | keep | |
| vodafone.com.au | Bills/Vodafone | keep | |
| tpg.com.au | Bills/TPG | keep | |
| att.com | Bills/AT&T | keep | |
| verizon.com | Bills/Verizon | keep | |
| xfinity.com | Bills/Xfinity | keep | |
| t-mobile.com | Bills/T-Mobile | keep | |
| bt.com | Bills/BT | keep | |
| virginmedia.com | Bills/Virgin Media | keep | |
| sky.com | Bills/Sky | keep | |

## Government

| Domain | Label | Default | Notes |
|---|---|---|---|
| ato.gov.au | Government/ATO | keep | tax |
| mygov.com.au | Government/myGov | keep | |
| immi.gov.au | Government/ImmiAccount | keep | immigration |
| services.nsw.gov.au | Government/Services NSW | keep | |
| irs.gov | Government/IRS | keep | |
| ssa.gov | Government/SSA | keep | |
| gov.uk | Government/GOV.UK | keep | |
| hmrc.gov.uk | Government/HMRC | keep | |

## Health

| Domain | Label | Default | Notes |
|---|---|---|---|
| bupa.com.au | Health/Bupa | keep | |
| medibank.com.au | Health/Medibank | keep | |
| hcf.com.au | Health/HCF | keep | |
| nib.com.au | Health/nib | keep | |
| bcbs.com | Health/Blue Cross | keep | |
| kaiserpermanente.org | Health/Kaiser | keep | |
| aetna.com | Health/Aetna | keep | |
| cigna.com | Health/Cigna | keep | |
| chemistwarehouse.com.au | Health/Chemist Warehouse | keep | |
| walgreens.com | Health/Walgreens | keep | |
| cvs.com | Health/CVS | keep | |
| boots.com | Health/Boots | archive | |

## Career

| Domain | Label | Default | Notes |
|---|---|---|---|
| linkedin.com | Career/LinkedIn | archive | job alerts |
| indeed.com | Career/Indeed | archive | |
| seek.com.au | Career/Seek | archive | |
| glassdoor.com | Career/Glassdoor | archive | |
| ziprecruiter.com | Career/ZipRecruiter | archive | |
| hatch.team | Career/Hatch | archive | |

## Education

| Domain | Label | Default | Notes |
|---|---|---|---|
| coursera.org | Education/Coursera | archive | |
| udemy.com | Education/Udemy | archive | |
| edx.org | Education/edX | archive | |
| datacamp.com | Education/DataCamp | archive | |
| pluralsight.com | Education/Pluralsight | archive | |
| brilliant.org | Education/Brilliant | archive | |
| khanacademy.org | Education/Khan Academy | archive | |

## Property (optional)

| Domain | Label | Default | Notes |
|---|---|---|---|
| realestate.com.au | Property/realestate.com.au | archive | |
| domain.com.au | Property/Domain | archive | |
| zillow.com | Property/Zillow | archive | |
| rightmove.co.uk | Property/Rightmove | archive | |
| propertyme.com | Property/PropertyMe | keep | rental management |

## Always skip (no label)

- Verification codes / OTP / login-confirmation.
- Security login alerts requiring no action.
- Personal mail from individuals.
