import Link from "next/link"
import { Button } from "@/components/ui/button"

interface BlogPostProps {
  children: React.ReactNode
}

export function BlogPost({ children }: BlogPostProps) {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto max-w-3xl px-4 py-12">
        <article className="prose">{children}</article>
        <div className="mt-12 text-center">
          <Link href="/">
            <Button size="lg">Try JSONShift Now</Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
