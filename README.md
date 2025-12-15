# Portfolio Website v1

A modern animated portfolio website with space/tech style, built with React, TypeScript, Vite, and TailwindCSS.

## Features

- 🚀 Modern tech stack (Vite + React + TypeScript)
- 🎨 Beautiful UI with TailwindCSS và dark gradient background
- ✨ Smooth animations với Framer Motion
- 🕷️ Interactive cursor spider/web effect với 30-60 particles
- 📱 Responsive design
- ♿ Accessibility support (reduced motion)
- 📄 Loading screen với progress bar
- 🎯 Page transitions mượt mà
- 💼 Portfolio với project grid và modal
- 📧 Contact form với validation

## Project Structure

```
portfoliov1/
├── src/
│   ├── components/          # Reusable components
│   │   ├── ui/             # UI components (Button, Card, etc.)
│   │   ├── Layout.tsx      # Main layout wrapper
│   │   ├── Navbar.tsx      # Navigation bar
│   │   ├── LoadingScreen.tsx # Initial loading screen
│   │   ├── CanvasOverlay.tsx # Cursor spider/web effect
│   │   └── AnimatedBackground.tsx # Animated stars background
│   ├── pages/              # Page components
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Portfolio.tsx
│   │   └── Contact.tsx
│   ├── routes/             # Routing configuration
│   │   └── AppRoutes.tsx
│   ├── hooks/              # Custom React hooks
│   │   └── useIntersectionObserver.ts
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/              # Utility functions
│   │   └── index.ts
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Tech Stack

- **Vite** - Build tool and dev server
- **React 18** - UI library
- **TypeScript** - Type safety
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router DOM** - Client-side routing

## Pages

- **Home**: Hero section với tech stack chips
- **About**: Profile summary và timeline/education
- **Skills**: Skill bars với các công nghệ (HTML5, CSS3, JavaScript, TypeScript, React, Redux, Tailwind CSS, Node.js, MongoDB, Git, Docker, Figma, Three.js)
- **Portfolio**: Project grid với modal details
- **Contact**: Contact form với validation và social links

## Key Features Implemented

✅ Loading screen với progress bar (0-100%)  
✅ Canvas spider/web effect với 30-60 particles  
✅ Animated background với stars  
✅ Page transitions với framer-motion  
✅ Scroll reveal animations  
✅ Responsive navbar với active state  
✅ Toggle để bật/tắt canvas effect  
✅ Form validation  
✅ Modal cho project details

## License

MIT

