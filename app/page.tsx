import { DataConverter } from "@/components/data-converter"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"

const TOOLS = [
  { href: "/json-to-csv", title: "JSON to CSV", desc: "Convert JSON data to CSV spreadsheet format" },
  { href: "/csv-to-json", title: "CSV to JSON", desc: "Convert CSV files to structured JSON" },
  { href: "/json-to-yaml", title: "JSON to YAML", desc: "Convert JSON to human-readable YAML" },
  { href: "/yaml-to-json", title: "YAML to JSON", desc: "Convert YAML configuration to JSON" },
  { href: "/xml-to-json", title: "XML to JSON", desc: "Convert XML documents to JSON format" },
  { href: "/json-to-xml", title: "JSON to XML", desc: "Convert JSON data to XML markup" },
]

const FAQS = [
  {
    q: "Is my data safe?",
    a: "Yes. All conversions happen entirely in your browser. Your data never leaves your device — nothing is sent to any server.",
  },
  {
    q: "What formats are supported?",
    a: "JSONShift supports JSON, CSV, YAML, XML, and TOML. You can convert between any combination of these formats.",
  },
  {
    q: "Is there a file size limit?",
    a: "Since everything runs in your browser, the limit depends on your device's memory. Most files up to 10MB convert without issues.",
  },
  {
    q: "Do I need to create an account?",
    a: "No. JSONShift is completely free with no signup required. Just paste your data and convert.",
  },
  {
    q: "Can I upload files?",
    a: "Yes. You can drag and drop files or click the upload button in the input panel. Supported file types include .json, .csv, .yaml, .yml, .xml, .toml, and .txt.",
  },
  {
    q: "How accurate are the conversions?",
    a: "Conversions are lossless for compatible data structures. Some formats have limitations — for example, CSV only supports flat tabular data, so nested JSON objects will be flattened.",
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Free Data Format Converter</h1>
          <p className="mt-2 text-muted-foreground">
            Convert between JSON, CSV, YAML, XML, and TOML instantly in your browser
          </p>
        </div>

        <DataConverter />

        {/* More Tools */}
        <section className="mt-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-foreground">Conversion Tools</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group rounded-lg border border-border bg-card p-5 transition-colors hover:border-foreground/20 hover:bg-muted/50"
              >
                <h3 className="font-semibold text-foreground group-hover:underline">{tool.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto mt-16 max-w-3xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-sm font-medium">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="container mx-auto max-w-7xl px-4 py-6">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="text-sm text-muted-foreground">
              Supports JSON, CSV, YAML, XML, and TOML formats
            </p>
            <div className="flex items-center gap-4">
              <Link href="/privacy-policy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <p className="text-xs text-muted-foreground">
                All conversions happen locally in your browser
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
