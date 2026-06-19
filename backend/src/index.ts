import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import winesRouter from './routes/wines';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || process.env.BACKEND_PORT || '3001');

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is running!' });
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({
    message: 'Welcome to WW - What Wine?',
    database: process.env.DATABASE_URL ? 'Connected' : 'Not configured'
  });
});

// Routes
app.use('/api/wines', winesRouter);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
  console.log(`🍷 Wines API: http://localhost:${PORT}/api/wines/search`);
});
