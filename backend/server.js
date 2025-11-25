const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 1. Connect to Database
connectDB();

// 2. CORS Setup — Allow Multiple Frontends
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://rahul-admin.onrender.com/", // Production site admin
    "https://rahul-portfolio-main.onrender.com/", // Production site portfolio
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.log("Blocked by CORS:", origin);
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

// 3. Middleware
app.use(express.json());

// 4. Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/category', require('./routes/categoryRoutes'));
app.use('/api/content', require('./routes/contentRoutes'));
app.use('/api/portfolio', require('./routes/projectRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));

// 5. Health Check (Render/Vercel Friendly)
app.get('/', (req, res) => {
    res.send('Portfolio Backend is Running Live!');
});

// 6. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
