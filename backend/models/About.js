const mongoose = require('mongoose');

const AboutSchema = new mongoose.Schema({
    description: String,
    cv: String, // Path to PDF file
    image: String, // Path to Image file
    info: [{ 
        title: String, 
        subtitle: String 
    }]
});

module.exports = mongoose.model('About', AboutSchema);