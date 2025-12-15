'use client';

import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/build-workflow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to build workflow');
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            🤖 n8n AI Automation Builder
          </h1>
          <p className="text-xl text-gray-300">
            Describe your automation in plain English, and AI will build it for you
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white text-lg font-semibold mb-3">
                What automation do you want to build?
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Example: Every day at 9 AM, fetch trending topics from Twitter, generate an image for each topic using AI, and post them to Instagram"
                className="w-full h-40 px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Building your automation...
                </span>
              ) : (
                '✨ Build Automation'
              )}
            </button>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-500/20 border border-red-500 rounded-lg">
              <p className="text-red-200">❌ {error}</p>
            </div>
          )}

          {result && (
            <div className="mt-8 space-y-4">
              <div className="p-6 bg-green-500/20 border border-green-500 rounded-lg">
                <h3 className="text-xl font-bold text-green-200 mb-2">
                  ✅ Workflow Created Successfully!
                </h3>
                <p className="text-green-100">
                  Workflow ID: <code className="bg-black/30 px-2 py-1 rounded">{result.workflowId}</code>
                </p>
                <p className="text-green-100 mt-2">
                  Name: {result.workflowName}
                </p>
              </div>

              <div className="p-6 bg-white/10 rounded-lg">
                <h4 className="text-lg font-semibold text-white mb-3">Workflow Details:</h4>
                <pre className="bg-black/40 p-4 rounded-lg overflow-x-auto text-sm text-gray-300">
                  {JSON.stringify(result.workflow, null, 2)}
                </pre>
              </div>

              {result.n8nUrl && (
                <a
                  href={result.n8nUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all"
                >
                  🔗 Open in n8n
                </a>
              )}
            </div>
          )}
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">🎨</div>
            <h3 className="text-white font-bold mb-2">Generate Images</h3>
            <p className="text-gray-300 text-sm">Create AI-generated images automatically</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">🎬</div>
            <h3 className="text-white font-bold mb-2">Create Videos</h3>
            <p className="text-gray-300 text-sm">Generate videos from prompts</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">🔗</div>
            <h3 className="text-white font-bold mb-2">Auto API Keys</h3>
            <p className="text-gray-300 text-sm">Automatically finds and uses API credentials</p>
          </div>
        </div>
      </div>
    </main>
  );
}
