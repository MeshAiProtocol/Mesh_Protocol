"use client";

import { ArrowLeft, Search, Filter, Play, Pause, Edit, Trash2, MoreVertical, Calendar, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AllWorkflowsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  // Extended list of workflows for demo
  const [workflows, setWorkflows] = useState([
    {
      id: 1,
      name: "Customer Onboarding",
      description: "Automated welcome sequence for new customers",
      status: "running",
      lastRun: "2 minutes ago",
      runs: 247,
      success: 98.4,
      created: "2024-01-15",
      category: "Customer Management",
    },
    {
      id: 2,
      name: "Invoice Processing",
      description: "Automatic invoice generation and payment tracking",
      status: "paused",
      lastRun: "1 hour ago",
      runs: 156,
      success: 100,
      created: "2024-01-12",
      category: "Finance",
    },
    {
      id: 3,
      name: "Lead Scoring",
      description: "AI-powered lead qualification and scoring",
      status: "running",
      lastRun: "5 minutes ago",
      runs: 89,
      success: 95.2,
      created: "2024-01-18",
      category: "Sales",
    },
    {
      id: 4,
      name: "Data Backup",
      description: "Daily database backup and verification",
      status: "running",
      lastRun: "6 hours ago",
      runs: 342,
      success: 99.7,
      created: "2024-01-10",
      category: "Maintenance",
    },
    {
      id: 5,
      name: "Social Media Posts",
      description: "Cross-platform content publishing automation",
      status: "draft",
      lastRun: "Never",
      runs: 0,
      success: 0,
      created: "2024-01-20",
      category: "Marketing",
    },
    {
      id: 6,
      name: "Email Campaign",
      description: "Drip email campaigns for product updates",
      status: "running",
      lastRun: "1 day ago",
      runs: 78,
      success: 94.8,
      created: "2024-01-16",
      category: "Marketing",
    },
    {
      id: 7,
      name: "Inventory Alerts",
      description: "Low stock notifications and reorder automation",
      status: "paused",
      lastRun: "3 hours ago",
      runs: 123,
      success: 97.6,
      created: "2024-01-14",
      category: "Inventory",
    },
    {
      id: 8,
      name: "Support Ticket Routing",
      description: "Automatic ticket assignment based on priority",
      status: "running",
      lastRun: "30 seconds ago",
      runs: 567,
      success: 96.3,
      created: "2024-01-08",
      category: "Support",
    },
  ]);

  const statuses = ["All", "running", "paused", "draft", "error"];
  const sortOptions = ["name", "lastRun", "runs", "success", "created"];

  const filteredWorkflows = workflows
    .filter((workflow) => {
      const matchesSearch = workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) || workflow.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === "All" || workflow.status === selectedStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "lastRun":
          if (a.lastRun === "Never") return 1;
          if (b.lastRun === "Never") return -1;
          return a.lastRun.localeCompare(b.lastRun);
        case "runs":
          return b.runs - a.runs;
        case "success":
          return b.success - a.success;
        case "created":
          return new Date(b.created).getTime() - new Date(a.created).getTime();
        default:
          return 0;
      }
    });

  const handleWorkflowToggle = (workflowId: number, currentStatus: string) => {
    const newStatus = currentStatus === "running" ? "paused" : "running";
    setWorkflows((prev) => prev.map((workflow) => (workflow.id === workflowId ? { ...workflow, status: newStatus } : workflow)));
  };

  const handleDeleteWorkflow = (workflowId: number) => {
    setWorkflows((prev) => prev.filter((workflow) => workflow.id !== workflowId));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "running":
        return <div className="size-2 rounded-full bg-green-400" />;
      case "paused":
        return <div className="size-2 rounded-full bg-yellow-400" />;
      case "draft":
        return <div className="size-2 rounded-full bg-gray-400" />;
      case "error":
        return <div className="size-2 rounded-full bg-red-400" />;
      default:
        return <div className="size-2 rounded-full bg-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "text-green-400";
      case "paused":
        return "text-yellow-400";
      case "draft":
        return "text-gray-400";
      case "error":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
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
            <h1 className="text-2xl font-bold text-white">All Workflows</h1>
            <p className="text-[rgba(216,231,242,0.7)] text-sm">Manage and monitor all your automated workflows</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={() => router.push("/workflows/templates")} className="px-4 py-2 glass-card rounded-xl text-[rgba(216,231,242,0.7)] hover:text-white transition">
            Browse Templates
          </button>
          <button onClick={() => router.push("/workflows/create")} className="px-4 py-2 glass-card rounded-xl bg-blue-600/80 hover:bg-blue-700/80 text-white transition">
            Create Workflow
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="size-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-[rgba(216,231,242,0.5)]" />
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search workflows..." className="w-full pl-10 pr-4 py-3 glass-card rounded-xl text-white placeholder-[rgba(216,231,242,0.5)] border border-[rgba(216,231,242,0.1)] focus:border-blue-500 focus:outline-none" />
        </div>

        <div className="flex gap-2">
          <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="px-4 py-3 glass-card rounded-xl text-white border border-[rgba(216,231,242,0.1)] focus:border-blue-500 focus:outline-none bg-transparent">
            {statuses.map((status) => (
              <option key={status} value={status} className="bg-[#0F1419] text-white">
                {status === "All" ? "All Status" : status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-4 py-3 glass-card rounded-xl text-white border border-[rgba(216,231,242,0.1)] focus:border-blue-500 focus:outline-none bg-transparent">
            {sortOptions.map((option) => (
              <option key={option} value={option} className="bg-[#0F1419] text-white">
                Sort by {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="size-4 text-green-400" />
            <span className="text-xs text-[rgba(216,231,242,0.7)]">Running</span>
          </div>
          <div className="text-xl font-bold text-white">{workflows.filter((w) => w.status === "running").length}</div>
        </div>
        <div className="glass-card p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="size-4 text-yellow-400" />
            <span className="text-xs text-[rgba(216,231,242,0.7)]">Paused</span>
          </div>
          <div className="text-xl font-bold text-white">{workflows.filter((w) => w.status === "paused").length}</div>
        </div>
        <div className="glass-card p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-1">
            <AlertCircle className="size-4 text-gray-400" />
            <span className="text-xs text-[rgba(216,231,242,0.7)]">Draft</span>
          </div>
          <div className="text-xl font-bold text-white">{workflows.filter((w) => w.status === "draft").length}</div>
        </div>
        <div className="glass-card p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-1">
            <Play className="size-4 text-blue-400" />
            <span className="text-xs text-[rgba(216,231,242,0.7)]">Total Runs</span>
          </div>
          <div className="text-xl font-bold text-white">{workflows.reduce((sum, w) => sum + w.runs, 0).toLocaleString()}</div>
        </div>
      </div>

      {/* Workflows List */}
      <div className="space-y-4">
        {filteredWorkflows.map((workflow) => (
          <div key={workflow.id} className="glass-card p-6 rounded-2xl hover:bg-[rgba(216,231,242,0.02)] transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="flex items-center gap-3">
                  {getStatusIcon(workflow.status)}
                  <div>
                    <h3 className="font-semibold text-white text-lg">{workflow.name}</h3>
                    <p className="text-[rgba(216,231,242,0.6)] text-sm">{workflow.description}</p>
                  </div>
                </div>

                <div className="ml-auto grid grid-cols-5 gap-6 text-sm">
                  <div>
                    <span className="text-[rgba(216,231,242,0.7)] block">Status</span>
                    <span className={`font-medium ${getStatusColor(workflow.status)}`}>{workflow.status.charAt(0).toUpperCase() + workflow.status.slice(1)}</span>
                  </div>
                  <div>
                    <span className="text-[rgba(216,231,242,0.7)] block">Last Run</span>
                    <span className="text-white font-medium">{workflow.lastRun}</span>
                  </div>
                  <div>
                    <span className="text-[rgba(216,231,242,0.7)] block">Runs</span>
                    <span className="text-white font-medium">{workflow.runs.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[rgba(216,231,242,0.7)] block">Success Rate</span>
                    <span className="text-white font-medium">{workflow.success}%</span>
                  </div>
                  <div>
                    <span className="text-[rgba(216,231,242,0.7)] block">Category</span>
                    <span className="text-white font-medium">{workflow.category}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 ml-6">
                <button onClick={() => handleWorkflowToggle(workflow.id, workflow.status)} className="p-2 hover:bg-[rgba(216,231,242,0.1)] rounded-lg transition" title={workflow.status === "running" ? "Pause" : "Start"}>
                  {workflow.status === "running" ? <Pause className="size-4 text-[rgba(216,231,242,0.7)]" /> : <Play className="size-4 text-[rgba(216,231,242,0.7)]" />}
                </button>
                <button onClick={() => router.push(`/workflows/${workflow.id}/edit`)} className="p-2 hover:bg-[rgba(216,231,242,0.1)] rounded-lg transition" title="Edit Workflow">
                  <Edit className="size-4 text-[rgba(216,231,242,0.7)]" />
                </button>
                <button onClick={() => handleDeleteWorkflow(workflow.id)} className="p-2 hover:bg-red-500/20 rounded-lg transition" title="Delete Workflow">
                  <Trash2 className="size-4 text-red-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredWorkflows.length === 0 && (
        <div className="text-center py-16">
          <Search className="size-16 mx-auto mb-4 opacity-20 text-[rgba(216,231,242,0.5)]" />
          <h3 className="text-xl font-semibold text-white mb-2">No workflows found</h3>
          <p className="text-[rgba(216,231,242,0.7)] mb-6">Try adjusting your search or filter criteria</p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedStatus("All");
            }}
            className="px-4 py-2 glass-card rounded-xl text-[rgba(216,231,242,0.7)] hover:text-white transition"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
