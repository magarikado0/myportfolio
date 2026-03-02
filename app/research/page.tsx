import { getPageByName } from '@/lib/contentlayer'
import MdxRenderer from '@/components/MdxRenderer'
import { PageTransition } from '@/components/AnimateIn'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Research',
}

export default function ResearchPage() {
  const page = getPageByName('research')
  if (!page) notFound()

  return (
    <PageTransition>
      <main className="mx-auto max-w-4xl px-4 py-12">
        <header className="mb-10 border-b border-gray-200 pb-6 dark:border-gray-800">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            {page.title}
          </h1>
          {page.description && (
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              {page.description}
            </p>
          )}
        </header>
        <MdxRenderer code={page.body.code} />
      </main>
    </PageTransition>
  )
}
