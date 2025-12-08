import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, unlinkSync, statSync } from 'fs';
import path from 'path';
import { Pool } from 'pg';
import { exec } from 'child_process';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const PORT = process.env.PORT || 3000;
const SLIDES_PATH = process.env.SLIDES_PATH || '/app/presentation/slides.md';
const PRESENTATION_DIR = path.dirname(SLIDES_PATH);
// SLIDEV_DIR is where Sli.dev is installed (has package.json, node_modules)
// This may differ from PRESENTATION_DIR on Railway where userdata is separate
const SLIDEV_DIR = process.env.SLIDEV_DIR || PRESENTATION_DIR;
const SLIDEV_URL = process.env.SLIDEV_URL || 'http://localhost:3030';
const EDITOR_PASSWORD = process.env.EDITOR_PASSWORD || '';
const MAX_HISTORY = parseInt(process.env.MAX_HISTORY || '10', 10);
const DATABASE_URL = process.env.DATABASE_URL || '';

// Database connection (optional - falls back to file system if not configured)
let db: Pool | null = null;

const initDatabase = async () => {
  if (!DATABASE_URL) {
    console.log('📁 No DATABASE_URL - using file system storage');
    return;
  }

  try {
    db = new Pool({
      connectionString: DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    });

    // Create tables if they don't exist
    await db.query(`
      CREATE TABLE IF NOT EXISTS presentations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        content TEXT NOT NULL,
        theme_name VARCHAR(255) DEFAULT 'default',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS history (
        id SERIAL PRIMARY KEY,
        presentation_name VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS themes (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE INDEX IF NOT EXISTS idx_history_name ON history(presentation_name);
      CREATE INDEX IF NOT EXISTS idx_history_created ON history(created_at DESC);
    `);
    
    // Add theme_name column to presentations if it doesn't exist (migration)
    await db.query(`
      DO $$ 
      BEGIN 
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='presentations' AND column_name='theme_name') THEN
          ALTER TABLE presentations ADD COLUMN theme_name VARCHAR(255) DEFAULT 'default';
        END IF;
      END $$;
    `);

    console.log('🗄️  Database connected and initialized');
    
    // Migrate existing file to database if it exists
    await migrateFileToDb();
  } catch (err) {
    console.error('Database connection failed:', err);
    console.log('📁 Falling back to file system storage');
    db = null;
  }
};

// Migrate existing slides.md to database
const migrateFileToDb = async () => {
  if (!db) return;
  
  try {
    // Check if default presentation exists in DB
    const result = await db.query('SELECT id FROM presentations WHERE name = $1', ['slides.md']);
    
    if (result.rows.length === 0 && existsSync(SLIDES_PATH)) {
      // Migrate file to database
      const content = readFileSync(SLIDES_PATH, 'utf-8');
      await db.query(
        'INSERT INTO presentations (name, content) VALUES ($1, $2)',
        ['slides.md', content]
      );
      console.log('📥 Migrated slides.md to database');
    }
  } catch (err) {
    console.error('Migration error:', err);
  }
};

// ==========================================
// FILE SYSTEM FUNCTIONS (fallback)
// ==========================================
const HISTORY_DIR = path.join(path.dirname(SLIDES_PATH), '.history');

const ensureHistoryDir = () => {
  if (!existsSync(HISTORY_DIR)) {
    mkdirSync(HISTORY_DIR, { recursive: true });
  }
};

const createFileBackup = () => {
  ensureHistoryDir();
  if (!existsSync(SLIDES_PATH)) return;

  const content = readFileSync(SLIDES_PATH, 'utf-8');
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = path.join(HISTORY_DIR, `slides-${timestamp}.md`);
  writeFileSync(backupPath, content, 'utf-8');
  cleanupOldFileBackups();
};

const cleanupOldFileBackups = () => {
  const files = readdirSync(HISTORY_DIR)
    .filter(f => f.startsWith('slides-') && f.endsWith('.md'))
    .sort()
    .reverse();
  
  files.slice(MAX_HISTORY).forEach(file => {
    unlinkSync(path.join(HISTORY_DIR, file));
  });
};

