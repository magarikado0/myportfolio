import { getPostBySlug, getSortedPosts } from '@/lib/contentlayer'
import MdxRenderer from '@/components/MdxRenderer'
import { PageTransition } from '@/components/AnimateIn'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getSortedPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.summary,
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  return (
    <PageTransition>
      <main className="mx-auto max-w-4xl px-4 py-12">
        {/* Back link */}
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-1 text-sm text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
        >
          <ArrowLeft size={16} /> Back to blog
        </Link>

        {/* Header */}
        <header className="mb-10 border-b border-gray-200 pb-6 dark:border-gray-800">
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3">
            <time className="text-sm text-gray-400">
              {new Date(post.date).toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          {post.summary && (
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              {post.summary}
            </p>
          )}
        </header>

        <MdxRenderer code={post.body.code} />
      </main>
    </PageTransition>
  )
}
