<div align="center">

# 💍 Zafaf

### Wedding Vendor Marketplace for Egypt

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

**[🌐 Live Demo](https://zafaf-tau.vercel.app)** · **[📁 GitHub](https://github.com/)**

> ⚠️ Backend API is not connected on the live demo. Run locally to experience full functionality.

</div>

---

## About

**Zafaf (زفاف)** is a full-stack wedding vendor marketplace built for the Egyptian market. Couples can discover and contact verified vendors across photography, catering, decor, music, and more — while vendors manage their profiles and inquiries through a dedicated dashboard. Admins oversee the entire platform from an integrated control panel.

Built around a warm gold and blush design system with Arabic-market sensibility.

---

## Features

### 👫 For Couples
- Browse 500+ vendors by category, city, rating, and price range
- View vendor profiles with portfolios, packages, and reviews
- Send inquiries directly to vendors
- Track inquiry statuses (pending / confirmed / rejected) from a personal dashboard
- Save favorite vendors and write reviews

### 🏪 For Vendors
- Dashboard with real-time inquiry stats and average rating
- Confirm or reject incoming inquiries
- Edit business profile, bio, pricing, and portfolio images
- View customer reviews and manage account settings

### 🛡️ For Admins
- Platform-wide stats: total users, vendors, inquiries, pending approvals
- Approve, reject, or suspend vendor registrations
- Browse and search all users and vendors
- Manage categories and site settings

---

## Tech Stack

| Layer      | Technology                              |
|------------|-----------------------------------------|
| Frontend   | React 19 + Vite                         |
| Routing    | React Router DOM v7                     |
| Styling    | Tailwind CSS v4                         |
| Icons      | Lucide React                            |
| Backend    | Node.js + Express 5                     |
| Database   | MongoDB + Mongoose                      |
| Auth       | JWT + bcryptjs                          |
| Deployment | Vercel (frontend)                       |
| Fonts      | Playfair Display · Inter (Google Fonts) |

---

## Pages & Routes

| Route               | Page                          |
|---------------------|-------------------------------|
| `/`                 | Home — hero, categories, featured vendors |
| `/vendors`          | Vendor listing with filters   |
| `/vendors/:id`      | Vendor profile page           |
| `/categories`       | Browse by category            |
| `/login`            | Login                         |
| `/register`         | Register as couple or vendor  |
| `/user/dashboard`   | Couple dashboard              |
| `/vendor/dashboard` | Vendor dashboard              |
| `/admin/dashboard`  | Admin panel                   |

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### Frontend

```bash
cd zafaf
npm install
npm run dev
```

Runs at `http://localhost:5173`

### Backend

```bash
cd zafaf/backend
npm install
```

Create a `.env` file in `zafaf/backend/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

```bash
npm run dev
```

Runs at `http://localhost:5000`

---

## Project Structure

```
zafaf/
├── backend/
│   └── src/
│       ├── app.js
│       ├── config/          # DB connection
│       ├── middleware/      # Auth middleware
│       └── modules/         # Route + controller modules
│           ├── auth/
│           ├── vendors/
│           ├── inquiries/
│           ├── reviews/
│           └── admin/
└── src/
    ├── assets/
    ├── components/
    │   ├── dashboard/       # Vendor dashboard tabs
    │   ├── user-dashboard/  # Couple dashboard tabs
    │   ├── admin-dashboard/ # Admin dashboard tabs
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   ├── Hero.jsx
    │   ├── Categories.jsx
    │   ├── FeaturedVendors.jsx
    │   └── HowItWorks.jsx
    ├── pages/
    │   ├── HomePage.jsx
    │   ├── VendorsPage.jsx
    │   ├── VendorProfilePage.jsx
    │   ├── CategoriesPage.jsx
    │   ├── LoginPage.jsx
    │   ├── RegisterPage.jsx
    │   ├── UserDashboard.jsx
    │   ├── VendorDashboard.jsx
    │   └── AdminDashboard.jsx
    └── services/
        └── api.js           # Centralized API service
```

---

## Design System

| Token        | Value                   |
|--------------|-------------------------|
| Primary      | Gold `#c9a84c`          |
| Accent       | Blush `#f9e4e4`         |
| Background   | Warm white `#fdf6e7`    |
| Text         | Charcoal `#2C2C2A`      |
| Muted        | `#888780`               |
| Heading font | Playfair Display (serif)|
| Body font    | Inter (sans-serif)      |

---

## License

MIT