const getFileBackupList = () => {
  ensureHistoryDir();
  const files = readdirSync(HISTORY_DIR)
    .filter(f => f.startsWith('slides-') && f.endsWith('.md'))
    .sort()
    .reverse();
  
  return files.map((file, index) => ({
    id: index,
    filename: file,
    timestamp: file.replace('slides-', '').replace('.md', ''),
    label: index === 0 ? 'Latest backup' : `${index + 1} saves ago`
  }));
};

// ==========================================
// DATABASE FUNCTIONS
// ==========================================
const createDbBackup = async (name: string, content: string) => {
  if (!db) return;
  
  await db.query(
    'INSERT INTO history (presentation_name, content) VALUES ($1, $2)',
    [name, content]
  );
  
  // Cleanup old backups
  await db.query(`
    DELETE FROM history WHERE id IN (
      SELECT id FROM history 
      WHERE presentation_name = $1 
      ORDER BY created_at DESC 
      OFFSET $2
    )
  `, [name, MAX_HISTORY]);
};

const getDbBackupList = async (name: string) => {
  if (!db) return [];
  
  const result = await db.query(
    'SELECT id, created_at FROM history WHERE presentation_name = $1 ORDER BY created_at DESC LIMIT $2',
    [name, MAX_HISTORY]
  );
  
  return result.rows.map((row, index) => ({
    id: row.id,
    timestamp: row.created_at,
    label: index === 0 ? 'Latest backup' : `${index + 1} saves ago`
  }));
};

// ==========================================
// AUTHENTICATION
// ==========================================
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!EDITOR_PASSWORD) return next();
  if (req.path === '/api/health') return next();

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Sli.dev Editor"');
    return res.status(401).send('Authentication required');
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
  const [, password] = credentials.split(':');

  if (password === EDITOR_PASSWORD) return next();

  res.setHeader('WWW-Authenticate', 'Basic realm="Sli.dev Editor"');
  return res.status(401).send('Invalid credentials');
};

// ==========================================
// EXPRESS SETUP
// ==========================================
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(authMiddleware);
app.use(express.static(path.join(__dirname, 'public')));

// ==========================================
// SLIDEV PROXY
// Proxy /slidev/* requests to the internal Slidev server
// This allows external users to access Slidev through the editor
// ==========================================
app.use('/slidev', createProxyMiddleware({
  target: SLIDEV_URL,
  changeOrigin: true,
  ws: true,  // Enable WebSocket proxy for HMR
  // Express removes the mount path before forwarding. Ensure Slidev's base path
  // (`/slidev`) is always present without duplicating it.
  pathRewrite: (path) => {
    if (!path || path === '/') return '/slidev/';
    return path.startsWith('/slidev') ? path : `/slidev${path}`;
  },
  on: {
    proxyReq: (proxyReq, req) => {
      const originalPath = req.originalUrl || req.url || '/';
      const finalPath = (proxyReq.path || '').startsWith('/')
        ? proxyReq.path
        : `/${proxyReq.path}`;
      console.log(`🔀 Proxy: ${req.method} ${originalPath} -> ${SLIDEV_URL}${finalPath}`);
    },
    error: (err) => {
      console.error('❌ Proxy error:', err.message);
    }
  }
}));

// ==========================================
// API ENDPOINTS
// ==========================================

// Config
app.get('/api/config', (_req: Request, res: Response) => {
  res.json({ 
    // Always use proxy route - never expose internal localhost URL
    slidevUrl: '/slidev',
    appName: 'Sli.dev Editor',
    maxHistory: MAX_HISTORY,
    hasDatabase: !!db
  });
});

// List all presentations
app.get('/api/presentations', async (_req: Request, res: Response) => {
  try {
    if (db) {
      const result = await db.query('SELECT name, updated_at FROM presentations ORDER BY updated_at DESC');
      res.json({ presentations: result.rows });
    } else {
      // File system: just return the default file
      res.json({ presentations: [{ name: 'slides.md', updated_at: new Date() }] });
    }
  } catch (err) {
    console.error('List presentations error:', err);
    res.status(500).json({ error: 'Failed to list presentations' });
  }
});

