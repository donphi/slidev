import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, unlinkSync } from 'fs';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;
const SLIDES_PATH = process.env.SLIDES_PATH || '/app/presentation/slides.md';
const SLIDEV_URL = process.env.SLIDEV_URL || 'http://localhost:3030';
const EDITOR_PASSWORD = process.env.EDITOR_PASSWORD || '';
const MAX_HISTORY = parseInt(process.env.MAX_HISTORY || '10', 10); // Keep last 10 versions

// History directory (next to slides.md)
const HISTORY_DIR = path.join(path.dirname(SLIDES_PATH), '.history');

// Ensure history directory exists
const ensureHistoryDir = () => {
  if (!existsSync(HISTORY_DIR)) {
    mkdirSync(HISTORY_DIR, { recursive: true });
  }
};

// Create a backup before saving
const createBackup = () => {
  ensureHistoryDir();
  
  if (!existsSync(SLIDES_PATH)) {
    return; // Nothing to backup
  }

  const content = readFileSync(SLIDES_PATH, 'utf-8');
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = path.join(HISTORY_DIR, `slides-${timestamp}.md`);
  
  writeFileSync(backupPath, content, 'utf-8');
  console.log(`Backup created: ${backupPath}`);
  
  // Clean up old backups (keep only MAX_HISTORY)
  cleanupOldBackups();
};

// Remove old backups beyond MAX_HISTORY
const cleanupOldBackups = () => {
  const files = readdirSync(HISTORY_DIR)
    .filter(f => f.startsWith('slides-') && f.endsWith('.md'))
    .sort()
    .reverse(); // Newest first
  
  // Delete files beyond MAX_HISTORY
  files.slice(MAX_HISTORY).forEach(file => {
    const filePath = path.join(HISTORY_DIR, file);
    unlinkSync(filePath);
    console.log(`Deleted old backup: ${file}`);
  });
};

// Get list of backups with metadata
const getBackupList = () => {
  ensureHistoryDir();
  
  const files = readdirSync(HISTORY_DIR)
    .filter(f => f.startsWith('slides-') && f.endsWith('.md'))
    .sort()
    .reverse(); // Newest first
  
  return files.map((file, index) => {
    // Extract timestamp from filename: slides-2024-12-08T10-30-45-123Z.md
    const match = file.match(/slides-(.+)\.md/);
    const timestamp = match ? match[1].replace(/-/g, (m, offset) => {
      // Restore colons and dots in timestamp
      if (offset === 13 || offset === 16) return ':';
      if (offset === 19) return '.';
      return m;
    }) : file;
    
    return {
      id: index,
      filename: file,
      timestamp: timestamp,
      label: index === 0 ? 'Latest backup' : `${index + 1} saves ago`
    };
  });
};

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
    appName: 'Sli.dev Editor',
    maxHistory: MAX_HISTORY
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

// API: Save slides content (with automatic backup)
app.post('/api/slides', (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    if (typeof content !== 'string') {
      return res.status(400).json({ error: 'Content must be a string' });
    }
    
    // Create backup before saving
    createBackup();
    
    // Save new content
    writeFileSync(SLIDES_PATH, content, 'utf-8');
    console.log(`Slides saved to: ${SLIDES_PATH}`);
    res.json({ success: true, message: 'Saved! Sli.dev will auto-reload.' });
  } catch (err) {
    console.error('Failed to save slides:', err);
    res.status(500).json({ error: 'Failed to save slides' });
  }
});

// API: Get backup history list
app.get('/api/history', (_req: Request, res: Response) => {
  try {
    const backups = getBackupList();
    res.json({ backups, maxHistory: MAX_HISTORY });
  } catch (err) {
    console.error('Failed to get history:', err);
    res.status(500).json({ error: 'Failed to get history' });
  }
});

// API: Get specific backup content
app.get('/api/history/:id', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const backups = getBackupList();
    
    if (id < 0 || id >= backups.length) {
      return res.status(404).json({ error: 'Backup not found' });
    }
    
    const backup = backups[id];
    const filePath = path.join(HISTORY_DIR, backup.filename);
    const content = readFileSync(filePath, 'utf-8');
    
    res.json({ content, backup });
  } catch (err) {
    console.error('Failed to get backup:', err);
    res.status(500).json({ error: 'Failed to get backup' });
  }
});

// API: Restore from backup
app.post('/api/history/restore/:id', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const backups = getBackupList();
    
    if (id < 0 || id >= backups.length) {
      return res.status(404).json({ error: 'Backup not found' });
    }
    
    // Create backup of current state before restoring
    createBackup();
    
    const backup = backups[id];
    const filePath = path.join(HISTORY_DIR, backup.filename);
    const content = readFileSync(filePath, 'utf-8');
    
    // Restore
    writeFileSync(SLIDES_PATH, content, 'utf-8');
    console.log(`Restored from backup: ${backup.filename}`);
    
    res.json({ success: true, message: `Restored from: ${backup.label}`, content });
  } catch (err) {
    console.error('Failed to restore:', err);
    res.status(500).json({ error: 'Failed to restore from backup' });
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
║  History:   ${MAX_HISTORY} backups                ║
║  Auth:      ${EDITOR_PASSWORD ? '🔒 Password protected' : '🔓 Open (no password set)'}
╚═══════════════════════════════════════════════════╝
  `);
});
