const Message = require('../models/Message');
const nodemailer = require('nodemailer');

exports.sendMessage = async (req, res) => {
    const { name, email, message } = req.body;

    try {
        // 1. Save to MongoDB
        const newMessage = new Message({ name, email, message });
        await newMessage.save();

        // 2. Send Email via Nodemailer
        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER,
            subject: `Portfolio Contact from ${name}`,
            text: `You received a new message from your portfolio website.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ msg: 'Message sent successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ date: -1 });
        res.json(messages);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.deleteMessage = async (req, res) => {
    try {
        await Message.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Message Deleted' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};