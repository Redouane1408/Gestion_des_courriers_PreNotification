import { afterEach, expect, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'
import '@testing-library/jest-dom'

// Extend Vitest's expect method with jest-dom matchers
expect.extend(matchers)

// Clean up after each test case (e.g., clearing jsdom)
afterEach(() => {
  cleanup()
})

// Mock the fetch API globally if needed
global.fetch = vi.fn()

// Mock localStorage
class LocalStorageMock {
  store: Record<string, string> = {}

  clear() {
    this.store = {}
  }

  getItem(key: string) {
    return this.store[key] || null
  }

  setItem(key: string, value: string) {
    this.store[key] = value.toString()
  }

  removeItem(key: string) {
    delete this.store[key]
  }
}

global.localStorage = new LocalStorageMock()