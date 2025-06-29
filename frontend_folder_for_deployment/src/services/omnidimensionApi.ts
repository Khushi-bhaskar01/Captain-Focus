interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface BackendChatResponse {
  response: string;
  agentId?: string;
  timestamp: string;
  status: string;
}

interface BackendHealthResponse {
  status: string;
  service: string;
  agentId?: string | null;
  agentInitialized?: boolean;
  omnidimensionApiHealth?: boolean;
  timestamp: string;
  environment?: {
    nodeEnv: string;
    hasApiKey?: boolean;
    nodeVersion: string;
    port: number;
  };
}

class OmnidimensionAPI {
  private backendUrl: string;

  constructor() {
    // Use the deployed backend URL for production
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      
      if (hostname === 'localhost' || hostname === '127.0.0.1') {
        // Local development
        this.backendUrl = 'http://localhost:3001';
      } else {
        // Production - use your deployed backend
        this.backendUrl = 'https://captain-focus.onrender.com';
      }
    } else {
      // Server-side fallback
      this.backendUrl = 'https://captain-focus.onrender.com';
    }

    console.log('🔗 Backend URL configured:', this.backendUrl);
  }

  async sendMessage(messages: ChatMessage[]): Promise<string> {
    try {
      // Extract conversation history (exclude system message)
      const conversationHistory = messages
        .filter(msg => msg.role !== 'system')
        .map(msg => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content
        }));

      // Get the latest user message
      const latestMessage = messages[messages.length - 1];
      if (latestMessage.role !== 'user') {
        throw new Error('Latest message must be from user');
      }

      console.log('📤 Sending message to backend:', latestMessage.content.substring(0, 50) + '...');

      const response = await fetch(`${this.backendUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: latestMessage.content,
          conversationHistory: conversationHistory.slice(0, -1) // Exclude the latest message
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || `HTTP ${response.status}: ${response.statusText}`;
        
        // Provide user-friendly error messages
        if (response.status === 404) {
          throw new Error('Backend service not found. Please check if the server is running.');
        } else if (response.status === 500) {
          throw new Error(`Server error: ${errorMessage}`);
        } else if (response.status === 429) {
          throw new Error('Too many requests. Please wait a moment and try again.');
        } else {
          throw new Error(`Backend request failed: ${errorMessage}`);
        }
      }

      const data: BackendChatResponse = await response.json();
      
      if (!data.response) {
        throw new Error('Invalid response from backend: missing response text');
      }

      console.log('📥 Received response from backend');
      return data.response;
    } catch (error) {
      console.error('❌ Backend API Error:', error);
      
      // Check if backend is running
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Cannot connect to backend server. Please ensure the backend service is running and accessible.');
      }
      
      throw error;
    }
  }

  // Check if backend is healthy
  async checkHealth(): Promise<BackendHealthResponse | null> {
    try {
      console.log('🏥 Checking backend health...');
      
      const response = await fetch(`${this.backendUrl}/api/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.warn(`⚠️ Health check failed with status: ${response.status}`);
        return null;
      }

      const healthData: BackendHealthResponse = await response.json();
      console.log('✅ Backend health check passed:', healthData.status);
      
      return healthData;
    } catch (error) {
      console.error('❌ Health check failed:', error);
      return null;
    }
  }

  // Get backend URL for debugging
  getBackendUrl(): string {
    return this.backendUrl;
  }

  // Update backend URL if needed
  setBackendUrl(url: string): void {
    this.backendUrl = url;
    console.log('🔗 Backend URL updated:', this.backendUrl);
  }

  // Method to get Captain Focus system prompt
  getSystemPrompt(): string {
    return `You are Captain Focus, a voice-based AI study companion designed for students. Your mission is to help students stay motivated and understand complex topics through gamified, emotionally adaptive responses.

🎮 Your Personality:
- Enthusiastic, warm, and encouraging
- Use gaming metaphors naturally (quests, XP, achievements, boss battles)
- Celebrate every learning moment with excitement
- Adapt your energy to match the student's mood
- Always supportive and patient

🎯 Your Mission:
- Turn study sessions into epic learning adventures
- Break down complex topics with fun analogies
- Reward curiosity and effort with gaming language
- Keep responses concise but engaging (2-3 sentences max for voice)
- Always end with encouragement or next steps

🗣️ Communication Style:
- Conversational and upbeat
- Use emojis and gaming terms naturally
- Match the student's energy level
- Provide clear, actionable guidance
- Make every student feel capable and supported

Remember: You're not just teaching - you're guiding heroes on their learning quest! ⚔️✨`;
  }
}

export default OmnidimensionAPI;