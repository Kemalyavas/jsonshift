"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { EditorPanel } from "@/components/editor-panel"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowDown, RefreshCw } from "lucide-react"
import {
  type DataFormat,
  convert,
  formatExamples,
} from "@/lib/converters"
import { useMediaQuery } from "@/hooks/use-media-query"

interface DataConverterProps {
  defaultInputFormat?: DataFormat
  defaultOutputFormat?: DataFormat
  title?: string
  description?: string
}

export function DataConverter({
  defaultInputFormat = "json",
  defaultOutputFormat = "yaml",
  title,
  description,
}: DataConverterProps) {
  const [inputValue, setInputValue] = useState("")
  const [outputValue, setOutputValue] = useState("")
  const [inputFormat, setInputFormat] = useState<DataFormat>(defaultInputFormat)
  const [outputFormat, setOutputFormat] = useState<DataFormat>(defaultOutputFormat)
  const [error, setError] = useState<string | undefined>()
  const [isConverting, setIsConverting] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const handleConvert = useCallback(() => {
    setIsConverting(true)
    setError(undefined)

    // Small delay for visual feedback
    setTimeout(() => {
      const result = convert(inputValue, inputFormat, outputFormat)
      if (result.success) {
        setOutputValue(result.output)
        setError(undefined)
      } else {
        setOutputValue("")
        setError(result.error)
      }
      setIsConverting(false)
    }, 150)
  }, [inputValue, inputFormat, outputFormat])

  const handleLoadExample = useCallback(() => {
    setInputValue(formatExamples[inputFormat])
    setError(undefined)
    setOutputValue("")
  }, [inputFormat])

  const handleSwapFormats = useCallback(() => {
    const tempFormat = inputFormat
    setInputFormat(outputFormat)
    setOutputFormat(tempFormat)
    
    if (outputValue) {
      setInputValue(outputValue)
      setOutputValue("")
    }
    setError(undefined)
  }, [inputFormat, outputFormat, outputValue])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Paste your data, select formats, and convert instantly
        </p>
        <Button variant="outline" size="sm" onClick={handleLoadExample}>
          Load Example
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <EditorPanel
          title="Input"
          value={inputValue}
          onChange={setInputValue}
          format={inputFormat}
          onFormatChange={(f) => {
            setInputFormat(f)
            setError(undefined)
          }}
          showDropZone
          showClear
          placeholder="Paste or type your data here, or drag and drop a file..."
          error={error}
        />

        <div className="flex shrink-0 items-center justify-center md:flex-col gap-2">
          <Button
            onClick={handleConvert}
            disabled={!inputValue || isConverting}
            className="gap-2"
          >
            {isConverting ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : isMobile ? (
              <ArrowDown className="h-4 w-4" />
            ) : (
              <ArrowRight className="h-4 w-4" />
            )}
            <span>Convert</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSwapFormats}
            className="h-9 w-9"
            title="Swap formats"
          >
            <RefreshCw className="h-4 w-4" />
            <span className="sr-only">Swap formats</span>
          </Button>
        </div>

        <EditorPanel
          title="Output"
          value={outputValue}
          format={outputFormat}
          onFormatChange={setOutputFormat}
          readOnly
          showCopy
          placeholder="Converted output will appear here..."
        />
      </div>
    </div>
  )
}
