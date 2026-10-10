'use client'

import { useState, useEffect } from 'react'
import { Download, Trash2, Clock, Zap } from 'lucide-react'
import { getAuditLog, exportAuditLog, clearAuditLog, type AIAuditEntry } from '@/lib/ai/audit-log'

export default function AILogPage() {
  const [entries, setEntries] = useState<AIAuditEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    const loadEntries = async () => {
      setLoading(true)
      try {
        const log = await getAuditLog()
        setEntries(log)
      } catch (error) {
        console.error('Failed to load audit log:', error)
      } finally {
        setLoading(false)
      }
    }

    loadEntries()
  }, [])

  async function handleExport() {
    try {
      const json = await exportAuditLog()
      const blob = new Blob([json], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `ai-audit-log-${new Date().toISOString().split('T')[0]}.json`
      a.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Failed to export:', error)
    }
  }

  async function handleClear() {
    if (window.confirm('Clear all audit log entries? This cannot be undone.')) {
      try {
        await clearAuditLog()
        setEntries([])
      } catch (error) {
        console.error('Failed to clear log:', error)
      }
    }
  }

  const filteredEntries = entries.filter(entry => {
    if (filter === 'all') return true
    return entry.feature === filter
  })

  const features = Array.from(new Set(entries.map(e => e.feature)))

  const stats = {
    total: entries.length,
    totalTokens: entries.reduce((sum, e) => sum + (e.tokenUsage?.input || 0) + (e.tokenUsage?.output || 0), 0),
    avgLatency: entries.length > 0 ? entries.reduce((sum, e) => sum + e.latencyMs, 0) / entries.length : 0,
    byProvider: entries.reduce((acc, e) => {
      acc[e.provider] = (acc[e.provider] || 0) + 1
      return acc
    }, {} as Record<string, number>),
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">AI Audit Log</h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              All AI interactions logged locally for transparency. Data never leaves your browser.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              Export JSON
            </button>
            <button
              onClick={handleClear}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              Clear Log
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Total Calls</div>
            <div className="text-2xl font-bold">{stats.total}</div>
          </div>
          <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Total Tokens</div>
            <div className="text-2xl font-bold">{stats.totalTokens.toLocaleString()}</div>
          </div>
          <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Avg Latency</div>
            <div className="text-2xl font-bold">{Math.round(stats.avgLatency)}ms</div>
          </div>
          <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Providers</div>
            <div className="text-sm mt-1">
              {Object.entries(stats.byProvider).map(([provider, count]) => (
                <div key={provider}>{provider}: {count}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Filter by feature</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          >
            <option value="all">All features ({entries.length})</option>
            {features.map(feature => (
              <option key={feature} value={feature}>
                {feature} ({entries.filter(e => e.feature === feature).length})
              </option>
            ))}
          </select>
        </div>

        {/* Entries */}
        {loading ? (
          <div className="text-center py-12 text-zinc-600 dark:text-zinc-400">
            Loading audit log...
          </div>
        ) : filteredEntries.length === 0 ? (
          <div className="text-center py-12 text-zinc-600 dark:text-zinc-400">
            {entries.length === 0
              ? 'No AI calls recorded yet. Use an AI-powered feature to populate this log.'
              : 'No entries match the selected filter.'}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEntries.map(entry => (
              <div
                key={entry.id}
                className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-semibold">{entry.feature}</div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400 flex items-center gap-4 mt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(entry.timestamp).toLocaleString()}
                      </span>
                      <span>{entry.provider} / {entry.model}</span>
                      {entry.latencyMs > 0 && (
                        <span className="flex items-center gap-1">
                          <Zap className="h-3 w-3" />
                          {entry.latencyMs}ms
                        </span>
                      )}
                    </div>
                  </div>
                  {entry.tokenUsage && (
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">
                      {entry.tokenUsage.input + entry.tokenUsage.output} tokens
                    </div>
                  )}
                </div>

                <div className="space-y-2 text-sm">
                  <div>
                    <div className="font-medium text-zinc-600 dark:text-zinc-400 mb-1">Input:</div>
                    <div className="bg-zinc-50 dark:bg-zinc-800 p-2 rounded border border-zinc-200 dark:border-zinc-700 overflow-x-auto">
                      <pre className="whitespace-pre-wrap break-words">{entry.input}</pre>
                    </div>
                  </div>

                  <div>
                    <div className="font-medium text-zinc-600 dark:text-zinc-400 mb-1">
                      Output: <span className="text-[#ea4335]">AI-generated</span>
                    </div>
                    <div className="bg-zinc-50 dark:bg-zinc-800 p-2 rounded border border-zinc-200 dark:border-zinc-700 overflow-x-auto">
                      <pre className="whitespace-pre-wrap break-words">{entry.output}</pre>
                    </div>
                  </div>

                  {entry.humanDecision && (
                    <div className="text-xs text-zinc-600 dark:text-zinc-400">
                      Human decision: <strong>{entry.humanDecision}</strong>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
