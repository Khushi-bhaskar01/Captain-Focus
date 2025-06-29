import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

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

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Captain Focus Backend API',
    version: '1.0.0',
    status: 'running',
    message: 'Backend is ready for Omnidimension integration!',
    endpoints: {
      health: '/api/health',
      chat: '/api/chat'
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
      port: PORT
    }
  });
});

// Simple chat endpoint (placeholder for Omnidimension integration)
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    // Validation
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ 
        error: 'Valid message is required',
        code: 'INVALID_MESSAGE'
      });
    }

    // TODO: Replace this with actual Omnidimension API integration
    const mockResponse = `🎮 Hey there, brave scholar! I received your message: "${message}". I'm Captain Focus, ready to help you on your learning quest! Once the Omnidimension API is integrated, I'll provide amazing personalized responses. For now, I'm just a simple backend ready for deployment! ⚔️✨`;

    res.json({ 
      response: mockResponse,
      message: 'This is a mock response. Integrate Omnidimension API to get real AI responses.',
      timestamp: new Date().toISOString(),
      status: 'success'
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

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    code: 'NOT_FOUND',
    path: req.originalUrl,
    availableEndpoints: ['/', '/api/health', '/api/chat'],
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('🚨 Unhandled error:', error);
  res.status(500).json({
    error: 'Internal server error',
    code: 'INTERNAL_ERROR',
    timestamp: new Date().toISOString()
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT received, shutting down gracefully...');
  process.exit(0);
});

// Start server
const server = app.listen(PORT, () => {
  console.log('🚀 Captain Focus Backend Server Started');
  console.log(`📍 Port: ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`⏰ Started at: ${new Date().toISOString()}`);
  console.log('✅ Server is ready for deployment!');
  console.log('🔧 Ready for Omnidimension API integration');
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