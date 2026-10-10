/**
 * Provider taxonomy and classification rules
 * Ported from the original Gmail Labeler skill
 */

export interface ProviderRule {
  domain: string
  match?: string
  label: string
  defaultAction: 'keep' | 'archive'
  contentType?: 'receipt' | 'marketing' | 'security' | 'newsletter' | 'account' | 'other'
  notes?: string
}

export interface ProviderCategory {
  name: string
  description: string
  icon: string
  count: number
}

export const PROVIDER_CATEGORIES: ProviderCategory[] = [
  { name: 'Banking', description: 'Banks, payment processors, crypto exchanges', icon: 'building-2', count: 0 },
  { name: 'Shopping', description: 'E-commerce, retail, grocery, food delivery', icon: 'shopping-cart', count: 0 },
  { name: 'Subscriptions', description: 'Streaming, SaaS, creator support', icon: 'repeat', count: 0 },
  { name: 'Bills', description: 'Utilities, energy, telecom', icon: 'receipt', count: 0 },
  { name: 'Government', description: 'Tax, immigration, public services', icon: 'landmark', count: 0 },
  { name: 'Health', description: 'Insurance, pharmacies, medical', icon: 'heart-pulse', count: 0 },
  { name: 'Travel', description: 'Airlines, hotels, ride-sharing', icon: 'plane', count: 0 },
  { name: 'Career', description: 'Job boards, professional networks', icon: 'briefcase', count: 0 },
  { name: 'News & Ads', description: 'Newsletters, marketing, media', icon: 'newspaper', count: 0 },
  { name: 'Education', description: 'Universities, online learning', icon: 'graduation-cap', count: 0 },
]

