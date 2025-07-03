export default function IframeTestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Iframe Test Page
        </h1>
        <p className="text-gray-600 mb-4">
          This page is designed to test iframe functionality. If you can see this content
          and interact with the app normally, then iframe embedding is working correctly.
        </p>
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          ✅ Iframe embedding is working!
        </div>
        <div className="mt-4 text-sm text-gray-500">
          You can now embed this app in any iframe without redirect loops.
        </div>
      </div>
    </div>
  );
} 