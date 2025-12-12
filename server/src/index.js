import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { query } from './db/index.js';
import authRoutes from './routes/auth.js';
import cookieParser from 'cookie-parser';
import { authenticate } from './middleware/authenticate.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

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

app.get('/api/me', authenticate, async (req, res) => {
  const result = await query('SELECT id, email, created_at FROM users WHERE id = $1', [
    req.user.id,
  ]);

  if (result.rows.length === 0) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json({ user: result.rows[0] });
});
