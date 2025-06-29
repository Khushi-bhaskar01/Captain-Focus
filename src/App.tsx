import { useState, useEffect } from 'react';
import AboutSection from './components/AboutSection';
import { Gamepad2, Zap, Shield, Crown } from 'lucide-react';


function App() {
  const [widgetLoaded, setWidgetLoaded] = useState(false);

  // Check if Omnidimension widget is loaded
  useEffect(() => {
    const checkWidget = () => {
      const widgetScript = document.getElementById('omnidimension-web-widget');
      if (widgetScript) {
        setWidgetLoaded(true);
        console.log('✅ Omnidimension widget loaded successfully');
      }
    };

    checkWidget();
    const interval = setInterval(checkWidget, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Gaming Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Floating Gaming Elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-cyan-400 rounded-full animate-ping opacity-60"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-purple-400 rounded-full animate-pulse opacity-70"></div>
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-green-400 rounded-full animate-bounce opacity-80"></div>
        <div className="absolute top-1/3 right-1/3 w-5 h-5 bg-yellow-400 rounded-full animate-pulse opacity-50"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Glowing Orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10">
        {/* Gaming Header */}
        <header className="bg-black/40 backdrop-blur-xl border-b border-purple-500/30 shadow-2xl">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                    <Gamepad2 className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent font-poppins">
                    CAPTAIN FOCUS
                  </h1>
                  <div className="flex items-center space-x-3">
                    <p className="text-lg text-purple-300 font-inter font-medium">Elite AI Study Companion</p>
                    {widgetLoaded && (
                      <div className="flex items-center space-x-2 px-3 py-1 bg-green-500/20 border border-green-400/30 rounded-full">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-green-300 font-bold">ONLINE</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Gaming Stats */}
              <div className="hidden md:flex items-center space-x-6">
                <div className="text-center">
                  <div className="flex items-center space-x-1 text-cyan-400">
                    <Zap className="w-4 h-4" />
                    <span className="text-sm font-bold">POWER</span>
                  </div>
                  <div className="text-2xl font-bold text-white">100%</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center space-x-1 text-purple-400">
                    <Shield className="w-4 h-4" />
                    <span className="text-sm font-bold">SECURE</span>
                  </div>
                  <div className="text-2xl font-bold text-white">MAX</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center space-x-1 text-yellow-400">
                    <Crown className="w-4 h-4" />
                    <span className="text-sm font-bold">LEVEL</span>
                  </div>
                  <div className="text-2xl font-bold text-white">∞</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Gaming Interface */}
        <main className="max-w-7xl mx-auto px-6 py-12">
          <AboutSection widgetLoaded={widgetLoaded} />
        </main>

        {/* Gaming Footer */}
        <footer className="text-center py-8 border-t border-purple-500/20 bg-black/20 backdrop-blur-xl">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-purple-300 font-inter">Powered by Omnidimension AI</span>
            </div>
            <div className={`w-2 h-2 rounded-full ${widgetLoaded ? 'bg-green-400' : 'bg-yellow-400'} animate-pulse`}></div>
            <span className={`text-sm font-bold ${widgetLoaded ? 'text-green-300' : 'text-yellow-300'}`}>
              {widgetLoaded ? 'SYSTEM READY' : 'INITIALIZING...'}
            </span>
          </div>
          <p className="text-slate-400 text-sm font-inter">
            © 2025 Captain Focus • Elite Gaming Study Experience
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;