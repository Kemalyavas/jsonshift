import type { Metadata } from "next"
import { DataConverter } from "@/components/data-converter"

export const metadata: Metadata = {
  title: "XML to JSON Converter – Convert XML to JSON Online Free",
  description: "Convert XML to JSON instantly. Free online XML to JSON converter. Transform XML documents to structured JSON. No signup required.",
  alternates: { canonical: "/xml-to-json" },
}

export default function XmlToJsonPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">XML to JSON Converter</h1>
          <p className="mt-2 text-muted-foreground">
            Convert XML documents to structured JSON format instantly
          </p>
        </div>
        <DataConverter defaultInputFormat="xml" defaultOutputFormat="json" />

        <section className="mx-auto mt-12 max-w-3xl prose">
          <h2>How to Convert XML to JSON</h2>
          <ol>
            <li>Paste your XML data in the input panel or upload an .xml file</li>
            <li>Make sure the output format is set to JSON</li>
            <li>Click Convert — your JSON will appear instantly</li>
            <li>Copy the result for use in your application</li>
          </ol>
          <h2>About XML to JSON Conversion</h2>
          <p>
            XML (Extensible Markup Language) was once the dominant data exchange format, and it is still
            widely used in enterprise systems, SOAP APIs, RSS feeds, and legacy applications. JSON has
            become the modern standard for web APIs and JavaScript applications.
          </p>
          <p>
            Our converter preserves XML attributes (as @-prefixed keys), text content, and nested elements.
            It handles namespaces, CDATA sections, and complex nested structures.
          </p>
        </section>
      </main>
    </div>
  )
}
