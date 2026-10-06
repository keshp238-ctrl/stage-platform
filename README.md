# STAGE — AI-Powered Speaking, Interview & Communication Platform

> **"TED + Apple + Linear + Futuristic AI Startup"**
> A premium, interactive 3D speaking, interview and communication platform for students.
> **LEARN → PRACTICE → SPEAK → CONNECT → GET HIRED**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-keshp238--ctrl.github.io-E62B1E?style=for-the-badge&logo=github)](https://keshp238-ctrl.github.io/stage-platform/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-000000?style=for-the-badge&logo=threedotio)](https://threejs.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](#-license)

---

## 🔴 Live Demo

**→ [https://keshp238-ctrl.github.io/stage-platform/](https://keshp238-ctrl.github.io/stage-platform/)**

Just open the link — no install, no build step. Works on desktop and mobile.

---

## 🌟 Key Features

1. **Immersive 3D Voice Stage Artifact**
   - Three.js / React Three Fiber interactive stage platform.
   - Volumetric lighting, sound-wave concentric geometry, glowing core, and floating neural particles.
   - Real-time live microphone reaction via Web Audio API.

2. **AI Talk Lab**
   - In-browser acoustic & speech rhythm analysis.
   - Live waveform, Words-Per-Minute (WPM) cadence gauge, and filler word timeline flags.
   - Instant actionable verbal prescriptions.

3. **Mock Interview Simulator**
   - Technical Architecture & HR / Behavioral tracks.
   - Company archetype selectors (FAANG, High-Growth Startups, Quant).
   - Recruiter scorecard calibration.

4. **Real-Life Speaking Simulations**
   - 5 high-stakes scenarios: Executive Boardroom, Bar Raiser, Investor Elevator Pitch, Project Defense, and Campus Group Discussion.
   - Evaluator personas, interruption profiles, and live countdown timers.

5. **Resume → Interview Generator**
   - Automated project architecture parsing.
   - Generates targeted deep-dive questions based on the candidate's actual codebase and claims.

6. **Intercollegiate Debate Arena & Competitions**
   - 3D opposing podiums with live topic motions.
   - Real-time affirmative / negative audience sentiment voting.
   - Collegiate cup leaderboards and tournament bracket system.

7. **Peer Audio Conversation Rooms**
   - Low-friction audio huddles by language and fluency level.
   - Live speaker HUD with mute and stage controls.

8. **Student TED Stage**
   - Verified 3–10 minute student keynotes.
   - Keynote takeaway insights, transcripts, and peer upvoting.

9. **Communication DNA & Readiness Index**
   - 3D DNA double helix skill strand visualizer.
   - Standardized 0–100 Internship Readiness benchmark for hiring partners.

10. **Design System & Micro-Interactions**
    - Dark mode by default with warm off-white Light mode toggle.
    - Custom desktop cursor with magnetic contextual tags (`ENTER`, `WATCH`, `TRY`, `EXPLORE`).
    - Responsive Linear-style student application dashboard.

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Framework** | React 18, TypeScript, Vite |
| **Styling** | Tailwind CSS, PostCSS, Glassmorphism, CSS Variables |
| **3D & Graphics** | Three.js, React Three Fiber, @react-three/drei |
| **Icons & Motion** | Lucide-React, Framer-Motion, Canvas-Confetti |
| **Audio** | Web Audio API (AnalyserNode, MediaStreamSource) |

---

## 📁 Project Structure

```
stage-platform/
├── src/
│   ├── components/
│   │   ├── 3d/           # Three.js scenes (Voice Stage, DNA Helix, Podiums)
│   │   ├── app/          # Logged-in student dashboard views (14 views)
│   │   ├── landing/      # Marketing landing page sections
│   │   └── ui/           # Shared UI (Navbar, Modals, Cursor, Loader)
│   ├── data/             # Mock data & fixtures
│   ├── types/            # Shared TypeScript types
│   ├── App.tsx           # Root — switches landing ↔ app views
│   └── main.tsx          # Entry point
├── index.html            # HTML shell (source)
├── vite.config.ts        # Vite + GitHub Pages base path
└── tailwind.config.js    # Design tokens
```

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/keshp238-ctrl/stage-platform.git

# Navigate to project
cd stage-platform

# Install dependencies
# (on Windows PowerShell, use npm.cmd if npm is blocked by execution policy)
npm install

# Start development server → http://localhost:3000
npm run dev

# Build for production
npm run build
npm run preview
```

---

## 📦 Deployment

The live site is served by **GitHub Pages** from the `gh-pages` branch.

```bash
# Build with the correct base path (already set in vite.config.ts)
npm run build

# The compiled site lands in dist/ — push it to gh-pages to go live
```

The base path `base: '/stage-platform/'` in `vite.config.ts` is required for
GitHub Pages to resolve asset URLs correctly. Remove it if you self-host at the domain root.

---

## 📄 License

MIT License © 2026 STAGE Platform Inc.
