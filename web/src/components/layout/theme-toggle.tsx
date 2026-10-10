'use client'

import { useTheme } from 'next-themes'
import { useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const [mounted] = useState(true)
  const { theme, setTheme } = useTheme()

  if (!mounted) {
    return (
      <button
        className="p-2 rounded-md text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
        aria-label="Toggle theme"
      >
        <Sun className="h-5 w-5" />
      </button>
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-md text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  )
}
