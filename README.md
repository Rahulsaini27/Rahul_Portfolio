# 🚀 Dynamic MERN Portfolio System

A fully dynamic Personal Portfolio website where every piece of content (text, images, projects, skills) is managed through a secure **Admin Panel**. The system uses a Node.js backend with MongoDB for data and Firebase Storage for media assets.

---

## 🔗 Live Deployments

| Component | URL | Description |
|-----------|-----|-------------|
| **👨‍💻 Main Portfolio** | [rahul-portfolio-main.onrender.com](https://rahul-portfolio-main.onrender.com/) | The public-facing website viewed by visitors. |
| **⚙️ Admin Panel** | [rahul-admin.onrender.com](https://rahul-admin.onrender.com) | Secure dashboard to manage content (Login required). |
| **🔌 Backend API** | [rahul-portfolio-iu0e.onrender.com](https://rahul-portfolio-iu0e.onrender.com/) | The server handling database, storage, and emails. |

---

## 🛠️ Tech Stack

### **Frontend (Portfolio)**
- **React.js** - Component-based UI
- **CSS3** - Custom styling and animations
- **Axios** - API fetching

### **Admin Panel**
- **React + Vite** - Fast development build tool
- **Tailwind CSS** - Modern styling for the dashboard
- **React Router DOM** - Navigation
- **React Toastify** - Notifications

### **Backend**
- **Node.js & Express** - Server framework
- **MongoDB & Mongoose** - Database for text data
- **Firebase Storage** - Cloud storage for images and Resume PDFs
- **Nodemailer** - Email services for the contact form
- **JWT** - Secure authentication for the admin

---

## ✨ Features

### 1. **Dynamic Content Management**
- Update **Hero Section** (Name, Role, Social Links, Photo)
- Update **About Me** (Description, Stats, CV/Resume upload)
- Manage **Skills** (Add categories like Frontend/Backend and assign skills)
- Manage **Experience/Education** timeline
- Manage **Services** offered

### 2. **Project Management**
- Add/Delete projects
- Upload cover images (Auto-saved to Firebase)
- Add Demo Links, GitHub Repo links, and Descriptions

### 3. **Contact System**
- Visitors send messages via the Portfolio
- Messages are saved to the Database
- **Nodemailer** sends an email notification to the Admin
- Admin can view and delete messages from the Dashboard

### 4. **Security**
- Protected Admin Routes
- JWT Authentication
- Secure Image Uploads

---

## 📂 Project Structure

The repository is divided into three main folders:

```
root/
├── admin-panel/      # React + Vite + Tailwind (CMS Dashboard)
├── backend/          # Node.js + Express + MongoDB (API)
└── my-portfolio/     # Simple React + CSS (Public Website)
```

---

## 🚀 Local Setup Guide

If you want to run this project locally, follow these steps:

### 1. **Backend Setup**

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
FIREBASE_PROJECT_ID=...
FIREBASE_PRIVATE_KEY_ID=...
FIREBASE_PRIVATE_KEY=...
FIREBASE_CLIENT_EMAIL=...
FIREBASE_STORAGE_BUCKET=...
```

Run the server:

```bash
npm run dev
```

### 2. **Admin Panel Setup**

```bash
cd admin-panel
npm install
npm run dev
```

### 3. **Portfolio Setup**

```bash
cd my-portfolio
npm install
npm start
```

---

## 📡 API Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/login` | Admin Login | Public |
| GET | `/api/content/hero` | Get Home Data | Public |
| PUT | `/api/content/hero` | Update Home Data | Admin |
| GET | `/api/portfolio/projects` | Get All Projects | Public |
| POST | `/api/portfolio/projects` | Add Project (w/ Image) | Admin |
| POST | `/api/messages` | Send Contact Msg | Public |
| GET | `/api/messages` | Read Inbox | Admin |

---

## 👤 Author

**Rahul**  
Full Stack Web Developer

[GitHub](#) | [LinkedIn](#)

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check the [issues page](#).

---

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!