// Get slides content
app.get('/api/slides', async (req: Request, res: Response) => {
  const name = (req.query.name as string) || 'slides.md';
  
  try {
    if (db) {
      const result = await db.query('SELECT content FROM presentations WHERE name = $1', [name]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Presentation not found' });
      }
      res.json({ content: result.rows[0].content, name });
    } else {
      if (!existsSync(SLIDES_PATH)) {
        return res.status(404).json({ error: 'slides.md not found' });
      }
      const content = readFileSync(SLIDES_PATH, 'utf-8');
      res.json({ content, name: 'slides.md' });
    }
  } catch (err) {
    console.error('Get slides error:', err);
    res.status(500).json({ error: 'Failed to get slides' });
  }
});

// Save slides content
app.post('/api/slides', async (req: Request, res: Response) => {
  const { content, name = 'slides.md' } = req.body;
  
  if (typeof content !== 'string') {
    return res.status(400).json({ error: 'Content must be a string' });
  }
  
  try {
    if (db) {
      // Get current content for backup
      const current = await db.query('SELECT content FROM presentations WHERE name = $1', [name]);
      if (current.rows.length > 0) {
        await createDbBackup(name, current.rows[0].content);
      }
      
      // Upsert presentation
      await db.query(`
        INSERT INTO presentations (name, content, updated_at) 
        VALUES ($1, $2, CURRENT_TIMESTAMP)
        ON CONFLICT (name) 
        DO UPDATE SET content = $2, updated_at = CURRENT_TIMESTAMP
      `, [name, content]);
    } else {
      createFileBackup();
      writeFileSync(SLIDES_PATH, content, 'utf-8');
    }
    
    // Also write to file system so Sli.dev can read it
    writeFileSync(SLIDES_PATH, content, 'utf-8');
    
    res.json({ success: true, message: 'Saved!' });
  } catch (err) {
    console.error('Save error:', err);
    res.status(500).json({ error: 'Failed to save' });
  }
});

// Create new presentation
app.post('/api/presentations', async (req: Request, res: Response) => {
  const { name, content = '' } = req.body;
  
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'Name is required' });
  }
  
  try {
    if (db) {
      await db.query(
        'INSERT INTO presentations (name, content) VALUES ($1, $2)',
        [name, content]
      );
      res.json({ success: true, name });
    } else {
      res.status(400).json({ error: 'Database required for multiple presentations' });
    }
  } catch (err: any) {
    if (err.code === '23505') {
      return res.status(409).json({ error: 'Presentation already exists' });
    }
    console.error('Create presentation error:', err);
    res.status(500).json({ error: 'Failed to create presentation' });
  }
});

// Delete presentation
app.delete('/api/presentations/:name', async (req: Request, res: Response) => {
  const { name } = req.params;
  
  if (name === 'slides.md') {
    return res.status(400).json({ error: 'Cannot delete default presentation' });
  }
  
  try {
    if (db) {
      await db.query('DELETE FROM history WHERE presentation_name = $1', [name]);
      await db.query('DELETE FROM presentations WHERE name = $1', [name]);
      res.json({ success: true });
    } else {
      res.status(400).json({ error: 'Database required' });
    }
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: 'Failed to delete' });
  }
});

// Get history
app.get('/api/history', async (req: Request, res: Response) => {
  const name = (req.query.name as string) || 'slides.md';
  
  try {
    if (db) {
      const backups = await getDbBackupList(name);
      res.json({ backups, maxHistory: MAX_HISTORY });
    } else {
      const backups = getFileBackupList();
      res.json({ backups, maxHistory: MAX_HISTORY });
    }
  } catch (err) {
    console.error('History error:', err);
    res.status(500).json({ error: 'Failed to get history' });
  }
});

// Get specific backup
app.get('/api/history/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const name = (req.query.name as string) || 'slides.md';
  
  try {
    if (db) {
      const result = await db.query('SELECT content, created_at FROM history WHERE id = $1', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Backup not found' });
      }
      res.json({ content: result.rows[0].content, timestamp: result.rows[0].created_at });
    } else {
      const backups = getFileBackupList();
      const idx = parseInt(id, 10);
      if (idx < 0 || idx >= backups.length) {
        return res.status(404).json({ error: 'Backup not found' });
      }
      const filePath = path.join(HISTORY_DIR, backups[idx].filename);
      const content = readFileSync(filePath, 'utf-8');
      res.json({ content, backup: backups[idx] });
    }
  } catch (err) {
    console.error('Get backup error:', err);
    res.status(500).json({ error: 'Failed to get backup' });
  }
});

