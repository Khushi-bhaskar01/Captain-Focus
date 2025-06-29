import React, { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import { MessageSquare, User } from 'lucide-react';

function App() {
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      {/* Animated background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full opacity-20 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-pink-500 rounded-full opacity-10 blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="bg-black/20 backdrop-blur-md border-b border-white/10">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Captain Focus
                  </h1>
                  <p className="text-sm text-purple-300">Your AI Study Companion</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <nav className="bg-black/10 backdrop-blur-md border-b border-white/5">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex justify-center">
              <div className="flex items-center space-x-2 px-6 py-4 rounded-t-lg bg-purple-600/50 text-white border-b-2 border-purple-400">
                <MessageSquare className="w-5 h-5" />
                <span className="font-medium">Chat</span>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-black/20 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
            <ChatInterface 
              isVoiceActive={isVoiceActive}
              setIsVoiceActive={setIsVoiceActive}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;