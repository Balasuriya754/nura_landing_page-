# 60Plus Global Landing Page

A modern React.js landing page built with Vite, featuring a premium design for senior care services.

## Features

- **React 18** with TypeScript support
- **Tailwind CSS** for styling
- **Vite** for fast development and optimized builds
- **Docker** containerization for easy deployment

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Docker and Docker Compose (optional)

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

### Docker Deployment

Build and run with Docker Compose:

```bash
docker-compose build
docker-compose up -d
```

The app will be available at `http://localhost:3000`

### View Logs

```bash
docker-compose logs -f
```

### Stop the Container

```bash
docker-compose down
```

## Project Structure

```
Nura_landing_2/
├── src/
│   ├── components/     # Reusable components
│   ├── App.jsx         # Main app component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles
├── public/
├── Dockerfile
├── docker-compose.yml
├── index.html
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── package.json
```

## Key Features

- Sticky navigation with smooth scrolling
- Hero section with prominent call-to-action
- Form for lead capture with WhatsApp integration
- Services grid with 8 service cards
- Interactive FAQ section
- Statistics and social proof sections
- Fully responsive design for all screen sizes
- Tamil language support for content

## Customization

To customize the design, edit:
- `src/index.css` - Main styles and Tailwind configuration
- `src/App.jsx` - Component structure and content
- `tailwind.config.js` - Tailwind CSS configuration

## License

© 2025 SixtyPlus Global. All rights reserved.
