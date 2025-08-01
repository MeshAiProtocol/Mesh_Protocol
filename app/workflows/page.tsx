"use client";

import { Zap, Workflow, Code, Bell, Plus, Play, Pause, Edit, Clock, CheckCircle, AlertCircle, BarChart3, Calendar, Settings, ArrowRight, GitBranch, Database, Globe, Smartphone, Star, Users, Mail, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WorkflowsPage() {
  const router = useRouter();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [workflowStates, setWorkflowStates] = useState<Record<number, string>>({
    1: "running",
    2: "paused",
    3: "running",
  });

  const workflowTemplates = [
    {
      name: "API Data Sync",
      description: "Sync data between multiple APIs automatically",
      icon: <Code className="size-4 text-blue-400" />,
      category: "Integration",
      triggers: 3,
      actions: 7,
      popular: true,
      color: "blue",
    },
    {
      name: "Email Notifications",
      description: "Send automated alerts and updates",
      icon: <Mail className="size-4 text-yellow-400" />,
      category: "Communication",
      triggers: 2,
      actions: 4,
      popular: false,
      color: "yellow",
    },
    {
      name: "Database Backup",
      description: "Automated database backup workflows",
      icon: <Database className="size-4 text-green-400" />,
      category: "Maintenance",
      triggers: 1,
      actions: 3,
      popular: true,
      color: "green",
    },
    {
      name: "Social Media",
      description: "Cross-platform content publishing",
      icon: <Globe className="size-4 text-purple-400" />,
      category: "Marketing",
      triggers: 2,
      actions: 5,
      popular: false,
      color: "purple",
    },
    {
      name: "Team Notifications",
      description: "Slack and Teams integrations",
      icon: <Users className="size-4 text-cyan-400" />,
      category: "Collaboration",
      triggers: 4,
      actions: 6,
      popular: true,
      color: "cyan",
    },
  ];

  const recentWorkflows = [
    {
      id: 1,
      name: "Customer Onboarding",
      status: "running",
      lastRun: "2 minutes ago",
      runs: 247,
      success: 98.4,
    },
    {
      id: 2,
      name: "Invoice Processing",
      status: "paused",
      lastRun: "1 hour ago",
      runs: 156,
      success: 100,
    },
    {
      id: 3,
      name: "Lead Scoring",
      status: "running",
      lastRun: "5 minutes ago",
      runs: 89,
      success: 95.2,
    },
  ];

  const stats = [
    { label: "Active Workflows", value: "24", change: "+3", icon: <Workflow className="size-4 text-blue-400" /> },
    { label: "Total Runs", value: "12.5K", change: "+8.2%", icon: <Play className="size-4 text-green-400" /> },
    { label: "Success Rate", value: "96.8%", change: "+2.1%", icon: <CheckCircle className="size-4 text-emerald-400" /> },
    { label: "Avg Runtime", value: "2.3s", change: "-0.4s", icon: <Clock className="size-4 text-orange-400" /> },
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: "from-blue-500/20 to-blue-600/10 border-blue-500/20",
      yellow: "from-yellow-500/20 to-yellow-600/10 border-yellow-500/20",
      green: "from-green-500/20 to-green-600/10 border-green-500/20",
      purple: "from-purple-500/20 to-purple-600/10 border-purple-500/20",
      cyan: "from-cyan-500/20 to-cyan-600/10 border-cyan-500/20",
    };
    return colorMap[color as keyof typeof colorMap] || "from-gray-500/20 to-gray-600/10 border-gray-500/20";
  };

  const handleCreateWorkflow = () => {
    setShowCreateModal(true);
  };

  const handleWorkflowToggle = (workflowId: number, currentStatus: string) => {
    const newStatus = currentStatus === "running" ? "paused" : "running";
    setWorkflowStates((prev) => ({
      ...prev,
      [workflowId]: newStatus,
    }));
  };

  const handleEditWorkflow = (workflowId: number) => {
    console.log("Editing workflow:", workflowId);
    // Navigate to workflow editor
    router.push(`/workflows/${workflowId}/edit`);
  };

  const handleTemplateClick = (templateName: string) => {
    console.log("Creating workflow from template:", templateName);
    setShowCreateModal(false);
    // Navigate to workflow builder with template
    const templateSlug = templateName.toLowerCase().replace(/\s+/g, "-");
    router.push(`/workflows/create?template=${templateSlug}`);
  };

  const handleViewAllWorkflows = () => {
    router.push("/workflows/all");
  };

  const handleViewAllTemplates = () => {
    router.push("/workflows/templates");
  };

  const handleCreateWorkflowType = (type: string) => {
    setShowCreateModal(false);

    switch (type) {
      case "From Template":
        router.push("/workflows/templates?action=create");
        break;
      case "Blank Workflow":
        router.push("/workflows/create?type=blank");
        break;
      case "Import from File":
        router.push("/workflows/import");
        break;
      case "AI Assistant":
        router.push("/workflows/create?type=ai-assisted");
        break;
      default:
        console.log("Unknown workflow type:", type);
    }
  };

  return (
    <div className="p-6 space-y-6 h-full custom-scrollbar">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Workflows</h1>
          <p className="text-[rgba(216,231,242,0.7)] text-sm">Automate your processes and boost productivity</p>
        </div>
        <button onClick={handleCreateWorkflow} className="glass-card px-4 py-2 rounded-xl font-medium text-white bg-blue-600/80 hover:bg-blue-700/80 transition shadow-md border-0 flex items-center gap-2">
          <Plus className="size-4" />
          Create Workflow
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="glass-card p-4 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[rgba(216,231,242,0.7)] text-xs">{stat.label}</span>
              {stat.icon}
            </div>
            <div className="flex items-end gap-2">
              <span className="text-xl font-bold text-white">{stat.value}</span>
              <span className="text-green-400 text-xs">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Workflows */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-white">Recent Workflows</h2>
            <button onClick={handleViewAllWorkflows} className="text-[rgba(216,231,242,0.7)] hover:text-white text-sm flex items-center gap-1">
              View all <ArrowRight className="size-3" />
            </button>
          </div>

          <div className="space-y-3">
            {recentWorkflows.map((workflow) => {
              const currentStatus = workflowStates[workflow.id] || workflow.status;
              return (
                <div key={workflow.id} className="glass-card p-4 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`size-2 rounded-full ${currentStatus === "running" ? "bg-green-400" : currentStatus === "paused" ? "bg-yellow-400" : "bg-red-400"}`} />
                      <h3 className="font-medium text-white">{workflow.name}</h3>
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => handleWorkflowToggle(workflow.id, currentStatus)} className="p-1.5 hover:bg-[rgba(216,231,242,0.1)] rounded-lg transition" title={currentStatus === "running" ? "Pause" : "Start"}>
                        {currentStatus === "running" ? <Pause className="size-3 text-[rgba(216,231,242,0.7)]" /> : <Play className="size-3 text-[rgba(216,231,242,0.7)]" />}
                      </button>
                      <button onClick={() => handleEditWorkflow(workflow.id)} className="p-1.5 hover:bg-[rgba(216,231,242,0.1)] rounded-lg transition" title="Edit Workflow">
                        <Edit className="size-3 text-[rgba(216,231,242,0.7)]" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-[rgba(216,231,242,0.7)]">Last Run</span>
                      <p className="text-white font-medium">{workflow.lastRun}</p>
                    </div>
                    <div>
                      <span className="text-[rgba(216,231,242,0.7)]">Runs</span>
                      <p className="text-white font-medium">{workflow.runs}</p>
                    </div>
                    <div>
                      <span className="text-[rgba(216,231,242,0.7)]">Success</span>
                      <p className="text-white font-medium">{workflow.success}%</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Templates Sidebar */}
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Templates</h2>
            <div className="flex items-center gap-1 text-xs text-[rgba(216,231,242,0.6)]">
              <Star className="size-3 fill-yellow-400 text-yellow-400" />
              Popular
            </div>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar pr-1">
            {workflowTemplates.map((template, index) => (
              <div key={index} onClick={() => handleTemplateClick(template.name)} className="glass-card p-4 rounded-xl hover:bg-[rgba(216,231,242,0.02)] transition-all cursor-pointer group hover:scale-[1.02] border border-[rgba(216,231,242,0.08)]">
                <div className="flex items-start gap-3 mb-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${getColorClasses(template.color)} border`}>{template.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-medium text-white text-sm leading-tight">{template.name}</h3>
                      {template.popular && <Star className="size-3 fill-yellow-400 text-yellow-400 flex-shrink-0 ml-2" />}
                    </div>
                    <p className="text-[rgba(216,231,242,0.6)] text-xs leading-relaxed">{template.description}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-[rgba(216,231,242,0.7)]">
                    <div className="flex items-center gap-1">
                      <div className="size-1 bg-blue-400 rounded-full"></div>
                      <span>{template.triggers}T</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="size-1 bg-green-400 rounded-full"></div>
                      <span>{template.actions}A</span>
                    </div>
                  </div>
                  <span className="text-xs px-2 py-1 bg-[rgba(216,231,242,0.08)] text-[rgba(216,231,242,0.8)] rounded-md font-medium">{template.category}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-[rgba(216,231,242,0.08)]">
            <button onClick={handleViewAllTemplates} className="w-full glass-card p-3 rounded-xl text-[rgba(216,231,242,0.7)] hover:text-white hover:bg-[rgba(216,231,242,0.02)] transition-all flex items-center justify-center gap-2 text-sm hover:scale-[1.02] border border-[rgba(216,231,242,0.08)]">
              <Plus className="size-3" />
              Browse All Templates
            </button>
          </div>
        </div>
      </div>

      {/* Create Workflow Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="glass-card p-6 rounded-2xl max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Create New Workflow</h3>
              <button onClick={() => setShowCreateModal(false)} className="p-1 hover:bg-[rgba(216,231,242,0.1)] rounded-lg transition">
                <X className="size-4 text-[rgba(216,231,242,0.7)]" />
              </button>
            </div>
            <div className="space-y-3">
              {["From Template", "Blank Workflow", "Import from File", "AI Assistant"].map((type) => (
                <button key={type} onClick={() => handleCreateWorkflowType(type)} className="w-full glass-card p-3 rounded-xl text-left hover:bg-[rgba(216,231,242,0.02)] transition">
                  <span className="text-white font-medium">{type}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
