const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Hero = require('../models/Hero');

// --- PROJECTS ---
// Get All Projects (Public)
router.get('/projects', async (req, res) => {
    const projects = await Project.find();
    res.json(projects);
});

// Add Project (Admin) - Supports Image Upload
router.post('/projects', auth, upload.single('image'), async (req, res) => {
    const { title, category, demoLink } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '';
    const newProject = new Project({ title, category, demoLink, image });
    await newProject.save();
    res.json(newProject);
});

// Delete Project (Admin)
router.delete('/projects/:id', auth, async (req, res) => {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Project deleted' });
});

// --- SKILLS ---
router.get('/skills', async (req, res) => {
    const skills = await Skill.find();
    res.json(skills);
});

router.post('/skills', auth, async (req, res) => {
    // Category is passed from frontend (e.g., "Frontend", "Backend", "Tools")
    const newSkill = new Skill(req.body); 
    await newSkill.save();
    res.json(newSkill);
});

router.delete('/skills/:id', auth, async (req, res) => {
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Skill deleted' });
});

// --- HERO SECTION ---
router.get('/hero', async (req, res) => {
    // Returns the first hero object
    const hero = await Hero.findOne();
    res.json(hero);
});

router.post('/hero', auth, async (req, res) => {
    // Update or Create if doesn't exist
    let hero = await Hero.findOne();
    if (hero) {
        await Hero.updateOne({}, req.body);
    } else {
        const newHero = new Hero(req.body);
        await newHero.save();
    }
    res.json({ msg: 'Hero updated' });
});

module.exports = router;