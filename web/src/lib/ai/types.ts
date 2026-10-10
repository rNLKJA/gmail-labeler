/**
 * Types for AI client (BYOK only - no hosted backend)
 */

export type AIProvider = 'anthropic' | 'openai'

export interface AISettings {
  provider: AIProvider
  apiKey: string
  model: string
  remember: boolean // localStorage vs sessionStorage
}

export interface AIRequest {
  feature: string
  prompt: string
  systemPrompt?: string
  maxTokens?: number
  model?: string
}

export interface AIResponse {
  content: string
  usage?: {
    inputTokens: number
    outputTokens: number
  }
  latencyMs: number
}

export interface AIAuditEntry {
  id: string
  timestamp: string
  feature: string
  provider: AIProvider
  model: string
  input: string
  output: string
  latencyMs: number
  tokenUsage?: {
    input: number
    output: number
  }
  humanDecision?: 'accepted' | 'edited' | 'rejected'
}

export class AIError extends Error {
  constructor(
    message: string,
    public code: 'invalid_key' | 'rate_limit' | 'network' | 'parse' | 'unknown'
  ) {
    super(message)
    this.name = 'AIError'
  }
}
