# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

60Plus Global landing page - a senior care.services website built with React 18, Vite, and CSS Modules. Uses a purple/pink color scheme with Tamil language support.

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 8
- **Styling**: Custom CSS with CSS variables (not Tailwind CSS despite config)
- **Fonts**: Lora (serif), Inter (body), Noto Sans Tamil

## Key Files

| File | Purpose |
|------|---------|
| `src/App.jsx` | Main app with component definitions and embedded CSS styles |
| `src/index.css` | Global CSS variables and reusable utility classes |
| `src/main.tsx` | React entry point |
| `index.html` | HTML template with fonts preloaded |

## Architecture

- **Single-file components**: Components and their styles are co-located in `App.jsx` using template literal CSS
- **State management**: React `useState` for local state (FAQ accordion, WhatsApp button visibility)
- **Routing**: Nav links use anchor tags with hash navigation (e.g., `#services`, `#why`)

## Build Commands

```bash
npm install       # Install dependencies
npm run dev       # Start dev server (port 5173)
npm run build     # Build for production (output: dist/)
npm run preview   # Preview production build
```

## Design System

### Color Variables (in `:root`)
- Primary: Purple (`#5B2D8E`)
- Accent: Pink (`#C47DC0`)
- WhatsApp: Green (`#25D366`)
- Text: Gray-dark (`#1e1e2e`)

### Layout Constants
- Section gap: `90px` (CSS var `--section-gap`)
- Sticky nav height: `68px-72px`

## Current State

Project is under active development. Key features:
- Hero section with sliding background images
- Sticky navigation with scroll effect
- WhatsApp floating button on right side (centered vertically)
- Form section for lead capture
- FAQ accordion
