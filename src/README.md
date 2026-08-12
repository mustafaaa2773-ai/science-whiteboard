# Source architecture

The MVP is being migrated to an object-based whiteboard architecture.

Planned layers:

- `core/` — board state and coordinate transforms
- `objects/` — drawable object models
- `tools/` — pen, eraser, shapes, text and selection tools
- `history/` — undo/redo state history
- `storage/` — JSON persistence
- `ui/` — toolbar and panels

The migration starts incrementally so the existing browser entry point remains usable.