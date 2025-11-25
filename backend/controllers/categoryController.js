const Category = require('../models/Category');
const Skill = require('../models/Skill');

// Get All Categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// Add Category
exports.addCategory = async (req, res) => {
    const { name } = req.body;
    try {
        let category = await Category.findOne({ name });
        if (category) {
            return res.status(400).json({ msg: 'Category already exists' });
        }
        category = new Category({ name });
        await category.save();
        res.json(category);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// Delete Category (and linked skills)
exports.deleteCategory = async (req, res) => {
    try {
        // Optional: Delete all skills belonging to this category to prevent orphans
        await Skill.deleteMany({ category: req.params.id });
        
        await Category.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Category and associated skills deleted' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};