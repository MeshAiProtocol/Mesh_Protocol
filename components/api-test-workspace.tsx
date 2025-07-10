'use client';

import { useState } from 'react';
import { WorkspacePanel, MultiPanelWorkspace, ResizablePanel, ResizableHandle } from '@/components/workspace-panel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Code, 
  Send, 
  Plus, 
  Trash2, 
  Copy, 
  Save,
  FolderOpen,
  Settings,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Globe,
  Database,
  Key
} from 'lucide-react';
import type { Session } from 'next-auth';

interface ApiRequest {
  id: string;
  name: string;
  method: string;
  url: string;
  headers: Record<string, string>;
  body: string;
  timestamp?: number;
}

interface ApiResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: string;
  duration: number;
  size: number;
}

export function ApiTestWorkspace({ session }: { session: Session }) {
  const [currentRequest, setCurrentRequest] = useState<ApiRequest>({
    id: '1',
    name: 'New Request',
    method: 'GET',
    url: 'https://api.example.com/users',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer your-token-here'
    },
    body: ''
  });

  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [savedRequests, setSavedRequests] = useState<ApiRequest[]>([
    {
      id: '1',
      name: 'Get Users',
      method: 'GET',
      url: 'https://api.example.com/users',
      headers: {},
      body: '',
      timestamp: Date.now() - 3600000
    },
    {
      id: '2', 
      name: 'Create User',
      method: 'POST',
      url: 'https://api.example.com/users',
      headers: { 'Content-Type': 'application/json' },
      body: '{\n  "name": "John Doe",\n  "email": "john@example.com"\n}',
      timestamp: Date.now() - 7200000
    }
  ]);

  const [environments, setEnvironments] = useState([
    { name: 'Development', baseUrl: 'https://api-dev.example.com' },
    { name: 'Production', baseUrl: 'https://api.example.com' }
  ]);

  const handleSendRequest = async () => {
    setIsLoading(true);
    const startTime = Date.now();
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
      
      const mockResponse: ApiResponse = {
        status: 200,
        statusText: 'OK',
        headers: {
          'content-type': 'application/json',
          'content-length': '1234',
          'server': 'nginx/1.18.0'
        },
        body: JSON.stringify({
          users: [
            { id: 1, name: 'John Doe', email: 'john@example.com' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
          ],
          total: 2,
          page: 1
        }, null, 2),
        duration: Date.now() - startTime,
        size: 1234
      };
      
      setResponse(mockResponse);
    } catch (error) {
      const mockErrorResponse: ApiResponse = {
        status: 500,
        statusText: 'Internal Server Error',
        headers: {},
        body: JSON.stringify({ error: 'Something went wrong' }, null, 2),
        duration: Date.now() - startTime,
        size: 45
      };
      setResponse(mockErrorResponse);
    } finally {
      setIsLoading(false);
    }
  };

  const updateHeader = (key: string, value: string) => {
    setCurrentRequest(prev => ({
      ...prev,
      headers: { ...prev.headers, [key]: value }
    }));
  };

  const removeHeader = (key: string) => {
    setCurrentRequest(prev => {
      const newHeaders = { ...prev.headers };
      delete newHeaders[key];
      return { ...prev, headers: newHeaders };
    });
  };

  const getStatusIcon = (status: number) => {
    if (status >= 200 && status < 300) return <CheckCircle className="size-4 text-green-500" />;
    if (status >= 400 && status < 500) return <AlertCircle className="size-4 text-yellow-500" />;
    if (status >= 500) return <XCircle className="size-4 text-red-500" />;
    return <Globe className="size-4 text-blue-500" />;
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'text-green-600 bg-green-50 border-green-200';
    if (status >= 400 && status < 500) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    if (status >= 500) return 'text-red-600 bg-red-50 border-red-200';
    return 'text-blue-600 bg-blue-50 border-blue-200';
  };

  return (
    <MultiPanelWorkspace orientation="horizontal">
      {/* Left Panel - Request Builder */}
      <ResizablePanel defaultSize={40} minSize={30}>
        <WorkspacePanel
          title="Request Builder"
          subtitle="Configure and send HTTP requests"
          icon={<Code className="size-4" />}
          headerActions={
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Save className="size-4 mr-2" />
                Save
              </Button>
              <Button 
                onClick={handleSendRequest}
                disabled={isLoading}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send className="size-4 mr-2" />
                {isLoading ? 'Sending...' : 'Send'}
              </Button>
            </div>
          }
        >
          <div className="p-4 space-y-6">
            {/* Method and URL */}
            <div className="space-y-3">
              <div className="flex gap-2">
                <Select 
                  value={currentRequest.method} 
                  onValueChange={(value) => setCurrentRequest(prev => ({ ...prev, method: value }))}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GET">GET</SelectItem>
                    <SelectItem value="POST">POST</SelectItem>
                    <SelectItem value="PUT">PUT</SelectItem>
                    <SelectItem value="PATCH">PATCH</SelectItem>
                    <SelectItem value="DELETE">DELETE</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Enter request URL..."
                  value={currentRequest.url}
                  onChange={(e) => setCurrentRequest(prev => ({ ...prev, url: e.target.value }))}
                  className="flex-1"
                />
              </div>
            </div>

            <Tabs defaultValue="headers" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="headers">Headers</TabsTrigger>
                <TabsTrigger value="body">Body</TabsTrigger>
                <TabsTrigger value="auth">Auth</TabsTrigger>
              </TabsList>

              <TabsContent value="headers" className="space-y-3">
                <div className="space-y-2">
                  {Object.entries(currentRequest.headers).map(([key, value]) => (
                    <div key={key} className="flex gap-2">
                      <Input
                        placeholder="Header name"
                        value={key}
                        onChange={(e) => {
                          const newKey = e.target.value;
                          removeHeader(key);
                          updateHeader(newKey, value);
                        }}
                        className="flex-1"
                      />
                      <Input
                        placeholder="Header value"
                        value={value}
                        onChange={(e) => updateHeader(key, e.target.value)}
                        className="flex-1"
                      />
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => removeHeader(key)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  ))}
                  <Button 
                    variant="outline" 
                    onClick={() => updateHeader('', '')}
                    className="w-full"
                  >
                    <Plus className="size-4 mr-2" />
                    Add Header
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="body">
                <div className="space-y-3">
                  <Label>Request Body (JSON)</Label>
                  <Textarea
                    placeholder="Enter request body..."
                    value={currentRequest.body}
                    onChange={(e) => setCurrentRequest(prev => ({ ...prev, body: e.target.value }))}
                    className="min-h-48 font-mono text-sm"
                  />
                </div>
              </TabsContent>

              <TabsContent value="auth">
                <div className="space-y-4">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select auth type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bearer">Bearer Token</SelectItem>
                      <SelectItem value="basic">Basic Auth</SelectItem>
                      <SelectItem value="api-key">API Key</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="space-y-2">
                    <Label>Token</Label>
                    <Input placeholder="Enter your token..." />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </WorkspacePanel>
      </ResizablePanel>

      <ResizableHandle withHandle />

      {/* Center Panel - Response Viewer */}
      <ResizablePanel defaultSize={35} minSize={25}>
        <WorkspacePanel
          title="Response"
          subtitle={response ? `${response.status} ${response.statusText}` : 'No response yet'}
          icon={response ? getStatusIcon(response.status) : <Database className="size-4" />}
          headerActions={
            response && (
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={getStatusColor(response.status)}>
                  {response.status}
                </Badge>
                <Badge variant="outline">
                  <Clock className="size-3 mr-1" />
                  {response.duration}ms
                </Badge>
                <Button variant="outline" size="sm">
                  <Copy className="size-4 mr-2" />
                  Copy
                </Button>
              </div>
            )
          }
        >
          <div className="p-4 h-full">
            {!response ? (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <div className="text-center">
                  <Database className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Send a request to see the response</p>
                </div>
              </div>
            ) : (
              <Tabs defaultValue="body" className="h-full flex flex-col">
                <TabsList>
                  <TabsTrigger value="body">Response Body</TabsTrigger>
                  <TabsTrigger value="headers">Headers</TabsTrigger>
                  <TabsTrigger value="info">Info</TabsTrigger>
                </TabsList>

                <TabsContent value="body" className="flex-1">
                  <Textarea
                    value={response.body}
                    readOnly
                    className="h-full font-mono text-sm resize-none"
                  />
                </TabsContent>

                <TabsContent value="headers" className="flex-1">
                  <div className="space-y-2">
                    {Object.entries(response.headers).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-1 border-b">
                        <span className="font-medium text-sm">{key}</span>
                        <span className="text-sm text-muted-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="info">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Status</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(response.status)}
                          <span className="font-mono">{response.status} {response.statusText}</span>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Duration</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2">
                          <Clock className="size-4" />
                          <span className="font-mono">{response.duration}ms</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </WorkspacePanel>
      </ResizablePanel>

      <ResizableHandle withHandle />

      {/* Right Panel - Collections & History */}
      <ResizablePanel defaultSize={25} minSize={20}>
        <WorkspacePanel
          title="Collections"
          subtitle="Manage saved requests"
          icon={<FolderOpen className="size-4" />}
          headerActions={
            <Button variant="outline" size="sm">
              <Plus className="size-4 mr-2" />
              New
            </Button>
          }
        >
          <div className="p-4">
            <Tabs defaultValue="saved" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="saved">Saved</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

              <TabsContent value="saved" className="space-y-3">
                {savedRequests.map((request) => (
                  <Card 
                    key={request.id} 
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => setCurrentRequest(request)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{request.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {request.method}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {request.url}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="history" className="space-y-3">
                <div className="text-sm text-muted-foreground text-center py-8">
                  <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  Request history will appear here
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </WorkspacePanel>
      </ResizablePanel>
    </MultiPanelWorkspace>
  );
} 