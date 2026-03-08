import type { Metadata } from "next"
import { DataConverter } from "@/components/data-converter"

export const metadata: Metadata = {
  title: "JSON to CSV Converter – Convert JSON to CSV Online Free",
  description: "Convert JSON to CSV instantly. Free online JSON to CSV converter. Paste JSON, get CSV. No signup required. Works in your browser.",
  alternates: { canonical: "/json-to-csv" },
}

export default function JsonToCsvPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">JSON to CSV Converter</h1>
          <p className="mt-2 text-muted-foreground">
            Convert your JSON data to CSV spreadsheet format instantly
          </p>
        </div>
        <DataConverter defaultInputFormat="json" defaultOutputFormat="csv" />

        <section className="mx-auto mt-12 max-w-3xl prose">
          <h2>How to Convert JSON to CSV</h2>
          <ol>
            <li>Paste your JSON data in the input panel or upload a .json file</li>
            <li>Make sure the output format is set to CSV</li>
            <li>Click Convert — your CSV will appear instantly</li>
            <li>Copy the result or download it</li>
          </ol>
          <h2>About JSON to CSV Conversion</h2>
          <p>
            JSON (JavaScript Object Notation) is a lightweight data format commonly used in APIs and web applications.
            CSV (Comma-Separated Values) is a simple tabular format ideal for spreadsheets and data analysis tools
            like Excel, Google Sheets, and pandas.
          </p>
          <p>
            Converting JSON to CSV is useful when you need to analyze API data in a spreadsheet, import data into
            a database, or share structured data with non-technical team members. Our converter handles arrays of
            objects, nested structures, and special characters automatically.
          </p>
        </section>
      </main>
    </div>
  )
}
