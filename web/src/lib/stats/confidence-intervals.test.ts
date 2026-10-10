import { describe, it, expect } from 'vitest'
import { wilsonScoreInterval, bootstrapCI, entropy, formatProportionWithCI } from './confidence-intervals'

describe('wilsonScoreInterval', () => {
  it('should handle 0 successes', () => {
    const [lower, upper] = wilsonScoreInterval(0, 100)
    expect(lower).toBe(0)
    expect(upper).toBeGreaterThan(0)
    expect(upper).toBeLessThan(0.05)
  })

  it('should handle 100% success rate', () => {
    const [lower, upper] = wilsonScoreInterval(100, 100)
    expect(lower).toBeGreaterThan(0.95)
    expect(upper).toBeCloseTo(1, 10)
  })

  it('should match known values for 50/100', () => {
    // Verified against scipy.stats.binomtest(50, 100).proportion_ci()
    const [lower, upper] = wilsonScoreInterval(50, 100)
    expect(lower).toBeCloseTo(0.400, 2)
    expect(upper).toBeCloseTo(0.599, 2)
  })

  it('should handle empty sample', () => {
    const [lower, upper] = wilsonScoreInterval(0, 0)
    expect(lower).toBe(0)
    expect(upper).toBe(0)
  })

  it('should be wider for smaller samples', () => {
    const [lower1, upper1] = wilsonScoreInterval(5, 10)
    const [lower2, upper2] = wilsonScoreInterval(50, 100)

    const width1 = upper1 - lower1
    const width2 = upper2 - lower2

    expect(width1).toBeGreaterThan(width2)
  })
})

describe('bootstrapCI', () => {
  it('should compute mean CI', () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const result = bootstrapCI(data, (sample) => {
      return sample.reduce((sum, x) => sum + x, 0) / sample.length
    }, 0.95, 1000, 12345)

    expect(result.estimate).toBe(5.5)
    expect(result.lower).toBeGreaterThan(3)
    expect(result.upper).toBeLessThan(8)
  })

  it('should be reproducible with same seed', () => {
    const data = [1, 2, 3, 4, 5]
    const mean = (s: number[]) => s.reduce((a, b) => a + b) / s.length

    const result1 = bootstrapCI(data, mean, 0.95, 100, 42)
    const result2 = bootstrapCI(data, mean, 0.95, 100, 42)

    expect(result1.lower).toBe(result2.lower)
    expect(result1.upper).toBe(result2.upper)
  })

  it('should handle empty data', () => {
    const result = bootstrapCI([], (s) => s.length, 0.95, 100)
    expect(result.estimate).toBe(0)
    expect(result.lower).toBe(0)
    expect(result.upper).toBe(0)
  })
})

describe('entropy', () => {
  it('should return 0 for single category', () => {
    expect(entropy({ a: 10 })).toBe(0)
  })

  it('should return log2(n) for uniform distribution', () => {
    const result = entropy({ a: 25, b: 25, c: 25, d: 25 })
    expect(result).toBeCloseTo(2, 5) // log2(4) = 2
  })

  it('should be lower for skewed distributions', () => {
    const uniform = entropy({ a: 25, b: 25, c: 25, d: 25 })
    const skewed = entropy({ a: 70, b: 10, c: 10, d: 10 })
    expect(skewed).toBeLessThan(uniform)
  })

  it('should handle empty distribution', () => {
    expect(entropy({})).toBe(0)
  })
})

describe('formatProportionWithCI', () => {
  it('should format proportion with CI', () => {
    const result = formatProportionWithCI(50, 100, 2)
    expect(result).toMatch(/^0\.50 \[0\.\d{2}, 0\.\d{2}\]$/)
  })

  it('should handle zero denominator', () => {
    const result = formatProportionWithCI(0, 0)
    expect(result).toBe('0.000 [0.000, 0.000]')
  })
})
