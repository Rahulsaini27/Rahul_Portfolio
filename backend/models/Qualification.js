const mongoose = require('mongoose');

const QualificationSchema = new mongoose.Schema({
    type: { 
        type: String, 
        enum: ['Education', 'Experience'], 
        required: true 
    },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    calendar: { type: String, required: true }
});

module.exports = mongoose.model('Qualification', QualificationSchema);