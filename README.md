# 🧵 Thread Mart – Multi-Vendor Garments Marketplace & Management Platform

🔗 **Live Site:** https://thread-mart.web.app

Thread Mart is a **role-based, multi-vendor garments marketplace** where multiple **Managers** sell products, **Buyers** purchase garments, and **Admins** control users, products, payments, and platform operations from a centralized system.

The platform is designed to mirror a **real-world e-commerce marketplace**, focusing on **security, scalability, dashboards, payments, and modern UI/UX**.

---

## 🎯 Project Purpose

Thread Mart aims to:

- Provide a centralized marketplace for multiple garment sellers
- Connect buyers with verified managers
- Enable secure online payments
- Ensure strict role-based access control
- Deliver smooth, animated, and responsive user experience

Thread Mart works as a **middle layer** between buyers and managers, similar to large-scale multi-vendor platforms.

---

## ✨ Key Features

### 🔑 Role-Based Marketplace

- Multi-vendor system with **separate dashboards**
- **Admin, Manager, and Buyer** role separation
- Secure authentication and protected routes
- Role-based API authorization

---

### 🧑‍💼 Manager Features

- Create, update, and manage garment products
- Control product availability and inventory
- View and manage **orders related only to their products**
- Track order progress
- Rich Text Editor for **styled product descriptions**
- Order management after successful payment

---

### 👤 Buyer Features

- Browse garments from multiple managers
- Advanced **search, filter, and sort** products & orders
- Secure checkout using **Stripe Payment Gateway**
- View payment status and order history
- Track order status

---

### 👑 Admin Features

- Manage all users and roles
- Approve or suspend managers
- Control product visibility
- Monitor all orders and payments
- **Dashboard overview with charts & analytics**

---

### 💳 Payment System (Stripe – New)

- Secure Stripe payment integration
- Payment intent-based checkout
- Order confirmation after successful payment
- Protected payment routes
- Real-world payment workflow

---

### 📊 Dashboard & UI Enhancements

- Separate dashboard layout for each role
- **Overview dashboards with dynamic charts**
- Role-based statistics visualization
- Smooth scrolling
- Framer Motion animations
- Fully responsive UI

---

### 📬 Communication & Engagement

- Newsletter subscription system
- Contact Us form with **email delivery**
- Toast notifications & user feedback

---

### 🔐 Security & Access

- Firebase Authentication
- JWT-based authentication with **HTTP-only cookies**
- Role-based route & API protection
- Secure payment validation

---

## 🛠️ Tech Stack

### Frontend

- React
- React Router DOM
- Tailwind CSS
- DaisyUI
- Framer Motion
- @tanstack/react-query
- Axios
- Stripe (Client)
- React Icons
- React Toastify
- Firebase
- Rich Text Editor

### Backend

- Node.js
- Express.js
- MongoDB
- Stripe (Server)
- JSON Web Token (JWT)
- Cookie Parser
- CORS
- Dotenv

---

## 📦 NPM Packages Used

### Client

```
react
react-router-dom
react-fast-marquee
react-hook-form
recharts
@tanstack/react-query
@tiptap/react
axios
tailwindcss
daisyui
lottie-react
lenis
framer-motion
swiper
react-icons
react-toastify
firebase
```

### Backend

```
express
mongodb
jsonwebtoken
cors
dotenv
cookie-parser
stripe
```

---

## 🧑‍💻 Run Project Locally

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/kamrulhasanPro/Thread-MartThread-Mart-Client.git

git clone https://github.com/kamrulhasanPro/Thread-Mart-Backend
```

### 2️⃣ Client Setup

```
cd Thread-Mart-Client
npm install
npm run dev
```

Create a .env file in the client:

```
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_public_key
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_IMGBB_API=your_imgbb_api_key
VITE_NEWSLETTER_FORM_SECRETE=web3Form_api_key
VITE_CONTACT_FORM_SECRETE=web3Form_api_key
```

### 3️⃣ Server Setup

```
cd Car-Rental-Server
npm install
```

Create a .env file:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
YOUR_DOMAIN=http://localhost:5173 production is changeable
```

Start the server:

```
npm start
```

## 🚀 Future Improvements
- Refund & payment dispute handling
- Invoice generation
- Email notifications for payments & orders
- Advanced sales analytics
- Review & rating system

## 👨‍💻 Developer

**Kamrul Hasan Miazi**  
MERN Stack Developer  
📍 Bangladesh

- GitHub: https://github.com/kamrulhasanPro
- LinkedIn: https://www.linkedin.com/in/kamrulhasanmiazi

---

⭐ _Thread Mart demonstrates a real-world multi-vendor garments marketplace with centralized marketing and management control._
