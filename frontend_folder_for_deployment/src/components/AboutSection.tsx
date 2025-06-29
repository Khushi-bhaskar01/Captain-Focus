import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mic, 
  Brain, 
  Target, 
  Shield, 
  Volume2, 
  Sparkles,
  Zap,
  Trophy,
  Gamepad2,
  Headphones,
  Sword,
  Star,
  Flame,
  Bolt,
  Crown,
  Gem,
  Crosshair,
  MessageCircle,
  ArrowRight,
  ExternalLink,
  MousePointer,
  HelpCircle
} from 'lucide-react';

interface AboutSectionProps {
  widgetLoaded: boolean;
}

const AboutSection: React.FC<AboutSectionProps> = ({ widgetLoaded }) => {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const gamingFeatures = [
    {
      icon: <Mic className="w-10 h-10" />,
      title: "Voice Command System",
      description: "Activate your AI companion with voice commands. No controllers needed - just speak and dominate!",
      color: "from-purple-500 to-pink-600",
      glowColor: "shadow-purple-500/50",
      badge: "VOICE TECH"
    },
    {
      icon: <Brain className="w-10 h-10" />,
      title: "Adaptive AI Engine",
      description: "Advanced AI that reads your learning style and adapts like a boss battle scaling to your level.",
      color: "from-cyan-500 to-blue-600",
      glowColor: "shadow-cyan-500/50",
      badge: "AI POWERED"
    },
    {
      icon: <Target className="w-10 h-10" />,
      title: "Gamified Learning",
      description: "Earn XP, unlock achievements, and level up your knowledge. Every study session is an epic quest!",
      color: "from-green-500 to-emerald-600",
      glowColor: "shadow-green-500/50",
      badge: "LEVEL UP"
    },
    {
      icon: <Shield className="w-10 h-10" />,
      title: "Fortress Security",
      description: "Your data is protected by military-grade encryption. Study with confidence, warrior!",
      color: "from-orange-500 to-red-600",
      glowColor: "shadow-orange-500/50",
      badge: "SECURE"
    }
  ];

  const questSteps = [
    {
      number: 1,
      title: "Locate Omnidimension Widget",
      description: "Find the floating AI widget in the bottom-right corner of your screen",
      icon: <MousePointer className="w-8 h-8" />,
      visual: "🎯",
      color: "from-purple-500 to-pink-500"
    },
    {
      number: 2,
      title: "Click to Activate",
      description: "Click the widget to summon Captain Focus - your elite AI study companion",
      icon: <MessageCircle className="w-8 h-8" />,
      visual: "💬",
      color: "from-cyan-500 to-blue-500"
    },
    {
      number: 3,
      title: "Ask Your Question",
      description: "Speak or type your study doubt - Captain Focus understands all subjects!",
      icon: <HelpCircle className="w-8 h-8" />,
      visual: "❓",
      color: "from-green-500 to-emerald-500"
    },
    {
      number: 4,
      title: "Get Epic Answers",
      description: "Receive gamified, personalized explanations that make learning feel like winning!",
      icon: <Trophy className="w-8 h-8" />,
      visual: "🏆",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <div className="space-y-20">
      {/* Epic Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center py-20 relative"
      >
        {/* Floating Gaming Avatar */}
        <motion.div
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 3, -3, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative w-40 h-40 mx-auto mb-12"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 rounded-full animate-pulse opacity-75"></div>
          <div className="absolute inset-2 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl">
            <Gamepad2 className="w-20 h-20 text-white" />
          </div>
          
          {/* Orbiting Elements */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <div className="absolute -top-3 left-1/2 w-4 h-4 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50"></div>
            <div className="absolute top-1/2 -right-3 w-3 h-3 bg-green-400 rounded-full shadow-lg shadow-green-400/50"></div>
            <div className="absolute -bottom-3 left-1/3 w-3 h-3 bg-pink-400 rounded-full shadow-lg shadow-pink-400/50"></div>
            <div className="absolute top-1/4 -left-3 w-2 h-2 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"></div>
          </motion.div>

          {/* Power Indicators */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-1">
              <div className="w-2 h-6 bg-green-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-6 bg-green-400 rounded-full animate-pulse delay-100"></div>
              <div className="w-2 h-6 bg-green-400 rounded-full animate-pulse delay-200"></div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-8 font-poppins">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              ENTER THE
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-green-400 to-yellow-400 bg-clip-text text-transparent">
              STUDY REALM
            </span>
          </h1>

          <p className="text-2xl md:text-3xl text-purple-200 mb-12 max-w-4xl mx-auto font-inter leading-relaxed">
            Captain Focus is your <span className="text-cyan-400 font-bold">Elite AI Study Companion</span> - 
            transforming boring study sessions into <span className="text-pink-400 font-bold">epic gaming adventures!</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <button className="relative px-12 py-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold text-xl shadow-2xl flex items-center space-x-3 font-inter">
                <Sword className="w-8 h-8" />
                <span>BEGIN QUEST</span>
                <Sparkles className="w-8 h-8" />
              </button>
            </motion.div>
            
            <div className="flex items-center space-x-3 text-purple-300 text-lg font-inter">
              <Headphones className="w-6 h-6" />
              <span>Voice-Powered • No Sign-Up Required</span>
            </div>
          </div>

          {/* Gaming Stats Bar */}
          <div className="flex justify-center space-x-8 text-center">
            <div className="bg-black/40 backdrop-blur-xl border border-purple-500/30 rounded-xl px-6 py-4">
              <div className="text-cyan-400 text-sm font-bold mb-1">POWER LEVEL</div>
              <div className="text-3xl font-bold text-white">MAXIMUM</div>
            </div>
            <div className="bg-black/40 backdrop-blur-xl border border-purple-500/30 rounded-xl px-6 py-4">
              <div className="text-green-400 text-sm font-bold mb-1">STATUS</div>
              <div className="text-3xl font-bold text-white">READY</div>
            </div>
            <div className="bg-black/40 backdrop-blur-xl border border-purple-500/30 rounded-xl px-6 py-4">
              <div className="text-yellow-400 text-sm font-bold mb-1">DIFFICULTY</div>
              <div className="text-3xl font-bold text-white">ADAPTIVE</div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* OMNIDIMENSION WIDGET GUIDE - MAIN SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="relative"
      >
        <div className="absolute -inset-4 bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-purple-600/20 rounded-3xl blur-xl"></div>
        <div className="relative bg-black/60 backdrop-blur-xl border-2 border-cyan-400/50 rounded-3xl p-12 shadow-2xl">
          <div className="text-center mb-12">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-cyan-500/50"
            >
              <MessageCircle className="w-12 h-12 text-white" />
            </motion.div>
            
            <h2 className="text-5xl font-bold mb-6 font-poppins">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                🎮 HOW TO USE CAPTAIN FOCUS
              </span>
            </h2>
            <p className="text-2xl text-cyan-200 font-inter max-w-4xl mx-auto leading-relaxed">
              <span className="text-white font-bold">Use the Omnidimension AI Widget</span> to resolve all your study doubts! 
              It's your direct portal to Captain Focus - your elite AI study companion.
            </p>
          </div>

          {/* Widget Location Guide - FIXED ALIGNMENT */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-8">
              {/* Step 1 */}
              <div>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">1</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white font-poppins">Find the Widget</h3>
                </div>
                <p className="text-cyan-200 text-lg font-inter leading-relaxed pl-16">
                  Look for the <span className="text-cyan-400 font-bold">floating Omnidimension widget</span> in the 
                  <span className="text-yellow-400 font-bold"> bottom-right corner</span> of your screen. 
                  It's your gateway to AI-powered learning!
                </p>
              </div>
              
              {/* Step 2 - FIXED: Added proper spacing and alignment */}
              <div>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">2</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white font-poppins">Click to Activate</h3>
                </div>
                <p className="text-cyan-200 text-lg font-inter leading-relaxed pl-16">
                  Click the widget to <span className="text-green-400 font-bold">summon Captain Focus</span>. 
                  The AI will be ready to tackle any subject - Math, Science, History, you name it!
                </p>
              </div>
            </div>

            <div className="relative">
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 2, -2, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl p-8 border border-cyan-400/30"
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">🎯</div>
                  <h4 className="text-xl font-bold text-cyan-400 mb-2 font-poppins">Widget Location</h4>
                  <p className="text-cyan-200 font-inter">Bottom-Right Corner</p>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mt-4"
                  >
                    <ArrowRight className="w-8 h-8 text-yellow-400 mx-auto" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* What You Can Ask */}
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-8 border border-purple-400/30 mb-12">
            <h3 className="text-3xl font-bold text-center text-white mb-8 font-poppins">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                🚀 WHAT CAN YOU ASK?
              </span>
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-3xl">📚</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-2 font-poppins">Any Subject</h4>
                <p className="text-purple-200 text-sm font-inter">Math, Science, History, Literature, Programming - Captain Focus knows it all!</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-3xl">🤔</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-2 font-poppins">Any Doubt</h4>
                <p className="text-cyan-200 text-sm font-inter">Homework help, concept explanations, exam prep - no question is too big or small!</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-3xl">⚡</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-2 font-poppins">Any Time</h4>
                <p className="text-green-200 text-sm font-inter">24/7 availability - your AI study buddy never sleeps and is always ready to help!</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group inline-block"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <button className="relative px-12 py-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl font-bold text-xl shadow-2xl flex items-center space-x-3 font-inter">
                <ExternalLink className="w-6 h-6" />
                <span>LOOK FOR THE WIDGET NOW!</span>
                <Zap className="w-6 h-6" />
              </button>
            </motion.div>
            
            <p className="text-cyan-300 mt-4 font-inter">
              👀 Check the bottom-right corner of your screen for the Omnidimension widget
            </p>
          </div>
        </div>
      </motion.section>

      {/* Gaming Features Grid */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {gamingFeatures.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
            whileHover={{ y: -10, scale: 1.02 }}
            onHoverStart={() => setActiveFeature(index)}
            onHoverEnd={() => setActiveFeature(null)}
            className="relative group"
          >
            <div className={`absolute -inset-1 bg-gradient-to-r ${feature.color} rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300`}></div>
            <div className="relative bg-black/60 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-8 shadow-2xl">
              {/* Feature Badge */}
              <div className="absolute -top-3 left-4">
                <div className={`px-3 py-1 bg-gradient-to-r ${feature.color} rounded-full text-xs font-bold text-white shadow-lg`}>
                  {feature.badge}
                </div>
              </div>

              <div className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-2xl ${feature.glowColor} group-hover:shadow-2xl transition-all duration-300`}>
                {feature.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4 font-poppins">{feature.title}</h3>
              <p className="text-purple-200 leading-relaxed font-inter">{feature.description}</p>

              {/* Animated Elements */}
              {activeFeature === index && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-4 right-4"
                >
                  <div className={`w-8 h-8 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center shadow-lg`}>
                    <Star className="w-4 h-4 text-white" />
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.section>

      {/* Epic Quest Guide */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="relative"
      >
        <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-cyan-600/20 rounded-3xl blur-xl"></div>
        <div className="relative bg-black/40 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-12 shadow-2xl">
          <div className="text-center mb-16">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 mx-auto mb-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl shadow-yellow-500/50"
            >
              <Crown className="w-10 h-10 text-white" />
            </motion.div>
            
            <h2 className="text-5xl font-bold text-white mb-6 font-poppins">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                MASTER THE QUEST
              </span>
            </h2>
            <p className="text-2xl text-purple-200 font-inter max-w-3xl mx-auto">
              Follow these epic steps to unlock the full power of your AI study companion
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {questSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.6 }}
                onHoverStart={() => setActiveStep(index)}
                onHoverEnd={() => setActiveStep(null)}
                className="relative group"
              >
                {/* Connection Line */}
                {index < questSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 z-0 opacity-50"></div>
                )}
                
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative z-10 text-center p-8 bg-black/60 backdrop-blur-xl border border-purple-500/30 rounded-2xl shadow-2xl"
                >
                  {/* Step Number */}
                  <div className={`w-16 h-16 bg-gradient-to-r ${step.color} text-white rounded-full flex items-center justify-center font-bold text-2xl mx-auto mb-6 shadow-2xl`}>
                    {step.number}
                  </div>

                  {/* Visual Emoji */}
                  <div className="text-6xl mb-6">{step.visual}</div>

                  {/* Step Content */}
                  <h3 className="text-xl font-bold text-white mb-4 font-poppins">{step.title}</h3>
                  <p className="text-purple-200 text-sm leading-relaxed font-inter">{step.description}</p>

                  {/* Interactive Elements */}
                  {activeStep === index && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute -top-2 -right-2"
                    >
                      <div className={`w-10 h-10 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center shadow-2xl`}>
                        {step.icon}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Power-Up Indicators */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-8 text-center border border-purple-500/30"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Mic className="w-8 h-8 text-white" />
                </motion.div>
              </div>
              <h4 className="font-bold text-white mb-2 font-poppins">Voice Recognition</h4>
              <p className="text-sm text-purple-200 font-inter">Advanced speech-to-text technology</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-2xl p-8 text-center border border-cyan-500/30"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Brain className="w-8 h-8 text-white" />
                </motion.div>
              </div>
              <h4 className="font-bold text-white mb-2 font-poppins">AI Processing</h4>
              <p className="text-sm text-cyan-200 font-inter">Intelligent response generation</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-2xl p-8 text-center border border-green-500/30"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Volume2 className="w-8 h-8 text-white" />
                </motion.div>
              </div>
              <h4 className="font-bold text-white mb-2 font-poppins">Voice Response</h4>
              <p className="text-sm text-green-200 font-inter">Natural text-to-speech output</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Epic Call to Action */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="text-center py-20 relative overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 via-pink-900/50 to-cyan-900/50 rounded-3xl">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, rgba(236, 72, 153, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)
              `
            }}></div>
          </div>
        </div>

        <div className="relative z-10">
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl shadow-yellow-500/50"
          >
            <Flame className="w-16 h-16 text-white" />
          </motion.div>

          <h2 className="text-6xl md:text-7xl font-bold mb-8 font-poppins">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              READY TO DOMINATE?
            </span>
          </h2>
          
          <p className="text-2xl mb-12 text-purple-200 max-w-3xl mx-auto font-inter">
            Join the elite ranks of students who've transformed their learning experience with Captain Focus
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group inline-block"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <button className="relative px-16 py-8 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white rounded-3xl font-bold text-2xl shadow-2xl flex items-center space-x-4 font-inter">
              <Crosshair className="w-8 h-8" />
              <span>USE OMNIDIMENSION WIDGET</span>
              <Bolt className="w-8 h-8" />
            </button>
          </motion.div>

          <div className="mt-8 flex items-center justify-center space-x-8 text-lg text-purple-300">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span>Free to Play</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span>No Registration</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span>Voice-Powered</span>
            </div>
          </div>

          {/* Achievement Unlocked */}
          {widgetLoaded && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="mt-12 inline-flex items-center space-x-3 bg-green-500/20 border border-green-400/30 rounded-full px-6 py-3"
            >
              <Trophy className="w-6 h-6 text-yellow-400" />
              <span className="text-green-300 font-bold">ACHIEVEMENT UNLOCKED: Omnidimension Widget Ready!</span>
              <Gem className="w-6 h-6 text-green-400" />
            </motion.div>
          )}
        </div>
      </motion.section>
    </div>
  );
};

export default AboutSection;