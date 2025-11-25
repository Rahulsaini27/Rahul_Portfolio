const Message = require('../models/Message');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports.sendMessage = async (req, res) => {
    const { name, email, phone, project } = req.body;
    
    try {
        // 1. Save to Database
        const newMessage = new Message({ name, email, phone, project });
        await newMessage.save();

        // 2. Send Email
        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER,
            subject: `Portfolio Contact: ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nProject Details: ${project}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) console.log(error);
        });

        res.json({ msg: 'Message sent successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ date: -1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};