const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    title: { type: String, required: true }, // e.g. "Frontend Developer"
    description: { type: String, required: true }, // e.g. "Over 2+ years..."
    points: [{ type: String }] // Array of bullet points e.g. ["Clean Code", "Responsive Design"]
});

module.exports = mongoose.model('Service', ServiceSchema);