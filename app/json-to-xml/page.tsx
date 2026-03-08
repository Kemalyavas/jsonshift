import type { Metadata } from "next"
import { DataConverter } from "@/components/data-converter"

export const metadata: Metadata = {
  title: "JSON to XML Converter – Convert JSON to XML Online Free",
  description: "Convert JSON to XML instantly. Free online JSON to XML converter. Generate well-formed XML from JSON data. No signup required.",
  alternates: { canonical: "/json-to-xml" },
}

export default function JsonToXmlPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">JSON to XML Converter</h1>
          <p className="mt-2 text-muted-foreground">
            Convert JSON data to well-formed XML markup instantly
          </p>
        </div>
        <DataConverter defaultInputFormat="json" defaultOutputFormat="xml" />

        <section className="mx-auto mt-12 max-w-3xl prose">
          <h2>How to Convert JSON to XML</h2>
          <ol>
            <li>Paste your JSON data in the input panel</li>
            <li>Make sure the output format is set to XML</li>
            <li>Click Convert — your XML will appear instantly</li>
            <li>Copy the well-formed XML output</li>
          </ol>
          <h2>About JSON to XML Conversion</h2>
          <p>
            Converting JSON to XML is necessary when integrating with enterprise systems, SOAP web services,
            or applications that require XML input. XML offers features like attributes, namespaces, and schemas
            that are important in many business contexts.
          </p>
          <p>
            Our converter produces properly indented, well-formed XML. JSON objects become XML elements,
            arrays become repeated elements, and special characters are properly escaped.
          </p>
        </section>
      </main>
    </div>
  )
}
