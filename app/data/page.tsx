"use client";

import { Database, BarChart3, Upload, Download, Shield, Activity, Plus, Play, Pause, Edit, Clock, CheckCircle, AlertCircle, ArrowRight, FileText, Settings, Search, Filter, Zap, Globe, Server, Cloud, HardDrive, Users, TrendingUp, Eye, RefreshCw, Star, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DataHubPage() {
  const router = useRouter();
  const [showImportModal, setShowImportModal] = useState(false);
  const [showAddSourceModal, setShowAddSourceModal] = useState(false);
  const [operationStates, setOperationStates] = useState<Record<number, string>>({
    1: "completed",
    2: "running",
    3: "completed",
  });

  const dataSources = [
    {
      name: "PostgreSQL DB",
      description: "Primary application database",
      icon: <Database className="size-4 text-blue-400" />,
      type: "Database",
      status: "connected",
      lastSync: "2 minutes ago",
      records: "2.4M",
      popular: true,
      color: "blue",
    },
    {
      name: "Stripe API",
      description: "Payment and subscription data",
      icon: <Globe className="size-4 text-purple-400" />,
      type: "API",
      status: "connected",
      lastSync: "5 minutes ago",
      records: "156K",
      popular: true,
      color: "purple",
    },
    {
      name: "CSV Uploads",
      description: "Bulk data import files",
      icon: <FileText className="size-4 text-green-400" />,
      type: "File",
      status: "syncing",
      lastSync: "1 hour ago",
      records: "89K",
      popular: false,
      color: "green",
    },
    {
      name: "MongoDB",
      description: "Document store for analytics",
      icon: <Server className="size-4 text-orange-400" />,
      type: "Database",
      status: "connected",
      lastSync: "10 minutes ago",
      records: "1.8M",
      popular: false,
      color: "orange",
    },
    {
      name: "S3 Storage",
      description: "Cloud file storage and backups",
      icon: <Cloud className="size-4 text-cyan-400" />,
      type: "Storage",
      status: "connected",
      lastSync: "30 minutes ago",
      records: "45GB",
      popular: true,
      color: "cyan",
    },
  ];

  const recentOperations = [
    {
      id: 1,
      name: "Customer Data Export",
      type: "export",
      status: "completed",
      duration: "2.3s",
      records: "12.5K",
      timestamp: "5 minutes ago",
    },
    {
      id: 2,
      name: "Weekly Analytics Sync",
      type: "sync",
      status: "running",
      duration: "45s",
      records: "890K",
      timestamp: "ongoing",
    },
    {
      id: 3,
      name: "User Segmentation Query",
      type: "query",
      status: "completed",
      duration: "1.2s",
      records: "234K",
      timestamp: "12 minutes ago",
    },
  ];

  const stats = [
    { label: "Total Records", value: "4.2M", change: "+12.3%", icon: <Database className="size-4 text-blue-400" /> },
    { label: "Active Sources", value: "18", change: "+2", icon: <Activity className="size-4 text-green-400" /> },
    { label: "Daily Queries", value: "2.8K", change: "+15.6%", icon: <Search className="size-4 text-purple-400" /> },
    { label: "Storage Used", value: "1.2TB", change: "+8.4%", icon: <HardDrive className="size-4 text-orange-400" /> },
  ];

  const analyticsTools = [
    {
      name: "Query Builder",
      description: "Visual SQL query interface",
      icon: <Search className="size-4 text-blue-400" />,
      category: "Query",
      users: 847,
      popular: true,
      color: "blue",
    },
    {
      name: "Data Visualization",
      description: "Charts and dashboard builder",
      icon: <BarChart3 className="size-4 text-green-400" />,
      category: "Visualization",
      users: 623,
      popular: true,
      color: "green",
    },
    {
      name: "ETL Pipeline",
      description: "Data transformation workflows",
      icon: <Zap className="size-4 text-yellow-400" />,
      category: "Transform",
      users: 312,
      popular: false,
      color: "yellow",
    },
    {
      name: "ML Analytics",
      description: "Machine learning insights",
      icon: <TrendingUp className="size-4 text-purple-400" />,
      category: "AI/ML",
      users: 189,
      popular: false,
      color: "purple",
    },
    {
      name: "Data Monitoring",
      description: "Real-time data quality checks",
      icon: <Eye className="size-4 text-cyan-400" />,
      category: "Monitoring",
      users: 445,
      popular: true,
      color: "cyan",
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: "from-blue-500/20 to-blue-600/10 border-blue-500/20",
      green: "from-green-500/20 to-green-600/10 border-green-500/20",
      yellow: "from-yellow-500/20 to-yellow-600/10 border-yellow-500/20",
      purple: "from-purple-500/20 to-purple-600/10 border-purple-500/20",
      orange: "from-orange-500/20 to-orange-600/10 border-orange-500/20",
      cyan: "from-cyan-500/20 to-cyan-600/10 border-cyan-500/20",
    };
    return colorMap[color as keyof typeof colorMap] || "from-gray-500/20 to-gray-600/10 border-gray-500/20";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-400";
      case "syncing":
        return "bg-yellow-400";
      case "error":
        return "bg-red-400";
      case "running":
        return "bg-blue-400";
      case "completed":
        return "bg-green-400";
      default:
        return "bg-gray-400";
    }
  };

  const getOperationIcon = (type: string) => {
    switch (type) {
      case "export":
        return <Download className="size-3 text-green-400" />;
      case "import":
        return <Upload className="size-3 text-blue-400" />;
      case "sync":
        return <RefreshCw className="size-3 text-purple-400" />;
      case "query":
        return <Search className="size-3 text-cyan-400" />;
      default:
        return <Activity className="size-3 text-gray-400" />;
    }
  };

  const handleOperationToggle = (operationId: number, currentStatus: string) => {
    const newStatus = currentStatus === "running" ? "paused" : "running";
    setOperationStates((prev) => ({
      ...prev,
      [operationId]: newStatus,
    }));
  };

  const handleViewOperation = (operationId: number) => {
    // In a real app, this would navigate to operation details
    console.log("Viewing operation:", operationId);
    alert(`Viewing details for operation ${operationId}`);
  };

  const handleImportData = () => {
    setShowImportModal(true);
  };

  const handleAddSource = () => {
    setShowAddSourceModal(true);
  };

  const handleViewAllOperations = () => {
    router.push("/data/operations");
  };

  const handleManageAllSources = () => {
    router.push("/data/sources");
  };

  const handleToolClick = (toolName: string) => {
    console.log("Opening tool:", toolName);
    // Navigate to specific tool
    switch (toolName) {
      case "Data Visualizer":
        router.push("/data/visualizer");
        break;
      case "Query Builder":
        router.push("/data/query-builder");
        break;
      case "Report Generator":
        router.push("/data/reports");
        break;
      case "Data Transformer":
        router.push("/data/transformer");
        break;
      case "Schema Analyzer":
        router.push("/data/schema");
        break;
      default:
        alert(`Opening ${toolName}...`);
    }
  };

  const handleSourceClick = (sourceName: string) => {
    console.log("Configuring source:", sourceName);
    // Navigate to source configuration
    router.push(`/data/sources/${sourceName.toLowerCase().replace(/\s+/g, "-")}`);
  };

  const handleExploreAllTools = () => {
    router.push("/data/tools");
  };

  const handleFileImport = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    console.log("Importing file:", file.name);

    // Simulate file processing
    setShowImportModal(false);
    alert(`Importing ${file.name}... (${(file.size / 1024).toFixed(1)} KB)`);

    // In a real app, you would upload and process the file here
  };

  const handleAddDataSource = (sourceType: string) => {
    console.log("Adding data source:", sourceType);
    setShowAddSourceModal(false);

    // Navigate to specific source configuration
    switch (sourceType) {
      case "Database":
        router.push("/data/sources/new/database");
        break;
      case "API":
        router.push("/data/sources/new/api");
        break;
      case "File Upload":
        router.push("/data/sources/new/file");
        break;
      case "Cloud Storage":
        router.push("/data/sources/new/cloud");
        break;
      default:
        alert(`Setting up ${sourceType} source...`);
    }
  };

  return (
    <>
      <div className="p-6 space-y-6 h-full custom-scrollbar">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Data Hub</h1>
            <p className="text-[rgba(216,231,242,0.7)] text-sm">Manage, analyze, and visualize your data</p>
          </div>
          <div className="flex gap-2">
            <button onClick={handleImportData} className="glass-card px-4 py-2 rounded-xl font-medium text-white bg-green-600/80 hover:bg-green-700/80 transition shadow-md border-0 flex items-center gap-2">
              <Upload className="size-4" />
              Import Data
            </button>
            <button onClick={handleAddSource} className="glass-card px-4 py-2 rounded-xl font-medium text-white bg-blue-600/80 hover:bg-blue-700/80 transition shadow-md border-0 flex items-center gap-2">
              <Plus className="size-4" />
              Add Source
            </button>
          </div>
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
          {/* Data Sources & Recent Operations */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Operations */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-white">Recent Operations</h2>
                <button onClick={handleViewAllOperations} className="text-[rgba(216,231,242,0.7)] hover:text-white text-sm flex items-center gap-1 transition-colors">
                  View all <ArrowRight className="size-3" />
                </button>
              </div>

              <div className="space-y-3">
                {recentOperations.map((operation) => {
                  const currentStatus = operationStates[operation.id] || operation.status;
                  return (
                    <div key={operation.id} className="glass-card p-4 rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`size-2 rounded-full ${getStatusColor(currentStatus)}`} />
                          <h3 className="font-medium text-white">{operation.name}</h3>
                          {getOperationIcon(operation.type)}
                        </div>
                        <div className="flex gap-1">
                          <button onClick={() => handleOperationToggle(operation.id, currentStatus)} className="p-1.5 hover:bg-[rgba(216,231,242,0.1)] rounded-lg transition" title={currentStatus === "running" ? "Pause" : "Start"}>
                            {currentStatus === "running" ? <Pause className="size-3 text-[rgba(216,231,242,0.7)]" /> : <Play className="size-3 text-[rgba(216,231,242,0.7)]" />}
                          </button>
                          <button onClick={() => handleViewOperation(operation.id)} className="p-1.5 hover:bg-[rgba(216,231,242,0.1)] rounded-lg transition" title="View Details">
                            <Eye className="size-3 text-[rgba(216,231,242,0.7)]" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-xs">
                        <div>
                          <span className="text-[rgba(216,231,242,0.7)]">Duration</span>
                          <p className="text-white font-medium">{operation.duration}</p>
                        </div>
                        <div>
                          <span className="text-[rgba(216,231,242,0.7)]">Records</span>
                          <p className="text-white font-medium">{operation.records}</p>
                        </div>
                        <div>
                          <span className="text-[rgba(216,231,242,0.7)]">Timestamp</span>
                          <p className="text-white font-medium">{operation.timestamp}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Data Sources */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-white">Connected Sources</h2>
                <button onClick={handleManageAllSources} className="text-[rgba(216,231,242,0.7)] hover:text-white text-sm flex items-center gap-1 transition-colors">
                  Manage all <Settings className="size-3" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {dataSources.slice(0, 4).map((source, index) => (
                  <div key={index} onClick={() => handleSourceClick(source.name)} className="glass-card p-4 rounded-xl hover:bg-[rgba(216,231,242,0.02)] transition-all cursor-pointer border border-[rgba(216,231,242,0.08)]">
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${getColorClasses(source.color)} border`}>{source.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="font-medium text-white text-sm leading-tight">{source.name}</h3>
                          <div className="flex items-center gap-1">
                            {source.popular && <Star className="size-3 fill-yellow-400 text-yellow-400" />}
                            <div className={`size-2 rounded-full ${getStatusColor(source.status)}`} />
                          </div>
                        </div>
                        <p className="text-[rgba(216,231,242,0.6)] text-xs leading-relaxed">{source.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3 text-[rgba(216,231,242,0.7)]">
                        <span>{source.records}</span>
                        <span>{source.lastSync}</span>
                      </div>
                      <span className="px-2 py-1 bg-[rgba(216,231,242,0.08)] text-[rgba(216,231,242,0.8)] rounded-md font-medium">{source.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Analytics Tools Sidebar */}
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Analytics Tools</h2>
              <div className="flex items-center gap-1 text-xs text-[rgba(216,231,242,0.6)]">
                <Users className="size-3 text-blue-400" />
                Popular
              </div>
            </div>

            <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar pr-1">
              {analyticsTools.map((tool, index) => (
                <div key={index} onClick={() => handleToolClick(tool.name)} className="glass-card p-4 rounded-xl hover:bg-[rgba(216,231,242,0.02)] transition-all cursor-pointer group hover:scale-[1.02] border border-[rgba(216,231,242,0.08)]">
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${getColorClasses(tool.color)} border`}>{tool.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-medium text-white text-sm leading-tight">{tool.name}</h3>
                        {tool.popular && <Star className="size-3 fill-yellow-400 text-yellow-400 flex-shrink-0 ml-2" />}
                      </div>
                      <p className="text-[rgba(216,231,242,0.6)] text-xs leading-relaxed">{tool.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-[rgba(216,231,242,0.7)]">
                      <div className="flex items-center gap-1">
                        <Users className="size-3 text-blue-400" />
                        <span>{tool.users}</span>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-1 bg-[rgba(216,231,242,0.08)] text-[rgba(216,231,242,0.8)] rounded-md font-medium">{tool.category}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-[rgba(216,231,242,0.08)]">
              <button onClick={handleExploreAllTools} className="w-full glass-card p-3 rounded-xl text-[rgba(216,231,242,0.7)] hover:text-white hover:bg-[rgba(216,231,242,0.02)] transition-all flex items-center justify-center gap-2 text-sm hover:scale-[1.02] border border-[rgba(216,231,242,0.08)]">
                <BarChart3 className="size-3" />
                Explore All Tools
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Import Data Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="glass-card p-6 rounded-2xl max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Import Data</h3>
              <button onClick={() => setShowImportModal(false)} className="p-1 hover:bg-[rgba(216,231,242,0.1)] rounded-lg transition">
                <X className="size-4 text-[rgba(216,231,242,0.7)]" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-[rgba(216,231,242,0.2)] rounded-xl p-6 text-center">
                <Upload className="w-8 h-8 text-[rgba(216,231,242,0.5)] mx-auto mb-2" />
                <p className="text-[rgba(216,231,242,0.7)] text-sm">Drop files here or click to browse</p>
                <input type="file" className="hidden" id="file-upload" onChange={(e) => handleFileImport(e.target.files)} accept=".csv,.json,.xlsx,.sql" />
                <label htmlFor="file-upload" className="mt-2 inline-block px-4 py-2 bg-blue-600/80 hover:bg-blue-700/80 text-white text-sm rounded-lg cursor-pointer transition">
                  Choose File
                </label>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setShowImportModal(false)} className="flex-1 glass-card px-4 py-2 rounded-xl text-[rgba(216,231,242,0.7)] hover:text-white transition">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Source Modal */}
      {showAddSourceModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="glass-card p-6 rounded-2xl max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Add Data Source</h3>
              <button onClick={() => setShowAddSourceModal(false)} className="p-1 hover:bg-[rgba(216,231,242,0.1)] rounded-lg transition">
                <X className="size-4 text-[rgba(216,231,242,0.7)]" />
              </button>
            </div>
            <div className="space-y-3">
              {["Database", "API", "File Upload", "Cloud Storage"].map((type) => (
                <button key={type} onClick={() => handleAddDataSource(type)} className="w-full glass-card p-3 rounded-xl text-left hover:bg-[rgba(216,231,242,0.02)] transition">
                  <span className="text-white font-medium">{type}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
