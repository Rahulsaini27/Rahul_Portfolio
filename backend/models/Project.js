const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    category: { 
        type: String, 
        required: true, 
        enum: ['Advanced', 'Intermediate', 'Basic'] // Specific levels requested
    },
    demoLink: { type: String },
    repoLink: { type: String }
});

module.exports = mongoose.model('Project', ProjectSchema);