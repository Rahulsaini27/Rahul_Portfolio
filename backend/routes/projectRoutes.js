const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { 
    getProjects, addProject, deleteProject, 
    getSkills, addSkill, deleteSkill 
} = require('../controllers/projectController');

// Projects
router.get('/projects', getProjects);
router.post('/projects', [auth, upload.single('image')], addProject);
router.delete('/projects/:id', auth, deleteProject);

// Skills
router.get('/skills', getSkills);
router.post('/skills', auth, addSkill);
router.delete('/skills/:id', auth, deleteSkill);

module.exports = router;