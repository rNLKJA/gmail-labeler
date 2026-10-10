/**
 * Statistical helper functions for computing confidence intervals
 * Used for rigorous quantitative reporting in governance analysis
 */

/**
 * Wilson score interval for binomial proportions
 * More accurate than normal approximation, especially for small samples or extreme proportions
 *
 * @param successes - Number of successes
 * @param n - Total number of trials
 * @param confidence - Confidence level (default 0.95 for 95% CI)
 * @returns [lower, upper] bounds of the confidence interval
 */
export function wilsonScoreInterval(
  successes: number,
  n: number,
  confidence: number = 0.95
): [number, number] {
  if (n === 0) return [0, 0]

  const p = successes / n
  const z = getZScore(confidence)
  const z2 = z * z

  const denominator = 1 + z2 / n
  const center = (p + z2 / (2 * n)) / denominator
  const margin = (z / denominator) * Math.sqrt((p * (1 - p)) / n + z2 / (4 * n * n))

  return [
    Math.max(0, center - margin),
    Math.min(1, center + margin)
  ]
}

/**
 * Bootstrap percentile confidence interval
 * Non-parametric method for arbitrary statistics
 *
 * @param data - Original data sample
 * @param statistic - Function to compute statistic from sample
 * @param confidence - Confidence level (default 0.95)
 * @param iterations - Number of bootstrap samples (default 10000)
 * @param seed - Random seed for reproducibility
 * @returns [lower, upper] bounds and the point estimate
 */
export function bootstrapCI<T>(
  data: T[],
  statistic: (sample: T[]) => number,
  confidence: number = 0.95,
  iterations: number = 10000,
  seed?: number
): { estimate: number; lower: number; upper: number } {
  if (data.length === 0) {
    return { estimate: 0, lower: 0, upper: 0 }
  }

  const rng = seed !== undefined ? seededRandom(seed) : Math.random
  const n = data.length
  const bootstrapStats: number[] = []

  // Generate bootstrap samples
  for (let i = 0; i < iterations; i++) {
    const sample: T[] = []
    for (let j = 0; j < n; j++) {
      const index = Math.floor(rng() * n)
      sample.push(data[index])
    }
    bootstrapStats.push(statistic(sample))
  }

  // Sort and find percentiles
  bootstrapStats.sort((a, b) => a - b)
  const alpha = 1 - confidence
  const lowerIndex = Math.floor(alpha / 2 * iterations)
  const upperIndex = Math.floor((1 - alpha / 2) * iterations)

  return {
    estimate: statistic(data),
    lower: bootstrapStats[lowerIndex],
    upper: bootstrapStats[upperIndex]
  }
}

/**
 * Simple entropy calculation for label distribution
 * Higher entropy = more spread out, lower = more concentrated
 */
export function entropy(distribution: Record<string, number>): number {
  const values = Object.values(distribution)
  const total = values.reduce((sum, v) => sum + v, 0)

  if (total === 0) return 0

  let h = 0
  for (const count of values) {
    if (count > 0) {
      const p = count / total
      h -= p * Math.log2(p)
    }
  }

  return h
}

/**
 * Get z-score for given confidence level
 * Supports 0.90, 0.95, 0.99, 0.999; other values fall back to 0.95 (z=1.96)
 */
function getZScore(confidence: number): number {
  // Common z-scores
  const zScores: Record<number, number> = {
    0.90: 1.645,
    0.95: 1.96,
    0.99: 2.576,
    0.999: 3.291
  }

  return zScores[confidence] || 1.96
}

/**
 * Seeded random number generator (simple LCG)
 * For reproducible bootstrap samples
 */
function seededRandom(seed: number): () => number {
  let state = seed
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296
    return state / 4294967296
  }
}

/**
 * Format confidence interval for display
 */
export function formatCI(lower: number, upper: number, decimals: number = 3): string {
  return `[${lower.toFixed(decimals)}, ${upper.toFixed(decimals)}]`
}

/**
 * Format proportion with Wilson CI
 */
export function formatProportionWithCI(
  successes: number,
  n: number,
  decimals: number = 3
): string {
  const p = n > 0 ? successes / n : 0
  const [lower, upper] = wilsonScoreInterval(successes, n)
  return `${p.toFixed(decimals)} ${formatCI(lower, upper, decimals)}`
}
