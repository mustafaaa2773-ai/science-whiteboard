# Science Whiteboard

Interactive educational whiteboard for online physics and science sessions.

## Goals

- Fast browser-based drawing and annotation.
- Physics-friendly shapes, text, equations, images, grids and templates.
- Undo/redo, zoom/pan and export.
- Prepare the architecture for real-time collaboration.

## Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Canvas 2D
- Pointer Events
- KaTeX for equations

## Project structure

```text
science-whiteboard/
├── index.html
├── style.css
├── script.js
├── assets/
├── README.md
├── CONTRIBUTING.md
├── LICENSE
└── .gitignore
```

## Run locally

No build step is required for the MVP. Open `index.html` in a modern browser or serve the folder with a local static server.

Example:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Roadmap

### Phase 1 — MVP

Drawing, eraser, shapes, text, LaTeX, images, grid, colors, zoom/pan, undo/redo and PNG export.

### Phase 2 — Productivity

JSON save/load, SVG/PDF export, multiple boards, richer text formatting and science/physics templates.

### Phase 3 — Collaboration

Real-time synchronization, permissions, session links and offline-first collaboration using Yjs/WebSocket architecture.

## License

MIT License. See `LICENSE`.
