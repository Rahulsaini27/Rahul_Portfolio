const Project = require('../models/Project');
const Skill = require('../models/Skill'); // Keep skill logic
const { uploadToFirebase, deleteFromFirebase } = require('../utils/firebaseUtils');

// --- PROJECTS ---

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.addProject = async (req, res) => {
    try {
        const { title, category, demoLink, repoLink } = req.body;
        
        let imageUrl = '';
        if (req.file) {
            imageUrl = await uploadToFirebase(req.file, 'projects');
        }

        const newProject = new Project({
            title,
            category,
            demoLink,
            repoLink,
            image: imageUrl
        });

        await newProject.save();
        res.json(newProject);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ msg: 'Project not found' });

        // 1. Delete Image from Firebase
        if (project.image) {
            await deleteFromFirebase(project.image);
        }

        // 2. Delete Record from MongoDB
        await Project.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Project and Image Deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};


// --- SKILLS ---

exports.getSkills = async (req, res) => {
    try {
        // Populate category to get name instead of just ID
        const skills = await Skill.find().populate('category', 'name');
        res.json(skills);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.addSkill = async (req, res) => {
    const { name, level, category } = req.body;
    try {
        const newSkill = new Skill({ name, level, category });
        await newSkill.save();
        
        // Populate for immediate frontend update
        const populatedSkill = await newSkill.populate('category', 'name');
        res.json(populatedSkill);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.deleteSkill = async (req, res) => {
    try {
        await Skill.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Skill Deleted' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};



