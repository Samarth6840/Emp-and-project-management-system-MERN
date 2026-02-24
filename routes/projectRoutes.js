const express = require('express');
const Project = require('../models/Project');
const User = require('../models/User');
const { isAdmin, isAuthenticated } = require('../middleware/auth');

const router = express.Router();


router.get('/admin/projects', isAdmin, async (req, res) => {
    const projects = await Project.find().populate('assignedTo', 'name email');
    res.render('admin/projects', { title: 'Manage Projects', projects });
});


router.get('/admin/projects/add', isAdmin, async (req, res) => {
    const employees = await User.find({ role: 'user' });
    res.render('admin/addProject', { title: 'Add Project', employees });
});


router.post('/admin/projects/add', isAdmin, async (req, res) => {
    const { title, description, assignedTo, startDate, endDate } = req.body;
    await Project.create({ title, description, assignedTo, startDate, endDate });
    res.redirect('/admin/projects');
});


router.get('/admin/projects/edit/:id', isAdmin, async (req, res) => {
    const project = await Project.findById(req.params.id);
    const employees = await User.find({ role: 'user' });
    res.render('admin/editProject', { title: 'Edit Project', project, employees });
});


router.post('/admin/projects/edit/:id', isAdmin, async (req, res) => {
    const { title, description, assignedTo, status, startDate, endDate } = req.body;
    await Project.findByIdAndUpdate(req.params.id, { title, description, assignedTo, status, startDate, endDate });
    res.redirect('/admin/projects');
});


router.get('/admin/projects/delete/:id', isAdmin, async (req, res) => {
    await Project.findByIdAndDelete(req.params.id);
    res.redirect('/admin/projects');
});


router.get('/user/projects', isAuthenticated, async (req, res) => {
    const projects = await Project.find({ assignedTo: req.session.user.id });
    res.render('user/myProjects', { title: 'My Projects', projects });
});


router.get('/user/projects/update/:id', isAuthenticated, async (req, res) => {
    const project = await Project.findById(req.params.id);
    if (project.assignedTo.toString() !== req.session.user.id) {
        return res.status(403).send('Access Denied');
    }
    res.render('user/updateStatus', { title: 'Update Status', project });
});


router.post('/user/projects/update/:id', isAuthenticated, async (req, res) => {
    const { status } = req.body;
    const project = await Project.findById(req.params.id);
    if (project.assignedTo.toString() !== req.session.user.id) {
        return res.status(403).send('Access Denied');
    }
    project.status = status;
    await project.save();
    res.redirect('/user/projects');
});

module.exports = router;
