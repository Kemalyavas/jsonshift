import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Privacy Policy – JSONShift",
  description: "Privacy policy for JSONShift. Learn how we handle your data and protect your privacy.",
  alternates: { canonical: "/privacy-policy" },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto max-w-3xl px-4 py-12">
        <article className="prose">
          <h1>Privacy Policy</h1>

          <h2>Overview</h2>
          <p>
            JSONShift is a free online data format converter. We are committed to protecting your privacy.
            This policy explains what data we collect and how we use it.
          </p>

          <h2>Data Processing</h2>
          <p>
            <strong>All data conversions happen entirely in your browser.</strong> When you paste data into
            JSONShift and click Convert, the conversion is performed locally using JavaScript. Your data is
            never sent to our servers or any third party. We cannot see, access, or store your data.
          </p>

          <h2>Analytics</h2>
          <p>
            We use Vercel Analytics to collect anonymous usage data such as page views, browser type, and
            country. This data is aggregated and cannot be used to identify individual users. No cookies
            are used for tracking.
          </p>

          <h2>Cookies</h2>
          <p>
            JSONShift uses a single localStorage preference to remember your theme setting (light/dark mode).
            No tracking cookies are used.
          </p>

          <h2>Third-Party Services</h2>
          <ul>
            <li><strong>Vercel</strong> — Hosting and analytics (privacy policy: vercel.com/legal/privacy-policy)</li>
          </ul>

          <h2>Data Retention</h2>
          <p>
            Since we do not collect or store any user data or converted content, there is nothing to retain
            or delete. Your data exists only in your browser while you use the tool.
          </p>

          <h2>Children's Privacy</h2>
          <p>
            JSONShift does not knowingly collect any personal information from children under 13.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. Any changes will be posted on this page.
          </p>

          <h2>Contact</h2>
          <p>
            If you have any questions about this privacy policy, please contact us at{" "}
            <a href="mailto:kemalyavaass@gmail.com">kemalyavaass@gmail.com</a>.
          </p>
        </article>

        <div className="mt-12 text-center">
          <Link href="/">
            <Button size="lg">Try JSONShift</Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
