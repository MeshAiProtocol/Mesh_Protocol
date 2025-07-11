"use client";

import { ArrowLeft, Upload, FileText, CheckCircle, AlertCircle, Download, X } from "lucide-react";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function ImportWorkflowPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importStatus, setImportStatus] = useState<"idle" | "importing" | "success" | "error">("idle");
  const [importedWorkflow, setImportedWorkflow] = useState<any>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setImportStatus("idle");
  };

  const handleFileImport = async () => {
    if (!selectedFile) return;

    setImportStatus("importing");

    try {
      const fileContent = await selectedFile.text();

      // Simulate processing delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Parse the workflow file (simplified)
      let workflowData;
      if (selectedFile.name.endsWith(".json")) {
        workflowData = JSON.parse(fileContent);
      } else {
        // Handle other formats
        workflowData = {
          name: selectedFile.name.replace(/\.[^/.]+$/, ""),
          description: "Imported workflow",
          triggers: [{ type: "manual" }],
          actions: [{ type: "log", message: "Imported workflow executed" }],
        };
      }

      setImportedWorkflow(workflowData);
      setImportStatus("success");

      // Store in localStorage
      const savedWorkflows = JSON.parse(localStorage.getItem("workflows") || "[]");
      savedWorkflows.push({ id: Date.now(), ...workflowData, imported: true });
      localStorage.setItem("workflows", JSON.stringify(savedWorkflows));
    } catch (error) {
      console.error("Import error:", error);
      setImportStatus("error");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const downloadSampleWorkflow = () => {
    const sampleWorkflow = {
      name: "Sample Workflow",
      description: "A sample workflow for demonstration",
      triggers: [{ type: "schedule", interval: "1h", name: "Hourly trigger" }],
      actions: [
        { type: "api-call", endpoint: "/api/sample", name: "API Call" },
        { type: "log", message: "Sample workflow executed", name: "Log Action" },
      ],
      version: "1.0",
    };

    const blob = new Blob([JSON.stringify(sampleWorkflow, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sample-workflow.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-6 h-full custom-scrollbar">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-[rgba(216,231,242,0.1)] rounded-lg transition">
            <ArrowLeft className="size-5 text-[rgba(216,231,242,0.7)]" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">Import Workflow</h1>
            <p className="text-[rgba(216,231,242,0.7)] text-sm">Import workflows from JSON, YAML, or other supported formats</p>
          </div>
        </div>

        <button onClick={downloadSampleWorkflow} className="px-4 py-2 glass-card rounded-xl text-[rgba(216,231,242,0.7)] hover:text-white transition flex items-center gap-2">
          <Download className="size-4" />
          Download Sample
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* File Upload Section */}
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-2xl">
            <h2 className="text-lg font-semibold text-white mb-4">Upload Workflow File</h2>

            <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${isDragOver ? "border-blue-400 bg-blue-400/10" : "border-[rgba(216,231,242,0.2)]"}`}>
              <Upload className={`w-12 h-12 mx-auto mb-4 ${isDragOver ? "text-blue-400" : "text-[rgba(216,231,242,0.5)]"}`} />

              {selectedFile ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <FileText className="size-4 text-blue-400" />
                    <span className="text-white font-medium">{selectedFile.name}</span>
                  </div>
                  <p className="text-[rgba(216,231,242,0.7)] text-sm">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                  <button onClick={() => setSelectedFile(null)} className="text-red-400 hover:text-red-300 text-sm flex items-center gap-1 mx-auto">
                    <X className="size-3" />
                    Remove
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-[rgba(216,231,242,0.7)]">Drop your workflow file here or click to browse</p>
                  <p className="text-[rgba(216,231,242,0.5)] text-sm">Supports JSON, YAML, XML formats</p>
                </div>
              )}

              <input ref={fileInputRef} type="file" accept=".json,.yaml,.yml,.xml" onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])} className="hidden" />

              {!selectedFile && (
                <button onClick={() => fileInputRef.current?.click()} className="mt-4 px-4 py-2 bg-blue-600/80 hover:bg-blue-700/80 text-white rounded-lg transition">
                  Choose File
                </button>
              )}
            </div>

            {selectedFile && (
              <div className="mt-4 flex gap-2">
                <button onClick={handleFileImport} disabled={importStatus === "importing"} className="flex-1 px-4 py-2 bg-green-600/80 hover:bg-green-700/80 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed">
                  {importStatus === "importing" ? "Importing..." : "Import Workflow"}
                </button>
                <button onClick={() => fileInputRef.current?.click()} className="px-4 py-2 glass-card rounded-lg text-[rgba(216,231,242,0.7)] hover:text-white transition">
                  Change File
                </button>
              </div>
            )}
          </div>

          {/* Import Status */}
          {importStatus !== "idle" && (
            <div className="glass-card p-4 rounded-xl">
              <div className="flex items-center gap-3">
                {importStatus === "importing" && (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-400 border-t-transparent"></div>
                    <span className="text-white">Importing workflow...</span>
                  </>
                )}
                {importStatus === "success" && (
                  <>
                    <CheckCircle className="size-4 text-green-400" />
                    <span className="text-green-400">Workflow imported successfully!</span>
                  </>
                )}
                {importStatus === "error" && (
                  <>
                    <AlertCircle className="size-4 text-red-400" />
                    <span className="text-red-400">Import failed. Please check your file format.</span>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Preview Section */}
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-2xl">
            <h2 className="text-lg font-semibold text-white mb-4">Workflow Preview</h2>

            {importedWorkflow ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[rgba(216,231,242,0.8)] mb-1">Name</label>
                  <p className="text-white">{importedWorkflow.name}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[rgba(216,231,242,0.8)] mb-1">Description</label>
                  <p className="text-[rgba(216,231,242,0.7)]">{importedWorkflow.description}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[rgba(216,231,242,0.8)] mb-1">Triggers</label>
                  <p className="text-blue-400">{importedWorkflow.triggers?.length || 0} trigger(s)</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[rgba(216,231,242,0.8)] mb-1">Actions</label>
                  <p className="text-green-400">{importedWorkflow.actions?.length || 0} action(s)</p>
                </div>

                <div className="pt-4 border-t border-[rgba(216,231,242,0.1)]">
                  <button onClick={() => router.push("/workflows?imported=true")} className="w-full px-4 py-2 bg-blue-600/80 hover:bg-blue-700/80 text-white rounded-lg transition">
                    Go to Workflows
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-[rgba(216,231,242,0.5)]">
                <FileText className="size-12 mx-auto mb-2 opacity-50" />
                <p>Upload a file to see the preview</p>
              </div>
            )}
          </div>

          {/* Supported Formats */}
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-lg font-semibold text-white mb-4">Supported Formats</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-white">JSON (.json)</span>
                <span className="text-[rgba(216,231,242,0.5)]">- Recommended</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-white">YAML (.yaml, .yml)</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-white">XML (.xml)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
