import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import fs from 'fs'
import path from 'path'
import { remark } from 'remark'
import html from 'remark-html'

export const metadata = {
  title: 'DR-002: Dry-Run by Default | Gmail Labeler',
}

async function getDecisionRecord() {
  const filePath = path.join(process.cwd(), '../docs/decisions/DR-002-dry-run-by-default.md')
  const content = fs.readFileSync(filePath, 'utf-8')
  const processed = await remark().use(html).process(content)
  return processed.toString()
}

export default async function DR002Page() {
  const content = await getDecisionRecord()

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/methods"
          className="inline-flex items-center gap-2 text-[#ea4335] hover:underline mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Methods
        </Link>

        <article className="prose dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </article>
      </div>
    </div>
  )
}
