const Hero = require('../models/Hero');
const About = require('../models/About');
const Qualification = require('../models/Qualification');
const fs = require('fs');
const Service = require('../models/Service'); // Import the new model
const { uploadToFirebase, deleteFromFirebase } = require('../utils/firebaseUtils');


// --- HERO SECTION ---
exports.getHero = async (req, res) => {
    try {
        const hero = await Hero.findOne();
        res.json(hero || {});
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.updateHero = async (req, res) => {
    try {
        const { title, subtitle, description, instagram, github, linkedin, email } = req.body;
        const heroFields = { title, subtitle, description, socials: { instagram, github, linkedin, email } };

        let hero = await Hero.findOne();

        if (req.file) {
            // 1. If existing image, delete it
            if (hero && hero.image) {
                await deleteFromFirebase(hero.image);
            }
            // 2. Upload new image
            heroFields.image = await uploadToFirebase(req.file, 'hero');
        }

        if (hero) {
            hero = await Hero.findOneAndUpdate({}, { $set: heroFields }, { new: true });
        } else {
            hero = new Hero(heroFields);
            await hero.save();
        }
        res.json(hero);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getAbout = async (req, res) => {
    try {
        const about = await About.findOne();
        res.json(about || {});
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.updateAbout = async (req, res) => {
    try {
        const { description, info } = req.body;
        const aboutFields = { description, info: info ? JSON.parse(info) : [] };

        let about = await About.findOne();
        // Handle Image Upload
        if (req.files && req.files['image']) {
            if (about && about.image) await deleteFromFirebase(about.image); // Delete old
            aboutFields.image = await uploadToFirebase(req.files['image'][0], 'about'); // Upload new
        }

        // Handle CV Upload
        if (req.files && req.files['cv']) {
            if (about && about.cv) await deleteFromFirebase(about.cv); // Delete old
            aboutFields.cv = await uploadToFirebase(req.files['cv'][0], 'cv'); // Upload new
        }

        if (about) {
            about = await About.findOneAndUpdate({}, { $set: aboutFields }, { new: true });
        } else {
            about = new About(aboutFields);
            await about.save();
        }
        res.json(about);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};


exports.getQualifications = async (req, res) => {
    try {
        const qualifications = await Qualification.find();
        res.json(qualifications);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.addQualification = async (req, res) => {
    const { type, title, subtitle, calendar } = req.body;
    try {
        const newQual = new Qualification({ type, title, subtitle, calendar });
        await newQual.save();
        res.json(newQual);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.deleteQualification = async (req, res) => {
    try {
        await Qualification.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Qualification Deleted' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};



exports.getServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.addService = async (req, res) => {
    const { title, description, points } = req.body; 
    // points is expected to be an array of strings
    try {
        const newService = new Service({ title, description, points });
        await newService.save();
        res.json(newService);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.deleteService = async (req, res) => {
    try {
        await Service.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Service Deleted' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};








