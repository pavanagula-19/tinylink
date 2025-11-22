# 🔗 TinyLink — Modern URL Shortener (SPA + Backend API)

TinyLink is a fully-featured, production-grade URL Shortener built with a modern full-stack architecture.  
It supports link creation, analytics, health monitoring, authentication, and redirects — all packaged in a clean, mobile-responsive UI.

---

## 🚀 Live Demo
🔴 **Website:** https://tinylink-tawny.vercel.app/  
🎥 **Video Demo:** https://jmp.sh/RF2P2QeR

---

## 📌 Project Summary

TinyLink is designed as a lightweight alternative to Bitly or Rebrandly.  
It allows users to:

### ✅ Core Features
- **Create short URLs** with optional custom codes
- **View link analytics**  
  - Total clicks  
  - Creation date  
  - Last click timestamp  
  - Sparkline mini-graphs (synthetic trend line)
- **Health Monitoring Dashboard**
  - API uptime  
  - Latency metrics  
  - Redirect worker test  
  - Auto-refresh system health
- **Full Authentication Flow**
  - Login / Signup
  - JWT-based auth
  - Private & Public routes guard
- **Link Management**
  - Edit URL
  - Delete URL
  - Bulk delete
  - Filters: code, date range, clicks, etc.

### 🎨 UI/UX
- Fully responsive (mobile-first)
- Clean, neutral, elegant design
- ShadCN UI + Tailwind + Lucide Icons
- Smooth layouts, responsive header, dropdown menus

### 🏗 Deployment Setup
- **Frontend:** Vercel / Netlify (SPA rewrites included)
- **Backend:** Render / Railway / VPS
- **Environment variables** supported on both sides

---

## 🛠 Tech Stack

### **Frontend**
| Technology | Purpose |
|-----------|---------|
| **React + TypeScript** | SPA application |
| **Vite** | Fast bundling + HMR |
| **TailwindCSS** | Utility-first styling |
| **ShadCN UI** | Beautiful prebuilt UI components |
| **Lucide Icons** | Clean SVG icons |
| **Redux Toolkit + Redux Saga** | State management + side effects |
| **React Router** | Client-side routing |
| **Axios** | API client |
| **Sonner** | Toast notifications |

---

### **Backend (Node.js)**
| Technology | Purpose |
|-----------|---------|
| **Node.js + TypeScript** | Server runtime |
| **Express.js** | HTTP API framework |
| **MongoDB + Mongoose** | Database for storing links & users |
| **bcryptjs** | Password hashing |
| **jsonwebtoken (JWT)** | Authentication |
| **Helmet** | Security headers |
| **Morgan** | HTTP request logging |
| **dotenv** | ENV config |
| **CORS** | Cross-origin support |

---

