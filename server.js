require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();


mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/project_recipie', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log(" MongoDB Connected"))
.catch(err => console.error("MongoDB Connection Error:", err));



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
    secret: '1234',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());


app.use((req, res, next) => {
    res.locals.message = req.flash();
    next();
});


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


const mainRoutes = require('./routes/mainRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const projectRoutes = require('./routes/projectRoutes');
const moduleRoutes = require('./routes/moduleRoutes');

app.use('/', mainRoutes);
app.use('/', authRoutes);
app.use('/', adminRoutes);
app.use('/', projectRoutes);
app.use('/', moduleRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
