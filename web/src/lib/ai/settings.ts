/**
 * AI settings management (sessionStorage by default, localStorage opt-in)
 */

import { AISettings } from './types'

const SESSION_KEY = 'gmail-labeler-ai-settings-session'
const LOCAL_KEY = 'gmail-labeler-ai-settings-local'

export function saveAISettings(settings: AISettings): void {
  const data = JSON.stringify(settings)

  if (settings.remember) {
    localStorage.setItem(LOCAL_KEY, data)
    sessionStorage.removeItem(SESSION_KEY)
  } else {
    sessionStorage.setItem(SESSION_KEY, data)
    localStorage.removeItem(LOCAL_KEY)
  }
}

export function loadAISettings(): AISettings | null {
  // Check localStorage first (persistent)
  const localData = localStorage.getItem(LOCAL_KEY)
  if (localData) {
    try {
      return JSON.parse(localData)
    } catch {
      localStorage.removeItem(LOCAL_KEY)
    }
  }

  // Fall back to sessionStorage (ephemeral)
  const sessionData = sessionStorage.getItem(SESSION_KEY)
  if (sessionData) {
    try {
      return JSON.parse(sessionData)
    } catch {
      sessionStorage.removeItem(SESSION_KEY)
    }
  }

  return null
}

export function clearAISettings(): void {
  localStorage.removeItem(LOCAL_KEY)
  sessionStorage.removeItem(SESSION_KEY)
}

export function hasAISettings(): boolean {
  return !!(localStorage.getItem(LOCAL_KEY) || sessionStorage.getItem(SESSION_KEY))
}
