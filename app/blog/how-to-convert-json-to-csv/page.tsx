import type { Metadata } from "next"
import { BlogPost } from "@/components/blog-post"

export const metadata: Metadata = {
  title: "How to Convert JSON to CSV: Complete Guide – JSONShift Blog",
  description: "Step-by-step guide to converting JSON to CSV. Learn different methods, handle nested objects, and avoid common pitfalls.",
  alternates: { canonical: "/blog/how-to-convert-json-to-csv" },
}

export default function HowToConvertJsonToCsvPage() {
  return (
    <BlogPost>
      <h1>How to Convert JSON to CSV: Complete Guide</h1>
      <p>
        JSON and CSV are fundamentally different data formats. JSON supports nested structures and
        mixed types, while CSV is flat and tabular. Converting between them requires careful handling
        of edge cases. This guide covers everything you need to know.
      </p>

      <h2>Understanding the Challenge</h2>
      <p>
        JSON data is hierarchical — objects can contain other objects and arrays. CSV is flat — it is
        just rows and columns. When converting JSON to CSV, you need to decide how to handle:
      </p>
      <ul>
        <li>Nested objects (flatten with dot notation or serialize as strings)</li>
        <li>Arrays within objects (join values or create multiple rows)</li>
        <li>Mixed data types (everything becomes a string in CSV)</li>
        <li>Missing fields (empty cells or omit columns)</li>
      </ul>

      <h2>Method 1: Online Converter (Fastest)</h2>
      <p>
        The quickest way is to use an online tool like JSONShift. Just paste your JSON, select CSV as
        output, and click Convert. No installation, no code, no data leaving your browser.
      </p>

      <h2>Method 2: JavaScript</h2>
      <pre><code>{`function jsonToCSV(jsonData) {
  const items = Array.isArray(jsonData) ? jsonData : [jsonData];
  const headers = Object.keys(items[0]);
  const csv = [
    headers.join(','),
    ...items.map(item =>
      headers.map(header => {
        const value = String(item[header] ?? '');
        return value.includes(',') ? \`"\${value}"\` : value;
      }).join(',')
    )
  ];
  return csv.join('\\n');
}`}</code></pre>

      <h2>Method 3: Python</h2>
      <pre><code>{`import json
import csv

with open('data.json') as f:
    data = json.load(f)

with open('output.csv', 'w', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=data[0].keys())
    writer.writeheader()
    writer.writerows(data)`}</code></pre>

      <h2>Method 4: Command Line (jq)</h2>
      <pre><code>{`# Using jq to convert JSON array to CSV
jq -r '(.[0] | keys_unsorted) as $keys |
  $keys, map([.[ $keys[] ]])[] |
  @csv' data.json > output.csv`}</code></pre>

      <h2>Handling Nested JSON</h2>
      <p>
        Flat JSON arrays convert cleanly to CSV. Nested structures require flattening. Here is how a
        nested object might be handled:
      </p>
      <pre><code>{`// Input JSON
{
  "name": "Alice",
  "address": {
    "city": "New York",
    "zip": "10001"
  }
}

// Flattened CSV
name,address.city,address.zip
Alice,New York,10001`}</code></pre>

      <h2>Common Pitfalls</h2>
      <ul>
        <li><strong>Commas in values</strong> — Always quote fields that contain commas</li>
        <li><strong>Newlines in values</strong> — Quote fields that contain line breaks</li>
        <li><strong>Unicode characters</strong> — Ensure proper encoding (UTF-8)</li>
        <li><strong>Large files</strong> — Stream processing instead of loading entire file into memory</li>
        <li><strong>Inconsistent keys</strong> — Not all objects may have the same fields</li>
      </ul>

      <h2>Conclusion</h2>
      <p>
        Converting JSON to CSV is a common task that can range from trivial (flat arrays) to complex
        (deeply nested structures). For quick conversions, use JSONShift. For automated pipelines,
        use the code examples above in your preferred language.
      </p>
    </BlogPost>
  )
}
