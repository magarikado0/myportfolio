# 技術情報

## コマンド

```bash
npm run dev           # 開発サーバー起動（contentlayer ビルドを先に実行）
npm run build         # 本番ビルド（contentlayer → next build → サイトマップ生成）
npm start             # 本番サーバー起動
npm run lint          # ESLint 実行
npm run contentlayer  # Contentlayer のみビルド（.contentlayer/ の型を再生成）
```

`--webpack` フラグは `next dev` と `next build` に渡される（package.json で設定済み）。

## アーキテクチャ

**Next.js App Router** を使用したポートフォリオサイト。**Contentlayer2** がビルド時に MDX/Markdown ファイルを型付きコンテンツに変換する。

### コンテンツパイプライン

コンテンツは `content/` に置かれ、Contentlayer2（`contentlayer.config.ts` で設定）によって処理される：

- **`content/posts/20*.{md,mdx}`** — ブログ記事。フロントマター: `title`, `date`, `tags`, `summary`, `hidden`
- **`content/pages/*.{md,mdx}`** — 静的ページ（about, projects, research）。フロントマター: `title`, `description`

Contentlayer は `.contentlayer/generated/` に型付きデータを生成する（ビルド成果物、コミット対象外）。コンテンツスキーマを変更した場合は開発前に `npm run contentlayer` を実行すること。

### ページルーティング

| ルート | データソース |
|--------|------------|
| `/` | ハードコードされたヒーロー + 最新3記事 |
| `/blog` | `getSortedPosts()` で全記事取得、クライアントサイドでタグ絞り込み |
| `/blog/[slug]` | `getPostBySlug(slug)` で個別記事取得、静的生成（SSG） |
| `/about`, `/projects`, `/research` | `getPageByName()` で `content/pages/{name}.mdx` を読み込み |

### 主要ファイル

- **`contentlayer.config.ts`** — コンテンツスキーマと MDX プラグイン（remark-gfm, remark-math, rehype-katex, rehype-pretty-code with GitHub テーマ）
- **`lib/contentlayer.ts`** — ヘルパー関数: `getSortedPosts()`, `getPostBySlug()`, `getAllTags()`, `getPageByName()`
- **`lib/utils.ts`** — `cn()` ユーティリティ（clsx + tailwind-merge）
- **`components/MdxRenderer.tsx`** — クライアントサイド MDX レンダラー（HTML 要素を Tailwind でカスタムスタイル）
- **`components/AnimateIn.tsx`** — Framer Motion ラッパー: `AnimateIn`（段階的フェードイン）と `PageTransition`

### スタイリング

Tailwind CSS v4 を PostCSS 経由で使用。ダークモードは `ThemeProvider`（localStorage ベース）で切り替え、`dark:` プレフィックスで適用。条件付きクラス結合には `lib/utils.ts` の `cn()` を使うこと。

### コンテンツの追加方法

- **新規ブログ記事**: `content/posts/YYYY-MM-DD-slug.md` を作成し、必須フロントマター（`title`, `date`）を記述。一覧から除外したい場合は `hidden: true` を設定。
- **静的ページの編集**: `content/pages/{about,projects,research}.mdx` を直接編集。
