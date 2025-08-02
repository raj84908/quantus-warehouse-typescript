"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Upload, FileText, CheckCircle, AlertCircle, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ImportModalProps {
  type: "inventory" | "staff"
}

export function ImportModal({ type }: ImportModalProps) {
  const [open, setOpen] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [importComplete, setImportComplete] = useState(false)
  const [importResults, setImportResults] = useState({
    total: 0,
    successful: 0,
    errors: 0,
    duplicates: 0,
  })
  const [validateData, setValidateData] = useState(true)
  const [skipDuplicates, setSkipDuplicates] = useState(true)

  const getImportConfig = () => {
    switch (type) {
      case "inventory":
        return {
          title: "Import Inventory Items",
          description: "Upload a CSV or Excel file to import inventory items",
          sampleFields: ["SKU", "Product Name", "Category", "Stock", "Min Stock", "Location", "Price"],
          sampleFilename: "inventory_sample.csv",
        }
      case "staff":
        return {
          title: "Import Staff Data",
          description: "Upload employee information from CSV or Excel file",
          sampleFields: ["Employee ID", "Name", "Email", "Department", "Position", "Hire Date"],
          sampleFilename: "staff_sample.csv",
        }
      default:
        return { title: "Import Data", description: "", sampleFields: [], sampleFilename: "" }
    }
  }

  const config = getImportConfig()

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleImport = async () => {
    if (!file) return

    setIsUploading(true)
    setUploadProgress(0)
    setImportComplete(false)

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setIsUploading(false)
          setImportComplete(true)

          // Simulate import results
          const total = Math.floor(Math.random() * 100) + 50
          const errors = Math.floor(Math.random() * 5)
          const duplicates = Math.floor(Math.random() * 10)
          const successful = total - errors - duplicates

          setImportResults({
            total,
            successful,
            errors,
            duplicates,
          })

          return 100
        }
        return prev + 10
      })
    }, 200)

    console.log("Importing file:", {
      file: file.name,
      type,
      validateData,
      skipDuplicates,
    })
  }

  const downloadSample = () => {
    console.log("Downloading sample file:", config.sampleFilename)
    // In a real app, this would trigger a file download
  }

  const resetModal = () => {
    setFile(null)
    setIsUploading(false)
    setUploadProgress(0)
    setImportComplete(false)
    setImportResults({ total: 0, successful: 0, errors: 0, duplicates: 0 })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="border-input bg-transparent">
          <Upload className="h-4 w-4 mr-2" />
          Import
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-card-foreground">{config.title}</DialogTitle>
          <DialogDescription className="text-muted-foreground">{config.description}</DialogDescription>
        </DialogHeader>

        {!importComplete ? (
          <div className="space-y-6">
            {/* Sample File Download */}
            <Card className="bg-muted/50 border-border">
              <CardHeader>
                <CardTitle className="text-sm text-card-foreground">Need a template?</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Download our sample file to see the required format
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-card-foreground">Required fields:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {config.sampleFields.map((field) => (
                        <Badge key={field} variant="outline" className="text-xs border-border">
                          {field}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={downloadSample} className="border-input bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Download Sample
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* File Upload */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-card-foreground">Upload File</Label>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {file ? (
                  <div className="space-y-2">
                    <FileText className="h-12 w-12 mx-auto text-primary" />
                    <p className="font-medium text-card-foreground">{file.name}</p>
                    <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    <Button variant="outline" size="sm" onClick={() => setFile(null)} className="border-input">
                      Remove File
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                    <div>
                      <p className="text-lg font-medium text-card-foreground">
                        Drop your file here, or{" "}
                        <label className="text-primary cursor-pointer hover:underline">
                          browse
                          <input type="file" className="hidden" accept=".csv,.xlsx,.xls" onChange={handleFileChange} />
                        </label>
                      </p>
                      <p className="text-sm text-muted-foreground">Supports CSV and Excel files up to 10MB</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Import Options */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-card-foreground">Import Options</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="validate-data" checked={validateData} onCheckedChange={setValidateData} />
                  <Label htmlFor="validate-data" className="text-card-foreground">
                    Validate data before import
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="skip-duplicates" checked={skipDuplicates} onCheckedChange={setSkipDuplicates} />
                  <Label htmlFor="skip-duplicates" className="text-card-foreground">
                    Skip duplicate entries
                  </Label>
                </div>
              </div>
            </div>

            {/* Upload Progress */}
            {isUploading && (
              <div className="space-y-3">
                <Label className="text-sm font-medium text-card-foreground">Import Progress</Label>
                <Progress value={uploadProgress} className="w-full" />
                <p className="text-sm text-muted-foreground">
                  Processing {file?.name}... {uploadProgress}%
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-card-foreground">Import Complete!</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Your {type} data has been successfully imported
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">{importResults.successful}</p>
                    <p className="text-sm text-muted-foreground">Successful</p>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <p className="text-2xl font-bold text-card-foreground">{importResults.total}</p>
                    <p className="text-sm text-muted-foreground">Total Records</p>
                  </div>
                </div>

                {(importResults.errors > 0 || importResults.duplicates > 0) && (
                  <div className="space-y-2">
                    {importResults.errors > 0 && (
                      <Alert className="border-destructive/50 bg-destructive/10">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription className="text-destructive">
                          {importResults.errors} records failed to import due to validation errors
                        </AlertDescription>
                      </Alert>
                    )}
                    {importResults.duplicates > 0 && (
                      <Alert className="border-orange-500/50 bg-orange-500/10">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription className="text-orange-700 dark:text-orange-400">
                          {importResults.duplicates} duplicate records were skipped
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {!importComplete && (
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)} disabled={isUploading} className="border-input">
              Cancel
            </Button>
            <Button
              onClick={handleImport}
              disabled={!file || isUploading}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isUploading ? "Importing..." : "Import Data"}
            </Button>
          </DialogFooter>
        )}

        {importComplete && (
          <DialogFooter>
            <Button onClick={resetModal} className="bg-primary text-primary-foreground hover:bg-primary/90">
              Import More Data
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
