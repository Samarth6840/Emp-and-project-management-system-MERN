const express = require('express');
const router = express.Router();
const Module = require('../models/Module');
const Project = require('../models/Project');
const User = require('../models/User');
const { isAdmin, isAuthenticated } = require('../middleware/auth');

// GET: List all modules
router.get('/admin/modules', isAuthenticated, isAdmin, async (req, res) => {
    try {
        const modules = await Module.find()
            .populate('projectId')
            .populate('assignedTo');
        res.render('admin/modules', { modules });
    } catch (err) {
        console.error(err);
        res.send('Error fetching modules');
    }
});

// GET: Add Module form
router.get('/admin/modules/add', isAdmin, async (req, res) => {
    try {
        const projects = await Project.find();
        const users = await User.find({ role: 'user' });
        res.render('admin/addModule', { projects, users });
    } catch (err) {
        console.error(err);
        res.send('Error loading form');
    }
});

// POST: Add Module
router.post('/admin/modules/add', isAdmin, async (req, res) => {
    try {
        const { projectId, title, description, assignedTo, status, progressNotes, startDate, endDate } = req.body;
        await Module.create({
            projectId,
            title,
            description,
            assignedTo,
            status,
            progressNotes,
            startDate,
            endDate
        });
        res.redirect('/admin/modules');
    } catch (err) {
        console.error(err);
        res.send('Error adding module');
    }
});

// GET: Edit Module form
router.get('/admin/modules/edit/:id', isAdmin, async (req, res) => {
    try {
        const moduleData = await Module.findById(req.params.id);
        const projects = await Project.find();
        const users = await User.find({ role: 'user' });
        res.render('admin/editModule', { moduleData, projects, users });
    } catch (err) {
        console.error(err);
        res.send('Error loading module for edit');
    }
});

// POST: Edit Module
router.post('/admin/modules/edit/:id', isAdmin, async (req, res) => {
    try {
        await Module.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/admin/modules');
    } catch (err) {
        console.error(err);
        res.send('Error updating module');
    }
});

// GET: Delete Module
router.get('/admin/modules/delete/:id',isAdmin, async (req, res) => {
    try {
        await Module.findByIdAndDelete(req.params.id);
        res.redirect('/admin/modules');
    } catch (err) {
        console.error(err);
        res.send('Error deleting module');
    }
});

module.exports = router;
