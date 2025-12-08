# Sli.dev Editor

A web-based presentation editor built on [Sli.dev](https://sli.dev/). Edit Markdown on the left, see your slides live on the right.

![Editor Screenshot](https://via.placeholder.com/800x400?text=Monaco+Editor+%7C+Live+Preview)

## Features

- 📝 **Monaco Editor** - Same editor as VS Code, with syntax highlighting and autocomplete
- 🔄 **Live Preview** - Changes hot-reload instantly in the preview pane (via proxy)
- 📄 **PDF Export** - Export your presentation to PDF using Playwright
- 🎨 **Theme Editor** - Create and manage custom CSS themes
- 💾 **Version History** - Auto-backup on every save with restore capability
- 🗄️ **PostgreSQL Support** - Optional database for persistent storage and multiple presentations
- ⌨️ **Keyboard shortcuts** - Ctrl/Cmd+S to save

## Architecture

This project runs **both Editor and Slidev in a single container** for Railway deployment:

```
┌─────────────────────────────────────────────────────────────┐
│                    Single Container                         │
│                                                             │
│  ┌─────────────────────┐    ┌─────────────────────────────┐ │
│  │   Editor (Express)  │───▶│  Slidev (Vite dev server)   │ │
│  │   Port: $PORT       │    │  Port: 3030 (internal)      │ │
│  │                     │    │  Base: /slidev/             │ │
│  │  - API endpoints    │    │                             │ │
│  │  - Static frontend  │    │  - Hot-reload               │ │
│  │  - Proxy /slidev/*  │    │  - Live presentation        │ │
│  └─────────────────────┘    └─────────────────────────────┘ │
│           │                                                 │
│           ▼                                                 │
│  ┌─────────────────────┐                                    │
│  │  /app/userdata/     │  ← Railway Volume (persistent)     │
│  │  - slides.md        │                                    │
│  │  - style.css        │                                    │
│  └─────────────────────┘                                    │
└─────────────────────────────────────────────────────────────┘
```

## Project Structure

```
slidev/
├── presentation/          # Sli.dev presentation engine
│   ├── package.json       # Slidev dependencies
│   ├── slides.md          # Your presentation content
│   ├── style.css          # Global styles
│   ├── components/        # Custom Vue components
│   ├── layouts/           # Slide layouts
│   ├── styles/            # Additional CSS styles
│   └── public/            # Static assets (images)
│
├── editor/                # Editor service (Express + TypeScript)
│   ├── Dockerfile         # Local editor-only development
│   ├── package.json
│   ├── src/server.ts      # Backend with proxy to Slidev
│   └── public/index.html  # Frontend (Tailwind + Monaco)
│
├── docker-compose.yml     # Local development (uses Dockerfile.railway)
├── Dockerfile.railway     # Combined deployment (Editor + Slidev)
└── railway.toml           # Railway configuration
```

## Quick Start (Local Development)

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) & Docker Compose
- Node.js 20+ (for native development - recommended for fastest HMR)

### Option 1: Native Development (FASTEST HMR) ⚡

For the fastest possible hot-reload experience, run Slidev natively:

```bash
# Terminal 1: Start Slidev
cd presentation
npm install
npm run dev:local

# Terminal 2: Start Editor (optional - or just edit slides.md directly)
cd editor
npm install
npm run dev
```

**Instant HMR** - changes appear in < 100ms!

### Option 2: Docker Development (Optimized)

Use the optimized local development compose file:

```bash
# Start with optimized file watching
docker-compose -f docker-compose.local.yml up --build

# Slidev: http://localhost:3030
# Editor: http://localhost:3000
```

### Option 3: Docker Combined Container (Production-like)

```bash
# Start the combined container (like Railway)
docker-compose up --build

# Editor available at: http://localhost:3000
# Preview accessible via: http://localhost:3000/slidev/
```

Open http://localhost:3000 to use the editor.

### File Watching Performance

The development setup uses native file system events (inotify on Linux) for **instant HMR**. 

If you're on **Windows/macOS with Docker Desktop**, you may need to enable polling:

```bash
# For Docker Desktop (Windows/macOS) - slower but necessary
CHOKIDAR_USEPOLLING=true docker-compose up --build
```

## Deployment to Railway

### One-Click Deploy

1. Push this repo to GitHub
2. Go to [Railway](https://railway.app)
3. Click "New Project" → "Deploy from GitHub"
4. Select this repository
5. Railway will automatically detect `railway.toml` and use `Dockerfile.railway`

### Environment Variables (Railway)

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Editor server port (Railway sets this) |
| `DATABASE_URL` | - | PostgreSQL connection string (optional) |
| `EDITOR_PASSWORD` | - | Password protection (optional) |
| `MAX_HISTORY` | `10` | Number of backups to keep |

### Volume Mount (Railway)

Mount a volume to `/app/userdata` to persist your slides and styles between deployments.

### How It Works

1. **Single Port**: Railway only exposes the Editor's port (`$PORT`)
2. **Proxy**: The Editor proxies `/slidev/*` requests to the internal Slidev server
3. **Base Path**: Slidev runs with `--base /slidev/` so all assets load correctly through the proxy
4. **Hot Reload**: WebSocket connections are proxied for live updates

## Usage

### Editing Slides

1. Open the editor at http://localhost:3000 (or your Railway URL)
2. Edit Markdown in the left panel
3. Press **Ctrl/Cmd + S** or click **Save** to update
4. Preview auto-refreshes on the right

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + S` | Save and refresh preview |

### Export to PDF

Click the **Export PDF** button. The server uses Slidev's built-in export with Playwright/Chromium.

### Download Markdown

Click **Download** to save your `slides.md` file locally.

## Customization

### Presentation Theme

Edit files in `presentation/`:

- **`style.css`** - Global CSS variables and overrides
- **`styles/`** - Core theme styles
- **`layouts/`** - Vue layout components
- **`components/`** - Custom Vue components

### Editor Theme

Edit `editor/public/index.html`:

- Monaco editor theme: Change `theme: 'vs-dark'` to `'vs'` for light mode
- Tailwind styles: Modify the HTML classes

## Development (Without Docker)

### Editor Only

```bash
cd editor
npm install
npm run dev
```

### Presentation Only

```bash
cd presentation
npm install
npm run dev
```

Note: When running separately, you'll need to update `SLIDEV_URL` in the editor to point to the Slidev server.

## Troubleshooting

### Slow rebuilds / HMR not working ⚠️

If changes take a long time to appear (10+ seconds), check:

1. **File watching mode**: 
   - On **Linux**: Should use `inotify` (instant). Ensure `CHOKIDAR_USEPOLLING=false`
   - On **Docker Desktop (Windows/macOS)**: Must use polling. Set `CHOKIDAR_USEPOLLING=true`

2. **Full restart vs HMR**:
   - If you see `restarting on config change...` in logs, Slidev is doing a **full restart**
   - This happens when you edit the frontmatter (first `---` block) of your slides
   - **Content-only edits** should use fast HMR without restart

3. **Best solution**: Run Slidev **natively** for fastest HMR:
   ```bash
   cd presentation && npm run dev:local
   ```

4. **Volume mounts**: Use `docker-compose.local.yml` which mounts the entire folder for better performance

### Preview not loading (blank screen)

- Ensure Slidev is running with `--base /slidev/`
- Check browser console for proxy errors
- Verify the Editor's `/slidev` proxy is working

### Changes not saving

- Check the terminal for API errors
- Verify volume mount is correct (Railway: `/app/userdata`)

### PDF export not working

- Playwright/Chromium is installed in `Dockerfile.railway`
- Check logs for Chromium errors
- Export can take 30-60 seconds for complex presentations

## License

MIT
