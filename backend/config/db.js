const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const dbName = "Rahul-portfolio";

        // Direct MongoDB URI
        const MONGO_URI = "mongodb+srv://rahulsaini42854:zxcvbnm2003@cluster-course.b7mzy.mongodb.net";

        await mongoose.connect(`${MONGO_URI}/${dbName}`);

        console.log(`✅ MongoDB Connected to: ${dbName}`);
    } catch (error) {
        console.error("❌ Database connection failed:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
