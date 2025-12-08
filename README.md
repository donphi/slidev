# Sli.dev Editor

A web-based presentation editor built on [Sli.dev](https://sli.dev/). Edit Markdown on the left, see your slides live on the right.

![Editor Screenshot](https://via.placeholder.com/800x400?text=Monaco+Editor+%7C+Live+Preview)

## Features

- 📝 **Monaco Editor** - Same editor as VS Code, with syntax highlighting and autocomplete
- 🔄 **Live Preview** - Changes hot-reload instantly in the preview pane
- 📄 **PDF Export** - Export your presentation to PDF
- 💾 **Auto-save warning** - Warns before leaving with unsaved changes
- ⌨️ **Keyboard shortcuts** - Ctrl/Cmd+S to save

## Project Structure

```
slidev/
├── presentation/          # Sli.dev presentation engine
│   ├── Dockerfile
│   ├── package.json
│   ├── slides.md          # Your presentation content
│   ├── components/        # Custom Vue components
│   ├── layouts/           # Slide layouts
│   ├── styles/            # CSS styles
│   └── public/            # Static assets (images)
│
├── editor/                # Editor service (Express + TypeScript)
│   ├── Dockerfile
│   ├── package.json
│   ├── src/               # TypeScript backend
│   │   └── server.ts
│   └── public/            # Frontend (Tailwind + Monaco)
│       └── index.html
│
├── docker-compose.yml     # Local development
├── Dockerfile.railway     # Railway deployment (combined)
└── railway.toml           # Railway config
```

## Quick Start (Local Development)

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) & Docker Compose

### Run Locally

```bash
# Start both services
docker-compose up --build

# Editor available at: http://localhost:3000
# Sli.dev direct:      http://localhost:3030
```

Open http://localhost:3000 to use the editor.

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
| `PORT` | `3000` | Editor server port |
| `SLIDES_PATH` | `/app/presentation/slides.md` | Path to slides file |
| `SLIDEV_URL` | `http://localhost:3030` | Internal Sli.dev URL |

### Exposed Ports

Railway exposes one port. The editor (port 3000) is the main entry point.  
The Sli.dev preview runs internally and is embedded via iframe.

**Note**: For Railway, you may need to configure the `SLIDEV_URL` to use the internal service URL.

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

Click the **Export PDF** button to open the print view.  
Use your browser's print dialog (Ctrl/Cmd + P) to save as PDF.

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

## Development

### Presentation Only

```bash
cd presentation
npm install
npm run dev
```

### Editor Only

```bash
cd editor
npm install
npm run dev
```

### Both Services

```bash
docker-compose up --build
```

## Troubleshooting

### Preview not loading

- Check that Sli.dev is running on port 3030
- Check browser console for iframe errors
- Some browsers block mixed content (HTTP/HTTPS)

### Changes not saving

- Check the terminal for API errors
- Ensure the presentation folder is mounted correctly

### PDF export not working

- Playwright/Chromium must be installed in the Sli.dev container
- Use `docker-compose run slidev npm run export` for CLI export

## License

MIT
