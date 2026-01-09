# 🔐 Magic Link Passwordless Authentication (Frontend)

![Status](https://img.shields.io/badge/Status-Completed-brightgreen) 
![Next.js](https://img.shields.io/badge/Next.js-Frontend-blue) 
![Vercel](https://img.shields.io/badge/Hosting-Vercel-purple) 
![MERN](https://img.shields.io/badge/MERN-FullStack-orange)

---

## 💡 Overview

Welcome to **Magic Link Frontend!** 🚀  

This project demonstrates **passwordless authentication** where users can log in using **email** without needing a password.  

✅ Modern, secure, and user-friendly  
✅ Fully integrated with **Express backend**  
✅ Supports **JWT tokens & cookie-based page protection**  

---

## 🎯 Features

- 🔑 Passwordless login via **email**  
- ✉️ Magic link verification flow  
- 🛡 JWT token authentication  
- 🖥 Protected dashboard pages using **Next.js middleware**  
- 🎨 Responsive UI using **Tailwind CSS, MUI & ShadCN UI**  
- 🌐 Hosted on **Vercel**  

---

## 📹 Live Demo

[✨ Try it Online](https://magiclinkfrontend.vercel.app)  

*Example flow: login → verification → dashboard*

---

## 🛠 Technologies Used

| Frontend | Purpose |
|----------|---------|
| Next.js | React framework & routing |
| React | UI components |
| Tailwind CSS | Styling & responsive layout |
| MUI | Material UI components |
| ShadCN UI | Custom reusable components |
| Axios | HTTP requests to backend |
| Next.js Middleware | Page protection using cookies |

---

## 🚀 Installation

1. **Clone the repository**

```bash
git clone https://github.com/RakkeshIT/magiclinkfrontend.git
cd magiclink-frontend

npm install
# or
yarn

ENV File
---------------------
NODE_ENV=developement
NEXT_PUBLIC_BASE_URL_DEVELOPMENT=http://localhost:5000
NEXT_PUBLIC_BASE_URL=https://mgiclinkserver.vercel.app [Your Live URL]


🔑 How It Works
1️⃣ User enters email → backend sends a magic link
2️⃣ User clicks the link → navigates to /verify/:id
3️⃣ Frontend verifies token → receives JWT accessToken
4️⃣ Frontend sets httpOnly cookie via /api/auth/set-cookie
5️⃣ Middleware protects pages → only logged-in users can access /dashboard


Flow diagram: magic link → verification → cookie → protected dashboard 

💻 Author 

Rakkesh Kumar J – MERN Stack Developer

