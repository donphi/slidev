# Slidev Docker Setup

This project contains a Dockerized setup for [Slidev](https://sli.dev/), allowing you to create and present developer-friendly slides using Markdown.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed on your machine.
- [Docker Compose](https://docs.docker.com/compose/install/) (often included with Docker Desktop).

## Getting Started

1.  **Start the container**:
    ```bash
    docker-compose up
    ```

2.  **Access the slides**:
    Open your browser and visit: [http://localhost:3030](http://localhost:3030)

## Configuration & Customization

### 1. Styles
- **`style.css`**: Your custom global overrides.
- **`styles/` Folder**: Contains the core theme styles (`layouts.css`, `prism.css`). Edit these to change the fundamental theme look.

### 2. Layouts (`layouts/` Folder)
You now have the full source code for the default layouts (`cover.vue`, `intro.vue`, etc.).
- Edit these `.vue` files to permanently change the structure of slides using these layouts.
- You can create new layouts here (e.g., `layouts/my-layout.vue`) and use them in your slides with `layout: my-layout`.

### 3. Slides (`slides.md`)
This is your presentation content.
- **Backgrounds**:
    - **Default**: Change `background: ...` in the top frontmatter.
    - **Override**: Add `background: url(...)` to the frontmatter of any specific slide.
- **Charts**: Use [Mermaid](https://mermaid-js.github.io/) code blocks (search for `mermaid` in the file) or standard images.
- **Layouts**: Use `layout: center`, `layout: two-cols`, etc., in slide frontmatter.

### 3. Charting
We use Mermaid diagrams by default (see "Data Pipeline" slide). For custom charts, you can use the `.chart-container` class in `style.css` to style wrapper divs for images or other components.

## Production Build

To build the slides for production (SPA):
```bash
docker-compose run slidev npm run build
```
The output will be in `dist/`.

## Export to PDF

```bash
docker-compose run slidev npm run export
```
