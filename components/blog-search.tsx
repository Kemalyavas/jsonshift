"use client"

import { useState } from "react"
import Link from "next/link"
import { Search } from "lucide-react"

interface Post {
  href: string
  title: string
  excerpt: string
  date: string
}

export function BlogSearch({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState("")

  const filtered = query.trim()
    ? posts.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.excerpt.toLowerCase().includes(query.toLowerCase())
      )
    : posts

  return (
    <>
      <div className="relative mt-6">
        <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles..."
          className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-foreground/30 transition-colors"
        />
      </div>

      <div className="mt-6 flex flex-col gap-8">
        {filtered.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No articles found for &ldquo;{query}&rdquo;
          </p>
        ) : (
          filtered.map((post) => (
            <Link
              key={post.href}
              href={post.href}
              className="group rounded-lg border border-border bg-card p-6 transition-colors hover:border-foreground/20 hover:bg-muted/50"
            >
              <p className="text-xs text-muted-foreground">{post.date}</p>
              <h2 className="mt-1 text-lg font-semibold text-foreground group-hover:underline">{post.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
            </Link>
          ))
        )}
      </div>
    </>
  )
}
