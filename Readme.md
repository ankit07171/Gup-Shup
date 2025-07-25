# 💬 MERN Chat Application

A full-stack real-time chat application built using the **MERN stack** (MongoDB, Express, React, Node.js) with secure **cookie-based authentication**, **Socket.IO** for live messaging, and **DiceBear Avatars** for profile images.

---

## 🚀 Features

- 🔐 Secure Signup/Login using JWT in HTTP-only cookies
- 🧑‍🤝‍🧑 One-to-one chat with real-time updates via Socket.IO
- 📩 Live message delivery with auto-scroll
- 💡 Typing indicators & message animations
- 🧠 Auth context using React Context API
- 💾 MongoDB with Mongoose for user/message storage
- 🎨 DiceBear avatar generation
- 🌐 Protected routes via middleware
- 📡 REST API + WebSocket-based chat system

---

## 🛠️ Tech Stack

| Frontend       | Backend          | Real-Time     | Database  |
|----------------|------------------|---------------|-----------|
| React + Vite   | Node.js + Express| Socket.IO     | MongoDB   |
| Tailwind CSS   | Mongoose         | JWT + Cookies |           |

---
  

```env file
PORT=7171
MONGODB_URI= < Mongodb_url >
JWT_SECRET= < your-secret-key >
NODE_ENV= < development >


📦 Installation & Running
1️⃣ Clone the repo
bash
Copy
Edit
git clone https://github.com/your-username/mern-chat-app.git
cd mern-chat-app
2️⃣ Install backend
bash
Copy
Edit
cd backend
npm install
npm run dev
3️⃣ Install frontend
bash
Copy
Edit
cd ../frontend
npm install
npm run dev


