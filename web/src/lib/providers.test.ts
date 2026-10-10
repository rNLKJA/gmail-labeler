import { describe, it, expect } from 'vitest'
import {
  extractDomain,
  classifySender,
  searchProviders,
  getProvidersByCategory,
  PROVIDER_RULES,
} from './providers'

describe('providers', () => {
  describe('extractDomain', () => {
    it('extracts domain from email addresses', () => {
      expect(extractDomain('user@example.com')).toBe('example.com')
      expect(extractDomain('Amazon <ship-confirm@amazon.com>')).toBe('amazon.com')
      expect(extractDomain('noreply@paypal.com')).toBe('paypal.com')
    })

    it('handles edge cases', () => {
      expect(extractDomain('example.com')).toBe('example.com')
      expect(extractDomain('USER@EXAMPLE.COM')).toBe('example.com')
    })
  })

  describe('classifySender', () => {
    it('classifies known senders correctly', () => {
      const result = classifySender('ship-confirm@amazon.com')
      expect(result.domain).toBe('amazon.com')
      expect(result.label).toBe('Shopping/Amazon')
      expect(result.action).toBe('keep')
    })

    it('classifies PayPal correctly', () => {
      const result = classifySender('service@paypal.com')
      expect(result.label).toBe('Banking/PayPal')
      expect(result.action).toBe('keep')
    })

    it('returns null for unknown senders', () => {
      const result = classifySender('unknown@example.com')
      expect(result.label).toBe(null)
      expect(result.action).toBe(null)
      expect(result.domain).toBe('example.com')
    })

    it('handles case insensitivity', () => {
      const result = classifySender('NOREPLY@NETFLIX.COM')
      expect(result.label).toBe('Subscriptions/Netflix')
    })
  })

  describe('searchProviders', () => {
    it('finds providers by domain', () => {
      const results = searchProviders('amazon')
      expect(results.length).toBeGreaterThan(0)
      expect(results[0].domain).toBe('amazon.com')
    })

    it('finds providers by label', () => {
      const results = searchProviders('banking')
      expect(results.length).toBeGreaterThan(0)
      expect(results.every(r => r.label.startsWith('Banking/'))).toBe(true)
    })

    it('returns empty array for no matches', () => {
      const results = searchProviders('zzznonexistent')
      expect(results).toEqual([])
    })
  })

  describe('getProvidersByCategory', () => {
    it('returns all providers in a category', () => {
      const banking = getProvidersByCategory('Banking')
      expect(banking.length).toBeGreaterThan(0)
      expect(banking.every(r => r.label.startsWith('Banking/'))).toBe(true)
    })

    it('returns empty array for non-existent category', () => {
      const results = getProvidersByCategory('NonExistent')
      expect(results).toEqual([])
    })
  })

  describe('PROVIDER_RULES parity', () => {
    it('contains representative rules from each category', () => {
      const categories = [
        'Banking',
        'Shopping',
        'Subscriptions',
        'Bills',
        'Government',
        'Health',
        'Travel',
        'Career',
        'News & Ads',
      ]

      categories.forEach(category => {
        const providers = getProvidersByCategory(category)
        expect(providers.length).toBeGreaterThan(0)
      })
    })

    it('all rules have required fields', () => {
      PROVIDER_RULES.forEach(rule => {
        expect(rule.domain).toBeTruthy()
        expect(rule.label).toBeTruthy()
        expect(['keep', 'archive']).toContain(rule.defaultAction)
      })
    })

    it('labels follow nested format', () => {
      PROVIDER_RULES.forEach(rule => {
        expect(rule.label).toMatch(/^[^/]+\/[^/]+$/)
      })
    })
  })
})
