import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Blog – JSONShift | Data Format Guides & Tutorials",
  description: "Learn about JSON, CSV, YAML, XML, and TOML. Guides, tutorials, and comparisons for developers working with data formats.",
  alternates: { canonical: "/blog" },
}

const POSTS = [
  {
    href: "/blog/json-vs-yaml",
    title: "JSON vs YAML: Which Format Should You Use?",
    excerpt: "A detailed comparison of JSON and YAML for configuration files, APIs, and data storage. Learn when to use each format.",
    date: "March 9, 2026",
  },
  {
    href: "/blog/how-to-convert-json-to-csv",
    title: "How to Convert JSON to CSV: Complete Guide",
    excerpt: "Step-by-step guide to converting JSON data to CSV format. Covers nested objects, arrays, and common pitfalls.",
    date: "March 9, 2026",
  },
  {
    href: "/blog/data-serialization-formats",
    title: "Data Serialization Formats Explained: JSON, CSV, YAML, XML & TOML",
    excerpt: "A comprehensive overview of the most popular data serialization formats, their strengths, and ideal use cases.",
    date: "March 9, 2026",
  },
  {
    href: "/blog/xml-vs-json",
    title: "XML vs JSON: A Developer's Guide",
    excerpt: "When should you use XML over JSON? Learn the key differences, advantages, and migration strategies.",
    date: "March 9, 2026",
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Blog</h1>
        <p className="mt-2 text-muted-foreground">Guides and tutorials for working with data formats</p>

        <div className="mt-8 flex flex-col gap-8">
          {POSTS.map((post) => (
            <Link
              key={post.href}
              href={post.href}
              className="group rounded-lg border border-border bg-card p-6 transition-colors hover:border-foreground/20 hover:bg-muted/50"
            >
              <p className="text-xs text-muted-foreground">{post.date}</p>
              <h2 className="mt-1 text-lg font-semibold text-foreground group-hover:underline">{post.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
