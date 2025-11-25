const mongoose = require('mongoose');

const HeroSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    description: String,
    socials: {
        instagram: String,
        github: String,
        linkedin: String,
        email: String
    },
    image: String
});

module.exports = mongoose.model('Hero', HeroSchema);