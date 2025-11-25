const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
    name: { type: String, required: true },
    level: { type: String, required: true }, // e.g., Basic, Advanced
    category: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category', 
        required: true 
    }
});

module.exports = mongoose.model('Skill', SkillSchema);