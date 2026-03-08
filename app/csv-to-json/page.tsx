import type { Metadata } from "next"
import { DataConverter } from "@/components/data-converter"

export const metadata: Metadata = {
  title: "CSV to JSON Converter – Convert CSV to JSON Online Free",
  description: "Convert CSV to JSON instantly. Free online CSV to JSON converter. Upload CSV, get structured JSON. No signup required.",
  alternates: { canonical: "/csv-to-json" },
}

export default function CsvToJsonPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">CSV to JSON Converter</h1>
          <p className="mt-2 text-muted-foreground">
            Convert your CSV data to structured JSON format instantly
          </p>
        </div>
        <DataConverter defaultInputFormat="csv" defaultOutputFormat="json" />

        <section className="mx-auto mt-12 max-w-3xl prose">
          <h2>How to Convert CSV to JSON</h2>
          <ol>
            <li>Paste your CSV data in the input panel or drag and drop a .csv file</li>
            <li>Make sure the output format is set to JSON</li>
            <li>Click Convert — your JSON will appear instantly</li>
            <li>Copy the result to use in your application</li>
          </ol>
          <h2>About CSV to JSON Conversion</h2>
          <p>
            CSV files are widely used for data exchange between spreadsheets, databases, and applications.
            Converting CSV to JSON transforms flat tabular data into structured, nested objects that are
            ready for use in web applications, APIs, and modern databases.
          </p>
          <p>
            Our converter automatically uses the first row as headers and creates an array of objects.
            It handles quoted fields, escaped characters, and various CSV dialects.
          </p>
        </section>
      </main>
    </div>
  )
}
