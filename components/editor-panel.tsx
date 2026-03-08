"use client"

import * as React from "react"
import { useCallback, useRef } from "react"
import { type DataFormat, formatLabels } from "@/lib/converters"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Copy, Trash2, Upload, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface EditorPanelProps {
  title: string
  value: string
  onChange?: (value: string) => void
  format: DataFormat
  onFormatChange: (format: DataFormat) => void
  readOnly?: boolean
  showCopy?: boolean
  showClear?: boolean
  showDropZone?: boolean
  placeholder?: string
  error?: string
}

const formats: DataFormat[] = ["json", "csv", "yaml", "xml", "toml"]

export function EditorPanel({
  title,
  value,
  onChange,
  format,
  onFormatChange,
  readOnly = false,
  showCopy = false,
  showClear = false,
  showDropZone = false,
  placeholder,
  error,
}: EditorPanelProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = React.useState(false)
  const [copied, setCopied] = React.useState(false)

  const handleCopy = useCallback(async () => {
    if (value) {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [value])

  const handleClear = useCallback(() => {
    onChange?.("")
  }, [onChange])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)

      const file = e.dataTransfer.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          const content = event.target?.result as string
          onChange?.(content)
        }
        reader.readAsText(file)
      }
    },
    [onChange]
  )

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          const content = event.target?.result as string
          onChange?.(content)
        }
        reader.readAsText(file)
      }
    },
    [onChange]
  )

  return (
    <div className="flex flex-1 flex-col rounded-lg border border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-border bg-muted/50 px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-foreground">{title}</span>
          <Select value={format} onValueChange={(v) => onFormatChange(v as DataFormat)}>
            <SelectTrigger className="h-8 w-24 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {formats.map((f) => (
                <SelectItem key={f} value={f} className="text-xs">
                  {formatLabels[f]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-1">
          {showDropZone && (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,.csv,.yaml,.yml,.xml,.toml,.txt"
                className="hidden"
                onChange={handleFileSelect}
              />
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-4 w-4" />
                <span className="sr-only">Upload file</span>
              </Button>
            </>
          )}
          {showCopy && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={handleCopy}
              disabled={!value}
            >
              {copied ? (
                <Check className="h-4 w-4 text-accent" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              <span className="sr-only">Copy to clipboard</span>
            </Button>
          )}
          {showClear && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={handleClear}
              disabled={!value}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Clear</span>
            </Button>
          )}
        </div>
      </div>
      <div
        className={cn(
          "relative flex-1",
          isDragging && "ring-2 ring-accent ring-inset"
        )}
        onDragOver={showDropZone ? handleDragOver : undefined}
        onDragLeave={showDropZone ? handleDragLeave : undefined}
        onDrop={showDropZone ? handleDrop : undefined}
      >
        {isDragging && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-accent/10 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-2 text-accent">
              <Upload className="h-8 w-8" />
              <span className="text-sm font-medium">Drop file here</span>
            </div>
          </div>
        )}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          readOnly={readOnly}
          placeholder={placeholder}
          spellCheck={false}
          className={cn(
            "h-full min-h-[300px] w-full resize-none bg-card p-4 font-mono text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none",
            error && "text-destructive"
          )}
        />
      </div>
      {error && (
        <div className="border-t border-destructive/30 bg-destructive/10 px-4 py-2">
          <p className="text-xs text-destructive">{error}</p>
        </div>
      )}
    </div>
  )
}
