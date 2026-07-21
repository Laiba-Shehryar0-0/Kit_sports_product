# Sports Hub

A React + Vite frontend for browsing, viewing, and customizing sports kits (jerseys, shorts, tracksuits, hoodies, caps) with a live SVG preview.

## Features


- **Home** — Landing page with hero, stats, featured kits, sport categories, size guide, FAQ, and contact sections
- **Kit Catalog** — Browse kits with sport filtering and search
- **Kit Customizer** — Live SVG-based tool to customize color, design, badge, and text on kits (jersey, polo, jumper, shorts, socks, cap), with front/back preview and export
- **Checkout** — Order summary and payment method selection
- **Auth** — Sign in / sign up modal
- **About** — Company timeline, values, and mission
=======
- **Home** : Landing page with hero, stats, featured kits, sport categories, size guide, FAQ, and contact sections
- **Kit Catalog** : Browse kits with sport filtering and search
- **Kit Customizer** : Live SVG-based tool to customize color, design, and text on kits, with front/back preview and export
- **About** : Company timeline, values, and mission

## Tech Stack

- React 18
- Vite 5
- React Router v6
- Plain CSS with custom properties (no UI framework)

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

```bash
git clone https://github.com/Laiba-Shehryar0-0/Kit_sports_product.git
cd Kit_sports_product
npm install
Development

npm run dev
Build

npm run build
Preview Production Build

npm run preview
Project Structure

src/
├── components/     # Reusable UI components
├── customize/      # Kit customization logic (SVG shapes, preview renderer)
├── pages/          # Route-level pages (Home, Kits, Customize, About)
└── index.css       # Design system variables and utility classes
