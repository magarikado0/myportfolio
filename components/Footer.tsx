import Link from 'next/link'
import { Github, Twitter } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © {year} Portfolio. Built with Next.js & Contentlayer2.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/magarikado0"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-gray-100"
          >
            <Github size={20} />
          </Link>
        </div>
      </div>
    </footer>
  )
}
