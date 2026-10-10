import { Shield, BarChart3, AlertTriangle, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Governance & Responsible AI | Gmail Labeler',
  description: 'Privacy impact, failure modes, and responsible AI practices',
}

export default function GovernancePage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Governance & Responsible AI</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
          Transparency, privacy impact assessment, and failure mode analysis for the Gmail Labeler skill.
        </p>

        {/* Privacy Impact Assessment */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Shield className="h-6 w-6 text-[#ea4335]" />
            Privacy Impact Assessment
          </h2>

          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-xl font-semibold mb-3">What the Skill Reads</h3>
            <ul className="space-y-2 mb-6">
              <li><strong>Sender address:</strong> Full email address for domain extraction and classification</li>
              <li><strong>Subject line:</strong> Used by AI-based classification (optional BYOK feature only)</li>
              <li><strong>Message snippet:</strong> First ~100 characters of body text (AI-based classification only)</li>
              <li><strong>Date/time:</strong> For sorting and filtering recent mail</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">What It Never Reads</h3>
            <ul className="space-y-2 mb-6">
              <li>Attachment contents</li>
              <li>Full message body (only snippet for AI classification)</li>
              <li>Email addresses in CC/BCC fields</li>
              <li>Calendar events or other Gmail data</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Where Data Goes</h3>
            <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-lg mb-6">
              <h4 className="font-semibold mb-2">Rule-Based Classification (Default)</h4>
              <ul className="text-sm space-y-1">
                <li><strong>Processing:</strong> Entirely local - sender domain matched against predefined rules</li>
                <li><strong>External calls:</strong> None</li>
                <li><strong>Data retention:</strong> None - stateless classification</li>
              </ul>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-lg mb-6">
              <h4 className="font-semibold mb-2">AI-Based Classification (BYOK Optional Feature)</h4>
              <ul className="text-sm space-y-1">
                <li><strong>Processing:</strong> Sender, subject, snippet sent to LLM provider (Anthropic or OpenAI)</li>
                <li><strong>Your API key:</strong> Never sent to our servers - calls go directly from browser to provider</li>
                <li><strong>Provider retention:</strong> Check your provider&apos;s data policy (Anthropic: zero data retention available; OpenAI: 30 days default)</li>
                <li><strong>Audit log:</strong> Stored in your browser&apos;s IndexedDB - never sent to us</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold mb-3">Risk Mitigation</h3>
            <ol className="space-y-2">
              <li><strong>Dry-run first:</strong> Preview all actions before applying - catch errors before they affect your inbox</li>
              <li><strong>Test account recommended:</strong> Try on a non-primary Gmail account first</li>
              <li><strong>No hosted backend:</strong> This showcase has no server - everything runs in your browser</li>
              <li><strong>Audit trail:</strong> All AI calls logged locally for review</li>
              <li><strong>Opt-in AI:</strong> Rule-based classification works without any AI provider</li>
            </ol>
          </div>
        </section>

        {/* Coverage Analysis */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-[#ea4335]" />
            Rule Coverage Analysis
          </h2>

          <div className="prose dark:prose-invert max-w-none">
            <p className="mb-4">
              Statistical analysis of rule performance across 100 synthetic threads. All metrics reported with 95% confidence intervals.
            </p>

            <Link
              href="/governance/coverage"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#ea4335] text-white rounded-lg hover:bg-[#c5341f] transition-colors"
            >
              View Interactive Coverage Report
            </Link>
          </div>
        </section>

        {/* Failure Modes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-[#ea4335]" />
            Known Failure Modes
          </h2>

          <div className="prose dark:prose-invert max-w-none">
            <p className="mb-6">
              Edge cases where the rule system performs poorly, with proposed improvements and mitigation strategies.
            </p>

            <div className="space-y-6">
              {/* Failure Mode 1 */}
              <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <span className="text-[#ea4335]">1.</span>
                  Domain Typos and Misspellings
                </h3>
                <p className="text-sm mb-3">
                  <strong>Issue:</strong> Typosquatting domains (e.g., <code>arnazon.com</code> instead of <code>amazon.com</code>) bypass rules.
                </p>
                <p className="text-sm mb-3">
                  <strong>Impact:</strong> Phishing attempts may be mislabeled as legitimate; misspelled addresses go unlabeled.
                </p>
                <p className="text-sm mb-3">
                  <strong>Current mitigation:</strong> None - exact domain match only.
                </p>
                <p className="text-sm">
                  <strong>Proposed improvement:</strong> Fuzzy domain matching with Levenshtein distance; flag domains with distance &lt; 2 from known providers for manual review.
                </p>
              </div>

              {/* Failure Mode 2 */}
              <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <span className="text-[#ea4335]">2.</span>
                  Subdomain Handling
                </h3>
                <p className="text-sm mb-3">
                  <strong>Issue:</strong> <code>noreply.amazon.com</code> doesn&apos;t match <code>amazon.com</code> rule unless explicitly defined.
                </p>
                <p className="text-sm mb-3">
                  <strong>Impact:</strong> 10-15% of threads from known providers go unlabeled due to subdomain variation.
                </p>
                <p className="text-sm mb-3">
                  <strong>Current mitigation:</strong> Manual rules for common subdomains (<code>noreply.*</code>, <code>notification.*</code>).
                </p>
                <p className="text-sm">
                  <strong>Proposed improvement:</strong> Automatic subdomain inheritance - match <code>*.example.com</code> when <code>example.com</code> has a rule.
                </p>
              </div>

              {/* Failure Mode 3 */}
              <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <span className="text-[#ea4335]">3.</span>
                  Role Addresses
                </h3>
                <p className="text-sm mb-3">
                  <strong>Issue:</strong> Generic role addresses (<code>noreply@...</code>, <code>notifications@...</code>) from legitimate but unlisted domains.
                </p>
                <p className="text-sm mb-3">
                  <strong>Impact:</strong> Important transactional mail (password resets, order confirmations) from small providers goes unlabeled.
                </p>
                <p className="text-sm mb-3">
                  <strong>Current mitigation:</strong> None - role address is ignored, only domain is checked.
                </p>
                <p className="text-sm">
                  <strong>Proposed improvement:</strong> Heuristic: if sender is <code>noreply@X</code> and X is unlisted, apply generic label &quot;Transactional/Unlisted&quot; with keep action.
                </p>
              </div>

              {/* Failure Mode 4 */}
              <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <span className="text-[#ea4335]">4.</span>
                  Multi-Sender Threads
                </h3>
                <p className="text-sm mb-3">
                  <strong>Issue:</strong> Gmail threads combine multiple senders - classification uses only the first sender.
                </p>
                <p className="text-sm mb-3">
                  <strong>Impact:</strong> Replies in a thread from different providers may have wrong label.
                </p>
                <p className="text-sm mb-3">
                  <strong>Current mitigation:</strong> None - single-sender assumption.
                </p>
                <p className="text-sm">
                  <strong>Proposed improvement:</strong> Detect multi-sender threads, skip labeling (or label as &quot;Mixed/Conversation&quot;).
                </p>
              </div>

              {/* Failure Mode 5 */}
              <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <span className="text-[#ea4335]">5.</span>
                  Content Type Ambiguity
                </h3>
                <p className="text-sm mb-3">
                  <strong>Issue:</strong> Same sender sends both receipts (keep) and marketing (archive) - action hint may be wrong.
                </p>
                <p className="text-sm mb-3">
                  <strong>Impact:</strong> Amazon receipts archived as marketing, or vice versa.
                </p>
                <p className="text-sm mb-3">
                  <strong>Current mitigation:</strong> Default action is &quot;keep&quot; for ambiguous providers (errs on side of safety).
                </p>
                <p className="text-sm">
                  <strong>Proposed improvement:</strong> Subject line analysis - &quot;Your Amazon.com order&quot; → keep, &quot;Prime Day deals&quot; → archive.
                </p>
              </div>

              {/* Failure Mode 6 */}
              <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <span className="text-[#ea4335]">6.</span>
                  Internationalization
                </h3>
                <p className="text-sm mb-3">
                  <strong>Issue:</strong> Rules are AU/US-centric - EU/APAC/LATAM providers missing.
                </p>
                <p className="text-sm mb-3">
                  <strong>Impact:</strong> Low coverage for non-English-speaking users (estimated 30-50% unlabeled).
                </p>
                <p className="text-sm mb-3">
                  <strong>Current mitigation:</strong> Users can add custom rules manually.
                </p>
                <p className="text-sm">
                  <strong>Proposed improvement:</strong> Multi-region rule packs - user selects region(s), loads appropriate provider list.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Open Issues */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-[#ea4335]" />
            Open Issues Log
          </h2>

          <div className="prose dark:prose-invert max-w-none">
            <p className="mb-4">
              Tracked issues for future improvements (not blocking current functionality):
            </p>

            <ul className="space-y-2">
              <li><strong>#1:</strong> Add subdomain inheritance logic (DR-001 &quot;What I&apos;d Change&quot;)</li>
              <li><strong>#2:</strong> Expand non-US/AU provider coverage (EU banks, APAC e-commerce)</li>
              <li><strong>#3:</strong> Implement fuzzy domain matching for typo detection</li>
              <li><strong>#4:</strong> Add subject line content-type classifier (receipt vs marketing)</li>
              <li><strong>#5:</strong> Multi-sender thread detection and handling</li>
              <li><strong>#6:</strong> Confidence scoring for classifications (exact vs fuzzy vs no-match)</li>
            </ul>

            <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
              See <Link href="/methods" className="text-[#ea4335] hover:underline">Methods page</Link> for full &quot;What I&apos;d Change&quot; discussion.
            </p>
          </div>
        </section>

        {/* AI Features */}
        <section>
          <h2 className="text-2xl font-bold mb-4">AI Features (BYOK Optional)</h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="mb-4">
              When enabled with your own API key, AI features add:
            </p>

            <ul className="space-y-2 mb-6">
              <li><strong>Custom rule suggestions:</strong> &quot;Here are 10 sender addresses from my inbox&quot; → AI generates provider type and rules</li>
              <li><strong>Subject-based refinement:</strong> Distinguish receipts from marketing for same sender</li>
              <li><strong>Coverage predictions:</strong> Estimate how many threads would be labeled before running</li>
            </ul>

            <p className="mb-4">
              All AI outputs are:
            </p>
            <ul className="space-y-2">
              <li>Visibly labeled &quot;AI-generated&quot;</li>
              <li>Logged to audit trail (viewable at <Link href="/ai-log" className="text-[#ea4335] hover:underline">/ai-log</Link>)</li>
              <li>Subject to human review before application</li>
            </ul>

            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-4">
              See <Link href="/methods" className="text-[#ea4335] hover:underline">Methods → AI Use Statement</Link> for full transparency policy.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
