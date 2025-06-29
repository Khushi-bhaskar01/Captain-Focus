import React from 'react';
import { Gamepad2, Zap } from 'lucide-react';

interface NavigationProps {
  widgetLoaded: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ widgetLoaded }) => {
  return (
    <nav className="bg-black/40 backdrop-blur-xl border-b border-purple-500/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-center">
          <div className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-t-2xl border-b-2 border-purple-400">
            <Gamepad2 className="w-6 h-6 text-purple-400" />
            <span className="text-white font-bold text-lg font-poppins">GAMING MODE</span>
            {widgetLoaded && (
              <div className="flex items-center space-x-1">
                <Zap className="w-4 h-4 text-green-400" />
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};