/**
 * Anthropic API client for browser-based calls (BYOK only)
 * Uses direct browser access with user-provided API key
 */

import { AIRequest, AIResponse, AIError } from './types'

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages'
const ANTHROPIC_VERSION = '2023-06-01'

// Current model IDs as of 2026
export const ANTHROPIC_MODELS = {
  // Recommended default: cheap, fast, good quality for most tasks
  haiku: 'claude-haiku-4-5',
  // Better reasoning, moderate cost
  sonnet: 'claude-sonnet-5',
  // Most capable (use only when explicitly requested)
  opus: 'claude-opus-5',
} as const

export async function callAnthropic(
  apiKey: string,
  request: AIRequest
): Promise<AIResponse> {
  const startTime = Date.now()

  try {
    const response = await fetch(ANTHROPIC_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': ANTHROPIC_VERSION,
        // Required header for direct browser access
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: request.model || ANTHROPIC_MODELS.haiku,
        max_tokens: request.maxTokens || 4096,
        messages: [
          {
            role: 'user',
            content: request.prompt,
          },
        ],
        ...(request.systemPrompt && { system: request.systemPrompt }),
      }),
    })

    const latencyMs = Date.now() - startTime

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({})) as Record<string, unknown>

      if (response.status === 401) {
        throw new AIError('Invalid API key', 'invalid_key')
      } else if (response.status === 429) {
        throw new AIError('Rate limit exceeded', 'rate_limit')
      } else {
        const errorMessage = typeof errorData.error === 'object' && errorData.error !== null && 'message' in errorData.error
          ? String(errorData.error.message)
          : `HTTP ${response.status}`
        throw new AIError(errorMessage, 'unknown')
      }
    }

    const data = await response.json() as { content: Array<{ type: string; text: string }>; usage?: { input_tokens: number; output_tokens: number } }

    // Extract text from content blocks
    const textBlocks = data.content.filter((block) => block.type === 'text')
    const content = textBlocks.map((block) => block.text).join('\n')

    return {
      content,
      usage: data.usage ? {
        inputTokens: data.usage.input_tokens,
        outputTokens: data.usage.output_tokens,
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
