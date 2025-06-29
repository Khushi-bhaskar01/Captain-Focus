import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Heart, Brain, Zap, Mic, MicOff, Settings, X} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'captain';
  mood?: 'tired' | 'confused' | 'happy' | 'neutral';
  timestamp: Date;
}

interface VoiceSettings {
  selectedVoice: number;
  pitch: number;
  rate: number;
}

interface ChatInterfaceProps {
  isVoiceActive: boolean;
  setIsVoiceActive: (active: boolean) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ isVoiceActive, setIsVoiceActive }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "🎮 Greetings, brave scholar! I'm Captain Focus, your AI study companion! I'm here to turn your learning journey into an epic quest. What subject shall we conquer today? ⚔️✨",
      sender: 'captain',
      mood: 'happy',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [showWidgetInfo, setShowWidgetInfo] = useState(true);
  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>(() => {
    const saved = localStorage.getItem('captainFocusVoiceSettings');
    return saved ? JSON.parse(saved) : {
      selectedVoice: 0,
      pitch: 1.1,
      rate: 0.9
    };
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Save voice settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('captainFocusVoiceSettings', JSON.stringify(voiceSettings));
  }, [voiceSettings]);

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      setAvailableVoices(voices);
      
      if (voices.length > 0 && (voiceSettings.selectedVoice >= voices.length || voiceSettings.selectedVoice < 0)) {
        const femaleVoice = voices.findIndex(voice => 
          voice.name.toLowerCase().includes('female') || 
          voice.name.toLowerCase().includes('woman') ||
          voice.name.toLowerCase().includes('zira') ||
          voice.name.toLowerCase().includes('samantha')
        );
        
        setVoiceSettings(prev => ({
          ...prev,
          selectedVoice: femaleVoice >= 0 ? femaleVoice : 0
        }));
      }
    };

    loadVoices();
    speechSynthesis.addEventListener('voiceschanged', loadVoices);

    return () => {
      speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    };
  }, [voiceSettings.selectedVoice]);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      if (recognitionRef.current) {
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setInputText(transcript);
          setIsListening(false);
          setIsVoiceActive(false);
        };

        recognitionRef.current.onstart = () => {
          setIsListening(true);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
          setIsVoiceActive(false);
        };

        recognitionRef.current.onerror = () => {
          setIsListening(false);
          setIsVoiceActive(false);
        };
      }
    }
  }, [setIsVoiceActive]);

  // Handle voice activation
  useEffect(() => {
    if (isVoiceActive && recognitionRef.current && !isListening) {
      recognitionRef.current.start();
    } else if (!isVoiceActive && recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  }, [isVoiceActive, isListening]);

  const detectMood = (text: string): 'tired' | 'confused' | 'happy' | 'neutral' => {
    const tired = /tired|exhausted|sleepy|bored|overwhelmed/i.test(text);
    const confused = /confused|don't understand|help|stuck|hard|difficult/i.test(text);
    const happy = /great|awesome|got it|understand|thanks|good/i.test(text);
    
    if (tired) return 'tired';
    if (confused) return 'confused';
    if (happy) return 'happy';
    return 'neutral';
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text.replace(/[🎮🤔🌙⚡🎯🧠💡🗝️📚⚔️🚀✨🎉🏆🧩💙🌟😌🔧🔌❌🌐]/g, ''));
      
      if (availableVoices[voiceSettings.selectedVoice]) {
        utterance.voice = availableVoices[voiceSettings.selectedVoice];
      }
      utterance.rate = voiceSettings.rate;
      utterance.pitch = voiceSettings.pitch;
      utterance.volume = 0.8;
      
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      speechSynthesis.speak(utterance);
    }
  };

  const testVoice = () => {
    speakText("Hello! This is how Captain Focus sounds with your current voice settings. Ready for an epic learning adventure?");
  };

  const generateCaptainResponse = (userMessage: string): string => {
    const mood = detectMood(userMessage);
    const responses = {
      tired: [
        "🌙 I sense you're feeling a bit drained, brave scholar! That's totally normal - even heroes need rest. Let's take this one small step at a time. What's one tiny thing we can tackle together? You've got more strength than you realize! 💙",
        "😌 Hey there, tired warrior! Learning when you're exhausted is like fighting a boss battle on low health - let's find you a power-up! What subject is weighing on you? We'll break it down into bite-sized quests! ⚡",
        "🛡️ I can tell today's been challenging! But you know what? Showing up when you're tired shows real courage. Let's turn this into a gentle learning adventure. What would help you feel more energized about studying? 🌟"
      ],
      confused: [
        "🤔 Ah, a puzzle to solve! Confusion is just your brain saying 'I'm ready to level up!' Let's break this down step by step. What specific part has you scratching your head? I love a good mystery! 🧩",
        "🗝️ Don't worry, confusion is the first step to understanding! Think of it as standing before a locked door - we just need to find the right key. What topic is giving you trouble? Let's unlock it together! ✨",
        "🎯 Perfect! Questions mean you're thinking deeply. That's exactly what scholars do! Tell me what's puzzling you, and we'll turn this confusion into your next 'Aha!' moment. Ready for the challenge? 🚀"
      ],
      happy: [
        "🎉 I love that energy! You're absolutely crushing it, champion! That enthusiasm is your secret weapon for learning. What amazing topic shall we dive into next? Let's keep this momentum going! ⚔️",
        "✨ Yes! That's the spirit of a true learning hero! Your positive attitude is like a power-up that makes everything easier. What subject are you excited to explore? Let's turn up the adventure! 🏆",
        "🌟 Fantastic! You're radiating scholar energy! When you're this motivated, there's no limit to what you can achieve. What quest shall we embark on? I'm ready to guide you to victory! 🎮"
      ],
      neutral: [
        "🎮 Greetings, fellow scholar! I'm here and ready to turn your study session into an epic adventure. What subject would you like to conquer today? Every great quest starts with a single step! ⚔️",
        "📚 Welcome back to our learning realm! Whether you're tackling homework, preparing for exams, or just curious about something, I'm your trusty companion. What knowledge shall we unlock together? ✨",
        "🧠 Hello there, brave learner! I'm Captain Focus, and I'm excited to help you on your educational journey. What topic is calling to you today? Let's make learning feel like an adventure! 🚀"
      ]
    };

    const moodResponses = responses[mood];
    return moodResponses[Math.floor(Math.random() * moodResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputText;
    setInputText('');
    setIsTyping(true);

    // Simulate thinking time
    setTimeout(() => {
      const mood = detectMood(currentInput);
      const responseText = generateCaptainResponse(currentInput);
      
      const captainMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'captain',
        mood,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, captainMessage]);
      setIsTyping(false);
      
      // Speak the response
      speakText(responseText);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleVoice = () => {
    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    setIsVoiceActive(!isVoiceActive);
  };

  const getMoodIcon = (mood?: string) => {
    switch (mood) {
      case 'tired': return <Heart className="w-4 h-4 text-blue-400" />;
      case 'confused': return <Brain className="w-4 h-4 text-yellow-400" />;
      case 'happy': return <Sparkles className="w-4 h-4 text-green-400" />;
      default: return <Zap className="w-4 h-4 text-purple-400" />;
    }
  };

  const getVoiceDisplayName = (voice: SpeechSynthesisVoice) => {
    const name = voice.name;
    const lang = voice.lang;
    return `${name} (${lang})`;
  };

  return (
    <div className="h-[600px] flex flex-col relative">
      {/* Omnidimension Widget Info Banner */}
      {showWidgetInfo && (
        <div className="bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border border-purple-500/50 rounded-lg p-4 m-4 flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-purple-300 text-sm font-medium">🎮 Omnidimension AI Widget Active!</p>
            <p className="text-purple-200 text-xs">
              Your advanced AI companion is now powered by Omnidimension technology. 
              Look for the widget in the bottom-right corner for enhanced AI interactions!
            </p>
          </div>
          <button
            onClick={() => setShowWidgetInfo(false)}
            className="text-purple-400 hover:text-purple-300 flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Voice Settings Modal */}
      {showSettings && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black/80 backdrop-blur-md border border-white/20 rounded-2xl p-6 w-full max-w-md max-h-[500px] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Voice Settings</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Voice Selection */}
              <div>
                <label className="block text-sm font-medium text-purple-300 mb-3">
                  Voice Selection
                </label>
                <select
                  value={voiceSettings.selectedVoice}
                  onChange={(e) => setVoiceSettings(prev => ({ ...prev, selectedVoice: parseInt(e.target.value) }))}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {availableVoices.map((voice, index) => (
                    <option key={index} value={index} className="bg-gray-800 text-white">
                      {getVoiceDisplayName(voice)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Pitch Control */}
              <div>
                <label className="block text-sm font-medium text-purple-300 mb-3">
                  Pitch: {voiceSettings.pitch.toFixed(1)}
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.1"
                  value={voiceSettings.pitch}
                  onChange={(e) => setVoiceSettings(prev => ({ ...prev, pitch: parseFloat(e.target.value) }))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Lower</span>
                  <span>Higher</span>
                </div>
              </div>

              {/* Rate Control */}
              <div>
                <label className="block text-sm font-medium text-purple-300 mb-3">
                  Speed: {voiceSettings.rate.toFixed(1)}
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="1.5"
                  step="0.1"
                  value={voiceSettings.rate}
                  onChange={(e) => setVoiceSettings(prev => ({ ...prev, rate: parseFloat(e.target.value) }))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Slower</span>
                  <span>Faster</span>
                </div>
              </div>

              {/* Test Voice Button */}
              <button
                onClick={testVoice}
                disabled={isSpeaking}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 disabled:opacity-50 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 disabled:hover:scale-100"
              >
                {isSpeaking ? 'Testing Voice...' : '🎤 Test Voice'}
              </button>

              {/* Reset to Defaults */}
              <button
                onClick={() => setVoiceSettings({ selectedVoice: 0, pitch: 1.1, rate: 0.9 })}
                className="w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-all duration-300"
              >
                Reset to Defaults
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                  : 'bg-white/10 backdrop-blur-md text-white border border-white/20'
              } animate-fadeIn`}
            >
              {message.sender === 'captain' && (
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-xs font-bold">
                    CF
                  </div>
                  <span className="text-xs text-purple-300">Captain Focus</span>
                  {message.mood && getMoodIcon(message.mood)}
                  {isSpeaking && (
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-green-400 rounded-full animate-bounce"></div>
                      <div className="w-1 h-1 bg-green-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-1 h-1 bg-green-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  )}
                </div>
              )}
              <p className="text-sm leading-relaxed">{message.text}</p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-4 py-3 rounded-2xl">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-xs font-bold">
                  CF
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Voice Status Indicator */}
      {(isListening || isSpeaking) && (
        <div className="px-6 py-2 bg-black/20 border-t border-white/10">
          <div className="flex items-center justify-center space-x-2 text-sm">
            {isListening && (
              <>
                <Mic className="w-4 h-4 text-red-400 animate-pulse" />
                <span className="text-red-400">Listening...</span>
              </>
            )}
            {isSpeaking && (
              <>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce delay-200"></div>
                </div>
                <span className="text-green-400">Captain Focus is speaking...</span>
              </>
            )}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-6 border-t border-white/10">
        <div className="flex space-x-3">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={isListening ? "🎤 Listening..." : "Ask Captain Focus anything..."}
            className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
            rows={2}
            disabled={isListening}
          />
          <button
            onClick={() => setShowSettings(true)}
            className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-xl transition-all duration-300 hover:scale-105"
            title="Voice Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
          <button
            onClick={toggleVoice}
            className={`p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
              isVoiceActive || isListening
                ? 'bg-gradient-to-r from-red-500 to-pink-500 animate-pulse'
                : 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600'
            }`}
          >
            {isListening ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </button>
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isListening || isTyping}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 disabled:opacity-50 text-white p-3 rounded-xl transition-all duration-300 hover:scale-105 disabled:hover:scale-100"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Add type declarations for Speech Recognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default ChatInterface;