import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createOmnidimensionAgent, sendMessageToAgent, checkOmnidimensionHealth } from './omnidimensionServices';


// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Store active agents (in production, use a database like Redis)
const activeAgents = new Map<string, string>();

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [
        'https://captain-focus.netlify.app',
        'https://your-frontend-domain.com'
      ]
    : ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Basic security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp} - ${req.method} ${req.path} - IP: ${req.ip}`);
  next();
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Captain Focus Backend API',
    version: '1.0.0',
    status: 'running',
    message: 'Backend is ready for Omnidimension integration!',
    endpoints: {
      health: '/api/health',
      agent_health: '/api/agent/health',
      create_agent: 'POST /api/agent/create',
      chat: 'POST /api/chat',
      agent_chat: 'POST /api/agent/chat',
      agent_status: 'GET /api/agent/status/:agentId',
      list_agents: 'GET /api/agent/list'
    },
    environment: {
      nodeEnv: process.env.NODE_ENV || 'development',
      omnidimensionConfigured: !!process.env.OMNIDIMENSION_API_KEY,
      activeAgents: activeAgents.size
    },
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    service: 'Captain Focus Backend',
    message: 'Server is running perfectly!',
    timestamp: new Date().toISOString(),
    environment: {
      nodeEnv: process.env.NODE_ENV || 'development',
      nodeVersion: process.version,
      port: PORT,
      omnidimensionApiKey: process.env.OMNIDIMENSION_API_KEY ? 'configured' : 'missing'
    }
  });
});

// Omnidimension API health check
app.get('/api/agent/health', async (req, res) => {
  try {
    const isHealthy = await checkOmnidimensionHealth();
    res.json({
      status: isHealthy ? 'healthy' : 'unhealthy',
      service: 'Omnidimension API',
      message: isHealthy ? 'Omnidimension API is accessible' : 'Omnidimension API is not responding',
      apiKeyConfigured: !!process.env.OMNIDIMENSION_API_KEY,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      service: 'Omnidimension API',
      message: 'Failed to check API health',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
});

// Create or get agent
app.post('/api/agent/create', async (req, res) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'userId is required',
        code: 'MISSING_USER_ID'
      });
    }

    // Check if user already has an active agent
    if (activeAgents.has(userId)) {
      const existingAgentId = activeAgents.get(userId);
      console.log(`🔄 Using existing agent ${existingAgentId} for user ${userId}`);
      return res.json({
        success: true,
        agentId: existingAgentId,
        message: 'Using existing Captain Focus agent',
        isNewAgent: false,
        timestamp: new Date().toISOString()
      });
    }

    console.log(`🚀 Creating new Captain Focus agent for user: ${userId}`);
    const agentId = await createOmnidimensionAgent();
    
    // Store agent for this user
    activeAgents.set(userId, agentId);
    
    console.log(`✅ Agent ${agentId} created successfully for user ${userId}`);
    
    res.json({
      success: true,
      agentId,
      message: 'Captain Focus agent created successfully! 🎮',
      isNewAgent: true,
      agent_config: {
        name: 'Captain Focus',
        personality: 'Gamified AI Study Companion',
        capabilities: ['Voice Chat', 'Text Chat', 'Emotion Recognition', 'Learning Analytics']
      },
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Agent creation failed:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create agent',
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      code: 'AGENT_CREATION_FAILED',
      timestamp: new Date().toISOString()
    });
  }
});

// Send message to agent (new endpoint)
app.post('/api/agent/chat', async (req, res) => {
  try {
    const { agentId, message, conversationHistory, userId } = req.body;

    // Validation
    if (!agentId) {
      return res.status(400).json({
        success: false,
        error: 'Agent ID is required',
        code: 'MISSING_AGENT_ID'
      });
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Valid message is required',
        code: 'INVALID_MESSAGE'
      });
    }

    console.log(`💬 Processing chat for agent: ${agentId}`);
    console.log(`📝 Message preview: "${message.substring(0, 50)}..."`);
    
    const response = await sendMessageToAgent(agentId, message, conversationHistory || []);

    res.json({
      success: true,
      response,
      agentId,
      messageLength: response.length,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Agent chat error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send message to agent',
      message: error instanceof Error ? error.message : 'Chat processing failed',
      code: 'AGENT_CHAT_FAILED',
      timestamp: new Date().toISOString()
    });
  }
});

// Simple chat endpoint (fallback/legacy)
app.post('/api/chat', async (req, res) => {
  try {
    const { message, userId } = req.body;

    // Validation
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ 
        error: 'Valid message is required',
        code: 'INVALID_MESSAGE'
      });
    }

    // Try to use existing agent or create one
    if (userId) {
      try {
        let agentId = activeAgents.get(userId);
        
        if (!agentId) {
          console.log(`🤖 Creating agent for user ${userId} via legacy endpoint`);
          agentId = await createOmnidimensionAgent();
          activeAgents.set(userId, agentId);
        }

        const response = await sendMessageToAgent(agentId, message);
        
        return res.json({ 
          response,
          message: 'Response from Captain Focus agent',
          agentId,
          timestamp: new Date().toISOString(),
          status: 'success'
        });
      } catch (agentError) {
        console.warn('🔄 Agent failed, falling back to mock response:', agentError);
      }
    }

    // Fallback to mock response
    const mockResponse = `🎮 Hey there, brave scholar! I received your message: "${message}". I'm Captain Focus, ready to help you on your learning quest! Once the Omnidimension API is fully integrated, I'll provide amazing personalized responses. For now, I'm responding from the backend mock! ⚔️✨`;

    res.json({ 
      response: mockResponse,
      message: 'Mock response - Omnidimension agent integration needed',
      timestamp: new Date().toISOString(),
      status: 'mock'
    });

  } catch (error) {
    console.error('💥 Chat error:', error);
    
    res.status(500).json({ 
      error: 'Failed to process message',
      code: 'CHAT_FAILED',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
});

// Get agent status
app.get('/api/agent/status/:agentId', async (req, res) => {
  try {
    const { agentId } = req.params;
    
    // Check if agent exists in our active agents
    const isActive = Array.from(activeAgents.values()).includes(agentId);
    
    res.json({
      agentId,
      status: isActive ? 'active' : 'unknown',
      message: isActive ? 'Agent is active and ready' : 'Agent not found in active list',
      lastChecked: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to check agent status',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// List active agents (for debugging)
app.get('/api/agent/list', (req, res) => {
  const agents = Array.from(activeAgents.entries()).map(([userId, agentId]) => ({
    userId,
    agentId,
    created: new Date().toISOString() // In production, store actual creation time
  }));

  res.json({
    totalAgents: agents.length,
    agents,
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    code: 'NOT_FOUND',
    path: req.originalUrl,
    availableEndpoints: [
      'GET /',
      'GET /api/health',
      'GET /api/agent/health',
      'POST /api/agent/create',
      'POST /api/agent/chat',
      'POST /api/chat',
      'GET /api/agent/status/:agentId',
      'GET /api/agent/list'
    ],
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('🚨 Unhandled error:', error);
  res.status(500).json({
    error: 'Internal server error',
    code: 'INTERNAL_ERROR',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong',
    timestamp: new Date().toISOString()
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully...');
  console.log(`📊 Final stats: ${activeAgents.size} active agents`);
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT received, shutting down gracefully...');
  console.log(`📊 Final stats: ${activeAgents.size} active agents`);
  process.exit(0);
});

// Start server
const server = app.listen(PORT, () => {
  console.log('🚀 Captain Focus Backend Server Started');
  console.log(`📍 Port: ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔑 Omnidimension API Key: ${process.env.OMNIDIMENSION_API_KEY ? '✅ Configured' : '❌ Missing'}`);
  console.log(`⏰ Started at: ${new Date().toISOString()}`);
  console.log('✅ Server is ready for deployment!');
  console.log('🎮 Captain Focus agents ready to be created!');
  
  if (!process.env.OMNIDIMENSION_API_KEY) {
    console.warn('⚠️  WARNING: OMNIDIMENSION_API_KEY not found - some features will use mock responses');
  }
});

// Handle server errors
server.on('error', (error: NodeJS.ErrnoException) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use`);
  } else {
    console.error('❌ Server error:', error);
  }
  process.exit(1);
});

export default app;