# 💰 FinTrack — Modern Personal Finance Tracker

A **premium, portfolio-worthy Personal Finance Tracker** web application built with **HTML5, CSS3, Bootstrap 5, JavaScript (ES6), and jQuery**. Designed to look and feel like a professional SaaS fintech product.

---

## 🚀 Live Preview

Open `index.html` in any modern browser to launch the app.

---

## 🗂️ Project Structure

```
Personal-Finance-Tracker/
│
├── index.html          ← Home / Landing Page
├── dashboard.html      ← Financial Dashboard
├── expenses.html       ← Expense Management
├── income.html         ← Income Tracking
├── budget.html         ← Budget Planner
├── goals.html          ← Savings Goals
├── reports.html        ← Financial Reports
├── about.html          ← About Us
├── contact.html        ← Contact Page
│
├── css/
│   ├── style.css       ← Main design system & components
│   └── responsive.css  ← Breakpoint-specific responsive styles
│
├── js/
│   ├── script.js       ← Core JS (loader, navbar, counters, ripple, toasts)
│   └── dashboard.js    ← Charts, CRUD logic, forms, goal tracking
│
└── README.md
```

---

## 📄 Pages Overview

| Page | Description |
|------|-------------|
| `index.html` | Hero, Features, Insights, Stats counter, Testimonials, Pricing, CTA, Footer |
| `dashboard.html` | Full dashboard with 3 Chart.js charts, stat cards, transactions table |
| `expenses.html` | Add/delete expenses, category filter, category breakdown sidebar |
| `income.html` | Add/delete income, doughnut chart, trend line chart |
| `budget.html` | Color-coded progress bars (safe/warning/danger), budget overview |
| `goals.html` | 4 interactive goal cards with live "Add Funds" functionality |
| `reports.html` | 4 Chart.js charts + key insights section + export button |
| `about.html` | Story, Mission, Why Choose Us, Team cards |
| `contact.html` | Contact form, Google Map, contact info cards, FAQ accordion |

---

## 🎨 Design System

### Color Palette
| Name | Hex |
|------|-----|
| Primary | `#2563EB` |
| Secondary | `#06B6D4` |
| Accent | `#10B981` |
| Dark | `#0F172A` |
| Light | `#F8FAFC` |
| Warning | `#F59E0B` |
| Danger | `#EF4444` |

### Typography
- **Headings**: Plus Jakarta Sans (Google Fonts)
- **Body**: Inter (Google Fonts)

### UI Effects
- ✨ Glassmorphism navbar
- 🌊 Smooth page loader with animated bar
- 💫 Ripple button effects
- 🎯 Floating hero cards with CSS animations
- 📊 Animated counter numbers (Intersection Observer)
- 🎨 Gradient text headings
- 🌙 Dark sections with radial glow backgrounds
- 🔄 AOS scroll-triggered animations

---

## 📦 Technologies Used

| Technology | Version | Purpose |
|-----------|---------|---------|
| Bootstrap | 5.3.3 | Grid, utilities, components |
| Bootstrap Icons | 1.11.3 | Icon set throughout |
| jQuery | 3.7.1 | DOM manipulation, CRUD logic |
| Chart.js | 4.4.3 | Financial charts |
| AOS | 2.3.4 | Scroll animations |
| Google Fonts | – | Inter + Plus Jakarta Sans |
| Unsplash Images | – | Hero & section images |

---

## 📊 Charts Included (Chart.js)

1. **Income vs Expense** — Grouped Bar Chart (Dashboard)
2. **Monthly Spending Trend** — Line Chart with fill (Dashboard)
3. **Expense by Category** — Doughnut Chart (Dashboard + Reports)
4. **Income Source Distribution** — Doughnut Chart (Income page)
5. **Income Monthly Trend** — Line Chart (Income page)
6. **Income Analysis by Source** — Bar Chart (Reports)
7. **Expense Pie Chart** — Pie Chart (Reports)
8. **Cumulative Savings Growth** — Area Line Chart (Reports)
9. **Budget vs Actual** — Grouped Bar Chart (Reports)

---

## ⚡ Interactive Features

- **Add/Delete Expenses** — Live table updates without page reload
- **Add/Delete Income** — Same real-time CRUD behavior
- **Budget Filters** — Filter expenses by Day/Week/Month/Year
- **Goal Funding** — Click "Add Funds" to update progress bar live
- **Pricing Toggle** — Switch between Monthly/Yearly pricing
- **Counter Animations** — Numbers count up on scroll into view
- **Toast Notifications** — Success/error/warning feedback
- **Budget Progress Animation** — Progress bars animate on page load
- **Contact Form** — Validated with loading spinner simulation
- **Back to Top** — Appears after scrolling 400px

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout |
|-----------|--------|
| `< 576px` | Single column, stacked tables |
| `576–767px` | 2 columns, collapsed navbar |
| `768–991px` | Sidebar slides in on mobile |
| `992–1199px` | Sidebar at 220px width |
| `1200px+` | Full sidebar (260px) + main content |

---

## 🔧 Getting Started

1. Clone or download the project
2. Open `index.html` in any modern browser
3. No build step, server, or npm required
4. Works 100% offline (CDN assets cached by browser)

---

## 🌟 Portfolio Highlights

- Clean semantic HTML5 structure
- CSS custom properties (design tokens)
- ES6+ JavaScript with jQuery
- 9 fully responsive pages
- 9 Chart.js visualizations
- Accessible (focus-visible, ARIA labels, alt texts)
- Print-friendly report styles
- Touch-device optimized (hover states disabled on touch)

---

## 📝 License

MIT License — Free for personal and commercial use.

---

**Built with ❤️ for financial freedom.**
