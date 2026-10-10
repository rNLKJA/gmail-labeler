'use client'

import { useEffect, useState } from 'react'
import { parseInboxCSV, simulateInbox } from '@/lib/simulator'
import { analyzeCoverage, identifyFailureCases, generateCoverageReport, type CoverageAnalysis, type FailureCase } from '@/lib/governance/coverage-analysis'
import { BarChart3, AlertTriangle, Download } from 'lucide-react'

export default function CoveragePage() {
  const [analysis, setAnalysis] = useState<CoverageAnalysis | null>(null)
  const [failures, setFailures] = useState<FailureCase[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAndAnalyze = async () => {
      setLoading(true)
      try {
        const response = await fetch('/data/synthetic-inbox.csv')
        const csv = await response.text()
        const threads = parseInboxCSV(csv)
        const result = simulateInbox(threads)

        const coverageAnalysis = analyzeCoverage(result)
        const failureCases = identifyFailureCases(result.threads)

        setAnalysis(coverageAnalysis)
        setFailures(failureCases)
      } catch (error) {
        console.error('Failed to load data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadAndAnalyze()
  }, [])

  function downloadReport() {
    if (!analysis) return

    const report = generateCoverageReport(analysis)
    const blob = new Blob([report], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'coverage-analysis.md'
    a.click()
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">Loading analysis...</div>
      </div>
    )
  }

  if (!analysis) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center text-red-600">Failed to load coverage data</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">Rule Coverage Analysis</h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              Statistical analysis of classification performance with 95% confidence intervals
            </p>
          </div>
          <button
            onClick={downloadReport}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#ea4335] text-white rounded-lg hover:bg-[#c5341f] transition-colors"
          >
            <Download className="h-4 w-4" />
            Download Report
          </button>
        </div>

        {/* Summary Stats */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-[#ea4335]" />
            Classification Rate
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Sample Size</div>
              <div className="text-2xl font-bold">n = {analysis.totalThreads}</div>
            </div>
            <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Classified</div>
              <div className="text-2xl font-bold">{analysis.classified}</div>
              <div className="text-xs text-zinc-500 mt-1">
                {(analysis.classificationRate * 100).toFixed(1)}%
              </div>
            </div>
            <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">95% CI</div>
              <div className="text-lg font-bold">
                [{(analysis.classificationRateCI[0] * 100).toFixed(1)}%, {(analysis.classificationRateCI[1] * 100).toFixed(1)}%]
              </div>
            </div>
            <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Unlabelled Rate</div>
              <div className="text-2xl font-bold">{(analysis.unlabelledSenderRate * 100).toFixed(1)}%</div>
              <div className="text-xs text-zinc-500 mt-1">
                CI: [{(analysis.unlabelledSenderRateCI[0] * 100).toFixed(1)}%, {(analysis.unlabelledSenderRateCI[1] * 100).toFixed(1)}%]
              </div>
            </div>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
              <strong>Label Entropy:</strong> {analysis.labelEntropy.toFixed(3)} bits
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Measures distribution spread. Higher = more evenly distributed labels (good for organization).
              Current value indicates healthy spread across categories.
            </p>
          </div>
        </section>

        {/* Provider Type Distribution */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Provider Type Distribution</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
            All proportions reported with 95% Wilson confidence intervals.
          </p>

          <div className="space-y-3">
            {Object.entries(analysis.providerTypeProportions)
              .sort(([, a], [, b]) => b.proportion - a.proportion)
              .map(([type, { proportion, ci }]) => {
                const count = analysis.providerTypeDistribution[type]
                const width = proportion * 100

                return (
                  <div key={type}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{type}</span>
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        {count} threads ({(proportion * 100).toFixed(1)}%)
                      </span>
                    </div>
                    <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-6 relative">
                      <div
                        className="bg-[#ea4335] h-6 rounded-full flex items-center justify-end pr-2"
                        style={{ width: `${width}%` }}
                      >
                        {width > 15 && (
                          <span className="text-xs text-white">
                            {(proportion * 100).toFixed(1)}%
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-zinc-500 mt-1">
                      95% CI: [{(ci[0] * 100).toFixed(1)}%, {(ci[1] * 100).toFixed(1)}%]
                    </div>
                  </div>
                )
              })}
          </div>
        </section>

        {/* Top Unlabelled Domains */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Top Unlabelled Domains</h2>
          {analysis.topUnclassifiedDomains.length === 0 ? (
            <p className="text-zinc-600 dark:text-zinc-400">No unlabelled domains (100% coverage)</p>
          ) : (
            <div className="space-y-2">
              {analysis.topUnclassifiedDomains.map(({ domain, count }) => (
                <div
                  key={domain}
                  className="flex items-center justify-between p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
                >
                  <code className="text-sm">{domain}</code>
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">
                    {count} thread{count > 1 ? 's' : ''}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Failure Cases */}
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-[#ea4335]" />
            Detected Edge Cases ({failures.length})
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
            Automated detection of potential classification issues requiring review.
          </p>

          {failures.length === 0 ? (
            <p className="text-zinc-600 dark:text-zinc-400">No edge cases detected in this sample.</p>
          ) : (
            <div className="space-y-4">
              {failures.slice(0, 20).map(failure => (
                <div
                  key={failure.id}
                  className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="font-semibold text-[#ea4335]">{failure.issue}</div>
                    <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">
                      {failure.domain}
                    </code>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                    {failure.description}
                  </p>
                  <div className="text-xs space-y-1">
                    <div>
                      <strong>Sender:</strong> <code>{failure.sender}</code>
                    </div>
                    {failure.expectedLabel && (
                      <div>
                        <strong>Expected:</strong> {failure.expectedLabel}
                      </div>
                    )}
                    <div>
                      <strong>Actual:</strong> {failure.actualLabel || '(unlabelled)'}
                    </div>
                  </div>
                </div>
              ))}
              {failures.length > 20 && (
                <p className="text-sm text-zinc-500 text-center">
                  Showing first 20 of {failures.length} edge cases
                </p>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
