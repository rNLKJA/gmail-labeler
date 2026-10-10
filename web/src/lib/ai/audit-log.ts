/**
 * AI audit log storage using IndexedDB
 * All AI interactions are logged for transparency and review
 */

import type { AIAuditEntry } from './types'

export type { AIAuditEntry }

const DB_NAME = 'gmail-labeler-ai-audit'
const DB_VERSION = 1
const STORE_NAME = 'audit_log'

let dbInstance: IDBDatabase | null = null

async function getDB(): Promise<IDBDatabase> {
  if (dbInstance) return dbInstance

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => {
      dbInstance = request.result
      resolve(dbInstance)
    }

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' })
        store.createIndex('timestamp', 'timestamp', { unique: false })
        store.createIndex('feature', 'feature', { unique: false })
      }
    }
  })
}

export async function logAICall(entry: AIAuditEntry): Promise<void> {
  const db = await getDB()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite')
    const store = transaction.objectStore(STORE_NAME)
    const request = store.add(entry)

    request.onsuccess = () => resolve()
    request.onerror = () => reject(request.error)
  })
}

export async function getAuditLog(): Promise<AIAuditEntry[]> {
  const db = await getDB()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly')
    const store = transaction.objectStore(STORE_NAME)
    const index = store.index('timestamp')
    const request = index.openCursor(null, 'prev') // newest first

    const results: AIAuditEntry[] = []
    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest).result
      if (cursor) {
        results.push(cursor.value)
        cursor.continue()
      } else {
        resolve(results)
      }
    }
    request.onerror = () => reject(request.error)
  })
}

export async function updateHumanDecision(
  id: string,
  decision: 'accepted' | 'edited' | 'rejected'
): Promise<void> {
  const db = await getDB()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite')
    const store = transaction.objectStore(STORE_NAME)
    const getRequest = store.get(id)

    getRequest.onsuccess = () => {
      const entry = getRequest.result
      if (entry) {
        entry.humanDecision = decision
        const updateRequest = store.put(entry)
        updateRequest.onsuccess = () => resolve()
        updateRequest.onerror = () => reject(updateRequest.error)
      } else {
        reject(new Error(`Entry ${id} not found`))
      }
    }
    getRequest.onerror = () => reject(getRequest.error)
  })
}

export async function exportAuditLog(): Promise<string> {
  const entries = await getAuditLog()
  return JSON.stringify(entries, null, 2)
}

export async function clearAuditLog(): Promise<void> {
  const db = await getDB()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite')
    const store = transaction.objectStore(STORE_NAME)
    const request = store.clear()

    request.onsuccess = () => resolve()
    request.onerror = () => reject(request.error)
  })
}
