<div align="center">

# 🏠 LocalEase — Frontend

**A modern service marketplace platform built with React & Vite**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2-764ABC?style=flat-square&logo=redux)](https://redux-toolkit.js.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)

</div>

---

## 📖 Description

LocalEase is the React frontend of a full-stack service marketplace. It connects customers with local service providers and supports three roles — **User**, **Service Provider**, and **Admin** — each with dedicated dashboards, protected routes, and tailored UI.

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 + Vite 6 |
| State Management | Redux Toolkit + Redux Persist |
| API Layer | RTK Query + Axios |
| Routing | React Router DOM v7 |
| Styling | Tailwind CSS v4 |
| Real-time | Socket.IO Client |
| Auth | Firebase (Google OAuth) |
| Maps | React Leaflet |
| Charts | Recharts |
| Media Upload | Cloudinary |
| Icons | Lucide React + React Icons |

---

## 📁 Folder Structure

```
src/
├── api/              # RTK Query slices (authApi, userApi, providerApi, bookingApi, adminApi ...)
├── components/       # Reusable UI components (admin/, provider/, home/, layout/, ui/)
├── pages/
│   ├── admin/        # Dashboard, Users, Providers, Bookings, Payments, Reviews ...
│   ├── provider/     # ProviderDashboard, Bookings, Services, Earnings, Profile ...
│   └── user/         # Home, Services, Bookings, Profile, BecomeProvider ...
├── redux/            # store.js, authSlice, themeSlice, locationSlice
├── router/           # AppRouter.jsx (protected & role-based routes)
├── utils/            # Helper utilities
├── firebase.js       # Firebase initialization
├── App.jsx
└── main.jsx
```

---

## 🚀 Installation

```bash
# 1. Clone & navigate
git clone https://github.com/Jaydatt-kher/localease-frontend.git
cd localease-frontend

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Fill in values — see Environment Variables section below

# 4. Start the dev server
npm run dev
```

App runs at **`http://localhost:5173`**

---

## 🔑 Environment Variables

```env
# Backend API
VITE_API_URL=http://localhost:8000/api

# Cloudinary (image uploads)
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

# Firebase (Google Auth)
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

> ⚠️ Never commit `.env`. Only commit `.env.example`.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build production bundle to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Lint source files using ESLint |

---

## 🌐 API Configuration

All requests go through `src/api/baseApi.js` using RTK Query:

```js
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  credentials: "include", // sends HTTP-only cookie (refresh token)
});
```

**Auto token refresh** — on a `401` response, the client automatically calls `POST /auth/refresh-token` and retries the request. On failure, it dispatches `logout()`.

---

## ✨ Features

- 🔐 JWT auth with HTTP-only cookies + silent token refresh
- 🔒 Google Sign-In (Firebase), email verification, OTP mobile verification
- 🧭 Protected routes and role-based navigation (User / Provider / Admin)
- 🗺️ Map-based provider discovery (React Leaflet)
- 📊 Admin dashboard with charts & KPIs (Recharts)
- 🔔 Real-time notifications (Socket.IO)
- 🌙 Dark / Light mode (persisted in Redux)
- 🖼️ Image uploads via Cloudinary
- 📱 Fully responsive layout

---

## 📸 Screenshots

| Page | Preview |
|---|---|
| Landing Page | _Coming soon_ |
| User Home | _Coming soon_ |
| Provider Dashboard | _Coming soon_ |
| Admin Dashboard | _Coming soon_ |

---

## 🚀 Deployment

### Vercel _(Recommended)_
1. Import the repo, set **Root Directory** to `Frontend`
2. Add all `.env` variables in project settings
3. Vercel auto-detects Vite — deploy on every push to `main`

### Netlify
1. Set **Build command**: `npm run build` | **Publish directory**: `dist`
2. Add a `public/_redirects` file:
   ```
   /*  /index.html  200
   ```

### NGINX / VPS
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

> Update `VITE_API_URL` to your production backend URL before building.

---

## 📄 License

MIT © Jaydatt Kher(https://github.com/jaydattkher)
