<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-PostgreSQL-2D3748?style=for-the-badge&logo=prisma&logoColor=white" />
</p>

<h1 align="center">🚀 thanhtai.dev — Personal Portfolio</h1>

<p align="center">
  A modern, animated developer portfolio built with React, TypeScript & Framer Motion.<br/>
  Full-stack with Express.js backend for interactive comments & Cloudinary image uploads.
</p>

<p align="center">
  <a href="https://thanhtai.dev"><strong>🌐 Live Demo →</strong></a>
</p>

---

## ✨ Features

| Category | Details |
|----------|---------|
| **Hero Section** | Typing animation, skill badges, social links & interactive coding screen |
| **About Me** | Profile card, education info & animated career timeline |
| **Portfolio Showcase** | Tabbed view — **Projects**, **Certificates**, **Tech Stack** with icon grid |
| **Contact** | Contact form with validation |
| **Comments System** | Real-time guest comments with profile photo upload (Cloudinary) |
| **Animations** | Framer Motion entrance animations, scroll-triggered reveals & hover effects |
| **Visual Effects** | Animated particle background, canvas overlay & scroll snap navigation |
| **Loading Screen** | Custom branded loading animation |

---

## 🛠️ Tech Stack

### Frontend
- **React 18** + **TypeScript** — Component-based UI with type safety
- **Vite 5** — Lightning-fast HMR & build
- **TailwindCSS 3** — Utility-first styling with custom purple/dark theme
- **Framer Motion** — Smooth page transitions & scroll animations
- **React Router DOM** — Client-side routing
- **Lucide React** — Icon library
- **Inter** (Google Fonts) + **Devicon** — Typography & tech icons

### Backend
- **Express.js** — REST API server
- **Prisma ORM** + **PostgreSQL** — Database for comments
- **Cloudinary** — Image upload & CDN for profile photos
- **Multer** — File upload middleware

### Deployment
- **Vercel** — Frontend hosting with SPA rewrites
- Custom domain: [thanhtai.dev](https://thanhtai.dev)

---

## 📂 Project Structure

```
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/              # Button, Card, Modal, SectionTitle
│   │   ├── AnimatedBackground.tsx
│   │   ├── CanvasOverlay.tsx
│   │   ├── CodingScreen.tsx
│   │   ├── Layout.tsx
│   │   ├── LoadingScreen.tsx
│   │   ├── Navbar.tsx
│   │   └── TimelinePro.tsx
│   ├── pages/
│   │   └── MainPage.tsx     # Single-page layout (all sections)
│   ├── hooks/               # useIntersectionObserver, useTypingEffect
│   ├── utils/               # API client (comments, uploads)
│   └── types/               # TypeScript interfaces
├── backend/
│   ├── server.js            # Express server entry
│   ├── routes/              # /api/comments, /api/upload
│   ├── prisma/              # Schema & migrations
│   ├── config/              # Cloudinary config
│   └── middleware/           # Upload middleware
├── public/images/           # Project screenshots & certificates
└── vercel.json              # Deployment config
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- PostgreSQL database (or use a hosted service like Supabase / Railway)

### Frontend

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Production build
npm run build
```

### Backend

```bash
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your DATABASE_URL, CLOUDINARY_*, FRONTEND_URL

# Run Prisma migrations
npx prisma migrate dev

# Start server (http://localhost:5000)
npm run dev
```

### Environment Variables (Backend)

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `FRONTEND_URL` | Frontend URL for CORS |
| `PORT` | Server port (default: 5000) |

---

## 📸 Screenshots

> Visit the live site at [thanhtai.dev](https://thanhtai.dev) to see the full experience.

---

## 📄 License

This project is for personal portfolio use.

---

<p align="center">
  Built with 💜 by <a href="https://github.com/ThanhTaiDev">Thanh Tai</a>
</p>
