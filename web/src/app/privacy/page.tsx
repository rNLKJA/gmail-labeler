import { Shield, AlertTriangle, CheckCircle2, Eye, EyeOff, Lock, Server, FileText } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Privacy & Safety</h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Understanding how the Gmail Labeler skill handles your data and what safeguards are in place.
          </p>
        </div>

        {/* This Showcase Website */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Shield className="h-6 w-6 text-green-600" />
            This Showcase Website
          </h2>
          <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 rounded-lg p-6">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-green-800 dark:text-green-300">
                  <strong>100% synthetic data</strong> - All demo data is generated, not real email
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-green-800 dark:text-green-300">
                  <strong>No Gmail access</strong> - Never connects to real Gmail or requests authentication
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-green-800 dark:text-green-300">
                  <strong>No backend</strong> - All processing happens in your browser, nothing sent to servers
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-green-800 dark:text-green-300">
                  <strong>Static deployment</strong> - Hosted on Vercel with no database or data collection
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Original Skill */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">The Original Skill</h2>

          {/* What It Reads */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Eye className="h-5 w-5 text-[#ea4335]" />
              What the Skill Reads
            </h3>
            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-[#ea4335] mt-1.5 flex-shrink-0" />
                  <div>
                    <strong>Sender address and display name</strong> - To classify by provider
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-[#ea4335] mt-1.5 flex-shrink-0" />
                  <div>
                    <strong>Subject line</strong> - For content type classification (receipt vs newsletter)
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-[#ea4335] mt-1.5 flex-shrink-0" />
                  <div>
                    <strong>Message snippet and body text</strong> - For determining keep vs archive action
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-[#ea4335] mt-1.5 flex-shrink-0" />
                  <div>
                    <strong>Existing label IDs</strong> - To skip threads already correctly labeled
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-[#ea4335] mt-1.5 flex-shrink-0" />
                  <div>
                    <strong>Attachment filenames</strong> - For context only, contents never read
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* What It Can Modify */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              What the Skill Can Modify
            </h3>
            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <div>
                    <strong>Add labels to threads</strong> - Applies provider labels based on classification
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <div>
                    <strong>Remove INBOX label (archive)</strong> - For routine mail that should be filed away
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <div>
                    <strong>Create new labels</strong> - Creates category and provider labels as needed
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* What It Never Does */}
          <div>
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <EyeOff className="h-5 w-5 text-zinc-600" />
              What the Skill Never Does
            </h3>
            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <EyeOff className="h-5 w-5 text-zinc-400 flex-shrink-0" />
                  <div>
                    <strong>Delete or trash mail</strong> - Only archives (removes from inbox view)
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <EyeOff className="h-5 w-5 text-zinc-400 flex-shrink-0" />
                  <div>
                    <strong>Send, forward, or reply to mail</strong> - Read-only plus labeling
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <EyeOff className="h-5 w-5 text-zinc-400 flex-shrink-0" />
                  <div>
                    <strong>Mark mail as read</strong> - Unread state is preserved
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <EyeOff className="h-5 w-5 text-zinc-400 flex-shrink-0" />
                  <div>
                    <strong>Read attachment contents</strong> - Only sees filenames for context
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <EyeOff className="h-5 w-5 text-zinc-400 flex-shrink-0" />
                  <div>
                    <strong>Change star state or importance</strong> - Your flags stay intact
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Data Flow */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Server className="h-6 w-6 text-[#ea4335]" />
            Where Your Data Goes
          </h2>
          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                  <Lock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Your Gmail Account</h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    The skill accesses Gmail through your local MCP server using your OAuth credentials.
                    No credentials are ever sent anywhere else.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                  <Server className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Local MCP Server</h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Runs on your machine, handles Gmail API calls. Email metadata and content stay local
                    until sent to the AI provider for classification.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-[#ea4335]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="h-5 w-5 text-[#ea4335]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Your AI Provider (Anthropic, OpenAI, etc.)</h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Email content is sent to your chosen AI provider for classification. Check their data retention
                    policies. Anthropic does not train on Claude API data; OpenAI may train unless opted out.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                  <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Local Files (MEMORY.md, LOG.md)</h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    The skill writes session state and action logs to local markdown files. These never leave your machine
                    unless you commit them to version control.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Safety Features */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Safety Features</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
              <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <Shield className="h-4 w-4 text-[#ea4335]" />
                Dry-Run Mode
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                First-time runs default to dry-run. See exactly what would happen before making any changes.
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
              <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <FileText className="h-4 w-4 text-[#ea4335]" />
                Complete Audit Trail
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Every action is logged to LOG.md with timestamps, thread IDs, and labels applied.
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
              <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#ea4335]" />
                Rule-Satisfied Skip
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Threads already correctly labeled are skipped entirely. No redundant processing or API calls.
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
              <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-[#ea4335]" />
                Skip-by-Design Senders
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                OTP codes, security alerts, and personal mail are automatically skipped. No automated filing of sensitive messages.
              </p>
            </div>
          </div>
        </section>

        {/* Important Warnings */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Important Considerations</h2>
          <div className="space-y-4">
            <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-sm text-yellow-900 dark:text-yellow-400 mb-1">
                    Email Content Goes to Your AI Provider
                  </h3>
                  <p className="text-sm text-yellow-800 dark:text-yellow-300">
                    The skill sends email sender, subject, and body text to your AI provider (Anthropic, OpenAI, etc.)
                    for classification. If you handle sensitive or confidential information, understand your provider&apos;s
                    data retention policies before using this skill.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-sm text-yellow-900 dark:text-yellow-400 mb-1">
                    Use a Test Account First
                  </h3>
                  <p className="text-sm text-yellow-800 dark:text-yellow-300">
                    Set up the skill on a throwaway Gmail account or a test inbox before running it on your main email.
                    Verify the behavior matches your expectations.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-sm text-blue-900 dark:text-blue-400 mb-1">
                    No Warranty, Use at Your Own Risk
                  </h3>
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    This is a personal project released under GPL-3.0 with no warranty. The author is not liable for
                    data loss, mislabeled mail, or any other issues. Always review dry-run results before applying changes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
