/**
 * Main AI client facade - routes to provider-specific clients
 */

import { callAnthropic, ANTHROPIC_MODELS } from './anthropic-client'
import { callOpenAI, DEFAULT_OPENAI_MODEL } from './openai-client'
import { logAICall } from './audit-log'
import { AISettings, AIRequest, AIResponse, AIError } from './types'

export async function callAI(
  settings: AISettings,
  request: AIRequest
): Promise<AIResponse> {
  // Inject model default if not specified
  const fullRequest: AIRequest = {
    ...request,
    model: request.model || (settings.provider === 'anthropic'
      ? settings.model || ANTHROPIC_MODELS.haiku
      : settings.model || DEFAULT_OPENAI_MODEL
    ),
  }

  let response: AIResponse

  try {
    if (settings.provider === 'anthropic') {
      response = await callAnthropic(settings.apiKey, fullRequest)
    } else {
      response = await callOpenAI(settings.apiKey, fullRequest)
    }

    // Log successful call
    await logAICall({
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      feature: request.feature,
      provider: settings.provider,
      model: fullRequest.model!,
      input: request.prompt,
      output: response.content,
      latencyMs: response.latencyMs,
      tokenUsage: response.usage ? {
        input: response.usage.inputTokens,
        output: response.usage.outputTokens,
      } : undefined,
    })

    return response
  } catch (error) {
    // Log failed call
    await logAICall({
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      feature: request.feature,
      provider: settings.provider,
      model: fullRequest.model!,
      input: request.prompt,
      output: error instanceof AIError ? `ERROR: ${error.message}` : 'ERROR: Unknown',
      latencyMs: 0,
    }).catch(() => {
      // Ignore audit log errors during error handling
    })

    throw error
  }
}

export { ANTHROPIC_MODELS, DEFAULT_OPENAI_MODEL }
export * from './types'
export * from './audit-log'
