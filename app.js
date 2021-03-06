const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const { isLoggedIn } = require('./middleware');
const flash = require('connect-flash');

mongoose.connect('mongodb://localhost:27017/twitter-clone',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(() => console.log("DB Connected"))   //Promises
    .catch((err) => console.log(err));         //Error Handling

//Basic connection setup steps:     
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, '/public')));

// Middleware function to parse the body of the form (alternative to body-parser)
app.use(express.urlencoded({ extended: true }))  
// Middleware function to parse json data 
app.use(express.json());

// Routes 

const authRoutes = require('./routes/authRoutes');

// APIs

const postsApiRoute = require('./routes/api/posts');

app.use(session({
    secret: 'weneedabettersecret',
    resave: false,
    saveUninitialized: true
}))

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// using Routes
app.use(authRoutes);

// using <APIs>
app.use(postsApiRoute);


app.get('/',isLoggedIn, (req, res) => {

    res.render('layouts/main-layout'); 
})




app.listen(3000, () => {
    console.log("server running at port 3000");
})