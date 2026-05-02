# Zafaf — Wedding Vendor Marketplace

> A modern wedding planning platform connecting Egyptian couples with verified vendors across photography, catering, decor, music, and more.

🔗 **Live Demo:** [https://zafaf-tau.vercel.app](https://zafaf-tau.vercel.app)

---

## About

Zafaf (زفاف) is a full-featured wedding vendor marketplace built for the Egyptian market. Couples can browse and contact vendors, while vendors can manage their profiles and inquiries — all through a clean, elegant interface built around a gold and blush design system.

---

## Features

### For Couples
- Browse 500+ verified vendors by category, city, rating, and price range
- View detailed vendor profiles with portfolios, packages, and reviews
- Send inquiries directly to vendors
- Save favorite vendors to a personal list
- Manage inquiries and track their status from a personal dashboard
- Write and edit reviews for vendors

### For Vendors
- Dedicated vendor dashboard with overview stats
- Manage incoming inquiries (confirm or reject)
- Edit business profile, bio, pricing, and portfolio
- View and respond to customer reviews
- Account settings with notification preferences and visibility controls

### Admin Panel
- Platform-wide overview with key metrics
- Approve, reject, or suspend vendor registrations
- Manage users and monitor inquiries
- Edit categories and configure site settings

### General
- Browse vendors by category with dedicated category pages
- Responsive layout across all screen sizes
- Login and Register pages with couple / vendor account types
- Smooth client-side routing with no page reloads

---

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Framework  | React 19                            |
| Routing    | React Router DOM v7                 |
| Styling    | Tailwind CSS v4                     |
| Icons      | Lucide React                        |
| Build Tool | Vite                                |
| Fonts      | Playfair Display · Inter (Google Fonts) |
| Deployment | Vercel                              |

---

## Pages & Routes

| Route                | Description                  |
|----------------------|------------------------------|
| `/`                  | Home page                    |
| `/vendors`           | Vendor listing with filters  |
| `/vendors/:id`       | Vendor profile page          |
| `/categories`        | Browse by category           |
| `/login`             | Login page                   |
| `/register`          | Register (couple or vendor)  |
| `/user/dashboard`    | Couple dashboard             |
| `/vendor/dashboard`  | Vendor dashboard             |
| `/admin/dashboard`   | Admin panel                  |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## Project Structure

```
src/
├── assets/               # Images and static files
├── components/
│   ├── dashboard/        # Vendor dashboard tab components
│   ├── user-dashboard/   # Couple dashboard tab components
│   ├── admin-dashboard/  # Admin dashboard tab components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── Hero.jsx
│   ├── Categories.jsx
│   ├── FeaturedVendors.jsx
│   └── HowItWorks.jsx
└── pages/
    ├── HomePage.jsx
    ├── VendorsPage.jsx
    ├── VendorProfilePage.jsx
    ├── CategoriesPage.jsx
    ├── LoginPage.jsx
    ├── RegisterPage.jsx
    ├── VendorDashboard.jsx
    ├── UserDashboard.jsx
    └── AdminDashboard.jsx
```

---

## Design System

- **Primary color:** Gold `#c9a84c`
- **Accent:** Blush `#f9e4e4`
- **Text:** Charcoal `#2C2C2A`
- **Muted:** `#888780`
- **Heading font:** Playfair Display (serif)
- **Body font:** Inter (sans-serif)

---

## Backend

> 🚧 **Backend coming soon.** The current version is a fully functional frontend with mock data. A REST API with authentication, real vendor/user management, and database integration is planned for the next phase.

---

## License

MIT
