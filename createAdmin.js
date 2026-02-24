const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

mongoose.connect("mongodb://localhost:27017/project_recipie")
.then(async () => {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await User.create({
        name: 'Admin',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin'
    });
    console.log('Admin user created');
    mongoose.connection.close();
});
