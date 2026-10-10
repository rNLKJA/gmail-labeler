'use client'

import { useState } from 'react'
import { Search, Tag, Archive, Inbox } from 'lucide-react'
import { classifySender, type ProviderRule } from '@/lib/providers'

const EXAMPLE_EMAILS = [
  'notifications@chase.com',
  'ship-confirm@amazon.com',
  'noreply@netflix.com',
  'alerts@paypal.com',
  'noreply@ato.gov.au',
  'team@notion.so',
  'reservations@qantas.com.au',
  'messages@linkedin.com',
]

export default function PlaygroundPage() {
  const [email, setEmail] = useState('')
  const [result, setResult] = useState<{
    domain: string
    rule: ProviderRule | null
    label: string | null
    action: 'keep' | 'archive' | null
  } | null>(null)

  const handleClassify = () => {
    if (!email.trim()) return
    const classification = classifySender(email)
    setResult(classification)
  }

  const handleExample = (exampleEmail: string) => {
    setEmail(exampleEmail)
    const classification = classifySender(exampleEmail)
    setResult(classification)
  }

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Rule Playground</h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Test the classification logic. Enter any email address to see which label would be applied and what action would be taken.
          </p>
        </div>

        {/* Input Section */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
                <input
                  id="email"
                  type="text"
                  placeholder="sender@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleClassify()}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#ea4335]"
                />
              </div>
              <button
                onClick={handleClassify}
                disabled={!email.trim()}
                className="px-6 py-3 bg-[#ea4335] text-white rounded-lg font-medium hover:bg-[#c5341f] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Classify
              </button>
            </div>

            {/* Examples */}
            <div className="mt-4">
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Try these examples:</p>
              <div className="flex flex-wrap gap-2">
                {EXAMPLE_EMAILS.map((exampleEmail) => (
                  <button
                    key={exampleEmail}
                    onClick={() => handleExample(exampleEmail)}
                    className="text-xs px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors font-mono"
                  >
                    {exampleEmail}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
              {/* Header */}
              <div className="bg-zinc-50 dark:bg-zinc-800 px-6 py-4 border-b border-zinc-200 dark:border-zinc-700">
                <h2 className="text-lg font-semibold">Classification Result</h2>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Domain */}
                <div>
                  <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400 block mb-2">
                    Extracted Domain
                  </label>
                  <code className="block px-4 py-3 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 font-mono text-sm">
                    {result.domain}
                  </code>
                </div>

                {/* Label */}
                <div>
                  <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400 block mb-2 flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    Label
                  </label>
                  {result.label ? (
                    <div className="px-4 py-3 bg-[#ea4335]/5 dark:bg-[#ea4335]/10 rounded-lg border border-[#ea4335]/20">
                      <code className="text-[#ea4335] font-mono text-sm font-medium">
                        {result.label}
                      </code>
                    </div>
                  ) : (
                    <div className="px-4 py-3 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-500 text-sm">
                      No matching rule found — this sender would be skipped
                    </div>
                  )}
                </div>

                {/* Action */}
                <div>
                  <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400 block mb-2">
                    Default Action
                  </label>
                  {result.action ? (
                    <div className={`px-4 py-3 rounded-lg border flex items-center gap-3 ${
                      result.action === 'keep'
                        ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-900/30'
                        : 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-900/30'
                    }`}>
                      {result.action === 'keep' ? (
                        <>
                          <Inbox className="h-5 w-5 text-green-600 dark:text-green-400" />
                          <div>
                            <div className="font-medium text-green-700 dark:text-green-400 text-sm">
                              Keep in Inbox
                            </div>
                            <div className="text-xs text-green-600 dark:text-green-500 mt-0.5">
                              Important mail like receipts and account notices stay visible
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <Archive className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          <div>
                            <div className="font-medium text-blue-700 dark:text-blue-400 text-sm">
                              Archive (remove from inbox)
                            </div>
                            <div className="text-xs text-blue-600 dark:text-blue-500 mt-0.5">
                              Routine mail filed away but searchable and accessible via label
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="px-4 py-3 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-500 text-sm">
                      No action (unmatched sender)
                    </div>
                  )}
                </div>

                {/* Rule Details */}
                {result.rule && (
                  <div>
                    <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400 block mb-2">
                      Rule Details
                    </label>
                    <div className="px-4 py-3 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-zinc-600 dark:text-zinc-400">Domain:</span>
                        <code className="font-mono">{result.rule.domain}</code>
                      </div>
                      {result.rule.contentType && (
                        <div className="flex justify-between">
                          <span className="text-zinc-600 dark:text-zinc-400">Content Type:</span>
                          <span className="font-mono">{result.rule.contentType}</span>
                        </div>
                      )}
                      {result.rule.notes && (
                        <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
                          <span className="text-zinc-600 dark:text-zinc-400">Notes:</span>
                          <p className="text-zinc-700 dark:text-zinc-300 mt-1">{result.rule.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Info Box */}
        <div className="max-w-2xl mx-auto mt-8">
          <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/30 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-400 mb-2">
              How Classification Works
            </h3>
            <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1 list-disc list-inside">
              <li>Domain is extracted from the email address (e.g., <code>@amazon.com</code>)</li>
              <li>Domain is matched against 100+ provider rules</li>
              <li>If matched, the corresponding label and action are returned</li>
              <li>Unmatched senders are skipped (no label applied)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