// Subset of provider rules for the demo (representative examples)
export const PROVIDER_RULES: ProviderRule[] = [
  // Banking
  { domain: 'chase.com', label: 'Banking/Chase', defaultAction: 'keep', notes: 'Statements, alerts' },
  { domain: 'paypal.com', label: 'Banking/PayPal', defaultAction: 'keep', contentType: 'receipt' },
  { domain: 'stripe.com', label: 'Banking/Stripe', defaultAction: 'keep', contentType: 'receipt' },
  { domain: 'wise.com', label: 'Banking/Wise', defaultAction: 'keep' },
  { domain: 'revolut.com', label: 'Banking/Revolut', defaultAction: 'keep' },
  { domain: 'coinbase.com', label: 'Banking/Coinbase', defaultAction: 'keep', notes: 'Crypto' },
  { domain: 'cba.com.au', label: 'Banking/CommBank', defaultAction: 'keep' },
  { domain: 'anz.com', label: 'Banking/ANZ', defaultAction: 'keep' },

  // Shopping
  { domain: 'amazon.com', label: 'Shopping/Amazon', defaultAction: 'keep', contentType: 'receipt' },
  { domain: 'ebay.com', label: 'Shopping/eBay', defaultAction: 'archive' },
  { domain: 'etsy.com', label: 'Shopping/Etsy', defaultAction: 'keep' },
  { domain: 'walmart.com', label: 'Shopping/Walmart', defaultAction: 'archive' },
  { domain: 'target.com', label: 'Shopping/Target', defaultAction: 'archive' },
  { domain: 'ikea.com', label: 'Shopping/IKEA', defaultAction: 'keep' },
  { domain: 'woolworths.com.au', label: 'Shopping/Woolworths', defaultAction: 'archive', notes: 'Promos; receipts → keep' },
  { domain: 'coles.com.au', label: 'Shopping/Coles', defaultAction: 'archive' },
  { domain: 'ubereats.com', label: 'Shopping/Uber Eats', defaultAction: 'keep', contentType: 'receipt' },
  { domain: 'doordash.com', label: 'Shopping/DoorDash', defaultAction: 'keep' },
  { domain: 'deliveroo.co.uk', label: 'Shopping/Deliveroo', defaultAction: 'keep' },

  // Subscriptions - Streaming
  { domain: 'netflix.com', label: 'Subscriptions/Netflix', defaultAction: 'archive', notes: 'Billing → keep' },
  { domain: 'spotify.com', label: 'Subscriptions/Spotify', defaultAction: 'archive' },
  { domain: 'disneyplus.com', label: 'Subscriptions/Disney+', defaultAction: 'archive' },
  { domain: 'primevideo.com', label: 'Subscriptions/Prime Video', defaultAction: 'archive' },
  { domain: 'youtube.com', label: 'Subscriptions/YouTube', defaultAction: 'keep', contentType: 'account' },

  // Subscriptions - SaaS
  { domain: 'notion.so', label: 'Subscriptions/Notion', defaultAction: 'keep', notes: 'Billing notices' },
  { domain: 'github.com', label: 'Subscriptions/GitHub', defaultAction: 'keep' },
  { domain: 'vercel.com', label: 'Subscriptions/Vercel', defaultAction: 'keep' },
  { domain: 'figma.com', label: 'Subscriptions/Figma', defaultAction: 'keep' },
  { domain: 'slack.com', label: 'Subscriptions/Slack', defaultAction: 'keep' },
  { domain: 'dropbox.com', label: 'Subscriptions/Dropbox', defaultAction: 'keep' },
  { domain: 'openai.com', label: 'Subscriptions/OpenAI', defaultAction: 'keep' },
  { domain: 'anthropic.com', label: 'Subscriptions/Anthropic', defaultAction: 'keep' },

  // Bills & Utilities
  { domain: 'agl.com.au', label: 'Bills/AGL', defaultAction: 'keep', notes: 'Energy' },
  { domain: 'telstra.com', label: 'Bills/Telstra', defaultAction: 'keep' },
  { domain: 'optus.com.au', label: 'Bills/Optus', defaultAction: 'keep' },
  { domain: 'att.com', label: 'Bills/AT&T', defaultAction: 'keep' },
  { domain: 'verizon.com', label: 'Bills/Verizon', defaultAction: 'keep' },

  // Government
  { domain: 'ato.gov.au', label: 'Government/ATO', defaultAction: 'keep', notes: 'Tax' },
  { domain: 'mygov.com.au', label: 'Government/myGov', defaultAction: 'keep' },
  { domain: 'immi.gov.au', label: 'Government/ImmiAccount', defaultAction: 'keep', notes: 'Immigration' },
  { domain: 'irs.gov', label: 'Government/IRS', defaultAction: 'keep' },
  { domain: 'gov.uk', label: 'Government/GOV.UK', defaultAction: 'keep' },

  // Health
  { domain: 'bupa.com.au', label: 'Health/Bupa', defaultAction: 'keep' },
  { domain: 'medibank.com.au', label: 'Health/Medibank', defaultAction: 'keep' },
  { domain: 'chemistwarehouse.com.au', label: 'Health/Chemist Warehouse', defaultAction: 'keep' },
  { domain: 'walgreens.com', label: 'Health/Walgreens', defaultAction: 'keep' },
  { domain: 'cvs.com', label: 'Health/CVS', defaultAction: 'keep' },

  // Travel
  { domain: 'qantas.com.au', label: 'Travel/Qantas', defaultAction: 'keep', notes: 'Bookings' },
  { domain: 'virginaustralia.com', label: 'Travel/Virgin Australia', defaultAction: 'keep' },
  { domain: 'delta.com', label: 'Travel/Delta', defaultAction: 'keep' },
  { domain: 'united.com', label: 'Travel/United', defaultAction: 'keep' },
  { domain: 'booking.com', label: 'Travel/Booking.com', defaultAction: 'keep' },
  { domain: 'airbnb.com', label: 'Travel/Airbnb', defaultAction: 'keep' },
  { domain: 'expedia.com', label: 'Travel/Expedia', defaultAction: 'keep' },
  { domain: 'uber.com', label: 'Travel/Uber', defaultAction: 'keep', contentType: 'receipt' },

  // Career
  { domain: 'linkedin.com', label: 'Career/LinkedIn', defaultAction: 'archive', notes: 'Job alerts' },
  { domain: 'indeed.com', label: 'Career/Indeed', defaultAction: 'archive' },
  { domain: 'seek.com.au', label: 'Career/Seek', defaultAction: 'archive' },
  { domain: 'glassdoor.com', label: 'Career/Glassdoor', defaultAction: 'archive' },

  // News & Ads
  { domain: 'tldrnewsletter.com', label: 'News & Ads/TLDR', defaultAction: 'archive' },
  { domain: 'morningbrew.com', label: 'News & Ads/Morning Brew', defaultAction: 'archive' },
  { domain: 'substack.com', label: 'News & Ads/Substack', defaultAction: 'archive', notes: 'Newsletters' },
  { domain: 'nytimes.com', label: 'News & Ads/New York Times', defaultAction: 'archive' },
  { domain: 'theguardian.com', label: 'News & Ads/The Guardian', defaultAction: 'archive' },
]

/**
 * Extract domain from email address
 */
export function extractDomain(email: string): string {
  const match = email.match(/@([^>]+)>?$/)
  return match ? match[1].toLowerCase() : email.toLowerCase()
}

/**
 * Classify a sender email address according to provider rules
 */
export function classifySender(email: string): {
  domain: string
  rule: ProviderRule | null
  label: string | null
  action: 'keep' | 'archive' | null
} {
  const domain = extractDomain(email)

  // Find matching rule
  const rule = PROVIDER_RULES.find(r => {
    if (r.match) {
      return email.toLowerCase().includes(r.match.toLowerCase())
    }
    return domain.endsWith(r.domain)
  })

  return {
    domain,
    rule: rule || null,
    label: rule?.label || null,
    action: rule?.defaultAction || null,
  }
}

/**
 * Get all providers in a category
 */
export function getProvidersByCategory(category: string): ProviderRule[] {
  return PROVIDER_RULES.filter(r => r.label.startsWith(`${category}/`))
}

/**
 * Search provider rules by domain
 */
export function searchProviders(query: string): ProviderRule[] {
  const q = query.toLowerCase()
  return PROVIDER_RULES.filter(r =>
    r.domain.toLowerCase().includes(q) ||
    r.label.toLowerCase().includes(q) ||
    r.notes?.toLowerCase().includes(q)
  )
}
