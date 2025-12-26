'use client';

import { useState } from 'react';
import { Search, RotateCcw, ChevronLeft, ChevronRight, Globe, Lock, ExternalLink } from 'lucide-react';

export function Browser() {
  const [url, setUrl] = useState('https://google.com');
  const [inputUrl, setInputUrl] = useState(url);

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();
    let targetUrl = inputUrl;
    if (!targetUrl.startsWith('http')) {
      targetUrl = 'https://' + targetUrl;
    }
    setUrl(targetUrl);
    setInputUrl(targetUrl);
  };

  return (
    <div className="flex flex-col h-full bg-white text-black">
      {/* Browser Toolbar */}
      <div className="flex items-center gap-3 p-2 bg-[#f3f3f3] border-b border-gray-300">
        <div className="flex gap-1">
          <button className="p-1.5 hover:bg-black/5 rounded-full transition-colors text-gray-500">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="p-1.5 hover:bg-black/5 rounded-full transition-colors text-gray-500">
            <ChevronRight className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setUrl(url)}
            className="p-1.5 hover:bg-black/5 rounded-full transition-colors text-gray-500"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleNavigate} className="flex-1 flex items-center gap-2 bg-white border border-gray-300 rounded-full px-3 py-1 shadow-sm focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
          <Lock className="w-3 h-3 text-emerald-600" />
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-xs font-sans"
            placeholder="Search or enter address"
          />
          <Search className="w-3 h-3 text-gray-400" />
        </form>

        <button 
           onClick={() => window.parent.postMessage({ type: "OPEN_EXTERNAL_URL", data: { url } }, "*")}
           className="flex items-center gap-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xs font-medium transition-colors shadow-sm"
        >
          <ExternalLink className="w-3 h-3" />
          Open External
        </button>
      </div>

      {/* Browser Content */}
      <div className="flex-1 bg-[#f9f9f9] relative overflow-hidden">
        {/* We can't actually iframe most sites due to CORS/X-Frame-Options, so we show a beautiful preview */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center space-y-6">
           <div className="w-24 h-24 bg-blue-600/10 rounded-3xl flex items-center justify-center shadow-inner">
              <Globe className="w-12 h-12 text-blue-600 animate-pulse" />
           </div>
           <div className="space-y-2 max-w-sm">
              <h2 className="text-xl font-bold text-gray-800">Visiting {new URL(url).hostname}</h2>
              <p className="text-sm text-gray-500">
                For security and privacy, this site is being previewed in restricted mode. Use the button above to view the full content in a new tab.
              </p>
           </div>
           
           <div className="w-full max-w-lg bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden divide-y divide-gray-100">
              <div className="p-4 flex items-center gap-3">
                 <div className="w-10 h-10 bg-gray-100 rounded-full flex-shrink-0" />
                 <div className="flex-1 space-y-2">
                    <div className="h-3 bg-gray-100 rounded w-3/4" />
                    <div className="h-2 bg-gray-50 rounded w-1/2" />
                 </div>
              </div>
              <div className="p-4 space-y-3">
                 <div className="h-2 bg-gray-50 rounded w-full" />
                 <div className="h-2 bg-gray-50 rounded w-5/6" />
                 <div className="h-2 bg-gray-50 rounded w-4/6" />
              </div>
              <div className="p-4 bg-gray-50/50 flex justify-end">
                 <div className="w-20 h-8 bg-blue-600 rounded-lg shadow-sm" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
