/**
 * Governance analysis: rule coverage, provider distribution, edge cases
 * Demonstrates statistical rigour + transparency for career positioning
 */

import { ClassifiedThread, SimulationResult } from '../simulator'
import { PROVIDER_RULES } from '../providers'
import { wilsonScoreInterval, entropy } from '../stats'

export interface CoverageAnalysis {
  totalThreads: number
  classified: number
  unclassified: number
  classificationRate: number
  classificationRateCI: [number, number]

  providerTypeDistribution: Record<string, number>
  providerTypeProportions: Record<string, { proportion: number; ci: [number, number] }>

  unlabelledSenderRate: number
  unlabelledSenderRateCI: [number, number]

  conflictRate: number // Multiple rules match same sender (currently 0 - first match wins)

  labelEntropy: number

  topUnclassifiedDomains: Array<{ domain: string; count: number }>
}

export interface FailureCase {
  id: string
  sender: string
  domain: string
  issue: string
  description: string
  expectedLabel: string | null
  actualLabel: string | null
}

/**
 * Analyze rule coverage across synthetic inbox
 */
export function analyzeCoverage(result: SimulationResult): CoverageAnalysis {
  const { threads, stats } = result
  const n = threads.length

  // Classification rate with Wilson CI
  const classificationRate = stats.classified / n
  const classificationRateCI = wilsonScoreInterval(stats.classified, n)

  // Provider type distribution (top-level category)
  const providerTypes: Record<string, number> = {}
  threads.forEach(thread => {
    if (thread.label) {
      const type = thread.label.split('/')[0]
      providerTypes[type] = (providerTypes[type] || 0) + 1
    }
  })

  // Provider type proportions with CIs
  const providerTypeProportions: Record<string, { proportion: number; ci: [number, number] }> = {}
  Object.entries(providerTypes).forEach(([type, count]) => {
    providerTypeProportions[type] = {
      proportion: count / n,
      ci: wilsonScoreInterval(count, n),
    }
  })

  // Unlabelled sender rate
  const unlabelledSenderRate = stats.unclassified / n
  const unlabelledSenderRateCI = wilsonScoreInterval(stats.unclassified, n)

  // Label entropy (measure of distribution spread)
  const labelEntropy = entropy(stats.labelDistribution)

  // Top unclassified domains
  const unclassifiedDomains: Record<string, number> = {}
  threads.forEach(thread => {
    if (!thread.label) {
      unclassifiedDomains[thread.domain] = (unclassifiedDomains[thread.domain] || 0) + 1
    }
  })

  const topUnclassifiedDomains = Object.entries(unclassifiedDomains)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([domain, count]) => ({ domain, count }))

  return {
    totalThreads: n,
    classified: stats.classified,
    unclassified: stats.unclassified,
    classificationRate,
    classificationRateCI,
    providerTypeDistribution: providerTypes,
    providerTypeProportions,
    unlabelledSenderRate,
    unlabelledSenderRateCI,
    conflictRate: 0, // First-match policy = no conflicts
    labelEntropy,
    topUnclassifiedDomains,
  }
}

/**
 * Identify edge cases and failure modes
 */
