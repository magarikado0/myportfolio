import { allPosts, allPages } from 'contentlayer/generated'
import type { Post, Page } from 'contentlayer/generated'

/** 全記事を日付降順で返す */
export function getSortedPosts(): Post[] {
  return allPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

/** スラッグで記事を取得する */
export function getPostBySlug(slug: string): Post | undefined {
  return allPosts.find((p) => p.slug === slug)
}

/** タグの一覧（重複なし）を返す */
export function getAllTags(): string[] {
  const tagSet = new Set<string>()
  allPosts.forEach((p) => p.tags?.forEach((t) => tagSet.add(t)))
  return Array.from(tagSet).sort()
}

/** ファイル名（拡張子なし）でページを取得する */
export function getPageByName(name: string): Page | undefined {
  return allPages.find(
    (p) => p._raw.sourceFileName.replace(/\.mdx$/, '') === name
  )
}

export { allPosts, allPages }
export type { Post, Page }
