'use client'

import { useState } from 'react'
import { Building2, ShoppingCart, Repeat, Receipt, Landmark, HeartPulse, Plane, Briefcase, Newspaper, GraduationCap, Search } from 'lucide-react'
import { PROVIDER_CATEGORIES, getProvidersByCategory, searchProviders, type ProviderRule } from '@/lib/providers'

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
  'Education': GraduationCap,
}

export default function TaxonomyPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProviders = searchQuery
    ? searchProviders(searchQuery)
    : selectedCategory
    ? getProvidersByCategory(selectedCategory)
    : []

  const allProviders = selectedCategory === null && !searchQuery

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Provider Taxonomy</h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Browse 100+ provider rules across 10+ categories. Click a category to see all providers, or search by domain name.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
            <input
              type="text"
              placeholder="Search by domain, label, or provider name..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setSelectedCategory(null)
              }}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#ea4335]"
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto mb-12">
          {PROVIDER_CATEGORIES.map((category) => {
            const Icon = categoryIcons[category.name] || Building2
            const isSelected = selectedCategory === category.name
            const providers = getProvidersByCategory(category.name)

            return (
              <button
                key={category.name}
                onClick={() => {
                  setSelectedCategory(isSelected ? null : category.name)
                  setSearchQuery('')
                }}
                className={`p-4 rounded-lg border text-left transition-all ${
                  isSelected
                    ? 'border-[#ea4335] bg-[#ea4335]/5 dark:bg-[#ea4335]/10'
                    : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-[#ea4335]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <Icon className={`h-5 w-5 mt-0.5 ${isSelected ? 'text-[#ea4335]' : 'text-zinc-600 dark:text-zinc-400'}`} />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm mb-1">{category.name}</h3>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-2">
                      {category.description}
                    </p>
                    <p className="text-xs font-mono text-zinc-500">
                      {providers.length} {providers.length === 1 ? 'provider' : 'providers'}
                    </p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Results */}
        {!allProviders && (
          <div className="max-w-5xl mx-auto">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {searchQuery
                  ? `Search results for "${searchQuery}"`
                  : `${selectedCategory} Providers`}
              </h2>
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                {filteredProviders.length} {filteredProviders.length === 1 ? 'result' : 'results'}
              </span>
            </div>

            {filteredProviders.length === 0 ? (
              <div className="text-center py-12 text-zinc-600 dark:text-zinc-400">
                No providers found matching your search.
              </div>
            ) : (
              <div className="grid gap-3">
                {filteredProviders.map((provider, index) => (
                  <ProviderCard key={`${provider.domain}-${index}`} provider={provider} />
                ))}
              </div>
            )}
          </div>
        )}

        {allProviders && (
          <div className="max-w-3xl mx-auto text-center py-12 text-zinc-600 dark:text-zinc-400">
            Select a category above or use the search bar to explore provider rules.
          </div>
        )}
      </div>
    </div>
  )
}

function ProviderCard({ provider }: { provider: ProviderRule }) {
  return (
    <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <code className="text-sm font-mono bg-zinc-100 dark:bg-zinc-900 px-2 py-1 rounded">
              {provider.domain}
            </code>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              provider.defaultAction === 'keep'
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
            }`}>
              {provider.defaultAction}
            </span>
          </div>
          <div className="text-sm font-medium text-[#ea4335] mb-1">
            {provider.label}
          </div>
          {provider.notes && (
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {provider.notes}
            </p>
          )}
          {provider.contentType && (
            <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-2">
              Content type: {provider.contentType}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
