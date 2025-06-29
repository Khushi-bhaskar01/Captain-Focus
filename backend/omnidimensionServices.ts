import axios from 'axios';

interface OmnidimensionAgent {
  id: string;
  name: string;
  status: string;
}

interface AgentResponse {
  status: string;
  json: OmnidimensionAgent;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// Use environment variable with fallback
const OMNIDIMENSION_API_KEY = process.env.OMNIDIMENSION_API_KEY || process.env.OMNIDIMENSION_API_KEY;
const OMNIDIMENSION_BASE_URL = process.env.OMNIDIMENSION_BASE_URL || 'https://api.omnidim.io';

// Axios instance with default configuration
const omnidimensionAPI = axios.create({
  baseURL: OMNIDIMENSION_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'Captain-Focus-Backend/1.0.0'
  }
});

// Add request interceptor for authentication
omnidimensionAPI.interceptors.request.use((config) => {
  if (OMNIDIMENSION_API_KEY) {
    config.headers.Authorization = `Bearer ${OMNIDIMENSION_API_KEY}`;
  }
  return config;
});

// Add response interceptor for logging
omnidimensionAPI.interceptors.response.use(
  (response) => {
    console.log(`✅ API Request successful: ${response.config.method?.toUpperCase()} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error(`❌ API Request failed: ${error.config?.method?.toUpperCase()} ${error.config?.url}`);
    console.error(`Status: ${error.response?.status}, Message: ${error.message}`);
    return Promise.reject(error);
  }
);

export async function createOmnidimensionAgent(): Promise<string> {
  if (!OMNIDIMENSION_API_KEY) {
    throw new Error('Omnidimension API key is required. Please set OMNIDIMENSION_API_KEY environment variable.');
  }

  try {
    const agentConfig = {
      name: "Captain Focus",
      welcome_message: "🎮 Greetings, brave scholar! I'm Captain Focus, your AI study companion! Ready to turn learning into an epic quest? What subject shall we conquer today? ⚔️✨",
      context_breakdown: [
        {
          title: "Warm Introduction and Topic Exploration",
          body: "Begin each session with enthusiasm: 'Hello, scholar! I'm Captain Focus, your AI tutor and mentor. Together, we'll turn your study sessions into epic learning quests. What would you like to explore today?' Listen to their response and guide them towards their chosen topic with excitement.",
          is_enabled: true
        },
        {
          title: "Emotion-Aware Engagement",
          body: "Analyze the student's mood and adapt accordingly. For tired/overwhelmed students: 'I sense today's challenging. Let's take it one step at a time - you've got this!' For confused students: 'Let's break this down together step-by-step. You're doing better than you think!' For happy students: 'Love the energy! Let's dive deeper - you're leveling up fast! ⚡' Keep responses supportive and encouraging.",
          is_enabled: true
        },
        {
          title: "Gamified Learning Experience",
          body: "Use gaming metaphors throughout: 'Great question - +10 XP!' 'New Quest Unlocked: [Topic]!' 'Boss Battle: [Difficult Concept]!' 'Achievement Unlocked: Understanding!' Make learning feel like an adventure with rewards, levels, and progress tracking.",
          is_enabled: true
        },
        {
          title: "Interactive Learning Support",
          body: "Provide concept clarifications with real-world examples and engaging analogies. Ask interactive questions: 'Want a quick tip?' 'Need a visual analogy?' 'Ready for the next challenge?' Offer learning modes: 'Deep Dive', 'Quick Revision', or 'Just Curious'. Always build confidence and encourage questions.",
          is_enabled: true
        },
        {
          title: "Communication Style",
          body: "Speak with warmth, enthusiasm, and clarity. Use a moderate pace with motivational tone. Include gaming emojis and metaphors naturally. Keep responses concise but engaging. Always end with encouragement or a call to action. Be supportive, patient, and celebrate every small victory.",
          is_enabled: true
        }
      ],
      transcriber: {
        provider: "deepgram_stream",
        silence_timeout_ms: 600,
        model: "nova-2",
        numerals: true,
        punctuate: true,
        smart_format: true,
        diarize: false
      },
      model: {
        model: "gpt-4o-mini",
        temperature: 0.8,
        max_tokens: 300
      },
      voice: {
        provider: "eleven_labs",
        voice_id: "cgSgspJ2msm6clMCkdW9",
        stability: 0.7,
        similarity_boost: 0.8
      },
      post_call_actions: {
        email: {
          enabled: false
        },
        extracted_variables: [
          {
            key: "user_emotion",
            prompt: "Determine the user's emotional state (Happy, Confused, Tired, Frustrated, Excited, Neutral)"
          },
          {
            key: "subject_topic",
            prompt: "Extract the main subject or topic discussed (Math, Science, History, etc.)"
          },
          {
            key: "learning_mode",
            prompt: "Identify the learning approach (Deep Dive, Quick Review, Homework Help, Concept Explanation)"
          },
          {
            key: "difficulty_level",
            prompt: "Assess the difficulty level of questions asked (Beginner, Intermediate, Advanced)"
          }
        ]
      }
    };

    console.log('🤖 Creating Captain Focus agent...');
    console.log('📊 Config preview:', {
      name: agentConfig.name,
      model: agentConfig.model.model,
      voice_provider: agentConfig.voice.provider,
      transcriber: agentConfig.transcriber.provider
    });

    const response = await omnidimensionAPI.post('/v1/agents', agentConfig);

    console.log('✅ Agent creation response received');
    
    const agentData: AgentResponse = response.data;
    
    if (!agentData.json?.id) {
      throw new Error('Invalid agent response: missing agent ID');
    }

    console.log(`🎯 Agent Status: ${agentData.status}`);
    console.log(`🆔 Agent ID: ${agentData.json.id}`);
    console.log(`📝 Agent Name: ${agentData.json.name}`);

    return agentData.json.id;
  } catch (error) {
    console.error('❌ Error creating Omnidimension agent:', error);
    
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const data = error.response?.data;
      
      console.error('📊 Error Details:');
      console.error(`   Status: ${status}`);
      console.error(`   URL: ${error.config?.url}`);
      console.error(`   Data:`, data);
      
      // Provide specific error messages
      if (status === 401) {
        throw new Error('Invalid API key. Please check your OMNIDIMENSION_API_KEY.');
      } else if (status === 403) {
        throw new Error('API key does not have permission to create agents.');
      } else if (status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else if (status >= 500) {
        throw new Error('Omnidimension service is temporarily unavailable.');
      }
    }
    
    throw error;
  }
}

export async function sendMessageToAgent(
  agentId: string, 
  message: string, 
  conversationHistory: ChatMessage[] = []
): Promise<string> {
  if (!OMNIDIMENSION_API_KEY) {
    throw new Error('Omnidimension API key is required');
  }

  if (!agentId) {
    throw new Error('Agent ID is required');
  }

  if (!message?.trim()) {
    throw new Error('Message cannot be empty');
  }

  try {
    console.log(`💬 Sending message to agent ${agentId}`);
    console.log(`📝 Message preview: "${message.substring(0, 50)}..."`);

    // Try agent-specific chat endpoint first
    let response;
    try {
      response = await omnidimensionAPI.post(`/v1/agents/${agentId}/chat`, {
        message: message.trim(),
        conversation_history: conversationHistory,
        stream: false
      });
    } catch (agentError) {
      console.log('🔄 Agent endpoint failed, trying general chat...');
      
      // Fallback to general chat completions
      const systemPrompt = `You are Captain Focus, an enthusiastic AI study companion who makes learning feel like an epic quest! 

🎮 Your personality:
- Warm, encouraging, and motivational
- Use gaming metaphors and emojis naturally
- Celebrate every learning moment
- Adapt to student's mood and energy
- Keep responses concise but engaging (2-3 sentences max)

🎯 Your mission:
- Turn study sessions into exciting adventures
- Break down complex topics with fun analogies
- Reward curiosity with "XP points" and achievements
- Always end with encouragement or next steps
- Make every student feel capable and supported

Remember: You're not just teaching - you're guiding heroes on their learning quest! ⚔️✨`;

      response = await omnidimensionAPI.post('/v1/chat/completions', {
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          ...conversationHistory,
          { role: "user", content: message }
        ],
        temperature: 0.8,
        max_tokens: 300
      });
    }

    console.log('✅ Chat response received');

    // Handle different response formats
    let responseText: string;
    
    if (response.data.choices?.[0]?.message?.content) {
      responseText = response.data.choices[0].message.content;
    } else if (response.data.response) {
      responseText = response.data.response;
    } else if (response.data.message) {
      responseText = response.data.message;
    } else if (typeof response.data === 'string') {
      responseText = response.data;
    } else {
      console.error('🤔 Unexpected response format:', response.data);
      responseText = "I received your message but had trouble with the response format. Let me try again! 🔄";
    }

    console.log(`📤 Response preview: "${responseText.substring(0, 50)}..."`);
    return responseText.trim();

  } catch (error) {
    console.error('❌ Error sending message to agent:', error);
    
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      console.error(`📊 Chat Error - Status: ${status}, URL: ${error.config?.url}`);
      
      if (status === 404) {
        throw new Error('Agent not found. The agent may have been deleted or the ID is incorrect.');
      } else if (status === 429) {
        throw new Error('Too many requests. Please wait a moment before trying again.');
      }
    }
    
    throw error;
  }
}

export async function checkOmnidimensionHealth(): Promise<boolean> {
  try {
    console.log('🏥 Checking Omnidimension API health...');
    
    // Try multiple health check endpoints
    const healthEndpoints = ['/health', '/v1/health', '/status', '/'];
    
    for (const endpoint of healthEndpoints) {
      try {
        const response = await omnidimensionAPI.get(endpoint, { timeout: 5000 });
        if (response.status === 200) {
          console.log(`✅ Health check passed: ${endpoint}`);
          return true;
        }
      } catch (endpointError) {
        console.log(`⚠️ Health endpoint ${endpoint} failed, trying next...`);
      }
    }
    
    // If health endpoints fail, try a simple API call
    try {
      await omnidimensionAPI.get('/v1/models', { timeout: 5000 });
      console.log('✅ Health check passed via models endpoint');
      return true;
    } catch (modelsError) {
      console.log('⚠️ Models endpoint also failed');
    }
    
    console.log('❌ All health checks failed');
    return false;
  } catch (error) {
    console.error('❌ Health check error:', error);
    return false;
  }
}

// Export configuration for external use
export const config = {
  apiKey: !!OMNIDIMENSION_API_KEY,
  baseUrl: OMNIDIMENSION_BASE_URL,
  timeout: 30000
};