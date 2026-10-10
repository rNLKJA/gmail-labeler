'use client'

import { useState, useEffect } from 'react'
import { Upload, Play, Download, BarChart3, Tag, Archive, Inbox, Clock } from 'lucide-react'
import { parseInboxCSV, simulateInbox, type SimulationResult, type ClassifiedThread } from '@/lib/simulator'

export default function SimulatorPage() {
  const [csvData, setCsvData] = useState<string | null>(null)
  const [result, setResult] = useState<SimulationResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [view, setView] = useState<'threads' | 'stats' | 'actions'>('stats')

  // Load synthetic inbox on mount
  useEffect(() => {
    fetch('/data/synthetic-inbox.csv')
      .then(res => res.text())
      .then(data => setCsvData(data))
      .catch(err => console.error('Failed to load synthetic inbox:', err))
  }, [])

  const handleRunSimulation = () => {
    if (!csvData) return
    setLoading(true)
    setTimeout(() => {
      const threads = parseInboxCSV(csvData)
      const simulationResult = simulateInbox(threads)
      setResult(simulationResult)
      setLoading(false)
    }, 500)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const text = e.target?.result as string
        setCsvData(text)
        setResult(null)
      }
      reader.readAsText(file)
    }
  }

  const downloadResults = () => {
    if (!result) return
    const csv = [
      'sender,subject,date,domain,label,action',
      ...result.threads.map(t =>
        `"${t.sender}","${t.subject}","${t.date}","${t.domain}","${t.label || 'N/A'}","${t.action || 'N/A'}"`
      )
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'gmail-labeler-results.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Dry-Run Simulator</h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Process a synthetic inbox and see exactly what the skill would do. No real Gmail access required.
          </p>
        </div>

        {/* Control Panel */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <span className="text-sm font-medium mb-1">Input Data</span>
                  <div className="flex gap-2">
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 rounded-lg text-sm font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
                        <Upload className="h-4 w-4" />
                        Upload CSV
                      </span>
                    </label>
                    <span className="px-3 py-2 text-sm text-zinc-600 dark:text-zinc-400">
                      {csvData ? '100 threads loaded' : 'Loading...'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                {result && (
                  <button
                    onClick={downloadResults}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 rounded-lg text-sm font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    Export
                  </button>
                )}
                <button
                  onClick={handleRunSimulation}
                  disabled={!csvData || loading}
                  className="inline-flex items-center gap-2 px-6 py-2 bg-[#ea4335] text-white rounded-lg font-medium hover:bg-[#c5341f] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Play className="h-4 w-4" />
                  {loading ? 'Processing...' : result ? 'Re-run' : 'Run Simulation'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="max-w-6xl mx-auto">
            {/* View Tabs */}
            <div className="flex gap-2 mb-6 border-b border-zinc-200 dark:border-zinc-800">
              <button
                onClick={() => setView('stats')}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  view === 'stats'
                    ? 'border-[#ea4335] text-[#ea4335]'
                    : 'border-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50'
                }`}
              >
                <BarChart3 className="h-4 w-4 inline mr-2" />
                Statistics
              </button>
              <button
                onClick={() => setView('threads')}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  view === 'threads'
                    ? 'border-[#ea4335] text-[#ea4335]'
                    : 'border-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50'
                }`}
              >
                <Tag className="h-4 w-4 inline mr-2" />
                Threads ({result.threads.length})
              </button>
              <button
                onClick={() => setView('actions')}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  view === 'actions'
                    ? 'border-[#ea4335] text-[#ea4335]'
                    : 'border-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50'
                }`}
              >
                <Clock className="h-4 w-4 inline mr-2" />
                Action Log
              </button>
            </div>

            {/* Stats View */}
            {view === 'stats' && <StatsView result={result} />}

            {/* Threads View */}
            {view === 'threads' && <ThreadsView threads={result.threads} />}

            {/* Actions View */}
            {view === 'actions' && <ActionsView actions={result.actions} />}
          </div>
        )}

        {/* Info */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/30 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-400 mb-2">
              About the Simulator
            </h3>
            <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1 list-disc list-inside">
              <li>Uses 100% synthetic data (no real Gmail access)</li>
              <li>Shows exactly what the skill would do in a real run</li>
              <li>Upload your own CSV (sender, subject, date) to test custom data</li>
              <li>Export results as CSV for further analysis</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatsView({ result }: { result: SimulationResult }) {
  const categoryEntries = Object.entries(result.stats.categoryDistribution).sort((a, b) => b[1] - a[1])
  const labelEntries = Object.entries(result.stats.labelDistribution).sort((a, b) => b[1] - a[1])

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Overview Stats */}
      <div className="md:col-span-2 grid sm:grid-cols-4 gap-4">
        <StatCard
          label="Total Threads"
          value={result.stats.total}
          icon={<Tag className="h-5 w-5" />}
        />
        <StatCard
          label="Classified"
          value={result.stats.classified}
          icon={<Tag className="h-5 w-5 text-green-600" />}
          valueColor="text-green-600"
        />
        <StatCard
          label="Kept in Inbox"
          value={result.stats.kept}
          icon={<Inbox className="h-5 w-5 text-blue-600" />}
          valueColor="text-blue-600"
        />
        <StatCard
          label="Archived"
          value={result.stats.archived}
          icon={<Archive className="h-5 w-5 text-zinc-600" />}
          valueColor="text-zinc-600"
        />
      </div>

      {/* Category Distribution */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
        <h3 className="text-lg font-semibold mb-4">By Category</h3>
        <div className="space-y-3">
          {categoryEntries.map(([category, count]) => (
            <div key={category}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">{category}</span>
                <span className="text-zinc-600 dark:text-zinc-400">{count}</span>
              </div>
              <div className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#ea4335]"
                  style={{ width: `${(count / result.stats.total) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Label Distribution */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
        <h3 className="text-lg font-semibold mb-4">Top Labels</h3>
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {labelEntries.slice(0, 15).map(([label, count]) => (
            <div key={label} className="flex justify-between text-sm py-1.5 border-b border-zinc-100 dark:border-zinc-800 last:border-0">
              <code className="text-xs">{label}</code>
              <span className="font-medium">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, icon, valueColor }: { label: string; value: number; icon: React.ReactNode; valueColor?: string }) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
      <div className="flex items-center gap-3">
        <div className="text-zinc-600 dark:text-zinc-400">{icon}</div>
        <div>
          <div className={`text-2xl font-bold ${valueColor || ''}`}>{value}</div>
          <div className="text-xs text-zinc-600 dark:text-zinc-400">{label}</div>
        </div>
      </div>
    </div>
  )
}

function ThreadsView({ threads }: { threads: ClassifiedThread[] }) {
  return (
    <div className="space-y-2 max-h-[600px] overflow-y-auto">
      {threads.map((thread, index) => (
        <div key={index} className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
          <div className="flex flex-col sm:flex-row sm:items-start gap-3">
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium mb-1 truncate">{thread.sender}</div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-2 truncate">{thread.subject}</div>
              <div className="flex flex-wrap gap-2 items-center">
                {thread.label ? (
                  <code className="text-xs bg-[#ea4335]/10 text-[#ea4335] px-2 py-1 rounded">
                    {thread.label}
                  </code>
                ) : (
                  <span className="text-xs text-zinc-500">No label</span>
                )}
                {thread.action && (
                  <span className={`text-xs px-2 py-1 rounded ${
                    thread.action === 'keep'
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                      : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                  }`}>
                    {thread.action}
                  </span>
                )}
              </div>
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-500 whitespace-nowrap">
              {thread.date}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function ActionsView({ actions }: { actions: Array<{ thread: ClassifiedThread; action: string; timestamp: string }> }) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
      <div className="max-h-[600px] overflow-y-auto">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 dark:bg-zinc-800 sticky top-0">
            <tr>
              <th className="text-left p-3 font-medium">Timestamp</th>
              <th className="text-left p-3 font-medium">Sender</th>
              <th className="text-left p-3 font-medium">Label</th>
              <th className="text-left p-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {actions.map((action, index) => (
              <tr key={index} className="border-t border-zinc-200 dark:border-zinc-800">
                <td className="p-3 text-zinc-600 dark:text-zinc-400 font-mono text-xs">
                  {action.timestamp}
                </td>
                <td className="p-3 truncate max-w-xs">{action.thread.sender}</td>
                <td className="p-3">
                  {action.thread.label ? (
                    <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">
                      {action.thread.label}
                    </code>
                  ) : (
                    <span className="text-zinc-500">-</span>
                  )}
                </td>
                <td className="p-3">
                  <span className={`text-xs px-2 py-1 rounded ${
                    action.action === 'skip'
                      ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                      : action.action === 'archive'
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                      : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                  }`}>
                    {action.action}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
