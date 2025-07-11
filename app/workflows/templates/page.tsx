"use client";

import { ArrowLeft, Star, Code, Mail, Database, Globe, Users, Play, Settings, Search, Filter } from "lucide-react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function WorkflowTemplatesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const action = searchParams.get("action");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const templates = [
    {
      name: "API Data Sync",
      description: "Sync data between multiple APIs automatically",
      icon: <Code className="size-6 text-blue-400" />,
      category: "Integration",
      triggers: 3,
      actions: 7,
      popular: true,
      complexity: "Medium",
      estimatedTime: "5 mins",
    },
    {
      name: "Email Notifications",
      description: "Send automated alerts and updates",
      icon: <Mail className="size-6 text-yellow-400" />,
      category: "Communication",
      triggers: 2,
      actions: 4,
      popular: false,
      complexity: "Easy",
      estimatedTime: "3 mins",
    },
    {
      name: "Database Backup",
      description: "Automated database backup workflows",
      icon: <Database className="size-6 text-green-400" />,
      category: "Maintenance",
      triggers: 1,
      actions: 3,
      popular: true,
      complexity: "Medium",
      estimatedTime: "4 mins",
    },
    {
      name: "Social Media",
      description: "Cross-platform content publishing",
      icon: <Globe className="size-6 text-purple-400" />,
      category: "Marketing",
      triggers: 2,
      actions: 5,
      popular: false,
      complexity: "Hard",
      estimatedTime: "8 mins",
    },
    {
      name: "Team Notifications",
      description: "Slack and Teams integrations",
      icon: <Users className="size-6 text-cyan-400" />,
      category: "Collaboration",
      triggers: 4,
      actions: 6,
      popular: true,
      complexity: "Easy",
      estimatedTime: "2 mins",
    },
  ];

  const categories = ["All", "Integration", "Communication", "Maintenance", "Marketing", "Collaboration"];

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) || template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleTemplateSelect = (template: any) => {
    const templateSlug = template.name.toLowerCase().replace(/\s+/g, "-");
    router.push(`/workflows/create?template=${templateSlug}`);
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "Easy":
        return "text-green-400";
      case "Medium":
        return "text-yellow-400";
      case "Hard":
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
            <h1 className="text-2xl font-bold text-white">Workflow Templates</h1>
            <p className="text-[rgba(216,231,242,0.7)] text-sm">{action === "create" ? "Choose a template to get started" : "Browse and preview workflow templates"}</p>
          </div>
        </div>

        <button onClick={() => router.push("/workflows/create?type=blank")} className="px-4 py-2 glass-card rounded-xl bg-blue-600/80 hover:bg-blue-700/80 text-white transition flex items-center gap-2">
          <Settings className="size-4" />
          Create from Scratch
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="size-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-[rgba(216,231,242,0.5)]" />
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search templates..." className="w-full pl-10 pr-4 py-3 glass-card rounded-xl text-white placeholder-[rgba(216,231,242,0.5)] border border-[rgba(216,231,242,0.1)] focus:border-blue-500 focus:outline-none" />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button key={category} onClick={() => setSelectedCategory(category)} className={`px-4 py-2 rounded-xl text-sm font-medium transition whitespace-nowrap ${selectedCategory === category ? "bg-blue-600/80 text-white" : "glass-card text-[rgba(216,231,242,0.7)] hover:text-white hover:bg-[rgba(216,231,242,0.05)]"}`}>
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template, index) => (
          <div key={index} onClick={() => handleTemplateSelect(template)} className="glass-card p-6 rounded-2xl hover:bg-[rgba(216,231,242,0.02)] transition-all cursor-pointer group hover:scale-[1.02] border border-[rgba(216,231,242,0.08)]">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {template.icon}
                <div>
                  <h3 className="font-semibold text-white text-lg leading-tight">{template.name}</h3>
                  <span className="text-xs px-2 py-1 bg-[rgba(216,231,242,0.08)] text-[rgba(216,231,242,0.8)] rounded-md font-medium">{template.category}</span>
                </div>
              </div>
              {template.popular && <Star className="size-4 fill-yellow-400 text-yellow-400 flex-shrink-0" />}
            </div>

            <p className="text-[rgba(216,231,242,0.6)] text-sm leading-relaxed mb-4">{template.description}</p>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-4 text-[rgba(216,231,242,0.7)]">
                  <div className="flex items-center gap-1">
                    <div className="size-1 bg-blue-400 rounded-full"></div>
                    <span>{template.triggers}T</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="size-1 bg-green-400 rounded-full"></div>
                    <span>{template.actions}A</span>
                  </div>
                </div>
                <span className={`font-medium ${getComplexityColor(template.complexity)}`}>{template.complexity}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[rgba(216,231,242,0.7)] text-xs">Setup time: {template.estimatedTime}</span>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1 bg-blue-600/80 hover:bg-blue-700/80 text-white text-xs rounded-lg flex items-center gap-1">
                  <Play className="size-3" />
                  Use Template
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-16">
          <Search className="size-16 mx-auto mb-4 opacity-20 text-[rgba(216,231,242,0.5)]" />
          <h3 className="text-xl font-semibold text-white mb-2">No templates found</h3>
          <p className="text-[rgba(216,231,242,0.7)] mb-6">Try adjusting your search or filter criteria</p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("All");
            }}
            className="px-4 py-2 glass-card rounded-xl text-[rgba(216,231,242,0.7)] hover:text-white transition"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-[rgba(216,231,242,0.08)]">
        <div className="glass-card p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-white">{templates.length}</div>
          <div className="text-xs text-[rgba(216,231,242,0.7)]">Total Templates</div>
        </div>
        <div className="glass-card p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-green-400">{templates.filter((t) => t.popular).length}</div>
          <div className="text-xs text-[rgba(216,231,242,0.7)]">Popular</div>
        </div>
        <div className="glass-card p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-blue-400">{categories.length - 1}</div>
          <div className="text-xs text-[rgba(216,231,242,0.7)]">Categories</div>
        </div>
        <div className="glass-card p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-purple-400">3.2</div>
          <div className="text-xs text-[rgba(216,231,242,0.7)]">Avg Rating</div>
        </div>
      </div>
    </div>
  );
}