// Restore from backup
app.post('/api/history/restore/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const name = (req.query.name as string) || 'slides.md';
  
  try {
    let restoredContent: string;
    
    if (db) {
      // Get backup content
      const backup = await db.query('SELECT content FROM history WHERE id = $1', [id]);
      if (backup.rows.length === 0) {
        return res.status(404).json({ error: 'Backup not found' });
      }
      restoredContent = backup.rows[0].content;
      
      // Backup current content first
      const current = await db.query('SELECT content FROM presentations WHERE name = $1', [name]);
      if (current.rows.length > 0) {
        await createDbBackup(name, current.rows[0].content);
      }
      
      // Restore
      await db.query(
        'UPDATE presentations SET content = $1, updated_at = CURRENT_TIMESTAMP WHERE name = $2',
        [restoredContent, name]
      );
    } else {
      const backups = getFileBackupList();
      const idx = parseInt(id, 10);
      if (idx < 0 || idx >= backups.length) {
        return res.status(404).json({ error: 'Backup not found' });
      }
      
      createFileBackup();
      const filePath = path.join(HISTORY_DIR, backups[idx].filename);
      restoredContent = readFileSync(filePath, 'utf-8');
      writeFileSync(SLIDES_PATH, restoredContent, 'utf-8');
    }
    
    // Write to file system for Sli.dev
    writeFileSync(SLIDES_PATH, restoredContent, 'utf-8');
    
    res.json({ success: true, content: restoredContent });
  } catch (err) {
    console.error('Restore error:', err);
    res.status(500).json({ error: 'Failed to restore' });
  }
});

// ==========================================
// THEMES
// ==========================================
// STYLE_PATH can be overridden via env var (for Railway where userdata is separate)
const STYLE_PATH = process.env.STYLE_PATH || path.join(PRESENTATION_DIR, 'style.css');

// Get default theme content from file
const getDefaultTheme = (): string => {
  console.log('🎨 Loading default theme from:', STYLE_PATH);
  console.log('   File exists:', existsSync(STYLE_PATH));
  
  if (existsSync(STYLE_PATH)) {
    try {
      const content = readFileSync(STYLE_PATH, 'utf-8');
      console.log('   Content length:', content.length, 'chars');
      return content;
    } catch (err) {
      console.error('   Error reading style.css:', err);
    }
  } else {
    // List directory contents for debugging
    try {
      const files = readdirSync(PRESENTATION_DIR);
      console.log('   Files in directory:', files.join(', '));
    } catch (e) {
      console.log('   Could not list directory');
    }
  }
  
  return '/* Default theme - style.css not found */';
};

// API: List all themes
app.get('/api/themes', async (_req: Request, res: Response) => {
  try {
    const themes = [{ name: 'default', isDefault: true, updatedAt: null }];
    
    if (db) {
      const result = await db.query('SELECT name, updated_at FROM themes ORDER BY name');
      themes.push(...result.rows.map(r => ({ name: r.name, isDefault: false, updatedAt: r.updated_at })));
    }
    
    res.json({ themes });
  } catch (err) {
    console.error('List themes error:', err);
    res.status(500).json({ error: 'Failed to list themes' });
  }
});

// API: Get theme content
app.get('/api/themes/:name', async (req: Request, res: Response) => {
  const { name } = req.params;
  
  try {
    if (name === 'default') {
      return res.json({ name: 'default', content: getDefaultTheme(), isDefault: true });
    }
    
    if (!db) {
      return res.status(404).json({ error: 'Theme not found' });
    }
    
    const result = await db.query('SELECT content FROM themes WHERE name = $1', [name]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Theme not found' });
    }
    
    res.json({ name, content: result.rows[0].content, isDefault: false });
  } catch (err) {
    console.error('Get theme error:', err);
    res.status(500).json({ error: 'Failed to get theme' });
  }
});

// API: Create/Update theme (Save As)
app.post('/api/themes', async (req: Request, res: Response) => {
  const { name, content } = req.body;
  
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'Theme name is required' });
  }
  
  if (name === 'default') {
    return res.status(400).json({ error: 'Cannot overwrite default theme. Use a different name.' });
  }
  
  if (typeof content !== 'string') {
    return res.status(400).json({ error: 'Content must be a string' });
  }
  
  if (!db) {
    return res.status(400).json({ error: 'Database required for custom themes' });
  }
  
  try {
    await db.query(`
      INSERT INTO themes (name, content) VALUES ($1, $2)
      ON CONFLICT (name) DO UPDATE SET content = $2, updated_at = CURRENT_TIMESTAMP
    `, [name, content]);
    
    res.json({ success: true, name });
  } catch (err) {
    console.error('Save theme error:', err);
    res.status(500).json({ error: 'Failed to save theme' });
  }
});

