import { getSortedPosts } from '@/lib/contentlayer'
import { AnimateIn } from '@/components/AnimateIn'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Home() {
  const recentPosts = getSortedPosts().slice(0, 3)

  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      {/* Hero */}
      <section className="mb-20">
        <AnimateIn delay={0.05}>
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Researcher &amp; Developer
          </p>
        </AnimateIn>
        <AnimateIn delay={0.1}>
          <h1 className="mb-4 text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-6xl">
            Your Name
          </h1>
        </AnimateIn>
        <AnimateIn delay={0.18}>
          <p className="max-w-xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">
            量子情報・量子誤り訂正の研究者。理論と実装の境界を探求しています。
          </p>
        </AnimateIn>
        <AnimateIn delay={0.25}>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300"
            >
              About me <ArrowRight size={16} />
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              Read blog
            </Link>
          </div>
        </AnimateIn>
      </section>

      {/* Recent posts */}
      <section>
        <AnimateIn delay={0.3}>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Recent Posts
            </h2>
            <Link
              href="/blog"
              className="flex items-center gap-1 text-sm text-blue-600 hover:underline dark:text-blue-400"
            >
              All posts <ArrowRight size={14} />
            </Link>
          </div>
        </AnimateIn>

        <div className="space-y-4">
          {recentPosts.map((post, i) => (
            <AnimateIn key={post.slug} delay={0.35 + i * 0.07}>
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
                    <div className="flex gap-1.5">
                      {post.tags?.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
                    {post.title}
                  </h3>
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
      </section>
    </main>
  )
}
