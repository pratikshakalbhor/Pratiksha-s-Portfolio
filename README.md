# Premium Web3 & Blockchain Developer Portfolio

A modern, premium, and fully responsive personal portfolio designed for **Pratiksha Kalbhor**, Blockchain Developer and Web3 Enthusiast. 

Built using **React.js**, **Tailwind CSS**, and **Framer Motion**, this portfolio mimics award-winning Web3/DeFi websites with interactive canvas particle backdrops, custom pointer springs, scrolling progress overlays, and a simulated smart-contract mining sequence loader.

## 🚀 Tech Stack

- **Framework:** React.js (via Vite)
- **Styling:** Tailwind CSS & Glassmorphism design tokens
- **Animations:** Framer Motion (slide panels, springs, staggering enters)
- **Icons:** React Icons (`react-icons` for Solidity, Ethereum, React, etc.)
- **Contact Protocol:** EmailJS integration equipped with client-side forms validation & success animation bursts

## 📂 Project Architecture

```text
portfolio/
├── public/
│   ├── favicon.ico
│   ├── resume.pdf
│   └── images/
│
├── src/
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── animations/
│   │
│   ├── components/
│   │   ├── Navbar.jsx          # Header with scroll indicator
│   │   ├── Hero.jsx            # Welcomer with floating contract code visualizer
│   │   ├── About.jsx           # Biography tabs (Objective & Education details)
│   │   ├── Skills.jsx          # Category cards with progress bars
│   │   ├── Projects.jsx        # Expanded list (FreelanceChain, NFT Marketplace, etc.)
│   │   ├── Experience.jsx      # Vertical glowing event timeline
│   │   ├── Certifications.jsx  # Qualifications credential cards
│   │   ├── Achievements.jsx    # Bootcamps, Hackathons, and Deploys details
│   │   ├── Contact.jsx         # Validation form + EmailJS integrations
│   │   ├── Footer.jsx          # Copyright + social connects
│   │   ├── CustomCursor.jsx    # Custom pointer springs
│   │   ├── ParticleBackground.jsx # Light HTML5 Canvas particle backdrop
│   │   └── Loader.jsx          # Sync consensus loading animation
│   │
│   ├── pages/
│   │   └── Home.jsx            # Master layout page
│   │
│   ├── data/
│   │   ├── projects.js         # Local database of projects
│   │   ├── skills.js           # Local database of skills & proficiencies
│   │   ├── experience.js       # Timeline history
│   │   └── certificates.js     # Qualifications data
│   │
│   ├── App.jsx                 # Animation state loader and custom layout router
│   ├── main.jsx                # DOM landing page root mounting
│   └── index.css               # Scrollbars, body modifiers, custom animations
│
├── .env                        # Port key definitions template
├── package.json                # Project configurations & dependency declarations
├── vite.config.js              # Vite server custom parameters
└── README.md                   # Setup documentation
```

## 🛠️ Getting Started

### 1. Installation

Install all required modules and assets:

```bash
npm install
```

### 2. Configure EmailJS Credentials

Open the `.env` file in the root directory and input your EmailJS service key identifiers:

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

The application will launch on `http://localhost:3000` with hot-module reloading active.

### 4. Build for Production

Compile code bundles optimized for server hosting:

```bash
npm run build
```

This generates static elements inside the standard `dist/` directory, ready to deploy to platforms like **Vercel**, **Netlify**, or **GitHub Pages**.
