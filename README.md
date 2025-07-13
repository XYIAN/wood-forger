# Wood Forger

A glossy, mobile-first woodworking inventory & project tracker.

## Features

- 📦 **Inventory Tracker**: Manage wood species, dimensions, stock, and cost.
- ⏱ **Project Log**: Track time, material usage, costs, sold price, and profit. Add notes in markdown.
- 💰 **Order Manager**: Simulate Etsy-style orders, deducting stock automatically.
- 📊 **Dashboard**: Visualize stock by type, profit over time, and recent activity with animated charts.

## Tech Stack

- Next.js 15+ (App Router, TypeScript, Tailwind)
- PrimeReact (lara-dark-amber theme), PrimeFlex, PrimeIcons
- Anime.js for animations
- Chart.js for dashboards

## Getting Started

1. Install dependencies:
   ```sh
   npm install
   ```
2. Run the dev server:
   ```sh
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### View Inventory

- Go to `/inventory` to see all wood and materials.
- Filter by species, size, or stock status.
- Add, edit, or remove items as your shop changes.

### Log Projects

- Visit `/projects` to log new woodworking projects.
- Track time, materials used, costs, and sale price.
- Add notes in markdown for process, tips, or client info.
- Mark projects as complete for a confetti effect!

### Dashboard

- `/dashboard` shows:
  - Total wood in stock by type
  - Profit over time (animated Chart.js)
  - Recent projects and orders
  - Floating dust particle animation for woodshop vibes

### Process Orders

- `/orders` simulates Etsy-style order management.
- Import sample orders, deducting inventory automatically.
- Track order status and see profit impact.

## Design & UX

- Warm, earthy lara-dark-amber theme
- Glassy overlays, subtle wood grain, and modern mobile-first layouts
- PrimeFlex for responsive stacking
- Anime.js for scroll reveals, card hovers, and project completion effects

## SEO

- Optimized titles and descriptions for woodworking, inventory, and project tracking
- Sitemap included for all major routes

---

Enjoy running your woodshop with **Wood Forger**!
