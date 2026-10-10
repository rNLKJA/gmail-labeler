/**
 * Inbox simulator - processes synthetic inbox data and applies labeling rules
 */

import { classifySender, type ProviderRule } from './providers'

export interface InboxThread {
  sender: string
  subject: string
  date: string
}

export interface ClassifiedThread extends InboxThread {
  domain: string
  label: string | null
  action: 'keep' | 'archive' | null
  rule: ProviderRule | null
}

export interface SimulationResult {
  threads: ClassifiedThread[]
  stats: {
    total: number
    classified: number
    unclassified: number
    kept: number
    archived: number
    labelDistribution: Record<string, number>
    categoryDistribution: Record<string, number>
  }
  actions: SimulationAction[]
}

export interface SimulationAction {
  thread: ClassifiedThread
  action: 'label' | 'archive' | 'skip'
  timestamp: string
}

/**
 * Parse CSV inbox data
 */
export function parseInboxCSV(csv: string): InboxThread[] {
  const lines = csv.trim().split('\n')
  const threads: InboxThread[] = []

  // Skip header
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]
    if (!line.trim()) continue

    // Simple CSV parsing (handles quoted fields)
    const match = line.match(/^"([^"]+)","([^"]+)","([^"]+)"$/)
    if (match) {
      threads.push({
        sender: match[1],
        subject: match[2],
        date: match[3],
      })
    } else {
      // Fallback for non-quoted
      const parts = line.split(',')
      if (parts.length >= 3) {
        threads.push({
          sender: parts[0],
          subject: parts[1],
          date: parts[2],
        })
      }
    }
  }

  return threads
}

/**
 * Simulate inbox processing with provider rules
 */
export function simulateInbox(threads: InboxThread[]): SimulationResult {
  const classified: ClassifiedThread[] = threads.map(thread => {
    const classification = classifySender(thread.sender)
    return {
      ...thread,
      ...classification,
    }
  })

  // Calculate statistics
  const classifiedCount = classified.filter(t => t.label !== null).length
  const keptCount = classified.filter(t => t.action === 'keep').length
  const archivedCount = classified.filter(t => t.action === 'archive').length

  const labelDistribution: Record<string, number> = {}
  const categoryDistribution: Record<string, number> = {}

  classified.forEach(thread => {
    if (thread.label) {
      // Count full label
      labelDistribution[thread.label] = (labelDistribution[thread.label] || 0) + 1

      // Count category (parent label)
      const category = thread.label.split('/')[0]
      categoryDistribution[category] = (categoryDistribution[category] || 0) + 1
    }
  })

  // Generate action log
  const actions: SimulationAction[] = classified.map(thread => ({
    thread,
    action: thread.label
      ? thread.action === 'archive'
        ? 'archive'
        : 'label'
      : 'skip',
    timestamp: thread.date,
  }))

  return {
    threads: classified,
    stats: {
      total: threads.length,
      classified: classifiedCount,
      unclassified: threads.length - classifiedCount,
      kept: keptCount,
      archived: archivedCount,
      labelDistribution,
      categoryDistribution,
    },
    actions,
  }
}

/**
 * Get before/after comparison of inbox state
 */
export function getBeforeAfter(result: SimulationResult) {
  const before = {
    inbox: result.stats.total,
    labeled: 0,
  }

  const after = {
    inbox: result.stats.kept,
    labeled: result.stats.classified,
  }

  return { before, after }
}