export function identifyFailureCases(threads: ClassifiedThread[]): FailureCase[] {
  const failures: FailureCase[] = []

  threads.forEach((thread, idx) => {
    const sender = thread.sender
    const domain = thread.domain

    // Case 1: Domain typo / misspelling (heuristic: very short domain or unusual TLD)
    if (domain.length < 5 || domain.match(/\.(xyz|top|tk)$/)) {
      failures.push({
        id: `failure-${idx}-typo`,
        sender,
        domain,
        issue: 'Suspicious domain',
        description: 'Very short domain or unusual TLD - may be typo or phishing',
        expectedLabel: null,
        actualLabel: thread.label,
      })
    }

    // Case 2: Subdomain handling (e.g., noreply.amazon.com vs amazon.com)
    if (domain.split('.').length > 2 && !thread.label) {
      const baseDomain = domain.split('.').slice(-2).join('.')
      const ruleExists = PROVIDER_RULES.some(r => r.domain === baseDomain)
      if (ruleExists) {
        failures.push({
          id: `failure-${idx}-subdomain`,
          sender,
          domain,
          issue: 'Subdomain mismatch',
          description: `Base domain ${baseDomain} has a rule, but subdomain ${domain} doesn't match`,
          expectedLabel: `Should inherit from ${baseDomain}`,
          actualLabel: thread.label,
        })
      }
    }

    // Case 3: Role addresses (noreply@, no-reply@, notifications@)
    if (sender.match(/^(no-?reply|notifications|alerts|info)@/i) && !thread.label) {
      failures.push({
        id: `failure-${idx}-role`,
        sender,
        domain,
        issue: 'Role address',
        description: 'Generic role address - sender domain may be legitimate but unlabeled',
        expectedLabel: `Should check ${domain}`,
        actualLabel: thread.label,
      })
    }

    // Case 4: Multi-sender threads (not detectable from current data structure)
    // Would need thread-level history - note as limitation

    // Case 5: High-value unlabeled domains (edu, gov)
    if (!thread.label && domain.match(/\.(edu|gov|org)$/)) {
      failures.push({
        id: `failure-${idx}-highvalue`,
        sender,
        domain,
        issue: 'High-value unlabeled domain',
        description: 'Educational/government/non-profit domain without classification',
        expectedLabel: 'Should add rule',
        actualLabel: thread.label,
      })
    }
  })

  return failures
}

/**
 * Compare before/after label entropy (measure of organization improvement)
 */
export function compareEntropy(
  beforeDistribution: Record<string, number>,
  afterDistribution: Record<string, number>
): { before: number; after: number; change: number } {
  const before = entropy(beforeDistribution)
  const after = entropy(afterDistribution)
  return {
    before,
    after,
    change: after - before,
  }
}

/**
 * Generate plain-text coverage report
 */
export function generateCoverageReport(analysis: CoverageAnalysis): string {
  const lines: string[] = []

  lines.push('# Rule Coverage Analysis')
  lines.push('')
  lines.push(`**Sample size:** n = ${analysis.totalThreads}`)
  lines.push('')
  lines.push('## Classification Rate')
  lines.push('')
  lines.push(`- **Classified:** ${analysis.classified}/${analysis.totalThreads} (${(analysis.classificationRate * 100).toFixed(1)}%)`)
  lines.push(`- **95% CI:** [${(analysis.classificationRateCI[0] * 100).toFixed(1)}%, ${(analysis.classificationRateCI[1] * 100).toFixed(1)}%]`)
  lines.push(`- **Unlabelled sender rate:** ${(analysis.unlabelledSenderRate * 100).toFixed(1)}% [${(analysis.unlabelledSenderRateCI[0] * 100).toFixed(1)}%, ${(analysis.unlabelledSenderRateCI[1] * 100).toFixed(1)}%]`)
  lines.push('')
  lines.push('## Provider Type Distribution')
  lines.push('')

  Object.entries(analysis.providerTypeProportions)
    .sort(([, a], [, b]) => b.proportion - a.proportion)
    .forEach(([type, { proportion, ci }]) => {
      lines.push(`- **${type}:** ${(proportion * 100).toFixed(1)}% [${ci.map(x => (x * 100).toFixed(1) + '%').join(', ')}]`)
    })

  lines.push('')
  lines.push(`**Label entropy:** ${analysis.labelEntropy.toFixed(3)} bits`)
  lines.push('')
  lines.push('## Top Unlabelled Domains')
  lines.push('')

  if (analysis.topUnclassifiedDomains.length === 0) {
    lines.push('(none)')
  } else {
    analysis.topUnclassifiedDomains.forEach(({ domain, count }) => {
      lines.push(`- ${domain}: ${count} thread${count > 1 ? 's' : ''}`)
    })
  }

  return lines.join('\n')
}
