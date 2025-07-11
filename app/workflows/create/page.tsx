"use client";

import { ArrowLeft, Settings, Play, Save, Plus, Trash2, Clock, Zap, Database, Globe, Mail, Code } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function CreateWorkflowPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const workflowType = searchParams.get("type");
  const templateName = searchParams.get("template");

  const [workflowName, setWorkflowName] = useState("");
  const [workflowDescription, setWorkflowDescription] = useState("");
  const [triggers, setTriggers] = useState<any[]>([]);
  const [actions, setActions] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Set defaults based on type or template
    if (templateName) {
      setWorkflowName(`${templateName.replace(/-/g, " ")} Workflow`);
      setWorkflowDescription(`Automated workflow based on ${templateName.replace(/-/g, " ")} template`);

      // Add template-specific defaults
      switch (templateName) {
        case "api-data-sync":
          setTriggers([{ type: "schedule", interval: "1h" }]);
          setActions([{ type: "api-call", endpoint: "/api/sync" }]);
          break;
        case "email-notifications":
          setTriggers([{ type: "webhook", path: "/notify" }]);
          setActions([{ type: "send-email", template: "notification" }]);
          break;
        default:
          setTriggers([{ type: "manual" }]);
          setActions([{ type: "log", message: "Workflow executed" }]);
      }
    } else if (workflowType === "blank") {
      setWorkflowName("New Workflow");
      setWorkflowDescription("A custom workflow");
    } else if (workflowType === "ai-assisted") {
      setWorkflowName("AI-Generated Workflow");
      setWorkflowDescription("Workflow created with AI assistance");
    }
  }, [templateName, workflowType]);

  const handleSave = async () => {
    if (!workflowName.trim()) return;

    setIsSaving(true);

    // Simulate saving workflow
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const workflowData = {
      name: workflowName,
      description: workflowDescription,
      triggers,
      actions,
      created: new Date().toISOString(),
      status: "draft",
    };

    console.log("Saving workflow:", workflowData);

    // Store in localStorage for demo purposes
    const savedWorkflows = JSON.parse(localStorage.getItem("workflows") || "[]");
    savedWorkflows.push({ id: Date.now(), ...workflowData });
    localStorage.setItem("workflows", JSON.stringify(savedWorkflows));

    setIsSaving(false);

    // Navigate back to workflows page
    router.push("/workflows?created=true");
  };

  const addTrigger = () => {
    setTriggers([...triggers, { type: "manual", name: `Trigger ${triggers.length + 1}` }]);
  };

  const addAction = () => {
    setActions([...actions, { type: "log", name: `Action ${actions.length + 1}` }]);
  };

  const removeTrigger = (index: number) => {
    setTriggers(triggers.filter((_, i) => i !== index));
  };

  const removeAction = (index: number) => {
    setActions(actions.filter((_, i) => i !== index));
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
            <h1 className="text-2xl font-bold text-white">Create Workflow</h1>
            <p className="text-[rgba(216,231,242,0.7)] text-sm">{templateName ? `From template: ${templateName.replace(/-/g, " ")}` : workflowType === "ai-assisted" ? "AI-assisted creation" : workflowType === "blank" ? "Start from scratch" : "New workflow"}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={() => router.push("/workflows")} className="px-4 py-2 glass-card rounded-xl text-[rgba(216,231,242,0.7)] hover:text-white transition">
            Cancel
          </button>
          <button onClick={handleSave} disabled={!workflowName.trim() || isSaving} className="px-4 py-2 glass-card rounded-xl bg-blue-600/80 hover:bg-blue-700/80 text-white transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
            <Save className="size-4" />
            {isSaving ? "Saving..." : "Save Workflow"}
          </button>
        </div>
      </div>

      {/* Workflow Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Basic Settings */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6 rounded-2xl">
            <h2 className="text-lg font-semibold text-white mb-4">Basic Information</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[rgba(216,231,242,0.8)] mb-2">Workflow Name</label>
                <input type="text" value={workflowName} onChange={(e) => setWorkflowName(e.target.value)} className="w-full p-3 glass-card rounded-xl text-white placeholder-[rgba(216,231,242,0.5)] border border-[rgba(216,231,242,0.1)] focus:border-blue-500 focus:outline-none" placeholder="Enter workflow name..." />
              </div>

              <div>
                <label className="block text-sm font-medium text-[rgba(216,231,242,0.8)] mb-2">Description</label>
                <textarea value={workflowDescription} onChange={(e) => setWorkflowDescription(e.target.value)} rows={3} className="w-full p-3 glass-card rounded-xl text-white placeholder-[rgba(216,231,242,0.5)] border border-[rgba(216,231,242,0.1)] focus:border-blue-500 focus:outline-none resize-none" placeholder="Describe what this workflow does..." />
              </div>
            </div>
          </div>

          {/* Triggers */}
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Triggers</h2>
              <button onClick={addTrigger} className="px-3 py-1.5 bg-green-600/80 hover:bg-green-700/80 text-white rounded-lg text-sm flex items-center gap-1 transition">
                <Plus className="size-3" />
                Add Trigger
              </button>
            </div>

            <div className="space-y-3">
              {triggers.map((trigger, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-[rgba(216,231,242,0.05)] rounded-xl border border-[rgba(216,231,242,0.1)]">
                  <div className="flex items-center gap-3">
                    <Clock className="size-4 text-blue-400" />
                    <span className="text-white text-sm">{trigger.type === "schedule" ? `Schedule: ${trigger.interval || "Every hour"}` : trigger.type === "webhook" ? `Webhook: ${trigger.path || "/trigger"}` : "Manual trigger"}</span>
                  </div>
                  <button onClick={() => removeTrigger(index)} className="p-1 hover:bg-red-500/20 rounded text-red-400 transition">
                    <Trash2 className="size-3" />
                  </button>
                </div>
              ))}

              {triggers.length === 0 && (
                <div className="text-center py-8 text-[rgba(216,231,242,0.5)]">
                  <Clock className="size-8 mx-auto mb-2 opacity-50" />
                  <p>No triggers added yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Actions</h2>
              <button onClick={addAction} className="px-3 py-1.5 bg-purple-600/80 hover:bg-purple-700/80 text-white rounded-lg text-sm flex items-center gap-1 transition">
                <Plus className="size-3" />
                Add Action
              </button>
            </div>

            <div className="space-y-3">
              {actions.map((action, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-[rgba(216,231,242,0.05)] rounded-xl border border-[rgba(216,231,242,0.1)]">
                  <div className="flex items-center gap-3">
                    {action.type === "api-call" && <Globe className="size-4 text-green-400" />}
                    {action.type === "send-email" && <Mail className="size-4 text-yellow-400" />}
                    {action.type === "log" && <Code className="size-4 text-cyan-400" />}
                    {!["api-call", "send-email", "log"].includes(action.type) && <Zap className="size-4 text-purple-400" />}

                    <span className="text-white text-sm">{action.type === "api-call" ? `API Call: ${action.endpoint || "/api/action"}` : action.type === "send-email" ? `Send Email: ${action.template || "default template"}` : action.type === "log" ? `Log: ${action.message || "Action executed"}` : `${action.name || "Custom action"}`}</span>
                  </div>
                  <button onClick={() => removeAction(index)} className="p-1 hover:bg-red-500/20 rounded text-red-400 transition">
                    <Trash2 className="size-3" />
                  </button>
                </div>
              ))}

              {actions.length === 0 && (
                <div className="text-center py-8 text-[rgba(216,231,242,0.5)]">
                  <Zap className="size-8 mx-auto mb-2 opacity-50" />
                  <p>No actions added yet</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => {
                  setTriggers([{ type: "schedule", interval: "1h" }]);
                  setActions([{ type: "log", message: "Scheduled task executed" }]);
                }}
                className="w-full p-3 glass-card rounded-xl text-left hover:bg-[rgba(216,231,242,0.02)] transition"
              >
                <div className="flex items-center gap-3">
                  <Clock className="size-4 text-blue-400" />
                  <span className="text-white text-sm">Add Schedule</span>
                </div>
              </button>

              <button
                onClick={() => {
                  setTriggers([{ type: "webhook", path: "/webhook" }]);
                  setActions([{ type: "api-call", endpoint: "/api/process" }]);
                }}
                className="w-full p-3 glass-card rounded-xl text-left hover:bg-[rgba(216,231,242,0.02)] transition"
              >
                <div className="flex items-center gap-3">
                  <Globe className="size-4 text-green-400" />
                  <span className="text-white text-sm">Add API Integration</span>
                </div>
              </button>

              <button
                onClick={() => {
                  setActions([...actions, { type: "send-email", template: "notification" }]);
                }}
                className="w-full p-3 glass-card rounded-xl text-left hover:bg-[rgba(216,231,242,0.02)] transition"
              >
                <div className="flex items-center gap-3">
                  <Mail className="size-4 text-yellow-400" />
                  <span className="text-white text-sm">Add Email Action</span>
                </div>
              </button>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-lg font-semibold text-white mb-4">Workflow Status</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[rgba(216,231,242,0.7)]">Triggers:</span>
                <span className="text-white">{triggers.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[rgba(216,231,242,0.7)]">Actions:</span>
                <span className="text-white">{actions.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[rgba(216,231,242,0.7)]">Status:</span>
                <span className="text-yellow-400">Draft</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
