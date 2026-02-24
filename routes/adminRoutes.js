const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { isAdmin } = require('../middleware/auth');
const Module = require('../models/Module');
const Project = require('../models/Project');


const flash=require("connect-flash");

const router = express.Router();

router.get('/admin/dashboard', isAdmin, (req, res) => {
    res.render('admin/dashboard', { title: 'Admin Dashboard' });
})


router.get('/admin/employees', isAdmin, async (req, res) => {
    const employees = await User.find({ role: 'user' });
    res.render('admin/employees', { title: 'Manage Employees', employees });
});


router.get('/admin/employees/add', isAdmin, (req, res) => {
    res.render('admin/addEmployee', { title: 'Add Employee' });
});


router.post('/admin/employees/add', async (req, res) => {
    try {
        const { name, email, password, role, designation, department, contact, profileImage } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            designation,
            department,
            contact,
            profileImage
        });

        req.flash('success', 'Employee added successfully');
        res.redirect('/admin/employees');
    } catch (err) {
        console.error(err);
        req.flash('error', 'Failed to add employee');
        res.redirect('/admin/employees');
    }
});

router.get('/admin/employees/edit/:id', isAdmin, async (req, res) => {
    const employee = await User.findById(req.params.id);
    res.render('admin/editEmployee', { title: 'Edit Employee', employee });
});


router.post('/admin/employees/edit/:id', isAdmin, async (req, res) => {
    const { name, email, password } = req.body;
    const updateData = { name, email };
    if (password) {
        updateData.password = await bcrypt.hash(password, 10);
    }
    await User.findByIdAndUpdate(req.params.id, updateData);
    res.redirect('/admin/employees');
});


router.get('/admin/employees/delete/:id', isAdmin, async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/admin/employees');
});


module.exports = router;
