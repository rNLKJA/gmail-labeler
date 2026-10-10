import { Terminal, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react'

export default function InstallationPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Installation Guide</h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Set up the Gmail Labeler skill in Claude Code or Cursor in a few steps.
          </p>
        </div>

        {/* Prerequisites */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-[#ea4335]" />
            Prerequisites
          </h2>
          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Claude Code or Cursor</strong> - AI coding assistant with MCP support
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Gmail MCP Server</strong> - Community MCP connector for Gmail API
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Google Cloud Project</strong> - With Gmail API enabled and OAuth 2.0 credentials
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Node.js</strong> - For running the MCP server
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* Step 1: Google Cloud Setup */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Step 1: Google Cloud Setup</h2>
          <div className="space-y-4">
            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
              <h3 className="font-semibold mb-3">Create a Google Cloud Project</h3>
              <ol className="space-y-2 text-sm list-decimal list-inside text-zinc-600 dark:text-zinc-400">
                <li>
                  Go to{' '}
                  <a
                    href="https://console.cloud.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#ea4335] hover:underline inline-flex items-center gap-1"
                  >
                    Google Cloud Console
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
                <li>Create a new project or select an existing one</li>
                <li>Navigate to APIs & Services → Library</li>
                <li>Search for &quot;Gmail API&quot; and enable it</li>
              </ol>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
              <h3 className="font-semibold mb-3">Create OAuth 2.0 Credentials</h3>
              <ol className="space-y-2 text-sm list-decimal list-inside text-zinc-600 dark:text-zinc-400">
                <li>Go to APIs & Services → Credentials</li>
                <li>Click &quot;Create Credentials&quot; → &quot;OAuth client ID&quot;</li>
                <li>Application type: &quot;Desktop app&quot;</li>
                <li>Download the credentials JSON file</li>
                <li>Save it to a secure location (e.g., <code className="bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded text-xs">~/.config/gmail-credentials.json</code>)</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Step 2: Install Gmail MCP Server */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Step 2: Install Gmail MCP Server</h2>
          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              Install the community Gmail MCP server globally:
            </p>
            <div className="bg-zinc-950 text-zinc-50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
              <div className="flex items-center gap-2 mb-1">
                <Terminal className="h-4 w-4 text-green-400" />
                <span className="text-zinc-500">$</span>
              </div>
              <code>npm install -g @modelcontextprotocol/server-gmail</code>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-3">
              Note: Replace with the actual MCP server package name from the community registry.
            </p>
          </div>
        </section>

        {/* Step 3: Configure MCP in Claude Code/Cursor */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Step 3: Configure MCP Server</h2>
          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              Add the Gmail MCP server to your Claude Code or Cursor settings:
            </p>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold mb-2">Claude Code</h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-2">
                  Edit <code className="bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded">~/.config/claude/mcp_settings.json</code>:
                </p>
                <div className="bg-zinc-950 text-zinc-50 rounded-lg p-4 font-mono text-xs overflow-x-auto">
                  <pre>{`{
  "mcpServers": {
    "gmail": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-gmail"],
      "env": {
        "GOOGLE_CREDENTIALS": "/path/to/your/credentials.json"
      }
    }
  }
}`}</pre>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-2">Cursor</h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-2">
                  Edit Cursor settings JSON (Preferences → MCP):
                </p>
                <div className="bg-zinc-950 text-zinc-50 rounded-lg p-4 font-mono text-xs overflow-x-auto">
                  <pre>{`{
  "mcpServers": {
    "gmail": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-gmail"],
      "env": {
        "GOOGLE_CREDENTIALS": "/path/to/your/credentials.json"
      }
    }
  }
}`}</pre>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/30 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-800 dark:text-yellow-300">
                  Replace <code className="bg-yellow-100 dark:bg-yellow-900/30 px-1 py-0.5 rounded">/path/to/your/credentials.json</code> with the actual path to your downloaded credentials file.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Step 4: Install the Skill */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Step 4: Install the Skill</h2>
          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              Clone the repository and copy the skill to your agents directory:
            </p>
            <div className="bg-zinc-950 text-zinc-50 rounded-lg p-4 font-mono text-sm overflow-x-auto space-y-2">
              <div>
                <span className="text-zinc-500">$</span> git clone https://github.com/rNLKJA/gmail-labeler.git
              </div>
              <div>
                <span className="text-zinc-500">$</span> cd gmail-labeler
              </div>
              <div>
                <span className="text-zinc-500">$</span> mkdir -p ~/.agents/skills
              </div>
              <div>
                <span className="text-zinc-500">$</span> cp -r original/.agents/skills/gmail-labeler ~/.agents/skills/
              </div>
            </div>
          </div>
        </section>

        {/* Step 5: First Run */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Step 5: First Run (Dry Run)</h2>
          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              Always test with a dry run first:
            </p>
            <ol className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="font-semibold text-[#ea4335]">1.</span>
                <div>
                  <strong>Restart Claude Code/Cursor</strong> to load the MCP server
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-semibold text-[#ea4335]">2.</span>
                <div>
                  <strong>Open a conversation</strong> and ask: <code className="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded text-xs">&quot;Label my inbox (dry run mode)&quot;</code>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-semibold text-[#ea4335]">3.</span>
                <div>
                  <strong>Review the plan</strong> - The skill will show what labels it would create and which emails would be labeled
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-semibold text-[#ea4335]">4.</span>
                <div>
                  <strong>Confirm</strong> if the plan looks good: <code className="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded text-xs">&quot;Apply those labels for real&quot;</code>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* Tips */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Tips & Best Practices</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
              <h3 className="font-semibold text-sm mb-2">Use a Test Account First</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Set up the skill on a test Gmail account before running it on your main inbox.
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
              <h3 className="font-semibold text-sm mb-2">Review the Logs</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Check <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded">LOG.md</code> after each run to see exactly what was changed.
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
              <h3 className="font-semibold text-sm mb-2">Customize Provider Rules</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Edit <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded">provider-rules.md</code> to add your own providers and categories.
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
              <h3 className="font-semibold text-sm mb-2">Generate Gmail Filters</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                After labeling, ask to generate filter XML for automatic future labeling.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
