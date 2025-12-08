import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;
const SLIDES_PATH = process.env.SLIDES_PATH || '/app/presentation/slides.md';
const SLIDEV_URL = process.env.SLIDEV_URL || 'http://localhost:3030';
const EDITOR_PASSWORD = process.env.EDITOR_PASSWORD || '';

// Simple password authentication middleware
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Skip auth if no password is set (local development)
  if (!EDITOR_PASSWORD) {
    return next();
  }

  // Skip auth for health check endpoint
  if (req.path === '/api/health') {
    return next();
  }

  // Check for Basic Auth header
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Sli.dev Editor"');
    return res.status(401).send('Authentication required');
  }

  // Decode credentials (format: "Basic base64(username:password)")
  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
  const [username, password] = credentials.split(':');

  // Check password (username can be anything)
  if (password === EDITOR_PASSWORD) {
    return next();
  }

  res.setHeader('WWW-Authenticate', 'Basic realm="Sli.dev Editor"');
  return res.status(401).send('Invalid credentials');
};

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(authMiddleware);
app.use(express.static(path.join(__dirname, 'public')));

// API: Get configuration
app.get('/api/config', (_req: Request, res: Response) => {
  res.json({ 
    slidevUrl: SLIDEV_URL,
    appName: 'Sli.dev Editor'
  });
});

// API: Get slides content
app.get('/api/slides', (_req: Request, res: Response) => {
  try {
    if (!existsSync(SLIDES_PATH)) {
      console.error(`Slides file not found at: ${SLIDES_PATH}`);
      return res.status(404).json({ error: 'slides.md not found', path: SLIDES_PATH });
    }
    const content = readFileSync(SLIDES_PATH, 'utf-8');
    res.json({ content, path: SLIDES_PATH });
  } catch (err) {
    console.error('Failed to read slides:', err);
    res.status(500).json({ error: 'Failed to read slides' });
  }
});

// API: Save slides content
app.post('/api/slides', (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    if (typeof content !== 'string') {
      return res.status(400).json({ error: 'Content must be a string' });
    }
    writeFileSync(SLIDES_PATH, content, 'utf-8');
    console.log(`Slides saved to: ${SLIDES_PATH}`);
    res.json({ success: true, message: 'Saved! Sli.dev will auto-reload.' });
  } catch (err) {
    console.error('Failed to save slides:', err);
    res.status(500).json({ error: 'Failed to save slides' });
  }
});

// API: Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve frontend for all other routes
app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════╗
║           Sli.dev Editor Server                   ║
╠═══════════════════════════════════════════════════╣
║  Editor:    http://localhost:${PORT}              ║
║  Sli.dev:   ${SLIDEV_URL}                         ║
║  Slides:    ${SLIDES_PATH}                        ║
║  Auth:      ${EDITOR_PASSWORD ? '🔒 Password protected' : '🔓 Open (no password set)'}
╚═══════════════════════════════════════════════════╝
  `);
});