// API: Delete theme
app.delete('/api/themes/:name', async (req: Request, res: Response) => {
  const { name } = req.params;
  
  if (name === 'default') {
    return res.status(400).json({ error: 'Cannot delete default theme' });
  }
  
  if (!db) {
    return res.status(400).json({ error: 'Database required' });
  }
  
  try {
    await db.query('DELETE FROM themes WHERE name = $1', [name]);
    res.json({ success: true });
  } catch (err) {
    console.error('Delete theme error:', err);
    res.status(500).json({ error: 'Failed to delete theme' });
  }
});

// API: Apply theme to presentation (writes to style.css)
app.post('/api/themes/apply', async (req: Request, res: Response) => {
  const { themeName, presentationName = 'slides.md' } = req.body;
  
  try {
    let cssContent: string;
    
    if (themeName === 'default') {
      // Read original default theme from file (or use current)
      cssContent = getDefaultTheme();
    } else if (db) {
      const result = await db.query('SELECT content FROM themes WHERE name = $1', [themeName]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Theme not found' });
      }
      cssContent = result.rows[0].content;
    } else {
      return res.status(400).json({ error: 'Theme not found' });
    }
    
    // Write CSS to style.css
    writeFileSync(STYLE_PATH, cssContent, 'utf-8');
    
    // Update presentation's theme reference in DB
    if (db) {
      await db.query(
        'UPDATE presentations SET theme_name = $1 WHERE name = $2',
        [themeName, presentationName]
      );
    }
    
    console.log(`Applied theme "${themeName}" to ${presentationName}`);
    res.json({ success: true, message: `Theme "${themeName}" applied` });
  } catch (err) {
    console.error('Apply theme error:', err);
    res.status(500).json({ error: 'Failed to apply theme' });
  }
});

// API: Get current applied theme for presentation
app.get('/api/themes/current', async (req: Request, res: Response) => {
  const name = (req.query.presentation as string) || 'slides.md';
  
  try {
    if (db) {
      const result = await db.query('SELECT theme_name FROM presentations WHERE name = $1', [name]);
      if (result.rows.length > 0 && result.rows[0].theme_name) {
        return res.json({ themeName: result.rows[0].theme_name });
      }
    }
    res.json({ themeName: 'default' });
  } catch (err) {
    res.json({ themeName: 'default' });
  }
});

// ==========================================
// PDF EXPORT
// ==========================================
// PDF is exported to SLIDEV_DIR (where Sli.dev runs from)
const PDF_PATH = path.join(SLIDEV_DIR, 'slides-export.pdf');
let exportInProgress = false;

// Helper to find the exported PDF (Sli.dev may use different names)
const findExportedPdf = (): string | null => {
  // Check common export filenames in SLIDEV_DIR
  const possibleNames = ['slides-export.pdf', 'export.pdf', 'slides.pdf'];
  
  for (const name of possibleNames) {
    const pdfPath = path.join(SLIDEV_DIR, name);
    if (existsSync(pdfPath)) {
      return pdfPath;
    }
  }
  
  // Also check for any .pdf file in the directory
  try {
    const files = readdirSync(SLIDEV_DIR);
    const pdfFile = files.find(f => f.endsWith('.pdf'));
    if (pdfFile) {
      return path.join(SLIDEV_DIR, pdfFile);
    }
  } catch (e) {
    // Ignore
  }
  
  return null;
};

