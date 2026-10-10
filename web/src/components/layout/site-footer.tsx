'use client'

import { ExternalLink } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="font-semibold text-sm mb-3">About</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              An AI-powered Gmail triage skill for Claude Code and Cursor.
              Automatically label and organize email by sender and provider.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-sm mb-3">Project</h3>
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li>
                <a
                  href="https://github.com/rNLKJA/gmail-labeler"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors inline-flex items-center gap-1"
                >
                  <ExternalLink className="h-4 w-4" />
                  GitHub Repository
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/rNLKJA/gmail-labeler/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
                >
                  Report an Issue
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/rNLKJA/gmail-labeler/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
                >
                  License (GPL-3.0)
                </a>
              </li>
            </ul>
          </div>

          {/* Author */}
          <div>
            <h3 className="font-semibold text-sm mb-3">Author</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
              Personal project by Sunchuangyu &quot;Rin&quot; Huang
            </p>
            <a
              href="https://github.com/rNLKJA"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#ea4335] hover:underline"
            >
              @rNLKJA
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
          <p>
            © 2024–2026 Gmail Labeler. Licensed under GPL-3.0.
          </p>
          <p className="text-xs">
            Web revival assistance by Claude Opus 5.5 via{' '}
            <a
              href="https://claude.com/claude-code"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
            >
              Claude Code
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
