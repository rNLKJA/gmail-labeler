/**
 * OpenAI API client for browser-based calls (BYOK only)
 */

import { AIRequest, AIResponse, AIError } from './types'

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'

// User-configurable - default to latest GPT-4
export const DEFAULT_OPENAI_MODEL = 'gpt-4o'

export async function callOpenAI(
  apiKey: string,
  request: AIRequest
): Promise<AIResponse> {
  const startTime = Date.now()

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: request.model || DEFAULT_OPENAI_MODEL,
        max_tokens: request.maxTokens || 4096,
        messages: [
          ...(request.systemPrompt ? [{ role: 'system', content: request.systemPrompt }] : []),
          { role: 'user', content: request.prompt },
        ],
      }),
    })

    const latencyMs = Date.now() - startTime

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))

      if (response.status === 401) {
        throw new AIError('Invalid API key', 'invalid_key')
      } else if (response.status === 429) {
        throw new AIError('Rate limit exceeded', 'rate_limit')
      } else {
        throw new AIError(
          errorData.error?.message || `HTTP ${response.status}`,
          'unknown'
        )
      }
    }

    const data = await response.json()

    return {
      content: data.choices[0]?.message?.content || '',
      usage: data.usage ? {
        inputTokens: data.usage.prompt_tokens,
        outputTokens: data.usage.completion_tokens,
      } : undefined,
      latencyMs,
    }
  } catch (error) {
    if (error instanceof AIError) {
      throw error
    }

    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new AIError('Network error - check your connection', 'network')
    }

    throw new AIError(
      error instanceof Error ? error.message : 'Unknown error',
      'unknown'
    )
  }
}
