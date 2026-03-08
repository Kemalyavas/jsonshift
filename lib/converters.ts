import * as yaml from "js-yaml"
import * as toml from "@iarna/toml"

export type DataFormat = "json" | "csv" | "yaml" | "xml" | "toml"

export interface ConversionResult {
  success: boolean
  output: string
  error?: string
}

// Parse any format to JavaScript object
function parseInput(input: string, format: DataFormat): unknown {
  switch (format) {
    case "json":
      return JSON.parse(input)
    case "csv":
      return parseCSV(input)
    case "yaml":
      return yaml.load(input)
    case "xml":
      return parseXML(input)
    case "toml":
      return toml.parse(input)
    default:
      throw new Error(`Unsupported input format: ${format}`)
  }
}

// Convert JavaScript object to target format
function formatOutput(data: unknown, format: DataFormat): string {
  switch (format) {
    case "json":
      return JSON.stringify(data, null, 2)
    case "csv":
      return toCSV(data)
    case "yaml":
      return yaml.dump(data, { indent: 2, lineWidth: -1 })
    case "xml":
      return toXML(data)
    case "toml":
      return toml.stringify(data as toml.JsonMap)
    default:
      throw new Error(`Unsupported output format: ${format}`)
  }
}

// CSV Parser
function parseCSV(input: string): Record<string, string>[] {
  const lines = input.trim().split("\n")
  if (lines.length === 0) return []
  
  const headers = parseCSVLine(lines[0])
  const result: Record<string, string>[] = []
  
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i])
    const row: Record<string, string> = {}
    headers.forEach((header, index) => {
      row[header] = values[index] ?? ""
    })
    result.push(row)
  }
  
  return result
}

function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ""
  let inQuotes = false
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === "," && !inQuotes) {
      result.push(current.trim())
      current = ""
    } else {
      current += char
    }
  }
  result.push(current.trim())
  
  return result
}

// CSV Generator
function toCSV(data: unknown): string {
  if (!Array.isArray(data)) {
    if (typeof data === "object" && data !== null) {
      data = [data]
    } else {
      throw new Error("CSV output requires an array of objects or a single object")
    }
  }
  
  if (data.length === 0) return ""
  
  const firstRow = data[0] as Record<string, unknown>
  const headers = Object.keys(firstRow)
  
  const escapeCSV = (value: unknown): string => {
    const str = String(value ?? "")
    if (str.includes(",") || str.includes('"') || str.includes("\n")) {
      return `"${str.replace(/"/g, '""')}"`
    }
    return str
  }
  
  const lines = [headers.map(escapeCSV).join(",")]
  
  for (const row of data as Record<string, unknown>[]) {
    lines.push(headers.map(header => escapeCSV(row[header])).join(","))
  }
  
  return lines.join("\n")
}

// XML Parser (simple implementation)
function parseXML(input: string): Record<string, unknown> {
  const parser = new DOMParser()
  const doc = parser.parseFromString(input, "text/xml")
  
  const errorNode = doc.querySelector("parsererror")
  if (errorNode) {
    throw new Error("Invalid XML: " + errorNode.textContent)
  }
  
  function nodeToObject(node: Node): unknown {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent?.trim()
      return text || null
    }
    
    if (node.nodeType !== Node.ELEMENT_NODE) {
      return null
    }
    
    const element = node as Element
    const obj: Record<string, unknown> = {}
    
    // Handle attributes
    for (const attr of Array.from(element.attributes)) {
      obj[`@${attr.name}`] = attr.value
    }
    
    // Handle child nodes
    const children = Array.from(element.childNodes).filter(
      child => child.nodeType === Node.ELEMENT_NODE || 
               (child.nodeType === Node.TEXT_NODE && child.textContent?.trim())
    )
    
    if (children.length === 1 && children[0].nodeType === Node.TEXT_NODE) {
      const text = children[0].textContent?.trim()
      if (Object.keys(obj).length === 0) {
        return text
      }
      obj["#text"] = text
      return obj
    }
    
    for (const child of children) {
      if (child.nodeType === Node.ELEMENT_NODE) {
        const childElement = child as Element
        const childName = childElement.tagName
        const childValue = nodeToObject(child)
        
        if (obj[childName] !== undefined) {
          if (!Array.isArray(obj[childName])) {
            obj[childName] = [obj[childName]]
          }
          (obj[childName] as unknown[]).push(childValue)
        } else {
          obj[childName] = childValue
        }
      }
    }
    
    return obj
  }
  
  const root = doc.documentElement
  return { [root.tagName]: nodeToObject(root) }
}

// XML Generator
function toXML(data: unknown, rootName = "root", indent = 0): string {
  const spaces = "  ".repeat(indent)
  
  if (data === null || data === undefined) {
    return `${spaces}<${rootName}/>`
  }
  
  if (typeof data !== "object") {
    return `${spaces}<${rootName}>${escapeXML(String(data))}</${rootName}>`
  }
  
  if (Array.isArray(data)) {
    return data.map(item => toXML(item, rootName, indent)).join("\n")
  }
  
  const obj = data as Record<string, unknown>
  const attributes: string[] = []
  const children: string[] = []
  let textContent = ""
  
  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith("@")) {
      attributes.push(`${key.slice(1)}="${escapeXML(String(value))}"`)
    } else if (key === "#text") {
      textContent = String(value)
    } else {
      children.push(toXML(value, key, indent + 1))
    }
  }
  
  const attrStr = attributes.length > 0 ? " " + attributes.join(" ") : ""
  
  if (children.length === 0 && !textContent) {
    return `${spaces}<${rootName}${attrStr}/>`
  }
  
  if (children.length === 0) {
    return `${spaces}<${rootName}${attrStr}>${escapeXML(textContent)}</${rootName}>`
  }
  
  return `${spaces}<${rootName}${attrStr}>\n${children.join("\n")}\n${spaces}</${rootName}>`
}

function escapeXML(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

// Main conversion function
export function convert(
  input: string,
  fromFormat: DataFormat,
  toFormat: DataFormat
): ConversionResult {
  try {
    if (!input.trim()) {
      return { success: false, output: "", error: "Input is empty" }
    }
    
    const parsed = parseInput(input, fromFormat)
    const output = formatOutput(parsed, toFormat)
    
    return { success: true, output }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error occurred"
    return { success: false, output: "", error: message }
  }
}

export const formatLabels: Record<DataFormat, string> = {
  json: "JSON",
  csv: "CSV",
  yaml: "YAML",
  xml: "XML",
  toml: "TOML",
}

export const formatExamples: Record<DataFormat, string> = {
  json: `{
  "users": [
    {
      "name": "Alice",
      "email": "alice@example.com",
      "age": 28
    },
    {
      "name": "Bob",
      "email": "bob@example.com",
      "age": 32
    }
  ]
}`,
  csv: `name,email,age
Alice,alice@example.com,28
Bob,bob@example.com,32`,
  yaml: `users:
  - name: Alice
    email: alice@example.com
    age: 28
  - name: Bob
    email: bob@example.com
    age: 32`,
  xml: `<users>
  <user>
    <name>Alice</name>
    <email>alice@example.com</email>
    <age>28</age>
  </user>
  <user>
    <name>Bob</name>
    <email>bob@example.com</email>
    <age>32</age>
  </user>
</users>`,
  toml: `[[users]]
name = "Alice"
email = "alice@example.com"
age = 28

[[users]]
name = "Bob"
email = "bob@example.com"
age = 32`,
}
