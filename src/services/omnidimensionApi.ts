interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface BackendChatResponse {
  response: string;
  message?: string;
  timestamp: string;
  status: string;
}

interface BackendHealthResponse {
  status: string;
  service: string;
  message: string;
  timestamp: string;
  environment: {
    nodeEnv: string;
    nodeVersion: string;
    port: number;
  };
}

class OmnidimensionAPI {
  private backendUrl: string;

  constructor() {
    // Simple backend URL detection
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      
      if (hostname === 'localhost' || hostname === '127.0.0.1') {
        // Local development
        this.backendUrl = 'http://localhost:3001';
      } else {
        // Production - use environment variable or default pattern
        this.backendUrl = import.meta.env.VITE_BACKEND_URL || 
                         `${window.location.protocol}//captain-focus-backend.onrender.com`;
      }
    } else {
      // Server-side fallback
      this.backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';
    }

    console.log('🔗 Backend URL:', this.backendUrl);
  }

  async sendMessage(messages: ChatMessage[]): Promise<string> {
    try {
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
          message: latestMessage.content
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || `HTTP ${response.status}: ${response.statusText}`;
        
        if (response.status === 404) {
          throw new Error('Backend service not found. Please check if the server is running.');
        } else if (response.status === 500) {
          throw new Error(`Server error: ${errorMessage}`);
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
      console.error('❌ API Error:', error);
      
      // Check if backend is running
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Cannot connect to backend server. Please ensure the backend service is running.');
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

  // Simple system prompt for Captain Focus
  getSystemPrompt(): string {
    return `You are Captain Focus, a friendly AI study companion. Help students learn with enthusiasm and encouragement!`;
  }
}

export default OmnidimensionAPI;