# 🚀 Premium Web3 & Blockchain Developer Portfolio

A modern, high-performance, and immersive personal portfolio designed for **Pratiksha Kalbhor**, Blockchain Developer and Web3 Enthusiast. 

Built using **React.js**, **Tailwind CSS**, and **Framer Motion**, this portfolio mimics award-winning Web3/DeFi websites with interactive canvas particle backdrops, premium glassmorphism layouts, custom interactive 3D elements, and clean animations.

---

## ✨ Core Interactive Features

*   **⚡ Web3 Consensus Loader:** A custom smart-contract mining sequence preloader that simulates transaction consensus verification before mounting the main app.
*   **🌌 Dynamic Particle Backdrop & Glow:** An interactive canvas particle network combined with soft neon gradient meshes (cyan, purple, blue) for deep visual atmosphere.
*   **🎯 Fixed Glassmorphism Navbar:** A custom scroll-aware navigation bar equipped with a glowing gradients scroll progress indicator. It uses React Portal (`createPortal`) to guarantee correct absolute fixed positioning relative to the viewport.
*   **🎡 3D Circular Projects Gallery:** A custom Apple Vision Pro-style 3D carousel rotating clockwise on 3D CSS `rotateY` cylinder axes. 
    *   *Hover:* Pauses carousel and snaps cards to center stage.
    *   *Mouse Drag & Swipe:* Supports fluid manual rotation with velocity centering.
    *   *Double-Click Lock (🔒):* Double-clicking locking freezes rotation completely, showing a status indicator. This allows recruiters to read info panels cleanly. Keyboard `Esc` or clicking outside unlocks.
*   **📊 Featured Project Details Panel:** Slide-and-fade details drawer summarizing tech stack flags, key features, Github repositories, and live project deployments.
*   **🔮 Premium Skills Panel:** Recruiter-friendly categories (Blockchain, Frontend, Databases, Tools) showing individual glass cards with hover lift, rotating icons, and glowing bottom accent triggers.
*   **⏳ Glowing Experience Timeline:** A linear step-timeline tracking education milestones, development career journeys, and hackathon milestones.
*   **✉️ Seamless Contact Panel:** A contact form with field validation integrated with EmailJS, featuring instant feedback animations on successful message deployment.
*   **🖱️ Custom Spring Cursor:** Responsive mouse tracker helper with trailing momentum tracking rings (auto-hidable on touchscreens).

---

## 🛠️ Tech Stack

*   **Frontend Library:** React.js (via Vite)
*   **Styling Engine:** Tailwind CSS & Custom CSS variables
*   **Animation System:** Framer Motion (staggered entries, spring transitions, sliding overlays)
*   **Icons Library:** React Icons (`react-icons` for Solidity, Ethereum, React, database engines)
*   **E-Mail Protocols:** EmailJS integration with client-side form validation

---

## 🚀 Getting Started

### 1. Installation

Clone the repository and install all required modules:

```bash
npm install
```

### 2. Configure EmailJS Credentials

Add your EmailJS credentials by updating or creating a `.env` file in the root directory:

```env
VITE_EMAILJS_SERVICE_ID="your_service_id"
VITE_EMAILJS_TEMPLATE_ID="your_template_id"
VITE_EMAILJS_PUBLIC_KEY="your_public_key"
```

*Note: If these env variables are left empty, the contact form automatically executes a simulation fallback with simulated server latency and full confetti trigger to keep the page fully functional.*

### 3. Launch Development Server

Run the portfolio locally:

```bash
npm run dev
```

The application will launch on `http://localhost:5173` with hot-module reloading active.

### 4. Build for Production

Compile optimized production-ready asset bundles:

```bash
npm run build
```

This generates static elements inside the standard `dist/` directory, ready to deploy to platforms like **Vercel**, **Netlify**, or **GitHub Pages**.
