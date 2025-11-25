const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { 
    getHero, updateHero, 
    getAbout, updateAbout, 
    getQualifications, addQualification, deleteQualification 
} = require('../controllers/contentController');

const { 
    // ... existing imports
    getServices, addService, deleteService 
} = require('../controllers/contentController');


// Services Routes
router.get('/services', getServices);
router.post('/services', auth, addService);
router.delete('/services/:id', auth, deleteService);
// Hero Routes
router.get('/hero', getHero);
router.put('/hero', [auth, upload.single('image')], updateHero);

// About Routes (Multiple Files)
router.get('/about', getAbout);
router.put('/about', [auth, upload.fields([{ name: 'image' }, { name: 'cv' }])], updateAbout);

// Qualification Routes
router.get('/qualifications', getQualifications);
router.post('/qualifications', auth, addQualification);
router.delete('/qualifications/:id', auth, deleteQualification);

module.exports = router;