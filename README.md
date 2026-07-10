# 🚀 Premium Web3 & Blockchain Developer Portfolio

A modern, high-performance, and immersive personal portfolio designed for **Pratiksha Kalbhor**, Blockchain Developer and Web3 Enthusiast. 

Built using **React.js**, **Tailwind CSS**, and **Framer Motion**, this portfolio mimics award-winning Web3/DeFi websites with interactive canvas particle backdrops, premium glassmorphism layouts, custom interactive 3D elements, and clean animations.


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
