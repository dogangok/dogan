# Portfolio Website

A minimal portfolio website built with modern web technologies.

## Tech Stack

- **Framework**: Next.js 15.3.3 with App Router
- **Language**: TypeScript
- **Styling**: CSS Modules
- **Package Manager**: Bun
- **Linting/Formatting**: Biome

## Features

- Clean, minimal design with focus on typography
- Dark/light theme toggle with system preference detection
- Fully responsive layout
- Custom font implementation (Graphik & Supria families)
- Component-based architecture

## Getting Started

### Prerequisites

- Node.js 18+ 
- Bun package manager

### Installation

```bash
bun install
```

### Development

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build

```bash
bun build
```

### Production

```bash
bun start
```

## Project Structure

```
src/
├── app/          # Next.js app directory
├── components/   # React components
│   ├── common/   # Shared components
│   ├── layout/   # Layout components
│   └── sections/ # Page sections
└── public/       # Static assets
    └── fonts/    # Custom fonts
```

## License

This project is private and not licensed for public use.