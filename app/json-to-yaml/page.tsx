import type { Metadata } from "next"
import { DataConverter } from "@/components/data-converter"

export const metadata: Metadata = {
  title: "JSON to YAML Converter – Convert JSON to YAML Online Free",
  description: "Convert JSON to YAML instantly. Free online JSON to YAML converter. Perfect for Kubernetes, Docker, and CI/CD configs. No signup required.",
  alternates: { canonical: "/json-to-yaml" },
}

export default function JsonToYamlPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">JSON to YAML Converter</h1>
          <p className="mt-2 text-muted-foreground">
            Convert JSON to human-readable YAML format instantly
          </p>
        </div>
        <DataConverter defaultInputFormat="json" defaultOutputFormat="yaml" />

        <section className="mx-auto mt-12 max-w-3xl prose">
          <h2>How to Convert JSON to YAML</h2>
          <ol>
            <li>Paste your JSON data in the input panel</li>
            <li>Make sure the output format is set to YAML</li>
            <li>Click Convert — your YAML will appear instantly</li>
            <li>Copy the result for your configuration files</li>
          </ol>
          <h2>Why Convert JSON to YAML?</h2>
          <p>
            YAML is the preferred format for configuration files in Kubernetes, Docker Compose, GitHub Actions,
            GitLab CI/CD, Ansible, and many other DevOps tools. It is more human-readable than JSON thanks to
            its indentation-based syntax and lack of brackets.
          </p>
          <p>
            Our converter produces clean, properly indented YAML output that is ready to use in your
            configuration files. It handles nested objects, arrays, and all standard YAML data types.
          </p>
        </section>
      </main>
    </div>
  )
}
