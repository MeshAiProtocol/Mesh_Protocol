"use client";

import { ArrowLeft, Save, Play, Trash2, Plus, Settings, Clock, Zap, Database, Globe, Mail, Code } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditWorkflowPage() {
  const router = useRouter();
  const params = useParams();
  const workflowId = params.id as string;

  const [workflowName, setWorkflowName] = useState("");
  const [workflowDescription, setWorkflowDescription] = useState("");
  const [triggers, setTriggers] = useState<any[]>([]);
  const [actions, setActions] = useState<any[]>([]);
  const [workflowStatus, setWorkflowStatus] = useState("draft");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock workflow data based on ID
  const mockWorkflows = {
    "1": {
      name: "Customer Onboarding",
      description: "Automated welcome sequence for new customers",
      status: "running",
      triggers: [
        { type: "webhook", path: "/customer/new", name: "New Customer Webhook" },
        { type: "schedule", interval: "24h", name: "Daily Check" },
      ],
      actions: [
        { type: "send-email", template: "welcome", name: "Send Welcome Email" },
        { type: "api-call", endpoint: "/api/crm/add", name: "Add to CRM" },
        { type: "log", message: "Customer onboarded", name: "Log Event" },
      ],
    },
    "2": {
      name: "Invoice Processing",
      description: "Automatic invoice generation and payment tracking",
      status: "paused",
      triggers: [{ type: "webhook", path: "/invoice/created", name: "Invoice Created" }],
      actions: [
        { type: "api-call", endpoint: "/api/payment/process", name: "Process Payment" },
        { type: "send-email", template: "invoice", name: "Send Invoice Email" },
      ],
    },
    "3": {
      name: "Lead Scoring",
      description: "AI-powered lead qualification and scoring",
      status: "running",
      triggers: [
        { type: "webhook", path: "/lead/updated", name: "Lead Updated" },
        { type: "schedule", interval: "1h", name: "Hourly Scoring" },
      ],
      actions: [
        { type: "api-call", endpoint: "/api/ai/score", name: "AI Scoring" },
        { type: "database", query: "UPDATE leads SET score = ?", name: "Update Score" },
      ],
    },
  };

  useEffect(() => {
    // Load workflow data
    const workflow = mockWorkflows[workflowId as keyof typeof mockWorkflows];
    if (workflow) {
      setWorkflowName(workflow.name);
      setWorkflowDescription(workflow.description);
      setWorkflowStatus(workflow.status);
      setTriggers(workflow.triggers);
      setActions(workflow.actions);
    }
    setIsLoading(false);
  }, [workflowId]);

  const handleSave = async () => {
    if (!workflowName.trim()) return;

    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const workflowData = {
      id: workflowId,
      name: workflowName,
      description: workflowDescription,
      status: workflowStatus,
      triggers,
      actions,
      updated: new Date().toISOString(),
    };

    console.log("Updating workflow:", workflowData);

    // Update localStorage for demo
    const savedWorkflows = JSON.parse(localStorage.getItem("workflows") || "[]");
    const updatedWorkflows = savedWorkflows.map((w: any) => (w.id === parseInt(workflowId) ? { ...w, ...workflowData } : w));
    localStorage.setItem("workflows", JSON.stringify(updatedWorkflows));

    setIsSaving(false);
    router.push("/workflows?updated=true");
  };

  const handleStatusToggle = () => {
    setWorkflowStatus(workflowStatus === "running" ? "paused" : "running");
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

  const updateTrigger = (index: number, field: string, value: any) => {
    setTriggers(triggers.map((trigger, i) => (i === index ? { ...trigger, [field]: value } : trigger)));
  };

  const updateAction = (index: number, field: string, value: any) => {
    setActions(actions.map((action, i) => (i === index ? { ...action, [field]: value } : action)));
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6 h-full custom-scrollbar">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-400 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 h-full custom-scrollbar">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-[rgba(216,231,242,0.1)] rounded-lg transition">
            <ArrowLeft className="size-5 text-[rgba(216,231,242,0.7)]" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">Edit Workflow</h1>
            <p className="text-[rgba(216,231,242,0.7)] text-sm">Modify workflow configuration and behavior</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={handleStatusToggle} className={`px-4 py-2 glass-card rounded-xl transition flex items-center gap-2 ${workflowStatus === "running" ? "bg-yellow-600/80 hover:bg-yellow-700/80 text-white" : "bg-green-600/80 hover:bg-green-700/80 text-white"}`}>
            {workflowStatus === "running" ? (
              <>
                <Settings className="size-4" />
                Pause Workflow
              </>
            ) : (
              <>
                <Play className="size-4" />
                Start Workflow
              </>
            )}
          </button>
          <button onClick={() => router.push("/workflows")} className="px-4 py-2 glass-card rounded-xl text-[rgba(216,231,242,0.7)] hover:text-white transition">
            Cancel
          </button>
          <button onClick={handleSave} disabled={!workflowName.trim() || isSaving} className="px-4 py-2 glass-card rounded-xl bg-blue-600/80 hover:bg-blue-700/80 text-white transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
            <Save className="size-4" />
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Status Badge */}
      <div className="flex items-center gap-3">
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${workflowStatus === "running" ? "bg-green-500/20 text-green-400" : workflowStatus === "paused" ? "bg-yellow-500/20 text-yellow-400" : "bg-gray-500/20 text-gray-400"}`}>
          <div className={`size-2 rounded-full ${workflowStatus === "running" ? "bg-green-400" : workflowStatus === "paused" ? "bg-yellow-400" : "bg-gray-400"}`} />
          {workflowStatus.charAt(0).toUpperCase() + workflowStatus.slice(1)}
        </div>
        <span className="text-[rgba(216,231,242,0.5)] text-sm">Workflow ID: {workflowId}</span>
      </div>

      {/* Configuration */}
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
                <div key={index} className="p-4 bg-[rgba(216,231,242,0.05)] rounded-xl border border-[rgba(216,231,242,0.1)]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Clock className="size-4 text-blue-400" />
                      <input type="text" value={trigger.name || ""} onChange={(e) => updateTrigger(index, "name", e.target.value)} className="bg-transparent text-white text-sm border-none outline-none" placeholder="Trigger name" />
                    </div>
                    <button onClick={() => removeTrigger(index)} className="p-1 hover:bg-red-500/20 rounded text-red-400 transition">
                      <Trash2 className="size-3" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <select value={trigger.type} onChange={(e) => updateTrigger(index, "type", e.target.value)} className="p-2 glass-card rounded text-white text-sm border border-[rgba(216,231,242,0.1)] bg-transparent">
                      <option value="manual" className="bg-[#0F1419]">
                        Manual
                      </option>
                      <option value="schedule" className="bg-[#0F1419]">
                        Schedule
                      </option>
                      <option value="webhook" className="bg-[#0F1419]">
                        Webhook
                      </option>
                      <option value="event" className="bg-[#0F1419]">
                        Event
                      </option>
                    </select>

                    {trigger.type === "schedule" && <input type="text" value={trigger.interval || ""} onChange={(e) => updateTrigger(index, "interval", e.target.value)} placeholder="e.g., 1h, 30m, daily" className="p-2 glass-card rounded text-white text-sm border border-[rgba(216,231,242,0.1)] bg-transparent" />}

                    {trigger.type === "webhook" && <input type="text" value={trigger.path || ""} onChange={(e) => updateTrigger(index, "path", e.target.value)} placeholder="/webhook/path" className="p-2 glass-card rounded text-white text-sm border border-[rgba(216,231,242,0.1)] bg-transparent" />}
                  </div>
                </div>
              ))}

              {triggers.length === 0 && (
                <div className="text-center py-8 text-[rgba(216,231,242,0.5)]">
                  <Clock className="size-8 mx-auto mb-2 opacity-50" />
                  <p>No triggers configured</p>
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
                <div key={index} className="p-4 bg-[rgba(216,231,242,0.05)] rounded-xl border border-[rgba(216,231,242,0.1)]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {action.type === "api-call" && <Globe className="size-4 text-green-400" />}
                      {action.type === "send-email" && <Mail className="size-4 text-yellow-400" />}
                      {action.type === "log" && <Code className="size-4 text-cyan-400" />}
                      {action.type === "database" && <Database className="size-4 text-purple-400" />}
                      {!["api-call", "send-email", "log", "database"].includes(action.type) && <Zap className="size-4 text-purple-400" />}

                      <input type="text" value={action.name || ""} onChange={(e) => updateAction(index, "name", e.target.value)} className="bg-transparent text-white text-sm border-none outline-none" placeholder="Action name" />
                    </div>
                    <button onClick={() => removeAction(index)} className="p-1 hover:bg-red-500/20 rounded text-red-400 transition">
                      <Trash2 className="size-3" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <select value={action.type} onChange={(e) => updateAction(index, "type", e.target.value)} className="p-2 glass-card rounded text-white text-sm border border-[rgba(216,231,242,0.1)] bg-transparent">
                      <option value="log" className="bg-[#0F1419]">
                        Log
                      </option>
                      <option value="api-call" className="bg-[#0F1419]">
                        API Call
                      </option>
                      <option value="send-email" className="bg-[#0F1419]">
                        Send Email
                      </option>
                      <option value="database" className="bg-[#0F1419]">
                        Database
                      </option>
                      <option value="webhook" className="bg-[#0F1419]">
                        Webhook
                      </option>
                    </select>

                    {action.type === "api-call" && <input type="text" value={action.endpoint || ""} onChange={(e) => updateAction(index, "endpoint", e.target.value)} placeholder="/api/endpoint" className="p-2 glass-card rounded text-white text-sm border border-[rgba(216,231,242,0.1)] bg-transparent" />}

                    {action.type === "send-email" && <input type="text" value={action.template || ""} onChange={(e) => updateAction(index, "template", e.target.value)} placeholder="email template" className="p-2 glass-card rounded text-white text-sm border border-[rgba(216,231,242,0.1)] bg-transparent" />}

                    {action.type === "log" && <input type="text" value={action.message || ""} onChange={(e) => updateAction(index, "message", e.target.value)} placeholder="log message" className="p-2 glass-card rounded text-white text-sm border border-[rgba(216,231,242,0.1)] bg-transparent" />}

                    {action.type === "database" && <input type="text" value={action.query || ""} onChange={(e) => updateAction(index, "query", e.target.value)} placeholder="SQL query" className="p-2 glass-card rounded text-white text-sm border border-[rgba(216,231,242,0.1)] bg-transparent" />}
                  </div>
                </div>
              ))}

              {actions.length === 0 && (
                <div className="text-center py-8 text-[rgba(216,231,242,0.5)]">
                  <Zap className="size-8 mx-auto mb-2 opacity-50" />
                  <p>No actions configured</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Workflow Info Sidebar */}
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-lg font-semibold text-white mb-4">Workflow Stats</h3>
            <div className="space-y-4">
              <div>
                <span className="text-[rgba(216,231,242,0.7)] text-sm">Total Runs</span>
                <div className="text-xl font-bold text-white">247</div>
              </div>
              <div>
                <span className="text-[rgba(216,231,242,0.7)] text-sm">Success Rate</span>
                <div className="text-xl font-bold text-green-400">98.4%</div>
              </div>
              <div>
                <span className="text-[rgba(216,231,242,0.7)] text-sm">Last Run</span>
                <div className="text-white font-medium">2 minutes ago</div>
              </div>
              <div>
                <span className="text-[rgba(216,231,242,0.7)] text-sm">Avg Runtime</span>
                <div className="text-white font-medium">2.3s</div>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full p-3 glass-card rounded-xl text-left hover:bg-[rgba(216,231,242,0.02)] transition">
                <div className="flex items-center gap-3">
                  <Play className="size-4 text-green-400" />
                  <span className="text-white">Test Run</span>
                </div>
              </button>
              <button className="w-full p-3 glass-card rounded-xl text-left hover:bg-[rgba(216,231,242,0.02)] transition">
                <div className="flex items-center gap-3">
                  <Code className="size-4 text-blue-400" />
                  <span className="text-white">View Logs</span>
                </div>
              </button>
              <button className="w-full p-3 glass-card rounded-xl text-left hover:bg-[rgba(216,231,242,0.02)] transition">
                <div className="flex items-center gap-3">
                  <Settings className="size-4 text-purple-400" />
                  <span className="text-white">Advanced Settings</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
