import type { Metadata } from "next"
import { DataConverter } from "@/components/data-converter"

export const metadata: Metadata = {
  title: "YAML to JSON Converter – Convert YAML to JSON Online Free",
  description: "Convert YAML to JSON instantly. Free online YAML to JSON converter. Parse Kubernetes, Docker, and CI/CD configs to JSON. No signup required.",
  alternates: { canonical: "/yaml-to-json" },
}

export default function YamlToJsonPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">YAML to JSON Converter</h1>
          <p className="mt-2 text-muted-foreground">
            Convert YAML configuration files to JSON format instantly
          </p>
        </div>
        <DataConverter defaultInputFormat="yaml" defaultOutputFormat="json" />

        <section className="mx-auto mt-12 max-w-3xl prose">
          <h2>How to Convert YAML to JSON</h2>
          <ol>
            <li>Paste your YAML data in the input panel or upload a .yaml file</li>
            <li>Make sure the output format is set to JSON</li>
            <li>Click Convert — your JSON will appear instantly</li>
            <li>Copy the structured JSON output</li>
          </ol>
          <h2>About YAML to JSON Conversion</h2>
          <p>
            YAML (YAML Ain't Markup Language) is widely used in DevOps configuration files. Converting YAML
            to JSON is essential when you need to use configuration data in JavaScript applications, REST APIs,
            or tools that only accept JSON input.
          </p>
          <p>
            Our converter correctly handles YAML features like anchors, multi-line strings, nested mappings,
            and sequences, producing valid JSON output every time.
          </p>
        </section>
      </main>
    </div>
  )
}
