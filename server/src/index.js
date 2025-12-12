import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { query } from './db/index.js';
import authRoutes from './routes/auth.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Health check route
app.get('/health', async (req, res) => {
  try {
    const result = await query('SELECT NOW()');
    res.json({
      status: 'ok',
      timestamp: result.rows[0].now,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Database connection failed',
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
