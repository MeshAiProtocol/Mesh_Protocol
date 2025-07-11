"use client";

import { useRouter } from "next/navigation";
import { MessageSquare, Brain, Sparkles, Code, Workflow, Database, Zap, BarChart3, Users, Settings, ArrowRight, Plus, TrendingUp, Activity, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface DashboardContentProps {
  session: any;
}

export function DashboardContent({ session }: DashboardContentProps) {
  const router = useRouter();

  const tools = [
    {
      name: "Workflows",
      description: "Automate processes and boost productivity",
      icon: <Workflow className="size-6 text-green-400" />,
      path: "/workflows",
      category: "Automation",
      popular: true,
      color: "green",
    },
    {
      name: "Data Hub",
      description: "Manage, analyze, and visualize your data",
      icon: <Database className="size-6 text-orange-400" />,
      path: "/data",
      category: "Analytics",
      popular: true,
      color: "orange",
    },
    {
      name: "AI Chat",
      description: "Conversational AI with advanced reasoning capabilities",
      icon: <MessageSquare className="size-6 text-blue-400" />,
      path: "/chat",
      category: "AI Tools",
      popular: true,
      color: "blue",
    },
    {
      name: "API Testing",
      description: "Test and debug APIs with powerful tools",
      icon: <Code className="size-6 text-purple-400" />,
      path: "/api-test",
      category: "Development",
      popular: true,
      color: "purple",
    },
  ];

  const quickStats = [
    { label: "Active Tools", value: "4", icon: <Zap className="size-4 text-blue-400" /> },
    { label: "Total Sessions", value: "127", icon: <Activity className="size-4 text-green-400" /> },
    { label: "This Week", value: "23", icon: <TrendingUp className="size-4 text-purple-400" /> },
    { label: "Uptime", value: "99.9%", icon: <CheckCircle className="size-4 text-emerald-400" /> },
  ];

  const recentActivity = [
    { action: "API Test completed", time: "2 minutes ago", type: "api" },
    { action: "Workflow executed", time: "15 minutes ago", type: "workflow" },
    { action: "Data sync finished", time: "1 hour ago", type: "data" },
    { action: "Chat session started", time: "2 hours ago", type: "chat" },
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: "from-blue-500/20 to-blue-600/10 border-blue-500/20",
      purple: "from-purple-500/20 to-purple-600/10 border-purple-500/20",
      green: "from-green-500/20 to-green-600/10 border-green-500/20",
      orange: "from-orange-500/20 to-orange-600/10 border-orange-500/20",
    };
    return colorMap[color as keyof typeof colorMap] || "from-gray-500/20 to-gray-600/10 border-gray-500/20";
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "chat":
        router.push("/chat");
        break;
      case "api":
        router.push("/api-test");
        break;
      case "workflow":
        router.push("/workflows");
        break;
      case "data":
        router.push("/data");
        break;
      default:
        break;
    }
  };

  return (
    <div className="p-6 space-y-6 h-full custom-scrollbar">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-[rgba(216,231,242,0.7)] text-lg">Welcome to Mesh AI Protocol</p>
        </div>
        <Button onClick={() => handleQuickAction("chat")} className="glass-card px-6 py-3 rounded-xl font-medium text-white bg-blue-600/80 hover:bg-blue-700/80 transition shadow-md border-0 flex items-center gap-2">
          <Plus className="size-4" />
          Quick Start
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <div key={index} className="glass-card p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[rgba(216,231,242,0.7)] text-sm">{stat.label}</span>
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tools & Services */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">Available Tools</h2>
            <Button variant="ghost" className="text-[rgba(216,231,242,0.7)] hover:text-white text-sm flex items-center gap-1">
              View all <ArrowRight className="size-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tools.map((tool, index) => (
              <Card key={index} onClick={() => router.push(tool.path)} className="glass-card p-6 rounded-2xl hover:bg-[rgba(216,231,242,0.02)] transition-all cursor-pointer group hover:scale-[1.02] border border-[rgba(216,231,242,0.08)]">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${getColorClasses(tool.color)} border`}>{tool.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg text-white">{tool.name}</h3>
                      {tool.popular && <span className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-full">Popular</span>}
                    </div>
                    <p className="text-[rgba(216,231,242,0.6)] text-sm leading-relaxed mb-3">{tool.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs px-2 py-1 bg-[rgba(216,231,242,0.1)] text-[rgba(216,231,242,0.8)] rounded">{tool.category}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(tool.path);
                        }}
                        className="text-white hover:bg-[rgba(216,231,242,0.1)] opacity-0 group-hover:opacity-100 transition-all"
                      >
                        Launch <ArrowRight className="size-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="glass-card p-4 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="size-2 bg-green-400 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">{activity.action}</p>
                      <p className="text-[rgba(216,231,242,0.6)] text-xs">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Button onClick={() => handleQuickAction("chat")} className="w-full glass-card p-4 rounded-xl justify-start hover:bg-[rgba(216,231,242,0.02)] transition-all text-white border border-[rgba(216,231,242,0.08)]" variant="ghost">
                <MessageSquare className="size-4 mr-3" />
                Start New Chat
              </Button>
              <Button onClick={() => handleQuickAction("api")} className="w-full glass-card p-4 rounded-xl justify-start hover:bg-[rgba(216,231,242,0.02)] transition-all text-white border border-[rgba(216,231,242,0.08)]" variant="ghost">
                <Code className="size-4 mr-3" />
                Test API
              </Button>
              <Button onClick={() => handleQuickAction("workflow")} className="w-full glass-card p-4 rounded-xl justify-start hover:bg-[rgba(216,231,242,0.02)] transition-all text-white border border-[rgba(216,231,242,0.08)]" variant="ghost">
                <Workflow className="size-4 mr-3" />
                Create Workflow
              </Button>
              <Button onClick={() => handleQuickAction("data")} className="w-full glass-card p-4 rounded-xl justify-start hover:bg-[rgba(216,231,242,0.02)] transition-all text-white border border-[rgba(216,231,242,0.08)]" variant="ghost">
                <Database className="size-4 mr-3" />
                Import Data
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