// API: Export to PDF using Slidev's official export command
// This uses playwright-chromium under the hood - Slidev's recommended approach
app.post('/api/export', async (_req: Request, res: Response) => {
  if (exportInProgress) {
    return res.status(409).json({ error: 'Export already in progress. Please wait.' });
  }
  
  exportInProgress = true;
  const outputPath = path.join(SLIDEV_DIR, 'slides-export.pdf');
  
  console.log('📄 Starting PDF export with Slidev CLI...');
  console.log(`   Working directory: ${SLIDEV_DIR}`);
  console.log(`   Output: ${outputPath}`);
  
  try {
    // Use Slidev's official export command (uses playwright-chromium)
    // --timeout: Allow enough time for complex slides
    // --output: Specify output path
    const exportCmd = `npx slidev export --output "${outputPath}" --timeout 120000`;
    
    console.log('   Running:', exportCmd);
    
    const result = await new Promise<{ stdout: string; stderr: string }>((resolve, reject) => {
      exec(exportCmd, { 
        cwd: SLIDEV_DIR,          // Run from Slidev directory
        timeout: 180000,          // 3 minutes total timeout
        env: {
          ...process.env,
          // Playwright container-safe environment variables
          PLAYWRIGHT_BROWSERS_PATH: '/ms-playwright',
          // Force default base for export so Slidev doesn't expect /slidev/ prefix
          SLIDEV_BASE: '/',
        }
      }, (error, stdout, stderr) => {
        if (error) {
          reject({ error, stdout, stderr });
        } else {
          resolve({ stdout, stderr });
        }
      });
    });
    
    console.log('📄 Slidev export completed');
    if (result.stdout) console.log('   stdout:', result.stdout);
    if (result.stderr) console.log('   stderr:', result.stderr);
    
    // Check if PDF was created
    if (existsSync(outputPath)) {
      exportInProgress = false;
      const stats = statSync(outputPath);
      console.log(`✅ PDF created: ${outputPath} (${Math.round(stats.size / 1024)} KB)`);
      res.json({ success: true, message: 'PDF exported successfully', downloadUrl: '/api/export/download' });
    } else {
      exportInProgress = false;
      console.error('❌ PDF file not created');
      res.status(500).json({ error: 'PDF file not created. Check server logs.' });
    }
  } catch (err: any) {
    exportInProgress = false;
    const errorMsg = err?.error?.message || err?.message || 'Unknown error';
    const stdout = err?.stdout || '';
    const stderr = err?.stderr || '';
    
    console.error('❌ Export failed:', errorMsg);
    if (stdout) console.error('   stdout:', stdout);
    if (stderr) console.error('   stderr:', stderr);
    
    res.status(500).json({ error: `Export failed: ${stderr || stdout || errorMsg}`.slice(0, 500) });
  }
});

// API: Download exported PDF
app.get('/api/export/download', (_req: Request, res: Response) => {
  const pdfPath = findExportedPdf();
  
  if (!pdfPath) {
    return res.status(404).json({ error: 'No PDF available. Run export first.' });
  }
  
  console.log('📥 Downloading PDF from:', pdfPath);
  
  res.download(pdfPath, 'presentation.pdf', (err) => {
    if (err) {
      console.error('Download error:', err);
    }
  });
});

// API: Check export status
app.get('/api/export/status', (_req: Request, res: Response) => {
  const pdfPath = findExportedPdf();
  res.json({
    inProgress: exportInProgress,
    pdfAvailable: !!pdfPath,
    pdfPath: pdfPath || null
  });
});

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), hasDatabase: !!db });
});

// Serve frontend
app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// ==========================================
// START SERVER
// ==========================================
const start = async () => {
  // Log paths for debugging
  console.log('📂 Path Configuration:');
  console.log(`   SLIDES_PATH: ${SLIDES_PATH}`);
  console.log(`   PRESENTATION_DIR: ${PRESENTATION_DIR}`);
  console.log(`   SLIDEV_DIR: ${SLIDEV_DIR}`);
  console.log(`   STYLE_PATH: ${STYLE_PATH}`);
  console.log(`   style.css exists: ${existsSync(STYLE_PATH)}`);
  
  await initDatabase();
  
  app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════════╗
║           Sli.dev Editor Server                   ║
╠═══════════════════════════════════════════════════╣
║  Editor:    http://localhost:${PORT}              
║  Sli.dev:   ${SLIDEV_URL}
║  Storage:   ${db ? '🗄️  PostgreSQL' : '📁 File System'}
║  History:   ${MAX_HISTORY} backups
║  Auth:      ${EDITOR_PASSWORD ? '🔒 Password protected' : '🔓 Open'}
╚═══════════════════════════════════════════════════╝
    `);
  });
};

start();
