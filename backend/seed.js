const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');
require('dotenv').config();

const seedAdmin = async () => {
    try {
        
        await mongoose.connect("mongodb+srv://rahulsaini42854:zxcvbnm2003@cluster-course.b7mzy.mongodb.net/Rahul-portfolio");
        console.log('MongoDB Connected for Seeding');

        // Check if admin exists
        const existingAdmin = await Admin.findOne({ username: 'admin_rahul_270803' });
        if (existingAdmin) {
            console.log('Admin already exists');
            process.exit();
        }

        // Create Hash
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin_yashika_270803', salt); // Change 'admin123' to your desired password

        // Save Admin
        const newAdmin = new Admin({
            username: 'admin_rahul_270803',
            password: hashedPassword
        });

        await newAdmin.save();
        console.log('Admin Account Created Successfully');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedAdmin();