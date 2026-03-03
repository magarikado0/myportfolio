import { allPosts, allPages } from 'contentlayer/generated'
import type { Post, Page } from 'contentlayer/generated'

/** 全記事を日付降順で返す（hidden: true の記事は除外） */
export function getSortedPosts(): Post[] {
  return allPosts
    .filter((p) => !p.hidden)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/** スラッグで記事を取得する（hidden: true の記事は除外） */
export function getPostBySlug(slug: string): Post | undefined {
  return allPosts.find((p) => p.slug === slug && !p.hidden)
}

/** タグの一覧（重複なし）を返す（hidden: true の記事は除外） */
export function getAllTags(): string[] {
  const tagSet = new Set<string>()
  allPosts.filter((p) => !p.hidden).forEach((p) => p.tags?.forEach((t) => tagSet.add(t)))
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
