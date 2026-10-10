import Link from 'next/link'
import { ArrowRight, Building2, ShoppingCart, Repeat, Receipt, Landmark, HeartPulse, Plane, Briefcase, Newspaper } from 'lucide-react'
import { PROVIDER_CATEGORIES } from '@/lib/providers'

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'Banking': Building2,
  'Shopping': ShoppingCart,
  'Subscriptions': Repeat,
  'Bills': Receipt,
  'Government': Landmark,
  'Health': HeartPulse,
  'Travel': Plane,
  'Career': Briefcase,
  'News & Ads': Newspaper,
}

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-950 dark:to-zinc-900 py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              AI-Powered Gmail Triage
              <span className="block text-[#ea4335] mt-2">Made Simple</span>
            </h1>
            <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 mb-8">
              A Claude Code skill that automatically labels and organizes your Gmail by sender and provider.
              File routine mail, keep important receipts, achieve inbox zero.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/simulator"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#ea4335] text-white rounded-lg font-medium hover:bg-[#c5341f] transition-colors"
              >
                Try the Simulator
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/installation"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 rounded-lg font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >
                Installation Guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              The Gmail Labeler skill uses a comprehensive provider taxonomy to classify and organize your email automatically.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <div className="h-12 w-12 rounded-lg bg-[#ea4335]/10 flex items-center justify-center mb-4">
                <Building2 className="h-6 w-6 text-[#ea4335]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Provider Taxonomy</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                100+ pre-defined rules across 10+ categories. Banking, Shopping, Subscriptions, Government, and more.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <div className="h-12 w-12 rounded-lg bg-[#ea4335]/10 flex items-center justify-center mb-4">
                <Receipt className="h-6 w-6 text-[#ea4335]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Smart Classification</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Classifies by sender domain and content type. Keeps receipts in inbox, archives marketing automatically.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <div className="h-12 w-12 rounded-lg bg-[#ea4335]/10 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-[#ea4335]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Privacy-First</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Dry-run mode shows exactly what will happen. Never deletes mail. All processing through your local MCP server.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <div className="h-12 w-12 rounded-lg bg-[#ea4335]/10 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-[#ea4335]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">MCP Integration</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Works with Claude Code, Cursor, and other AI coding assistants via Model Context Protocol.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <div className="h-12 w-12 rounded-lg bg-[#ea4335]/10 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-[#ea4335]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Filter Generation</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Exports Gmail filter XML for automatic future labeling. Import once, organize forever.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <div className="h-12 w-12 rounded-lg bg-[#ea4335]/10 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-[#ea4335]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Audit Trail</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Every action logged. See exactly what was labeled, what was skipped, and why.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-16 sm:py-24 bg-zinc-50 dark:bg-zinc-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Provider Categories</h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Browse the complete taxonomy with 100+ provider rules across these categories.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
            {PROVIDER_CATEGORIES.slice(0, 9).map((category) => {
              const Icon = categoryIcons[category.name] || Building2
              return (
                <div
                  key={category.name}
                  className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-[#ea4335] dark:hover:border-[#ea4335] transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <Icon className="h-5 w-5 text-[#ea4335] mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-sm">{category.name}</h3>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="text-center">
            <Link
              href="/taxonomy"
              className="inline-flex items-center gap-2 text-[#ea4335] hover:underline font-medium"
            >
              Explore full taxonomy
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Try It?</h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
              Explore the interactive demos or install the skill in your AI coding assistant.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/taxonomy"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 rounded-lg font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >
                Browse Taxonomy
              </Link>
              <Link
                href="/playground"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 rounded-lg font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >
                Rule Playground
              </Link>
              <Link
                href="/simulator"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#ea4335] text-white rounded-lg font-medium hover:bg-[#c5341f] transition-colors"
              >
                Run Simulator
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
