'use client'

import { getSortedPosts, getAllTags } from '@/lib/contentlayer'
import Link from 'next/link'
import { useState } from 'react'
import { AnimateIn } from '@/components/AnimateIn'
import { cn } from '@/lib/utils'

export default function BlogPage() {
  const allPosts = getSortedPosts()
  const allTags = getAllTags()
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const posts = activeTag
    ? allPosts.filter((p) => p.tags?.includes(activeTag))
    : allPosts

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <AnimateIn>
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
          Blog
        </h1>
        <p className="mb-8 text-gray-500 dark:text-gray-400">
          量子情報・研究メモ・実装など
        </p>
      </AnimateIn>

      {/* Tag filter */}
      {allTags.length > 0 && (
        <AnimateIn delay={0.07}>
          <div className="mb-8 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTag(null)}
              className={cn(
                'rounded-full px-3 py-1 text-sm transition-colors',
                activeTag === null
                  ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              )}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                className={cn(
                  'rounded-full px-3 py-1 text-sm transition-colors',
                  activeTag === tag
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        </AnimateIn>
      )}

      {/* Post list */}
      <div className="space-y-4">
        {posts.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400">
            一致する記事がありません。
          </p>
        )}
        {posts.map((post, i) => (
          <AnimateIn key={post.slug} delay={0.1 + i * 0.05}>
            <Link href={`/blog/${post.slug}`} className="group block">
              <article className="rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <time className="text-xs text-gray-400">
                    {new Date(post.date).toLocaleDateString('ja-JP', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <h2 className="font-semibold text-gray-900 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
                  {post.title}
                </h2>
                {post.summary && (
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {post.summary}
                  </p>
                )}
              </article>
            </Link>
          </AnimateIn>
        ))}
      </div>
    </main>
  )
}
